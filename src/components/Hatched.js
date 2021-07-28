import firebase from "../firebase";
import { useEffect, useState } from "react";

const Hatched = () => {
    const [petHealth, setPetHealth] = useState(0);
    const [petLife, setPetLife] = useState(0);
    const [userID, setUserID] = useState(0);

    useEffect( () => {
        const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            const dbRef = firebase.database().ref(user.uid)
            setUserID(user.uid);
            dbRef.on("value", (data) => {
                setPetHealth(data.val().health);
                setPetLife(data.val().hatchedDate);
                console.log(data.val());
            })                
        }
    })
    unsubscribe();
    }, []);


const foodz = async() => {
    await setPetHealth(petHealth + 10);
    console.log(petHealth);
    firebase.database().ref(userID).update({    
    health: petHealth
})}


useEffect(() => {
    if (petHealth > 0) {
        let timer = setTimeout(() => setPetHealth(petHealth - 1), 1000);
        console.log(petHealth);
        clearTimeout(timer);
    } 
});

useEffect(() => {
    window.addEventListener('beforeunload', handleTabClosing)
    window.addEventListener('unload', handleTabClosing)
    return () => {
        window.removeEventListener('beforeunload', handleTabClosing)
        window.removeEventListener('unload', handleTabClosing)
    }
}, [])

const handleTabClosing = () => {
    alert('YOU HAVE BEEN ALERTED!!!!')
    firebase.database().ref(userID).update({    
        health: petHealth
    });
}




    return (
        <main>
            <h2>WOW! Look at your pet!</h2>
            <h3>Health: {petHealth}</h3>
            <h3>Life: {petLife}</h3>
            <button onClick={foodz}>GIMME HEALTH</button>
        </main>
    )
}

export default Hatched;


