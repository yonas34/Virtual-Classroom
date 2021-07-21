import React,{useContext,useEffect,useState} from 'react'
import {User} from './Context/UserContext';
import kutils from 'kurento-utils';
export default function Conference() {
    const {dispatch,state}=useContext(User);
   
  var webRtcPeer=null;
    const webSocket=new WebSocket("wss://192.168.43.200:8000");

    webSocket.onopen=(event)=>{console.log("connected : "+state.UserType);






    if (!webRtcPeer && state.UserType=="teacher") {
		

        var options = {
            localVideo: document.getElementById('remote'),
            onicecandidate : onIceCandidate
        }
    
        webRtcPeer=kutils.WebRtcPeer.WebRtcPeerSendonly(options, function(error) {
            if(error) return onError(error);
    
            this.generateOffer(onOfferPresenter);
        });
    
    }
    
    
    if (!webRtcPeer && state.UserType=="student") {
            
    
        var options = {
            remoteVideo: document.getElementById('local'),
            onicecandidate : onIceCandidate
        }
    
       webRtcPeer=kutils.WebRtcPeer.WebRtcPeerRecvonly(options, function(error) {
            if(error) return onError(error);
    
            this.generateOffer(onOfferViewer);
        });
    }
    











};

   
   

 const onError=(data)=>{
     console.log(data);
 }   
    console.log(state);
const LocalVideo=()=>{return <video id="local" autoPlay={true}></video>};
const RemoteVideo=()=>{return <video id="remote" autoPlay={true}></video>};
// const onIceCandidate=(candidate)=>{
//     console.log(candidate);
//     var message = {
//         id : 'onIceCandidate',
//         candidate : candidate
//         };
//         sendMessage(message);
// }
const constraints={"video":true,"audio":false }
    var options = {
        localVideo: document.getElementById("remote"),
        remoteVideo: document.getElementById("local"),
        onicecandidate : onIceCandidate,
        mediaConstraints: constraints
        };

        

// webSocket.send(JSON.stringify({id:'start'}));

const OnError=(data)=>{console.log(data)};
const sendMessage=(data)=>{webSocket.send(JSON.stringify(data));}
function startResponse(message) {
	console.log('SDP answer received from server. Processing ...');
	//ws.processAnswer(message.sdpAnswer);
}

webSocket.onmessage=(event)=>{console.log(event.data);
var parsedMessage=JSON.parse(event.data);
console.log(parsedMessage.id);
if(parsedMessage.id==="startResponse")
console.log("Response");
switch (parsedMessage.id) {
	case 'presenterResponse':
		presenterResponse(parsedMessage);
		break;
	case 'viewerResponse':
		viewerResponse(parsedMessage);
		break;
	case 'stopCommunication':
		dispose();
		break;
	case 'iceCandidate':
		webRtcPeer.addIceCandidate(parsedMessage.candidate)
		break;
	default:
		console.error('Unrecognized message', parsedMessage);
	
	}

    






}



function presenterResponse(message) {
	if (message.response != 'accepted') {
		var errorMsg = message.message ? message.message : 'Unknow error';
		console.warn('Call not accepted for the following reason: ' + errorMsg);
		dispose();
	} else {
		webRtcPeer.processAnswer(message.sdpAnswer);
	}
}

function viewerResponse(message) {
	if (message.response != 'accepted') {
		var errorMsg = message.message ? message.message : 'Unknow error';
		console.warn('Call not accepted for the following reason: ' + errorMsg);
		dispose();
	} else {
		webRtcPeer.processAnswer(message.sdpAnswer);
	}
}

function presenter() {
	
}

function onOfferPresenter(error, offerSdp) {
    if (error) return onError(error);

	var message = {
		id : 'presenter',
		sdpOffer : offerSdp
	};
	sendMessage(message);
}

function viewer() {
	
}

function onOfferViewer(error, offerSdp) {
	if (error) return onError(error)

	var message = {
		id : 'viewer',
		sdpOffer : offerSdp
	}
	sendMessage(message);
}

function onIceCandidate(candidate) {
	   console.log('Local candidate' + JSON.stringify(candidate));

	   var message = {
	      id : 'onIceCandidate',
	      candidate : candidate
	   }
	   sendMessage(message);
}

function stop() {
	if (webRtcPeer) {
		var message = {
				id : 'stop'
		}
		sendMessage(message);
		dispose();
	}
}

function dispose() {
	if (webRtcPeer) {
		webRtcPeer.dispose();
		webRtcPeer=null;
	}
	
}






















//   const  ws=kutils.WebRtcPeer.WebRtcPeerSendrecv(options,(error)=>{
//     if(error)
// return OnError(error);
// console.log(ws);
// ws.generateOffer(onOffer)

//     });

//  function onOffer(error, sdpOffer) {
//         if (error) return OnError(error);
//         // We've made this function up sendOfferToRemotePeer(sdpOffer,
//         var message={"id":state.UserType==="student"?'viewer':'presenter','sdpOffer':sdpOffer};
//         sendMessage(message);

//         (sdpAnswer)=>{
//         ws.processAnswer(sdpAnswer);
//         };
//     }
    return (
        <div>
<LocalVideo/>
<RemoteVideo/>
        </div>
    )
}
