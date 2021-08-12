import React,{useContext,useRef,useEffect,useState} from 'react'
import {User} from './Context/UserContext';
import kutils from 'kurento-utils';
import Card from '@material-ui/core/Card'
import {Button, CardActionArea, CardContent, CardMedia,makeStyles, MenuItem, MenuList } from '@material-ui/core';
import {Page} from './Context/PageContext';
import {Stream} from './Context/stream'
import {Webrtc} from '../utils/webrtc';
import Menu from '@material-ui/core/Menu'
const useStyles = makeStyles((theme) => ({
    paper:{
        padding:theme.spacing(2),
        textAlign:'center',
        color:theme.palette.text.secondary,
    
    },
    img:{
        height:100,
        paddingTop:'56.25%',
        marginTop:'30',
        padding:theme.spacing(30)

    },
    card:{

marginTop:'50px',
width:'75%',
marginLeft:'20%',

boxShadow:theme.shadows[10]


    },
    commentSection:{
        boxShadow:theme.shadows[14],
        color:'white',
        width:'300%',
		
    }}));
    





export default function Conference() {
	const classes=useStyles();
var localStream=null;

let str=false;
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

  const constraints={"video":true,"audio":true }

   
  


webSocket.onopen=(event)=>{console.log("connected : "+state.user.user_type);
	

//sendMessage({id:'online_classes',data:state.position});

    if (!webRtcPeer && state.user.user_type=="lecturer") {
		
		
        var options = {
            localVideo: document.getElementById('remote'),
            onicecandidate : onIceCandidate,
			mediaConstraints: constraints
		}
    
        webRtcPeer=kutils.WebRtcPeer.WebRtcPeerSendonly(options, function(error) {
            if(error) return onError(error);
    
            this.generateOffer(onOfferPresenter);
        });
    
    }
    
    
    if (!webRtcPeer && state.user.user_type=="student") {
            
    
        var options = {
            remoteVideo:document.getElementById('local'),

            onicecandidate : onIceCandidate,
			mediaConstraints:constraints
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
const OnError=(data)=>{console.log(data)};
const sendMessage=(data)=>{webSocket.send(JSON.stringify(data));}
function startResponse(message) {
	console.log('SDP answer received from server. Processing ...');
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
		//console.log(webRtcPeer.remoteStream());
	
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
		user:state.user,
		sdpOffer : offerSdp,
		class:'programming',
		student:[1,2,3,4],

	};
	sendMessage(message);
    console.log(JSON.parse(JSON.stringify(webRtcPeer.localStream())));
// stream.srcObject=webRtcPeer.peerConnection.getLocalStreams();
// if(stream.Streaming)

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
		user:state.user,
		sdpOffer : offerSdp,
		class:'programming',
		student:state.user._id
		
	}
	sendMessage(message);
	console.log(webRtcPeer)

}

function onIceCandidate(candidate) {
	   console.log('Local candidate' + JSON.stringify(candidate));

	   var message = {
	      id : 'onIceCandidate',
	      candidate : candidate,
		  position_id:state.user.user_type==='student'?state.user._id:'programming'
	   }
	   sendMessage(message);

}

function stop() {
	if (webRtcPeer) {
		var message = {
			id : 'stop',
		user:state.user,
		class:'programming',
		student:state.user._id
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























const stopBtn= <CardActionArea className={classes.commentSection}> <Button color="primary" onClick={()=>{stop()}}>Stop</Button></CardActionArea>
  



return (
        
<Card className={classes.card} >

<Menu><MenuList><MenuItem>hhhh</MenuItem></MenuList></Menu>

{state.user.authenticated && stop()}
{state.user.user_type==="lecturer" && <CardContent styel={{width:'10%'} } > 
<RemoteVideo/>{stopBtn}</CardContent>}
{state.user.user_type==="student" &&<CardContent styel={{width:'10%'}}>	{stopBtn}			
<LocalVideo />
</CardContent>}

</Card>
        
    )
}
