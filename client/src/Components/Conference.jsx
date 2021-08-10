import React,{useContext,useRef,useEffect,useState} from 'react'
import {User} from './Context/UserContext';
import kutils from 'kurento-utils';
import Card from '@material-ui/core/Card'
import { Button, CardContent, CardMedia } from '@material-ui/core';
import {Page} from './Context/PageContext';
import {Stream} from './Context/stream'
import {Webrtc} from '../utils/webrtc';
export default function Conference() {
var localStream=null;


	const[streams,setStreams]=useState(null);
	const {stream,setStream}=useContext(Stream);

   
    const {dispatch,state}=useContext(User);
	const{page,setPage}=useContext(Page);
	const streamRf=useRef(null);

	let webSocket=null;
    webSocket=new WebSocket("wss://10.42.0.1:8000");

const callback=(event)=>{
console.log(event);
};



//webSocket=Webrtc(streamRf,state);
  var webRtcPeer=null;

  
   
  


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
            remoteVideo: streamRf.current,
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
const LocalVideo=()=>{return <video id="local"  style={{width:"100%",left:'-200px'}}  autoPlay={true}/>};
const RemoteVideo=()=>{return <video id="remote"   autoPlay={true} style={{width:"100%",left:"-200px"}}></video>};
// const onIceCandidate=(candidate)=>{
//     console.log(candidate);
//     var message = {
//         id : 'onIceCandidate',
//         candidate : candidate
//         };
//         sendMessage(message);
// }
const constraints={"video":true,"audio":true }
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
let str=false;

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
		streamRf.current.srcObject=webRtcPeer.remoteStream();
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
		user:state,
		sdpOffer : offerSdp
	};
	sendMessage(message);
    console.log(JSON.parse(JSON.stringify(webRtcPeer.localStream())));
// stream.srcObject=webRtcPeer.peerConnection.getLocalStreams();
// if(stream.Streaming)
streamRf.current.srcObject=webRtcPeer.localStream();

// else
// {
// }


}


function viewer() {
	
}

function onOfferViewer(error, offerSdp) {
	if (error) return onError(error)

	var message = {
		id : 'viewer',
		user:state,
		sdpOffer : offerSdp
	}
	sendMessage(message);
	console.log(webRtcPeer)

}

function onIceCandidate(candidate) {
	   console.log('Local candidate' + JSON.stringify(candidate));

	   var message = {
	      id : 'onIceCandidate',
	      candidate : candidate
	   }
	   sendMessage(message);
	   streamRf.current.srcObject=webRtcPeer.remoteStream();

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


// setStream({type:"stream",localStream:webRtcPeer.localStream()});





















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


const stopBtn=<Button color="primary" onClick={()=>{stop()}}>Stop</Button>
  



return (
        
<Card >


<video	  ref={streamRf} autoPlay={true}/>
{state.authenticated && stop()}
{state.UserType==="teacher" && <CardContent styel={{width:'100%'} } > {stopBtn}
<RemoteVideo/></CardContent>}
{state.UserType==="student" &&<CardContent styel={{width:'100%'}}>	{stopBtn}			
<LocalVideo />
</CardContent>}

</Card>
        
    )
}
