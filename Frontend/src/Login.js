import React, { Component } from 'react';
import Facade from './loginFacade';


export default class Login extends Component{
    constructor(){
        super();
        this.state = {username:"",password:"",errormsg:"",longitude:0,latitude:0}
    }
    onChange = (evt) => {
        this.setState({ [evt.target.id]: evt.target.value })    
    }

    Login = async (e) =>{
e.preventDefault();
this.setState({errormsg:""})
await Facade.login(this.state.username,this.state.password,this.state.longitude,this.state.latitude)
.catch(err => {
    if (err.status === 405) {
        this.setState({ errormsg: "User does not exist" })
    }
    if(err.status === 403){
        this.setState({errormsg:"Wrong Password"})
    }
})
    

}

render(){
    return(
        <div>
        <form onSubmit={this.Login} onChange={this.onChange}>
        <h2 id="logintext">Login</h2>
                    <input id="username" placeholder="username" type="username" name="username"   required />
                    <input id="password" placeholder="password" type="password" name="password" required />
                    <input id="longitude" placeholder="longitude" type="username" name="longitude"   required />
                    <input id="latitude" placeholder="latitude" type="username" name="latitude"   required />
                    <input id="distance" placeholder="distance" type="username" name="distance"   required />
    <button type="submit"  id="loginbtn"> login</button>
        </form>
        <h2>{this.state.errormsg}</h2>
          </div>

    );
}



}