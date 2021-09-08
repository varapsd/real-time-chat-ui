import SignIn from "./SignIn";
import SignUp from "./SignUp";
import {
    BrowserRouter as Router,
    Route,
    Switch
  } from "react-router-dom";

function Home(){
    return(
        <Router>
            <Switch>
                <Route exact path="/" ><SignIn /></Route>
                <Route path="/signup"><SignUp /></Route>
            </Switch>
        </Router>
        //<SignIn />
        //<SignUp />
    )
}

export default Home;