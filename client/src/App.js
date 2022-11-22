import "./App.css";
import { Route } from "react-router-dom";
import LandingPage from "./components/Landing/LandingPage";
import Home from "./components/Home/Home.js";
import Detail from "./components/Detail/Detail";
import Form from "./components/Form/Form";

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/detail/:id" component={Detail} />
      <Route exact path="/form" component={Form} />
    </div>
  );
}

export default App;
