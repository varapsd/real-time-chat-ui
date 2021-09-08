import './SignIn.css';
import { Col,Row ,InputGroup, FormControl, Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function SignUp(){
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
                <Row>
                    <InputGroup size="lg" className="formInput">
                        <FormControl aria-label="Large" aria-describedby="inputGroup-sizing-sm" className="inputField" placeholder="First Name"/>
                        <FormControl aria-label="Large" aria-describedby="inputGroup-sizing-sm" className="inputField" placeholder="Last Name"/>
                    </InputGroup>
                </Row>
                <Row>
                    <InputGroup size="lg" className="formInput">
                        <FormControl aria-label="Large" aria-describedby="inputGroup-sizing-sm" className="inputField" placeholder="Email"/>
                    </InputGroup>
                </Row>
                <Row>
                    <InputGroup size="lg" className="formInput">
                        <FormControl aria-label="Large" aria-describedby="inputGroup-sizing-sm" className="inputField" placeholder="Password"/>
                    </InputGroup>
                </Row>
                <Row>
                    <InputGroup size="lg" className="formInput">
                        <FormControl aria-label="Large" aria-describedby="inputGroup-sizing-sm" className="inputField" placeholder="Confirm Password"/>
                    </InputGroup>
                </Row>
                <Row>
                    <Button className="signIn">
                        SIGN UP
                    </Button>
                </Row>
            </Container>
        </div>
    )
}

export default SignUp;