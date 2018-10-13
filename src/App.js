import React, { Component } from 'react'
import './App.css'
import GMap from './components/Map'

class App extends Component {
  constructor() {
    super()
    this.state = {
      locations: []
      , walks: []
      , count: 0
      , poll: 0
      , isPolling: false
    }
  }

  startPolling = () => {
    let poll = navigator.geolocation.watchPosition((pos) => {
      const newPos = { lat: pos.coords.latitude, lng: pos.coords.longitude }

      console.log('new pos: ', pos.coords)

      if (this.state.locations.length > 0
          && this.sameCoords(this.state.locations[this.state.locations.length -1], newPos))
          return this.setState({
            ...this.state
            , count: this.state.count + 1
          })

      this.setState({
        locations: [ ...this.state.locations, newPos ]
        , count: this.state.count + 1
      })
    }, null, { enableHighAccuracy: true })

    this.setState({
      ...this.state
      , poll: poll
      , isPolling: true
    })
  }

  stopPolling = () => {
    navigator.geolocation.clearWatch(this.state.poll)
    this.setState({
      ...this.state
      , walks: [ ...this.state.walks, this.state.locations ]
      , locations: []
      , count: 0
      , poll: 0
      , isPolling: false
    })
  }

  sameCoords(loc1, loc2) {
    return Object.keys(loc1).every(i => loc1[i] === loc2[i])
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Drake</h1>
        </header>
        <button className="btn" onClick={ this.state.isPolling ? this.stopPolling : this.startPolling }>{ this.state.isPolling ? 'stop' : 'start' }</button>
        <GMap
          locations={ this.state.locations }
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBg03i5zkHFpxv8XpEdhhdXLT57Y9GXkBc&v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `100vh` }} />}
          mapElement={<div style={{ height: `100vh` }} />} />
      </div>
    )
  }
}

export default App;
