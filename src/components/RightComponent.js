import { useState, useEffect, useRef } from "react";
import { Col, Container, Row, InputGroup, FormControl, Form, Button, ListGroup } from "react-bootstrap";
import './RightComponent.css';
import Peer from "simple-peer";
import styled from "styled-components";
import CallAlertModel from "./callAlertModel";
import CallPopUP from "./CallPopUp";



function RightComponent(props){
    const [message, setMessage] = useState('');
    const [roomId, setRoomId] = useState(null);
    const [prevUser, setPrevUser] = useState(null);
    const [callAlert, setCallAlert] = useState(false);
    const [file, setFile] = useState();
    const [ peer1, setPeer1] = useState();
    const [peer2, setPeer2] = useState();
    var arr = [{
        msgId : 1,
        message:"hello world",
        sender: 1,
        time : 'time'
    },{
        msgId:2,
        message:"how are you",
        type:"sent"
    },{
        msgId:3,
        message:"fine!!",
        type:"recieved",
    },{
        msgId:4,
        message:"How are you ?",
        type:"recieved",
    },{
        msgId:5,
        message:"Fine",
        type:"sent"
    }]
    
    const [chatArr, setChatArr] = useState([]);
    const [stream, setStream] = useState();
    const [receivingCall, setReceivingCall] = useState(false);
    const [caller, setCaller] = useState("");
    const [callerSignal, setCallerSignal] = useState();
    const [callAccepted, setCallAccepted] = useState(false);
    const [myMicStatus, setMyMicStatus] = useState(false);
    const [myVideoStatus, setMyVideoStatus] = useState(false);
    const userVideo = useRef();
    const partnerVideo = useRef();
    //setChatArr([...chatArr,arr]);
    
    if(props.selectedUser && prevUser!=props.selectedUser.userId){
        props.socket.emit("getRoom",{selectedId : props.selectedUser.userId, userId: props.userId})
        setPrevUser(props.selectedUser.userId);
    }
    useEffect(() => {

        //alert(props.selectedUser);
        props.socket.on("chat", (payload) => {
            setChatArr(payload.messages);
        })

        props.socket.once("getRoom",(roomPayload)=>{
            setRoomId(roomPayload.roomId);
            setChatArr(roomPayload.messages);
        })

        props.socket.on("recieveCall",(data)=>{
            setReceivingCall(true);
            setCaller(data.from);
            setCallerSignal(data.signal);
        })

        props.socket.on("callEnded",()=>{
            /*
            if(peer1){
                peer1.destroy();
            } else if( peer2){
                peer2.destroy();
            }
            */
            if(stream){
                stream.getTracks().forEach(function(track) {
                    track.stop();
                });
                setStream(null);
            }
        })
    })

    /*
    useEffect(() => {
        if(stream){
            if (userVideo.current) {
                userVideo.current.srcObject = stream;
            }
        }
        else{
            navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
                setStream(stream);
                console.log(stream)
                if (userVideo.current) {
                    userVideo.current.srcObject = stream;
                }
            })
        }
    });
    */

    async function callPeer(id) {

        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        if(stream){
            setStream(stream);
            if (userVideo.current) {
                userVideo.current.srcObject = stream;
            }
        }
        setMyMicStatus(true);
        setMyVideoStatus(true);
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream: stream,
        });
        setPeer1(peer);
        
        peer.on("signal", data =>{
            props.socket.emit("callUser", { userToCall: id, signalData: data, from: props.userId})
        })

        peer.on("stream", stream =>{
            console.log(stream);
            if(partnerVideo.current) {
                partnerVideo.current.srcObject = stream;
            }
        });

        props.socket.on("callAccepted", signal => {
            setCallAccepted(true);
            peer.signal(signal);
        })
    }

    async function acceptCall() {

        setReceivingCall(false)
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        if(stream){
            setStream(stream);
            if (userVideo.current) {
                userVideo.current.srcObject = stream;
            }
        }
        setMyMicStatus(true);
        setMyVideoStatus(true);

        setCallAccepted(true);
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream: stream,
        });
        setPeer2(peer);

        peer.on("signal", data => {
            props.socket.emit("acceptCall", { signal: data, to: caller})
        })

        peer.on("stream", stream =>{
            partnerVideo.current.srcObject = stream;
        });

        peer.signal(callerSignal)

    }
/*
    let UserVideo;
  if (stream) {
    UserVideo = (
      <Video playsInline muted ref={userVideo} autoPlay />
    );
  }

  let PartnerVideo;
  if (callAccepted) {
    PartnerVideo = (
      <Video playsInline ref={partnerVideo} autoPlay />
    );
  }
  */

