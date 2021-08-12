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
const { set } = require('mongoose');


var idCounter = 0;
var ws_user=[];
var presenter = new Map();//lecturer:null,student:null,course: -->Take lecturer data from position get class id from class_id get student list then check every connected student in the list then respond;
var viewers = new Map();
var noPresenterMessage = 'No active presenter. Try again later...';
const sessionHandler = session({
    secret : 'none',
    rolling : true,
    resave : true,
    saveUninitialized : true
});
const apps=app(sessionHandler);

var sessions = {};
var candidatesQueue=new Map();

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


ws.on('message',(_message)=>{
var message=JSON.parse(_message);
console.log('connection'+sessionId+' received message');
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

    // presenter.forEach((data)=>{console.log(data)});

    sessionId={class_Id:message.class,id:message.user._id,type:'presenter'};

    startPresenter(message.class,message.student,message.user._id, ws, message.sdpOffer, function(error, sdpAnswer) {

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


    case 'online_classes':
           console.log(message);
           break;   
    // ws.send(JSON.stringify({
        //     id : 'online_classes',
        //     sdpAnswer : sdpAnswer
        // }));
//not done here dude!
    case 'viewer':
        sessionId={class_Id:message.class,id:message.user._id,type:'student'};
        console.log('view:---->'+sessionId);
        startViewer(sessionId, ws, message.sdpOffer, function(error, sdpAnswer) {
  //sessionId=message.student;
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
    message.user.user_type==='lecturer'? stop_presenter(sessionId,presenter.get(sessionId.class_Id).settings):stop(sessionId);
    break;
case "onIceCandidate":
     onIceCandidate({class_Id:message.class,id:message.position_id},message.candidate);
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

ws.on('error',(error)=>{
    console.log('connection error '+ sessionId+' error');
    stop(sessionId);
})
 
ws.on('close',()=>{
    console.log('CLOSING...');
   
   if(sessionId.type==="presenter") 
   {var settings=presenter.get(sessionId.class_Id).settings;
    
    presenter.delete(sessionId.class_Id)

    stop_presenter(sessionId,settings);
}
else stop(sessionId);

})



})

var argv = minimist(process.argv.slice(2), {
    default: {
        as_uri: 'https://10.42.0.1:8000/',
        ws_uri: 'ws://localhost:8888/kurento'
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








function startPresenter(sessionId,student, id,ws, sdpOffer, callback) {
	clearCandidatesQueue({class_id:sessionId,id:id,type:'presenter'});
console.log(presenter);
	 if (presenter.get(sessionId) !== undefined) {
	 	stop(sessionId);
	 	return callback("Another user is currently acting as presenter. Try again later ...");
	 }
	presenter.set(sessionId,
        {student:student,
        settings : {
		id : sessionId,
		pipeline : null,
		webRtcEndpoint : null
	}});
    candidatesQueue.set(sessionId,[]);
viewers.set(sessionId,[]);
	getKurentoClient(function(error, kurentoClient) {
		if (error) {
			stop({class_id:sessionId,id:id,type:'presenter'});
			return callback(error);
		}

		if (presenter.get(sessionId) === null) {
			stop({class_id:sessionId,id:id,type:'presenter'});
			return callback(noPresenterMessage);
		}

		kurentoClient.create('MediaPipeline', function(error, pipeline) {
			if (error) {
				stop({class_id:sessionId,id:id,type:'presenter'});
				return callback(error);
			}

			if (presenter.get(sessionId) === null) {
				stop({class_id:sessionId,id:id,type:'presenter'});
				return callback(noPresenterMessage);
			}

			presenter.get(sessionId).settings.pipeline = pipeline;
			pipeline.create('WebRtcEndpoint', function(error, webRtcEndpoint) {
				if (error) {
					stop({class_id:sessionId,id:id,type:'presenter'});
					return callback(error);
				}

				if (presenter.get(sessionId) === null) {
					stop({class_id:sessionId,id:id,type:'presenter'});
					return callback(noPresenterMessage);
				}

				presenter.get(sessionId).settings.webRtcEndpoint = webRtcEndpoint;
console.log(candidatesQueue);
                if (candidatesQueue.get(sessionId)[id]) {
                    while(candidatesQueue.get(sessionId)[id].length) {
                        var candidate = candidatesQueue.get(sessionId)[id].shift();
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
						stop({class_id:sessionId,id:id,type:'presenter'});
						return callback(error);
					}

					if (presenter.get(sessionId) === null) {
						stop({class_id:sessionId,id:id,type:'presenter'});
						return callback(noPresenterMessage);
					}

					callback(null, sdpAnswer);
				});

                webRtcEndpoint.gatherCandidates(function(error) {
                    if (error) {
                        stop({class_id:sessionId,id:id,type:'presenter'});
                        return callback(error);
                    }
                });
            });
        });
	});
}





function startViewer(sessionId, ws, sdpOffer, callback) {
	clearCandidatesQueue(sessionId);


	if (presenter.get(sessionId.class_Id) === undefined) {
		stop(sessionId);
		return callback(noPresenterMessage);
	}

	presenter.get(sessionId.class_Id).settings.pipeline.create('WebRtcEndpoint', function(error, webRtcEndpoint) {
		if (error) {
			stop(sessionId);
			return callback(error);
		}
		viewers.get(sessionId.class_Id)[sessionId.id]= {
			"webRtcEndpoint" : webRtcEndpoint,
			"ws" : ws
		};

		if (presenter.get(sessionId.class_Id) === null) {
			stop(sessionId);
			return callback(noPresenterMessage);
		}

		if (candidatesQueue.get(sessionId.class_Id)[sessionId.id]) {
			while(candidatesQueue.get(sessionId.class_Id)[sessionId.id].length) {
				var candidate = candidatesQueue.get(sessionId.class_Id)[sessionId.id].shift();
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
			if (presenter.get(sessionId.class_Id) === null) {
				stop(sessionId);
				return callback(noPresenterMessage);
			}

			presenter.get(sessionId.class_Id).settings.webRtcEndpoint.connect(webRtcEndpoint, function(error) {
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
    console.log(candidatesQueue.get(sessionId.class_Id));
    if(candidatesQueue.get(sessionId.class_Id)!==undefined)
	if (candidatesQueue.get(sessionId.class_Id)[sessionId.id]!==undefined) {
		delete candidatesQueue.get(sessionId.class_Id)[sessionId];
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

    if (sessions[sessionId.id]) {
        console.info('Sending candidate' +JSON.stringify(candidate));

        var webRtcEndpoint = sessions[sessionId.id].webRtcEndpoint;
        webRtcEndpoint.addIceCandidate(candidate);
    }
    else if (candidatesQueue.get(sessionId.class_Id)!==undefined){
        console.info('Queueing candidate');
        if (!candidatesQueue.get(sessionId.class_Id)) {
            candidatesQueue.set(sessionId.id,[]);
        }
        candidatesQueue.get(sessionId.class_Id)[sessionId.id]=candidate;
    }
}


async function stop (sessionId) {
    
    
	if ( sessionId.type==='presenter'&&presenter.get(sessionId.class_Id) !== null && presenter.get(sessionId.class_Id).settings.id == sessionId.class_id) {
        for (var i in viewers.get(sessionId.class_Id)) {
           

            var viewer = viewers.get(sessionId.class_Id)[i];
			if (viewer.ws) {
				viewer.ws.send(JSON.stringify({
					id : 'stopCommunication'
				}));
			}
		}
		presenter.get(sessionId.class_Id).pipeline.release();
              console.log("------->STOPING",presenter);
		console.log(presenter.delete(sessionId.class_Id));
  
        viewers.delete(sessionId.class_Id);


	} else if (viewers.get(sessionId.class_Id)!==undefined && viewers.get(sessionId.class_Id)[sessionId.id]) {
		viewers.get(sessionId.class_Id)[sessionId.id].webRtcEndpoint.release();
		delete viewers.get(sessionId.class_Id)[sessionId.id];
	}

	clearCandidatesQueue(sessionId);

	if (viewers.get(sessionId.class_Id)!==undefined && viewers.get(sessionId.class_Id).length < 1 && !presenter.get(sessionId.class_Id)) {
        console.log('Closing kurento client');
       if(kurentoClient!==null)
        kurentoClient.close();
        
        kurentoClient = null;
    }
}




async function stop_presenter (sessionId,settings) {
  
    
	if ( sessionId.type==='presenter'&&settings!== null && settings.id === sessionId.class_Id) {
        console.log("HOLAAAA!");
        for (var i in viewers.get(sessionId.class_Id)) {
           

            var viewer = viewers.get(sessionId.class_Id)[i];
            console.log(viewer);
			if (viewer.ws) {
				viewer.ws.send(JSON.stringify({
					id : 'stopCommunication'
				}));
			}
		}
		settings.pipeline.release();
              console.log("------->STOPING",presenter);
  
        viewers.delete(sessionId.class_Id);


	} else if (viewers.get(sessionId.class_Id)!==undefined && viewers.get(sessionId.class_Id)[sessionId.id]) {
		viewers.get(sessionId.class_Id)[sessionId.id].webRtcEndpoint.release();
		delete viewers(sessionId.class_Id)[sessionId.id];
	}

	clearCandidatesQueue(sessionId);

	if (viewers.get(sessionId.class_Id)!==undefined && viewers.get(sessionId.class_Id).length < 1 && !presenter.get(sessionId.class_Id)) {
        console.log('Closing kurento client');
       if(kurentoClient!==null)
        kurentoClient.close();
        
        kurentoClient = null;
    }
}









server.listen(8000,"10.42.0.1",()=>{console.log('running on https://localhost:8000')});
