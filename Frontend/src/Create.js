import React, { Component } from 'react';
import Facade from './loginFacade';





export default class Create extends Component {
    constructor() {
        super();
        this.state = { firstname: "", lastname: "", username: "", password: "", email: "", errormsg: "" }
    }

    onChange = (evt) => {
        this.setState({ [evt.target.id]: evt.target.value })

    }

    CreateUser = async (e) => {
        e.preventDefault();
        this.setState({ errormsg: "" });
        await Facade.create(this.state.firstname, this.state.lastname, this.state.username, this.state.password, this.state.email)
            .catch(e => {
                if (e.status === 406) {
                    this.setState({ errormsg: "username or email is already in use" })
                }
            })

    }


    render() {
        return (
            <div>
                <form onSubmit={this.CreateUser} onChange={this.onChange}>
                    <h2 id="logintext">Create User</h2>
                    <input id="firstname" placeholder="firstname" type="username" name="firstname" required />
                    <input id="lastname" placeholder="lastname" type="username" name="lastname" required />
                    <input id="username" placeholder="username" type="username" name="username"  required />
                    <input id="password" placeholder="password" type="password" name="password" required />
                    <input id="email" placeholder="email" type="email" name="email" defaultValue="said.gangsta@hotmail.com" required />

                    <button type="submit" id="registerbtn">  Register User</button>
                </form>
                <h2>{this.state.errormsg}</h2>
            </div>
        );
    }
}