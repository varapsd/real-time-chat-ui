import { Container, Row,Col, Dropdown, Button } from "react-bootstrap";
import './Chat.css';
import LeftComponent from "./LeftComponent";
import RightComponent from "./RightComponent";
import { io } from "socket.io-client";
import { useState, useEffect } from "react";

//const socket = io.connect("http://localhost:8080");
//const socket = io.connect("https://socket0chat.herokuapp.com/");

function Chat(props){
    const [selectedUser, setSelectedUser] = useState(null);
    // socket.emit("users", {user: props.userId});
    const [socket, setSocket] = useState(null)
    useEffect(()=>{
        if(!socket){
            setSocket(io.connect("https://socket0chat.herokuapp.com/"));
        }
    },[]);
    
    const selectUser = (userSelected)=>{
        setSelectedUser(userSelected);
    }
    const getSelectedId = ()=>{
        return selectedUser.userId;
    }

    const logout = ()=>{
        socket.disconnect();
        props.logout();
    }
    if(socket)
        return(
            <Container fluid className="chatPage">
                <Row className="heading">
                    <Col>Chat Application</Col>
                    <Col style={{textAlign:"right"}}>
                        <Button size="sm" onClick={logout}>Logout</Button>
                    </Col>
                    </Row>
                <div className="mainChat">
                    <LeftComponent socket={socket} userId={props.userId} selectUser={selectUser} selectedUser={selectedUser}/>
                    <RightComponent socket={socket} userId={props.userId} selectedUser={selectedUser} getSelectedId={getSelectedId}/>
                </div>
            </Container>
        )
    else
        return(<></>)
}

export default Chat;