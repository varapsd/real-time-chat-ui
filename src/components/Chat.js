import { Container, Row,Col, Dropdown } from "react-bootstrap";
import './Chat.css';
import LeftComponent from "./LeftComponent";
import RightComponent from "./RightComponent";
import { io } from "socket.io-client";
import { useState } from "react";

//const socket = io.connect("http://localhost:8080");
const socket = io.connect("https://socket0chat.herokuapp.com/");
function Chat(props){
    const [selectedUser, setSelectedUser] = useState(null);
    // socket.emit("users", {user: props.userId});

    const selectUser = (userSelected)=>{
        setSelectedUser(userSelected);
    }
    return(
        <Container fluid className="chatPage">
            <Row className="heading">
                <Col>Chat Application</Col>
                <Col style={{textAlign:"right"}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-gear-fill" viewBox="0 0 16 16">
                    <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z"/>
                </svg>
                </Col>
                </Row>
            <div className="mainChat">
                <LeftComponent socket={socket} userId={props.userId} selectUser={selectUser}/>
                <RightComponent socket={socket} userId={props.userId} selectedUser={selectedUser}/>
            </div>
        </Container>
    )
}

export default Chat;