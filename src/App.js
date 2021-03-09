import React from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import Signup from "./Components/Signup"
import Signin from "./Components/Signin"

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Signup}/>
        <Route path="/signup" component={Signup}/>
        <Route path="/signin" component={Signin}/>
      </Switch>
    </Router>
  );
}

export default App;
