 
import React, { Component } from 'react';
import { HashRouter as Router, Route, NavLink,Switch } from "react-router-dom";
import './App.css';
import './Route.css';
import Create from './Create';
import Login from './Login'


const Home = () => (
  <div>
    <h2>Home</h2>
    <h2>Welcome to Home</h2>
  </div>
)





class App extends Component {

 
  render() {
    return (
      <Router>
      <div>
      <ul className="header">
          <li><NavLink exact to="/">Home</NavLink></li>
          <li><NavLink to="/login">Login</NavLink></li>
          <li><NavLink to="/create">Create</NavLink></li>
          </ul>
        
          <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route  path='/create' component={Create}/>
      </Switch>
      </div>
      </Router>
    );
  }
}

export default App;
