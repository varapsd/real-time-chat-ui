import SignIn from "./SignIn";
import SignUp from "./SignUp";
import {
    BrowserRouter as Router,
    Route,
    Switch
  } from "react-router-dom";
import Chat from "./Chat";
import { useState } from "react";

function Home(){
    const [user, setUser] = useState(null);
    const login = (userId)=>{
        setUser(userId);
    }
    if(user){
        return(
            <Chat userId={user}/>
        )
    }
    else{
        return(
            <Router>
                <Switch>
                    <Route exact path="/" ><SignIn login={login}/></Route>
                    <Route path="/signup"><SignUp /></Route>
                </Switch>
            </Router>
            
        )
    }
    
}

export default Home;