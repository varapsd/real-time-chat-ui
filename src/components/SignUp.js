import './SignIn.css';
import { Col,Row ,InputGroup, FormControl, Button, Container, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

function SignUp(){
    const [error, setError] = useState(null);
    var signup = (event)=>{
        setError(null);
        event.preventDefault();
        const formData = new FormData(event.target),
            formDataObj = Object.fromEntries(formData.entries())
        //console.log(formDataObj);
        if(formDataObj.password != formDataObj.confirmPassword){
            setError("passwords not matching, Try again !!");
            return;
        }
        
        var request = {
            name : formDataObj.firstName + formDataObj.lastName,
            email : formDataObj.email,
            phone : formDataObj.phone,
            password : formDataObj.password
        }
        var url = "http://localhost:8080/"
        axios.post(url+"signup",request)
        .then(res=>{
            alert(res.data.message);
        })
        return;
    }
    return(
        <div className="signInPage">
            <Container className="right">
                <Col className="heading">Luo Luo</Col>
                <Col>Get connected with chat</Col>
                <br /><br />
                <Col><p>Already have an Account ??</p></Col>
                <Row>
                    <Link to="/">
                        <Button className="signIn">
                            Sign In Here
                        </Button>
                    </Link>
                </Row>
            </Container>
            <Container className="left">
                <Col className="heading">Sign Up</Col>
                <Form onSubmit={signup}>
                    <Row>
                        <InputGroup size="lg" className="formInput">
                            <FormControl aria-label="Large" required name="firstName" aria-describedby="inputGroup-sizing-sm" className="inputField" placeholder="First Name"/>
                            <FormControl aria-label="Large" name="lastName" aria-describedby="inputGroup-sizing-sm" className="inputField" placeholder="Last Name"/>
                        </InputGroup>
                    </Row>
                    <Row>
                        <InputGroup size="lg" className="formInput">
                            <FormControl aria-label="Large" type="email" name="email" required aria-describedby="inputGroup-sizing-sm" className="inputField" placeholder="Email"/>
                        </InputGroup>
                    </Row>
                    <Row>
                        <InputGroup size="lg" className="formInput">
                            <FormControl aria-label="Large" type="number" name="phone" required aria-describedby="inputGroup-sizing-sm" className="inputField" placeholder="Phone"/>
                        </InputGroup>
                    </Row>
                    <Row>
                        <InputGroup size="lg" className="formInput">
                            <FormControl aria-label="Large" type="password" required name="password" aria-describedby="inputGroup-sizing-sm" className="inputField" placeholder="Password"/>
                        </InputGroup>
                    </Row>
                    <Row>
                        <InputGroup size="lg" className="formInput">
                            <FormControl aria-label="Large" type="password" required name="confirmPassword" aria-describedby="inputGroup-sizing-sm" className="inputField" placeholder="Confirm Password"/>
                        </InputGroup>
                    </Row>
                    <Row>
                        <Button className="signIn" type="submit">
                            SIGN UP
                        </Button>
                    </Row>
                </Form>
                <p style={{color:"red"}}>{error}</p>
            </Container>
        </div>
    )
}

export default SignUp;