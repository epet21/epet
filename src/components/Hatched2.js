import firebase from '../firebase';
import { useEffect, useState } from 'react';
import PhotoDisplayer from './PhotoDisplayer';
import { useHistory } from 'react-router';
import berry from "../assets/cheriBerry.png";
import potion from "../assets/potion.png";
import buttwipe from "../assets/toiletPaper.png";

const Hatched2 = () => {
  const [petHealth, setPetHealth] = useState(0);
  const [userID, setUserID] = useState(0);
  const [fed, setFed] = useState(false);
  const [stage, setStage] = useState(0);
  const [isSick, setIsSick] = useState(false);
  const [poop, setPoop] = useState(0);
  const [name, setName] = useState('');
  // const [sickness, setSickness] = useState(4);
  const history = useHistory();

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const dbRef = firebase.database().ref(user.uid);
        dbRef.get().then((snapshot) => {
          const date = new Date();
          const now = date.getTime();

          const fbObject = snapshot.val();
          setName(fbObject.petName);

          if (fbObject.state === 5) {
            setStage(5);
            history.push('/farm');
            return;
            // Pet is going to the "farm" x_x (GOOD ENDING)
          }

          if (fbObject.health <= 0) {
            // Pet is ded. x_x (BAD ENDING)
            setStage(6);

            history.push('/gameover');
            return;
          }

          if (fbObject.state === 1) {
            if (now < fbObject.hatchedDate + 3600000) {
              setStage(1);
            } else {
              dbRef.update({
                state: 2,
                hatchedDate: fbObject.hatchedDate + 3600000,
              });
              setStage(2);
            }
            // If now < hatched + 60 min, then display smol bb
            // else, set age (state) to 2 + add 60 min to hatched date
          }

          if (fbObject.state === 2) {
            if (now < fbObject.hatchedDate + 172800000) {
              setStage(2);
            } else {
              dbRef.update({
                state: 3,
                hatchedDate: fbObject.hatchedDate + 172800000,
              });
              setStage(3);
            }
            // If now < hatched + 2 days, then display child
            // else, set age (state) to 3 + add 2 days to hatched date
          }

          if (fbObject.state === 3) {
            if (now < fbObject.hatchedDate + 345600000) {
              setStage(3);
            } else {
              dbRef.update({
                state: 4,
                hatchedDate: fbObject.hatchedDate + 345600000,
              });
              setStage(4);
            }
            // If now < hatched + 4 days, then display Teen
            // else, set age (state) to 4 + add 4 days to hatched date
          }

          if (fbObject.state === 4) {
            if (now < fbObject.hatchedDate + 518400000) {
              setStage(4);
            } else {
              dbRef.update({
                state: 5,
                hatchedDate: fbObject.hatchedDate + 518400000,
              });
              setStage(5);
            }
            // If now < hatched + 6 days, then display Adult
            // else, set age (state) to 5 + add 6 days to hatched date
          }
        });
      }
    });
    return unsubscribe();
  }, [stage, history]);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const dbRef = firebase.database().ref(user.uid);
        setUserID(user.uid);
        dbRef.get().then((snapshot) => {
          const date = new Date();
          const now = date.getTime();
          let newHealth;
          if (snapshot.val().poopTime) {
            // Calc last fed to pooptime
            const initDamage = snapshot.val().poopTime - snapshot.val().lastFed;

            // Calc pooptime to now
            const multiDamage = now - snapshot.val().poopTime;

            // Multiply
            const damage =
              Math.round((initDamage / 3600000) * 4) +
              Math.round((multiDamage / 3600000) * 6);
            // CHANGE THIS BACK. FOR TESTING!!!!
            newHealth = snapshot.val().health - damage;
            // if (newHealth >= 120) {
            //   newHealth = 120;
            // }

            // Remove poopTime
            dbRef.child('poopTime').remove(); // ?????????????
          } else {
            const diff = now - snapshot.val().lastFed;
            const hoursOfDamage = diff / 3600000;
            // const hoursOfDamage = diff / 60000;
            const damage = Math.round(hoursOfDamage * 4);
            newHealth = snapshot.val().health - damage;
          }

          if (fed) {
            let fedHealth = newHealth + 20;

            if (fedHealth > 100) {
              setIsSick(true);
              firebase.database().ref(userID).update({
                sick: true,
              });
            }

            if (fedHealth >= 120) {
              fedHealth = 120;
            }

            firebase.database().ref(userID).update({
              lastFed: now,
              lastFedNew: now,
              health: fedHealth,
            });

            setPetHealth(fedHealth);

            setFed(false);
          } else {
            firebase.database().ref(user.uid).update({
              lastFed: now,
              health: newHealth,
            });

            setPetHealth(newHealth);
          }

          //   setPetHealth(newHealth);
        });
      }
    });
    return unsubscribe();
  }, [fed, userID]);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const dbRef = firebase.database().ref(user.uid);
        dbRef.get().then((snapshot) => {
          if (snapshot.val().sick) {
            setIsSick(true);
          }
        });
      }
    });
    return unsubscribe();
  }, []);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const dbRef = firebase.database().ref(user.uid);
        const date = new Date();
        dbRef.get().then((snapshot) => {
          if (snapshot.val().poop === 4) {
            return;
          } else if (snapshot.val().poop === 3) {
            setPoop(3);
          } else if (snapshot.val().poop === 2) {
            setPoop(2);
            if (date.getTime() > snapshot.val().lastFedNew + 10800000) {
              setPoop(3);
              dbRef.update({
                poop: 3,
              });
            }
          } else if (snapshot.val().poop === 1) {
            setPoop(1);
            if (date.getTime() > snapshot.val().lastFedNew + 10800000) {
              setPoop(3);
              dbRef.update({
                poop: 3,
              });
            } else if (date.getTime() > snapshot.val().lastFedNew + 7200000) {
              setPoop(2);
              dbRef.update({
                poop: 2,
              });
            }
          } else {
            setPoop(0);
            if (date.getTime() > snapshot.val().lastFedNew + 10800000) {
              setPoop(3);
              dbRef.update({
                poop: 3,
              });
            } else if (date.getTime() > snapshot.val().lastFedNew + 7200000) {
              setPoop(2);
              dbRef.update({
                poop: 2,
              });
            } else if (date.getTime() > snapshot.val().lastFedNew + 3600000) {
              dbRef.update({
                poopTime: snapshot.val().lastFedNew + 3600000,
                poop: 1,
              });
              setPoop(1);
            }
          }
        });
      }
    });
    return unsubscribe();
  }, [fed, poop]);

  const foodz = () => {
    setFed(true);
    const date = new Date();
    const now = date.getTime();
    const dbRef = firebase.database().ref(userID);
    dbRef.update({
      poop: 0,
      lastFedNew: now
    });
  };

  const halp = () => {
    setIsSick(false);
    setPetHealth(100);

    const dbRef = firebase.database().ref(userID);
    dbRef.update({
      sick: false,
      health: 100,
    });
  };

  const cleanPoop = () => {
    if (poop) {
      setPoop(0);
      const dbRef = firebase.database().ref(userID);
      dbRef.update({
        poop: 4,
      });
    }
  };

  return (
    <main>
      <PhotoDisplayer stage={stage} sick={isSick} />
      <h2>{name}</h2>
      <p>Health: {petHealth}</p>
      <p>💩: {poop}</p>
      <div className="buttDiv">
        <button onClick={foodz}><img className="buttonImage" src={berry}/></button>
        <button onClick={halp}><img className="buttonImage" src={potion}/></button>
        <button onClick={cleanPoop}><img className="buttonImage" src={buttwipe}/></button>
      </div>
    </main>
  );
};

export default Hatched2;
