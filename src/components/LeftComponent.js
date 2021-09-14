import { useEffect, useState } from "react";
import { Col, Container, InputGroup,FormControl } from "react-bootstrap";
import './leftComponent.css'

function LeftComponent(props){
    const [usersList, setUsersList] = useState([]);
    props.socket.emit("users",{userId : props.userId});
    useEffect(() => {
        props.socket.once("users", (payload) => {
          setUsersList(payload);
        })
    })
    var curUserName = ""
    usersList.forEach(element => {
        if(element.userId === props.userId){
            curUserName = element.name;
        }
    });
    const selectUser = (e)=>{
        props.selectUser(e);
    }
    return(
        <div className="leftComponent">
            <Col className="heading">{curUserName.toUpperCase()}</Col>
            <Col>
                <InputGroup size="sm" style={{marginTop:"2px", paddingBottom: "2px", borderBottom:"solid 1px #1E90FF"}}>
                    <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" style={{border:"solid 1px #1E90FF"}}/>
                    <InputGroup.Text id="inputGroup-sizing-sm" style={{color:'#1E90FF',backgroundColor:'white',border: "solid 1px #1E90FF", cursor: "pointer"}}>Search</InputGroup.Text>
                </InputGroup>
            </Col>
            {usersList.map((user,index)=>{
                if(user.userId != props.userId){
                    return <Col className="userBlock" key={index} onClick={()=>selectUser(user)}><span>{user.name}</span></Col>;
                }
            })}
        </div>
    )
}

export default LeftComponent;