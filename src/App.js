import './App.css';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Main from "./components/Main";
// import Hatched from "./components/Hatched";
import Hatched2 from "./components/Hatched2";
import Header from './components/Header';

function App() {
  return (
    <Router>
      <Header />
      <Route exact path="/" component={Main} />
      {/* <Route exact path="/main" component={Hatched} /> */}
      <Route exact path="/main" component={Hatched2} />
    </Router>
  );
}

export default App;
