import dead from '../assets/dead.jpg';
import firebase from "../firebase";
import { useHistory } from "react-router";

const GameOver = () => {
    let history = useHistory();
    const petHistory = (event) => {
        event.preventDefault();
        console.log(event)
    
        const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                const date = new Date();
                const dbRef = firebase.database().ref(user.uid)
                dbRef.get().then((snapshot) => {
                    firebase.database().ref(`${user.uid}/previousPets`).push({ 
                        state: snapshot.val().state,
                        petName: snapshot.val().petName,
                        hatchedDate: snapshot.val().hatchedDate
                    })

                    dbRef.update({
                        petName: event.target[0].value,
                        happy: 100,
                        hatched: false,
                        hatchedDate: date.getTime(),
                        health: 100,
                        lastFed: date.getTime(),
                        date: date.getTime(),
                        state: 1
                    })
                    event.target[0].value = '';
                }).then(() => {
                    history.push("/");
                })
            }
        })
        unsubscribe();
    }

    return(
        <div>
            <h1>YOUR PET DIED. YOU TERRIBLE PET OWNER. </h1>
            <img src={dead} alt="Pic for passed away pet" />
            <form onSubmit={(event) => {petHistory(event)}}>
                <h2>Do you want to raise another pet?</h2>
                <label htmlFor="petName" className="sr-only">Pet Name</label>
                <input type="text" name="petName" id="petName" placeholder="Pet Name"/>
                <button type="submit">Get an Egg!</button>
            </form>
            <h2>CHARIZARD TRUSTED YOU AND YOU KILLED IT</h2>
            <h2>YOU WERE THEIR WHOLE WORLD AND YOU LET IT DIE</h2>
            <h2>YES SHAUN, I LIKE MY H2s</h2>
            <h2>ALL IT WANTED WAS YOUR LOVE AND YOU ABANDONED IT</h2>
            <h2>CAN YOU IMAGING A CHILD STARVING TO DEATH LIKE THAT</h2>
            <h2>THATS WHAT CHARIZARD WENT THROUGH</h2>
            <h2>ALL CHARIZARD WANTED TO DO WAS BE HAPPY AND YOU TOOK THAT AWAY FROM FROM THEM</h2>
            <h2>YOU SHOULD HAVE MADE A BULBASAUR INSTEAD. HE IS NUMBER ONE.</h2>
        </div>
    )
}

export default GameOver;