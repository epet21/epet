import firebase from "../firebase";
import { useEffect, useState } from "react";
import PhotoDisplayer from "./PhotoDisplayer";
import { useHistory } from "react-router";

const Hatched2 = () => {
    const [petHealth, setPetHealth] = useState(0);
    const [userID, setUserID] = useState(0);
    const [fed, setFed] = useState(false)
    const [stage, setStage] = useState(0)
    const history = useHistory();

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                const dbRef = firebase.database().ref(user.uid)
                dbRef.get().then((snapshot) => {
                    const date = new Date()
                    const now = date.getTime()

                    const fbObject = snapshot.val()

                        if (fbObject.state === 5) {
                        console.log("Good Ending")
                        setStage("5")
                        history.push("/farm");
                        return
                        // Pet is going to the "farm" x_x (GOOD ENDING)
                    }

                    
                    if (fbObject.health <= 0) {
                        // Pet is ded. x_x (BAD ENDING)
                        setStage("6")
                        console.log("Bad Ending")

                        history.push("/gameover");
                        return
                    }
            
                    if (fbObject.state === 1) {
                        if (now < fbObject.hatchedDate + 3600000) {
                            console.log("Smol BB")
                            setStage("1")

                        } else {
                            dbRef.update({
                                state: 2,
                                hatchedDate: fbObject.hatchedDate + 3600000
                            });
                            setStage("2")
                        }
                        // If now < hatched + 60 min, then display smol bb
                        // else, set age (state) to 2 + add 60 min to hatched date
                    }
            
                    if (fbObject.state === 2) {
                        if (now < fbObject.hatchedDate + 172800000) {
                            console.log("Child")
                            setStage("2")
                        } else {
                            dbRef.update({
                                state: 3,
                                hatchedDate: fbObject.hatchedDate + 172800000
                            });
                            setStage("3")
                        }
                        // If now < hatched + 2 days, then display child
                        // else, set age (state) to 3 + add 2 days to hatched date
                    }
            
                    if (fbObject.state === 3) {
                        if (now < fbObject.hatchedDate + 345600000) {
                            console.log("Teen")
                            setStage("3")
                        } else {
                            dbRef.update({
                                state: 4,
                                hatchedDate: fbObject.hatchedDate + 345600000
                            });
                            setStage("4")
                        }
                        // If now < hatched + 4 days, then display Teen
                        // else, set age (state) to 4 + add 4 days to hatched date
                    }
            
                    if (fbObject.state === 4) {
                        if (now < fbObject.hatchedDate + 518400000) {
                            console.log("Adult")
                            setStage("4")
                        } else {
                            dbRef.update({
                                state: 5,
                                hatchedDate: fbObject.hatchedDate + 518400000
                            });
                            setStage("5")
                        }
                        // If now < hatched + 6 days, then display Adult
                        // else, set age (state) to 5 + add 6 days to hatched date
                    }
                })
            } 
        })   
        return unsubscribe();
    }, [stage, history]);

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

                        setPetHealth(fedHealth)

                        setFed(false)
                    } else {
                        firebase.database().ref(user.uid).update({
                            lastFed: now,
                            health: newHealth
                        });

                        setPetHealth(newHealth)
                    }

                    // setPetHealth(snapshot.val().health)
                })    
            }
        })
        return unsubscribe();
    }, [fed, userID]);

    const foodz = () => {
        setFed(true)
    }


    return (
        <main>
            <h2>WOW! Look at your pet!</h2>
            <h3>Health: {petHealth}</h3>
            <PhotoDisplayer 
                stage={stage}
            />
            <button onClick={foodz}>GIMME HEALTH</button>
            
        </main>
    )
}

export default Hatched2;


