import React from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import {AuthProvider} from '../src/Contexts/AuthContext';
import Signup from "./Components/Signup";
import Signin from "./Components/Signin";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <Route exact path="/" component={Signup}/>
          <Route path="/signup" component={Signup}/>
          <Route path="/signin" component={Signin}/>
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
