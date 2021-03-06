import './SignIn.css';
import { Col,Row ,InputGroup, FormControl, Button, Container, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

function SignIn(props){
    const [error, setError] = useState(null);
    const signin = (event)=>{
        setError(null);
        event.preventDefault();
        const formData = new FormData(event.target),
            formDataObj = Object.fromEntries(formData.entries())
        //console.log(formDataObj);
        //var url = "http://localhost:8080/"
        var url = "https://socket0chat.herokuapp.com/"
        axios.post(url+"signin",formDataObj)
        .then(res=>{
            if(res.data.isSuccess){
                //console.log(props)
                //props.login(res.data.userId);
                props.setToken(res.data.userId);
            }
            else{
                setError("Invalid credentials")
            }
        })
    }
    return(
        <div className="signInPage">
            <Container className="left">
                <Col className="heading">Sign In</Col>
                <Col>With</Col>
                <Row className="rowLine">
                    <p className="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" className="bi bi-google" viewBox="0 0 16 16">
                            <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z"></path>
                        </svg>
                    </p>
                    <p className="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" className="bi bi-facebook" viewBox="0 0 16 16">
                        <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                    </svg>
                    </p>
                </Row>
                <Col>Or</Col>
                <Form onSubmit={signin}>
                    <Row>
                        <InputGroup size="lg" className="formInput">
                            <FormControl aria-label="Large" required name="email" type="email" aria-describedby="inputGroup-sizing-sm" className="inputField" placeholder="Email"/>
                        </InputGroup>
                    </Row>
                    <Row>
                        <InputGroup size="lg" className="formInput">
                            <FormControl aria-label="Large" required name="password" type="password" aria-describedby="inputGroup-sizing-sm" className="inputField" placeholder="Password"/>
                        </InputGroup>
                    </Row>
                    <Row>
                        <p>Forgot Password</p>
                    </Row>
                    <Row>
                        <Button className="signIn" type="submit">
                            SIGN IN
                        </Button>
                    </Row>
                </Form>
                <p style={{color:"red"}}>{error}</p>
            </Container>
            <Container className="right">
                <p className="heading">Hello,</p>
                <p className="para">You can be part of the team by signing up with us....</p>
                <Row>
                    <Link to="/signup">
                        <Button className="signIn">
                            Sign Up Here
                        </Button>
                    </Link>
                </Row>
            </Container>
        </div>
    )
}

export default SignIn;