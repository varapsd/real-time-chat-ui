import { useState, useEffect, useRef } from "react";
import { Col, Container, Row, InputGroup, FormControl, Form } from "react-bootstrap";
import './RightComponent.css';

function RightComponent(props){
    const [message, setMessage] = useState('');
    const [roomId, setRoomId] = useState(null);
    const [prevUser, setPrevUser] = useState(null);
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
    //setChatArr([...chatArr,arr]);
    
    if(props.selectedUser && prevUser!=props.selectedUser.userId){
        props.socket.emit("getRoom",{selectedId : props.selectedUser.userId, userId: props.userId})
        setPrevUser(props.selectedUser.userId);
    }
    useEffect(() => {
        props.socket.on("chat", (payload) => {
            // var obj = {
            //     msgId:chatArr.length + 1,
            //     message: payload.message,
            //     type: "sent"
            // }
          setChatArr([...chatArr, payload]);
        })

        props.socket.once("getRoom",(roomPayload)=>{
            setRoomId(roomPayload.roomId);
            setChatArr(roomPayload.messages);
        })
    })

    const bottomRef = useRef()

    const scrollToBottom = () => {
        if(bottomRef.current)
        {  
            bottomRef.current.scrollIntoView({
            behavior: "smooth",
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

    
    const sendMessage = (e) => {
        e.preventDefault();
        props.socket.emit("chat", {message,roomId, userId: props.userId, selectedId : props.selectedUser.userId})
        setMessage('')
    };

    var chatList = (obj)=>{
        console.log(obj, obj.senderId, props.userId)
        if(obj.senderId != props.userId){
            return(
                <Row className="recieved" key={obj.messageId}>
                        <span>{obj.message}</span>
                </Row>
            )
        }
        else{
            return(
                <Row className="sent" key={obj.msgId}>
                    <span className="grow"></span>  
                    <span className="fit">{obj.message}</span>
                </Row>
            )
        }
    }
    if(props.selectedUser){
        return(
            <Container className="righComponent">
                <Row>
                    <Col className="heading">{props.selectedUser.name}</Col>
                </Row>
                <Container className="chatRight">
                    <Row className="scrollArea flex-grow">
                        <Container>
                        {chatArr.map(chatList)}
                        </Container>
                        <div ref={bottomRef} className="list-bottom"></div>
                    </Row>
                    <Row>
                        <Form onSubmit={sendMessage}>
                        <InputGroup size="lg">
                            <FormControl aria-label="Large" aria-describedby="inputGroup-sizing-sm" value={message} onChange={(e)=>{
                                setMessage(e.target.value);
                            }}/>
                            <InputGroup id="inputGroup-sizing-lg" className="sendBtn" type="submit">Send</InputGroup>
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