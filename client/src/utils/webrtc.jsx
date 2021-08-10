import RTCPeerConnection from './RTCpeer';

 const  Webrtc=(streamRf,state)=>{
   let localStream=null;
  

    // const config={
    //     "iceServers": [{ "url": "stun:stun.voipbuster.com",urls:["stun:stun.voipbuster.com"] },[{url:"stun:stun.ideasip.com",urls:["stun:stun.ideasip.com"]}]]
    // }
    var peer;
    let webrtc=null;
    const webSocket=new WebSocket("wss://10.42.0.1:8000");
    const sendMessage=(data)=>{
        console.log(data);
        webSocket.send(JSON.stringify(data));}


    function onOfferPresenter(offerSdp) {
        if (offerSdp) console.log(offerSdp.sdp);
    
        var message = {
            id :'presenter',
            user:state,
            sdpOffer : offerSdp.sdp
        };
       // webrtc.setLocalDescription(offerSdp);
        sendMessage(message);
        //console.log(JSON.parse(JSON.stringify(webRtcPeer.localStream())))
      
    
    }

    function onOfferViewer(offerSdp) {
        if (offerSdp) console.log(offerSdp)
    
        var message = {
            id :'viewer',
            user:state,
            sdpOffer : offerSdp.sdp
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


 function viewerResponse(message) {
	if (message.response != 'accepted') {
		var errorMsg = message.message ? message.message : 'Unknow error';
		console.warn('Call not accepted for the following reason: ' + errorMsg);
		//dispose();
	} else {
		peer.addAnswerSDP({type:'answer',sdp:message.sdpAnswer});
	}


}




    function presenterResponse(message) {
        if (message.response != 'accepted') {
            var errorMsg = message.message ? message.message : 'Unknow error';
            console.warn('Call not accepted for the following reason: ' + errorMsg);
           
        } else {
            console.log(message.sdpAnswer)
          //  peer.addAnswerSDP({type:'answer',sdp:message.sdpAnswer});

        //    // webrtc.setRemoteDescription(
        //         {
        //             type: 'answer',
        //             sdp: message.sdpAnswer
        //           }
                
        //         );
            
        }
    }



    webSocket.onmessage=(event)=>{console.log(event.data);
        var parsedMessage=JSON.parse(event.data);
        console.log(parsedMessage.id);
    

        if(parsedMessage.id==="startResponse")
        console.log("Response");
        
        switch (parsedMessage.id) {
            case 'presenterResponse':
               // presenterResponse(parsedMessage);
                peer.addAnswerSDP({type:'answer',sdp:parsedMessage.sdpAnswer});
                break;
            case 'viewerResponse':
                viewerResponse(parsedMessage);
               break;
            // case 'stopCommunication':
            //     dispose();
            //     break;
             case 'iceCandidate':
                
               webrtc.addIceCandidate(parsedMessage.candidate)
            //     streamRf.current.srcObject=webRtcPeer.remoteStream();
                break;
            default:
                console.error('Unrecognized message', parsedMessage);
        


    
    
    
    }
}


    webSocket.onopen=(event)=>{
    
        if (!peer && state.UserType=="teacher") {
            var configuration = {

                attachStream: localStream,
                offerSDP:'',
                onChannelError:function(event){console.log(event)},
                onChannelClosed:function(event){console.log(event)},
                onICE: function (candidate) {onIceCandidate(candidate)},
                onRemoteStream: function (stream) {console.log(stream)},
                onRemoteStreamEnded: function (stream) {console.log(stream)},
            onOfferSDP: function (offerSDP) {onOfferPresenter(offerSDP)},
            onAnswerSDP: function (answerSDP) {console.log(answerSDP)},
            onChannelMessage: function (event) {console.log(event)},
            onChannelOpened: function (_RTCDataChannel) {console.log(_RTCDataChannel)}
            };
        navigator.mediaDevices.getUserMedia({video:true,audio:true}).then((stream=>{

            localStream=stream;
            streamRf.current.srcObject=stream;
        
        }))

       
        
        peer=RTCPeerConnection(configuration);
        console.log(peer);
        


    }

if (!peer && state.UserType=="student") {
            console.log(peer);
    
    var configuration = {
        
        
        onICE: function (candidate) {onIceCandidate(candidate)
        },
        onRemoteStream: function (stream) {console.log(stream)},
        onRemoteStreamEnded: function (stream) {console.log(stream)},
    onOfferSDP: function (offerSDP) {onOfferViewer(offerSDP)},
    onAnswerSDP: function (answerSDP) {console.log(answerSDP)},
    onChannelMessage: function (event) {console.log(event)},
    onChannelOpened: function (_RTCDataChannel) {console.log(_RTCDataChannel)}
    };

    peer=RTCPeerConnection(configuration);
    console.log(peer);}






}
  









 }
export {Webrtc};