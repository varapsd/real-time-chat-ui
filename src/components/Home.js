import SignIn from "./SignIn";
import SignUp from "./SignUp";
import {
    BrowserRouter as Router,
    Route,
    Switch
  } from "react-router-dom";
import Chat from "./Chat";
import { useState } from "react";
import useToken from "./token";

function Home(){
    const [user, setUser] = useState(null);
    const { setToken, logout, token} = useToken();
    const login = (userId)=>{
        setUser(userId);
    }
    if(token){
        return(
            <Chat userId={token} logout={logout}/>
        )
    }
    else{
        return(
            <Router>
                <Switch>
                    <Route exact path="/" ><SignIn setToken={setToken}/></Route>
                    <Route path="/signup"><SignUp /></Route>
                </Switch>
            </Router>
            
        )
    }
    
}

export default Home;