const cancelCall = ()=>{
    setReceivingCall(false);
}

const endCall = ()=>{
    if(caller){
        props.socket.emit("endCall",{ callerId : caller , receiverId : props.userId})
    }
    else{
        props.socket.emit("endCall",{ callerId : props.userId, receiverId : props.selectedUser.userId })
    }
}

const updateMic = ()=>{
    stream.getAudioTracks()[0].enabled = !myMicStatus;
    setMyMicStatus(!myMicStatus)
}

const updateVideo = ()=>{
    stream.getVideoTracks()[0].enabled = !myVideoStatus;
    setMyVideoStatus(!myVideoStatus)
}

  let incomingCall;
  if (receivingCall) {
    incomingCall = (
      <div>
            <CallAlertModel show={receivingCall} acceptCall={acceptCall} cancel={cancelCall} caller={caller}/>
      </div>
    )
  }

  

    const bottomRef = useRef()

    const scrollToBottom = () => {
        if(bottomRef.current)
        {  
            bottomRef.current.scrollIntoView({
                block: "start",
            });
        }
    };
    useEffect(() => {
        scrollToBottom()
    }, [chatArr])

    useEffect(() => {
        scrollToBottom()
    }, [])

    const selectfile = (e)=>{
        setMessage(e.target.files[0].name);
        setFile(e.target.files[0]);
    }
    const sendMessage = (e) => {
        e.preventDefault();
        if(file){
            props.socket.emit("fileTransfer",{body:file,fileName:message, roomId:roomId, userId: props.userId, selectedId: props.selectedUser.userId});
            setMessage("");
            setFile();
        }
        else{
            props.socket.emit("chat", {message,roomId, userId: props.userId, selectedId : props.selectedUser.userId})
            setMessage('') 
        }
    };

    var chatList = (obj)=>{
        if(obj.senderId != props.userId){
            return(
                <Row className="recieved" key={obj.messageId}>
                        <span>{obj.message}</span>
                </Row>
            )
        }
        else{
            return(
                <Row className="sent" key={obj.messageId}>
                    <span className="grow"></span>  
                    <span className="fit">{obj.message}</span>
                </Row>
            )
        }
    }
    if(props.selectedUser){
        return(
            <Container className="righComponent">
                <Row className="heading">
                    <Col>{props.selectedUser.name}</Col>
                    <Col>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#1E90FF" className="bi bi-telephone-fill callIcon" viewBox="0 0 16 16" onClick={() => callPeer(props.selectedUser.userId)}>
                            <path fillRule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"/>
                        </svg>
                    </Col>
                </Row>
                <Container className="chatRight">
                    <Row className="scrollArea flex-grow">
                        <Container>
                        {chatArr.map(chatList)}
                        </Container>
                        <div ref={bottomRef} className="list-bottom"></div>
                    </Row>
                    <Row>
                        { stream && <CallPopUP userVideo={userVideo} partnerVideo={partnerVideo} endCall={endCall} updateMic={updateMic} myMicStatus={myMicStatus} myVideoStatus={myVideoStatus} updateVideo={updateVideo}/>}
                        {incomingCall}
                    </Row>
                    <Row>
                        <Form onSubmit={sendMessage}>
                        <InputGroup size="lg">
                            <Form.Label htmlFor="file">
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#1E90FF" className="bi bi-paperclip fileIcon" viewBox="0 0 16 16">
                                    <path d="M4.5 3a2.5 2.5 0 0 1 5 0v9a1.5 1.5 0 0 1-3 0V5a.5.5 0 0 1 1 0v7a.5.5 0 0 0 1 0V3a1.5 1.5 0 1 0-3 0v9a2.5 2.5 0 0 0 5 0V5a.5.5 0 0 1 1 0v7a3.5 3.5 0 1 1-7 0V3z"/>
                                </svg>
                            </Form.Label>
                            <Form.Control className="hide" type="file" id="file" onChange={selectfile}/>
                            <FormControl aria-label="Large" aria-describedby="inputGroup-sizing-sm" value={message} onChange={(e)=>{
                                setMessage(e.target.value);
                            }}/>
                            <InputGroup.Text id="inputGroup-sizing-lg"><Button className="sendBtn" type="submit">Send</Button></InputGroup.Text>
                        </InputGroup>
                        </Form>
                    </Row>
                </Container>
            </Container>
        )
    }
    else{
        return(
            <Container className="righComponent">
                <Row>
                    <Col className="heading">-----</Col>
                </Row>
                <Container className="chatRight">
                    <Row className="scrollArea flex-grow">
                        Select an user
                    </Row>
                    <Row>
                    </Row>
                </Container>
            </Container>
        )
    }
}

export default RightComponent;