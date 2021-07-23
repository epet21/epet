import firebase from "../firebase";
import LogIn from "./LogIn";
import {useState} from "react";
import Pet from "./Pet";

const Main = () => {
    
    const [loggedIn, setLoggedIn] = useState(false);

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            setLoggedIn(true)
        } else {
            setLoggedIn(false)
        }
        
    })

    return (
        <>
            {loggedIn ? <Pet /> : <LogIn />}
        </>
    )
}

export default Main