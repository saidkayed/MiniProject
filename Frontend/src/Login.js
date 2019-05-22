import React, { Component } from 'react';
import Facade from './loginFacade';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import L from 'leaflet'


delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

export default class Login extends Component {
  constructor() {
    super();
    this.state = { username: "", password: "", errormsg: "", longitude: 0, latitude: 0, position: [] }
  }
  onChange = (evt) => {
    this.setState({ [evt.target.id]: evt.target.value })
  }


  getlocation = (e) => {
    e.preventDefault();
    console.log("hej");
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.setLocation)

    } else {
      console.log("Cant get current location")
    }
  }

  setLocation = (pos) => {
    var latitude = pos.coords.latitude
    var longitude = pos.coords.longitude


    this.setState({ latitude: latitude, longitude: longitude })
    this.Login();
  }


  Login = async () => {

    this.setState({ errormsg: "" })
    await Facade.login(this.state.username, this.state.password, this.state.longitude, this.state.latitude)
      .catch(err => {
        if (err.status === 405) {
          this.setState({ errormsg: "User does not exist" })
        }
        if (err.status === 403) {
          this.setState({ errormsg: "Wrong Password" })
        }
      });
      this.forceUpdate();

  }
  /*
    async componentDidUpdate(){
  
      await Facade.getPositions().then(data =>{
        this.setState({position:data})
        });
    }
    */


  async componentDidMount() {
    await Facade.getPositions().then(data => {
      this.setState({ position: data })

    });


  }

  render() {
    return (

      <div>

        <form onChange={this.onChange}>
          <h2 id="logintext">Login</h2>
          <input id="username" placeholder="username" type="username" name="username" required />
          <input id="password" placeholder="password" type="password" name="password" required />
          <input id="distance" placeholder="distance" type="username" name="distance" required />
          <button onClick={this.getlocation} type="submit" id="loginbtn"> login</button>
        </form>
        <h2>{this.state.errormsg}</h2>
        <div>
          <Map center={[51, -0.09]} zoom={13} style={{
            height: "300px",
            width: "30%",
            margin: "0 auto"
          }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            />
            {this.state.position.map((data) =>

              <Marker position={[data.loc.coordinates[1], data.loc.coordinates[0]]}>
                <Popup>{data.user.userName}<br />Easily customizable.</Popup>
              </Marker>
            )}

          </Map>
        </div>

      </div>

    );
  }



}