import firebase from "../firebase";
import { useHistory } from "react-router";

const Farm = () => {
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
                            hatchedDate: snapshot.val().hatchedDate,
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

    return (
        <div>
            <h1>HI FARMANDER SHAUN </h1>
            {/* Do we want to modal this bad boy? */}
            <form onSubmit={(event) => {petHistory(event)}}>
                <h2>Do you want to raise another pet?</h2>
                <label htmlFor="petName" className="sr-only">Pet Name</label>
                <input type="text" name="petName" id="petName" placeholder="Pet Name"/>
                <button type="submit">Get an Egg!</button>

                <h2>Your pet is going to a very happy place</h2>
                <h2>You were a good pet owner 😊 </h2>
                <h5>Don't look into farm lore...</h5>

            </form>
        </div>
    )
}

export default Farm;