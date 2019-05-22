 
import React, { Component } from 'react';
import { HashRouter as Router, Route, NavLink,Switch } from "react-router-dom";
import './App.css';
import './Route.css';
import Create from './Create';
import Login from './Login'


const Home = () => (
  <div>
    <h2>Home</h2>
    <p><p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. Donec non enim in turpis pulvinar facilisis. Ut felis. Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus</p></p>
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
