import firebase from "../firebase";
import { useEffect, useState } from "react";

const Hatched2 = () => {
    const [petHealth, setPetHealth] = useState(0);
    const [userID, setUserID] = useState(0);
    const [fed, setFed] = useState(false)

    useEffect( () => {
        const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                const dbRef = firebase.database().ref(user.uid)
                setUserID(user.uid);
                dbRef.get().then((snapshot) => {
                    
                    const date = new Date()
                    const now = date.getTime();
                    const diff = now - snapshot.val().lastFed
                    // const hoursOfDamage = diff / 3600000
                    const hoursOfDamage = diff / 60000
                    const damage = Math.round(hoursOfDamage * 4)
                    const newHealth = snapshot.val().health - damage

                    if (fed) {
                        console.log("I'm eat!")

                        const fedHealth = newHealth + 20
                        
                        firebase.database().ref(userID).update({
                            lastFed: now,
                            health: fedHealth
                        });

                        setFed(false)
                    } else {
                        firebase.database().ref(user.uid).update({
                            lastFed: now,
                            health: newHealth
                        });
                    }

                    setPetHealth(snapshot.val().health)
                })    
            }
        })
        return unsubscribe();
    }, [fed]);

    const foodz = () => {
        setFed(true)
    }

    return (
        <main>
            <h2>WOW! Look at your pet!</h2>
            <h3>Health: {petHealth}</h3>
            <button onClick={foodz}>GIMME HEALTH</button>
        </main>
    )
}

export default Hatched2;


