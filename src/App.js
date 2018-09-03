import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import G_Map from './components/Map'

class App extends Component {
  constructor() {
    super()
    this.state = {
      locations: [
        { lat: -34.397, lng: 150.644 }
        , { lat: -34.397, lng: 120.644 }
        , { lat: 34.397, lng: 15.644 }
        , { lat: 6.94640, lng: 151.22973 }
      ]
      , count: 4
    }
  }

  pollLocation = () => {
    navigator.geolocation.watchPosition((pos) => {
      console.log('new pos: ', pos.coords)
      let newPos = { lat: pos.coords.latitude, lng: pos.coords.longitude }
      this.setState({
        ...this.state
        , locations: [ newPos ]
        , count: this.state.count++
      })
    })


  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={ () => this.pollLocation() }>add</button>
        <G_Map
          isMarkerShown
          locations={ this.state.locations }
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBg03i5zkHFpxv8XpEdhhdXLT57Y9GXkBc&v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `100%` }} />} />
      </div>
    );
  }
}

export default App;
