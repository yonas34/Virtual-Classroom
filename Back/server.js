const https = require('https');
const fs = require('fs');
const app=require('./app');
const ws=require('ws');
const bodyparser=require('body-parser')
const cookieParser=require('cookie-parser');
const session=require('express-session');
const {teacherModel,studentModel}=require('./UserMode');
const minimist=require('minimist')
const kurento=require('kurento-client');
const cors=require('cors');
const { v4 } =require('uuid');


var idCounter = 0;

var presenter = null;
var viewers = [];
var noPresenterMessage = 'No active presenter. Try again later...';
const sessionHandler = session({
    secret : 'none',
    rolling : true,
    resave : true,
    saveUninitialized : true
});
const apps=app(sessionHandler);

var sessions = {};
var candidatesQueue={};

const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};
const server= https.createServer(options, apps);



var wss=new ws.Server({
server:server,
paht:'/helloworlds'

});

wss.on('connection',(ws,req)=>{

var sessionId=null;
var request=req;
var response={
    writeHead:{}
};

sessionHandler(request,response,(err)=>{
    sessionId=request.session.id;
console.log('connection received with sessionId '+ sessionId);
});

ws.on('error',(error)=>{
    console.log('connection error '+ sessionId+' error');
    stop(sessionId);
})
 
ws.on('close',()=>{
    console.log('connection '+sessionId+' closed')
    stop(sessionId);
})

ws.on('message',(_message)=>{
var message=JSON.parse(_message);
console.log('connection'+sessionId+' received message',message);
switch(message.id){
// case 'start':
//    start(sessionId,ws,message.sdpOffer,(error,sdpAnswer)=>{
// if(error){
//     return ws.send(JSON.stringify({id:'error',message:error}));

// }
// ws.send(JSON.stringify({
//     id:'startResponse',
//     sdpAnswer:sdpAnswer
// }));

//  });
//     break;


case 'presenter':
    startPresenter(sessionId, ws, message.sdpOffer, function(error, sdpAnswer) {
        if (error) {
            return ws.send(JSON.stringify({
                id : 'presenterResponse',
                response : 'rejected',
                message : error
            }));
        }
        ws.send(JSON.stringify({
            id : 'presenterResponse',
            response : 'accepted',
            sdpAnswer : sdpAnswer
        }));
    });
    break;


    case 'viewer':
        console.log('viewer')
        startViewer(sessionId, ws, message.sdpOffer, function(error, sdpAnswer) {
  
            if (error) {
                console.log(error);
                return ws.send(JSON.stringify({
                    id : 'viewerResponse',
                    response : 'rejected',
                    message : error
                }));
            }

            ws.send(JSON.stringify({
                id : 'viewerResponse',
                response : 'accepted',
                sdpAnswer : sdpAnswer
            }));
        });
        break;    

case 'stop':
    stop(sessionId);
    break;
case "onIceCandidate":
     onIceCandidate(sessionId,message.candidate);
     break;
default:
    console.log('error'+message);
    ws.send(JSON.stringify({
        id:'error',
        message:'Invalid message '+JSON.stringify(message)
    }));
    break;            


}

})


})

var argv = minimist(process.argv.slice(2), {
    default: {
        as_uri: 'https://10.42.0.1:8000/',
        ws_uri: 'ws://10.42.0.1:8888/kurento'
    }
});


var kurentoClient=null;


function getKurentoClient(callback) {
    if (kurentoClient !== null) {
        return callback(null, kurentoClient);
    }

    kurento(argv.ws_uri, function(error, _kurentoClient) {
        if (error) {
            console.log("Could not find media server at address " + argv.ws_uri);
            return callback("Could not find media server at address" + argv.ws_uri
                    + ". Exiting with error " + error);
        }

        kurentoClient = _kurentoClient;
        callback(null, kurentoClient);
    });
}








function startPresenter(sessionId, ws, sdpOffer, callback) {
	clearCandidatesQueue(sessionId);
console.log(presenter);
	if (presenter !== null) {
		stop(sessionId);
		return callback("Another user is currently acting as presenter. Try again later ...");
	}

	presenter = {
		id : sessionId,
		pipeline : null,
		webRtcEndpoint : null
	}

	getKurentoClient(function(error, kurentoClient) {
		if (error) {
			stop(sessionId);
			return callback(error);
		}

		if (presenter === null) {
			stop(sessionId);
			return callback(noPresenterMessage);
		}

		kurentoClient.create('MediaPipeline', function(error, pipeline) {
			if (error) {
				stop(sessionId);
				return callback(error);
			}

			if (presenter === null) {
				stop(sessionId);
				return callback(noPresenterMessage);
			}

			presenter.pipeline = pipeline;
			pipeline.create('WebRtcEndpoint', function(error, webRtcEndpoint) {
				if (error) {
					stop(sessionId);
					return callback(error);
				}

				if (presenter === null) {
					stop(sessionId);
					return callback(noPresenterMessage);
				}

				presenter.webRtcEndpoint = webRtcEndpoint;

                if (candidatesQueue[sessionId]) {
                    while(candidatesQueue[sessionId].length) {
                        var candidate = candidatesQueue[sessionId].shift();
                        webRtcEndpoint.addIceCandidate(candidate);
                    }
                }

                webRtcEndpoint.on('OnIceCandidate', function(event) {
                    var candidate = kurento.getComplexType('IceCandidate')(event.candidate);
                    ws.send(JSON.stringify({
                        id : 'iceCandidate',
                        candidate : candidate
                    }));
                });

				webRtcEndpoint.processOffer(sdpOffer, function(error, sdpAnswer) {
					if (error) {
						stop(sessionId);
						return callback(error);
					}

					if (presenter === null) {
						stop(sessionId);
						return callback(noPresenterMessage);
					}

					callback(null, sdpAnswer);
				});

                webRtcEndpoint.gatherCandidates(function(error) {
                    if (error) {
                        stop(sessionId);
                        return callback(error);
                    }
                });
            });
        });
	});
}





