import firebase from "../firebase";
import {useState} from "react";
import {useHistory} from "react-router-dom";

const Header = () => {

    const [loggedIn, setLoggedIn] = useState();
    
    if (!loggedIn) {useHistory().push("/")};

    // User Sign Out
    const signOut = () => {
        firebase.auth().signOut().then(() => {
            // Sign-out successful.
        }).catch((error) => {
            // An error happened.
            alert(error.message);
        });
    }

    // Listens to whether user is logged in/out
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            var uid = user.uid;
            setLoggedIn(true)
        } else {
            setLoggedIn(false)
        }
    });

    return (
        <header>
            {
                loggedIn
                ? <button onClick={signOut}>Sign Out</button>
                : <p>Please Sign In</p>
            }
        </header>
    )
}

export default Header;