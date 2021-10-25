import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Home } from "./components/Home";
import { AddContact } from "./components/AddContact";
import { ViewContact } from "./components/ViewContact";
import { UpdateContact } from "./components/UpdateContact";
import { DeleteContact } from "./components/DeleteContact";

function App() {
  return (
    <div className="App">
      <Header />
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/AddContact" exact component={AddContact} />
          <Route path="/ViewContact/:id" exact component={ViewContact} />
          <Route path="/UpdateContact/:id" exact component={UpdateContact} />
          <Route path="/DeleteContact/:id" exact component={DeleteContact} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
