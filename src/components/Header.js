import firebase from "../firebase";
import {useState} from "react";
import {useHistory} from "react-router-dom";
import logo from "../assets/logo.png"

const Header = () => {

    // Log In State, and pushes uses to main page if logged out
    let history = useHistory();
    const [loggedIn, setLoggedIn] = useState();
    if (!loggedIn) {history.push("/")};

    // User Sign Out function
    const signOut = () => {
        firebase.auth().signOut().then(() => {
        }).catch((error) => {
            alert(error.message);
        });
    }

    // Listens to whether user is logged in/out
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            setLoggedIn(true)
        } else {
            setLoggedIn(false)
        }
    });

    return (
        <header>
            <img src={logo} alt="App logo"/>
            <div className="headerLogIn">
                {
                    loggedIn
                    ? <button onClick={signOut}>Sign Out</button>
                    : null
                }
            </div>
        </header>
    )
}

export default Header;