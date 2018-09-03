import React from 'react';
import {
  GoogleMap
  , Marker
  , withScriptjs
  , withGoogleMap
} from "react-google-maps"

export default withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={0}
    defaultCenter={{ lat: -34.397, lng: 150.644 }}>

    {props.locations.map(loc => <Marker position={ loc } />)}


  </GoogleMap>))
