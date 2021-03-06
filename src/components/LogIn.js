import firebase from '../firebase';

const LogIn = () => {
  // Setting variables to be used later
  let email = '';
  let password = '';

  // Prevent Default and cancel an "enter" submit
  const pDefault = (e) => {
    e.preventDefault();
    return false;
  };

  // User clicks on "Register" or "Log In"
  const submit = (e) => {
    email = e.target.form[0].value;
    password = e.target.form[1].value;
    if (e.target.defaultValue === 'Register') {
      registerFunction(e.target.form[2].value);
    } else if (e.target.defaultValue === 'Log In') {
      loginFunction();
    }
  };

  // New User Signup
  const registerFunction = (petName) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // New user signed in. Create user object in DB
        const user = userCredential.user;
        const date = new Date();
        firebase.database().ref(user.$.W).set({
          date: date.getTime(),
          state: 1,
          petName: petName,
          health: 100,
          happy: 100,
          sick: false,
          poop: 0,
        });
      })
      .catch((error) => {
        // var errorCode = error.code;
        let errorMessage = error.message;
        alert(errorMessage);
      });
  };

  // User Log In
  const loginFunction = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        // var userID = userCredential.user.$.W;
      })
      .catch((error) => {
        // var errorCode = error.code;
        let errorMessage = error.message;
        alert(errorMessage);
      });
  };

  return (
    <main className="mainLogIn">
      <form onSubmit={pDefault} className="form">
        <input type="email" name="email" id="email" placeholder="email" />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="password"
        />
        <input type="text" name="petname" id="petname" placeholder="pet name" />
        <input type="submit" onClick={submit} value="Register" />
      </form>

      <form onSubmit={pDefault} className="form">
        <input type="email" name="email" id="email" placeholder="email" />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="password"
        />
        <input type="submit" onClick={submit} value="Log In" />
      </form>
    </main>
  );
};

export default LogIn;
