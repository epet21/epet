import firebase from "../firebase";
import {useState, useEffect} from "react";
import {useHistory} from "react-router-dom";
import egg1 from "../assets/egg1.png"
import egg2 from "../assets/egg2.png"
import egg3 from "../assets/egg3.png"

const Pet = () => {

    const [hatched, setHatched] = useState(false);
    const [userData, setUserData] = useState({});
    const [time, setTime] = useState(0);
    const [stateName, setStateName] = useState(0);
    const history = useHistory();
    if (hatched) {history.push("/main")};

    
    useEffect(() => {
        
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                const dbRef = firebase.database().ref(user.uid)
                dbRef.on("value", (data) => {
                    setUserData(data.val())

                    if (hatched === true) {
                        const hatchedDate = new Date();
                        dbRef.update({
                            hatched: true,
                            hatchedDate: hatchedDate.getTime()
                    })}

                    const timer = () => {
                        const date = new Date()
                        setTime(date.getTime());
                    }

                    timer();
                    const timingFunction = setInterval(timer, 3000);
                    // 30!!!
                    if (hatched) {clearInterval(timingFunction)}
                })
            } else {
                
            }
        })

    }, [hatched]);

    useEffect(() => {

        // 30, 30, 30

        if (userData.date) {
            if ((userData.date + 3000) > time) {
                setHatched(false)
                setStateName(1)
                console.log(1)
            } else if ((userData.date + 6000) > time) {
                setHatched(false)
                setStateName(2)
                console.log(2)
            } else if ((userData.date + 9000) > time) {
                setHatched(false)
                setStateName(3)
                console.log(3)
            } else {
                setHatched(true)
            }
        }

    }, [time])

    function eggReturn() {
        if (stateName === 1) {
            return egg1
        } else if (stateName === 2) {
            return egg2
        } else {
            return egg3
        }
    }

    return (
        <main>
            {
                userData.date
                ?
                    hatched
                    ? (<p>Wowza! Eggo Hatched!</p>)
                    : (<img src={eggReturn()} className="egg" alt={`Image of Egg ${stateName}`}/>)
                : <p>Loading...</p>
            }
        </main>
    )
}


export default Pet;