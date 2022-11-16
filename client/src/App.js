import "./App.css";
import { Route, Switch } from "react-router-dom";
import { Link } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Home from "./components/Home.js";
import Detail from "./components/Detail";
import Form from "./components/Form";

function App() {
  return (
    <div className="App">
      <Link to="/Home">
        <h1>Henry Dogs</h1>
      </Link>
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/detail/:id" component={Detail} />
      <Route exact path="/form" component={Form} />
    </div>
  );
}

export default App;