function startViewer(sessionId, ws, sdpOffer, callback) {
	clearCandidatesQueue(sessionId);

	if (presenter === null) {
		stop(sessionId);
		return callback(noPresenterMessage);
	}

	presenter.pipeline.create('WebRtcEndpoint', function(error, webRtcEndpoint) {
		if (error) {
			stop(sessionId);
			return callback(error);
		}
		viewers[sessionId] = {
			"webRtcEndpoint" : webRtcEndpoint,
			"ws" : ws
		}

		if (presenter === null) {
			stop(sessionId);
			return callback(noPresenterMessage);
		}

		if (candidatesQueue[sessionId]) {
			while(candidatesQueue[sessionId].length) {
				var candidate = candidatesQueue[sessionId].shift();
				webRtcEndpoint.addIceCandidate(candidate);
			}
		}

        webRtcEndpoint.on('OnIceCandidate', function(event) {
            var candidate = kurento.getComplexType('IceCandidate')(event.candidate);
            ws.send(JSON.stringify({
                id : 'iceCandidate',
                candidate : candidate
            }));
        });

		webRtcEndpoint.processOffer(sdpOffer, function(error, sdpAnswer) {
			if (error) {
				stop(sessionId);
				return callback(error);
			}
			if (presenter === null) {
				stop(sessionId);
				return callback(noPresenterMessage);
			}

			presenter.webRtcEndpoint.connect(webRtcEndpoint, function(error) {
				if (error) {
					stop(sessionId);
					return callback(error);
				}
				if (presenter === null) {
					stop(sessionId);
					return callback(noPresenterMessage);
				}

				callback(null, sdpAnswer);
		        webRtcEndpoint.gatherCandidates(function(error) {
		            if (error) {
			            stop(sessionId);
			            return callback(error);
		            }
		        });
		    });
	    });
	});
}









function clearCandidatesQueue(sessionId) {
	if (candidatesQueue[sessionId]) {
		delete candidatesQueue[sessionId];
	}
}










































































var start=(sessionId,ws,sdpOffer,callback)=>{

    if(!sessionId)
    return callback('can not use undefined sessionId');
  
    getKurentoClient((error,kurentoClient)=>{
if(error){
    return callback(error);
}

kurentoClient.create('MediaPipeline', function(error, pipeline) {
    if (error) {
        return callback(error);
    }

    createMediaElements(pipeline, ws, function(error, webRtcEndpoint) {
        if (error) {
            pipeline.release();
            return callback(error);
        }

        if (candidatesQueue[sessionId]) {
            while(candidatesQueue[sessionId].length) {
                var candidate = candidatesQueue[sessionId].shift();
                webRtcEndpoint.addIceCandidate(candidate);
            }
        }

        connectMediaElements(webRtcEndpoint, function(error) {
            if (error) {
                pipeline.release();
                return callback(error);
            }

            webRtcEndpoint.on('OnIceCandidate', function(event) {
                var candidate = kurento.getComplexType('IceCandidate')(event.candidate);
                ws.send(JSON.stringify({
                    id : 'iceCandidate',
                    candidate : candidate
                }));
            });

            webRtcEndpoint.processOffer(sdpOffer, function(error, sdpAnswer) {
                if (error) {
                    pipeline.release();
                    return callback(error);
                }

                sessions[sessionId] = {
                    'pipeline' : pipeline,
                    'webRtcEndpoint' : webRtcEndpoint
                }
                return callback(null, sdpAnswer);
            });

            webRtcEndpoint.gatherCandidates(function(error) {
                if (error) {
                    return callback(error);
                }
            });
        });
    });
});
});
}

function createMediaElements(pipeline, ws, callback) {
    pipeline.create('WebRtcEndpoint', function(error, webRtcEndpoint) {
        if (error) {
            return callback(error);
        }

        return callback(null, webRtcEndpoint);
    });
}

 function connectMediaElements(webRtcEndpoint, callback) {
    webRtcEndpoint.connect(webRtcEndpoint, function(error) {
        if (error) {
            return callback(error);
        }
        return callback(null);
    });
}

function onIceCandidate(sessionId, _candidate) {
    var candidate = kurento.getComplexType('IceCandidate')(_candidate);

    if (sessions[sessionId]) {
        console.info('Sending candidate' +JSON.stringify(candidate));

        var webRtcEndpoint = sessions[sessionId].webRtcEndpoint;
        webRtcEndpoint.addIceCandidate(candidate);
    }
    else {
        console.info('Queueing candidate');
        if (!candidatesQueue[sessionId]) {
            candidatesQueue[sessionId] = [];
        }
        candidatesQueue[sessionId].push(candidate);
    }
}


function stop(sessionId) {
	if (presenter !== null && presenter.id == sessionId) {
		for (var i in viewers) {
			var viewer = viewers[i];
			if (viewer.ws) {
				viewer.ws.send(JSON.stringify({
					id : 'stopCommunication'
				}));
			}
		}
		presenter.pipeline.release();
		presenter = null;
		viewers = [];

	} else if (viewers[sessionId]) {
		viewers[sessionId].webRtcEndpoint.release();
		delete viewers[sessionId];
	}

	clearCandidatesQueue(sessionId);

	if (viewers.length < 1 && !presenter) {
        console.log('Closing kurento client');
       if(kurentoClient!==null)
        kurentoClient.close();
        
        kurentoClient = null;
    }
}




server.listen(8000,"10.42.0.1",()=>{console.log('running on https://localhost:8000')});
