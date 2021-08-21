import firebase from '../firebase';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import pokemonEgg from '../assets/pokemonEgg.gif';


const Pet = () => {
  const [hatched, setHatched] = useState(false);
  const [userData, setUserData] = useState({});
  const [time, setTime] = useState(0);
  const [stateName, setStateName] = useState(0);
  const [userID, setUserID] = useState('');
  const history = useHistory();

  if (hatched) {
    history.push('/main');
  }

  const timer = () => {
    const date = new Date();
    setTime(date.getTime());
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUserID(user.uid);
        const dbRef = firebase.database().ref(user.uid);
        dbRef.on('value', (data) => {
          setUserData(data.val());
          timer();
        });
      }
    });

    unsubscribe();

    const timingFunction = setInterval(timer, 3000); // 30!!!

    // Cleans up timer
    return () => {
      clearInterval(timingFunction);
    };
  }, []);

  useEffect(() => {
    // 30, 30, 30

    if (userData.date) {
      if (userData.date + 3000 > time) {
        setHatched(false);
        setStateName(1);
      } else if (userData.date + 6000 > time) {
        setHatched(false);
        setStateName(2);
      } else if (userData.date + 9000 > time) {
        setHatched(false);
        setStateName(3);
      } else {
        if (!userData.hatched) {
          const dbRef = firebase.database().ref(userID);
          const hatchedDate = new Date();
          dbRef.update({
            hatched: true,
            hatchedDate: hatchedDate.getTime(),
            lastFed: hatchedDate.getTime(),
            lastFedNew: hatchedDate.getTime(),
          });
        }
        setHatched(true);
      }
    }

    return;
  }, [time, userData, userID]);

  function eggReturn() {
    if (stateName === 1) {
      return pokemonEgg;
    } else if (stateName === 2) {
      return pokemonEgg;
    } else {
      return pokemonEgg;
    }
  }

  return (
    <main>
      {userData.date ? (
        hatched ? (
          <p>Wowza! Eggo Hatched!</p>
        ) : (
          <img src={eggReturn()} className={`egg egg${stateName}`} alt={`Egg of ${stateName}`} />
        )
      ) : (
        <p>Loading...</p>
      )}
    </main>
  );
};

export default Pet;
