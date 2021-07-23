import firebase from "../firebase";
import {useState, useEffect} from "react";
import {useHistory} from "react-router-dom";

const Pet = () => {

    const [hatched, setHatched] = useState(false);
    const [userData, setUserData] = useState({});
    const [time, setTime] = useState(0);
    const [stateName, setStateName] = useState("");
    const history = useHistory();
    if (hatched) {history.push("/main")};

    useEffect(() => {

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                const dbRef = firebase.database().ref(user.uid)
                dbRef.on("value", (data) => {
                    setUserData(data.val())

                    if (hatched) {dbRef.update({hatched: true})}

                    const timer = () => {
                        const date = new Date()
                        setTime(date.getTime());
                    }

                    timer();
                    const timingFunction = setInterval(timer, 60000);
                    if (hatched) {clearInterval(timingFunction)}
                })
            } else {
                
            }
        })

    }, []);

    useEffect(() => {

        if (userData.date) {
            if ((userData.date + 180000) > time) {
                setHatched(false)
                setStateName("Egg Stage 1")
            } else if ((userData.date + 360000) > time) {
                setHatched(false)
                setStateName("Egg Stage 2")
            } else if ((userData.date + 420000) > time) {
                setHatched(false)
                setStateName("Egg Stage 3")
            } else {
                setHatched(true)
                setStateName("Hatched!")
            }
        }

    }, [time])

    return (
        <>
            {
                userData.date
                ?
                    hatched
                    ? (<p>Wowza! Eggo Hatched!</p>)
                    : (<p>{stateName}</p>)
                : <p>Loading...</p>
            }
        </>
    )
}


export default Pet;