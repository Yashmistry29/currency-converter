import React from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import {AuthProvider} from '../src/Contexts/AuthContext';
import Signup from "./Components/Signup";
import Signin from "./Components/Signin";
import Converter from './Components/CurrencyConverter';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <Route exact path="/" component={Signin}/>
          <Route path="/signup" component={Signup}/>
          <Route path="/signin" component={Signin}/>
          <Route path="/converter" component={Converter}/>
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
