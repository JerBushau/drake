import React from 'react';
import {
  GoogleMap
  , Marker
  , withScriptjs
  , withGoogleMap
  , Polyline
} from "react-google-maps"
import {
  compose
  , withProps
  , withState
  , withHandlers
} from "recompose"

export default compose(
  withProps({

  })
  , withHandlers(() => {
    const refs = {
      map: undefined,
    }

    return {
      onMapMounted: () => ref => {
        refs.map = ref
      }
      , panToMarker: ( e ) => () => refs.map && e.locations.length > 0 ? refs.map.panTo(e.locations[e.locations.length - 1]) : ''
    }
  })
  , withScriptjs
  , withGoogleMap
)((props) => {
  const firstLoc = props.locations[0];
  const lastLoc = props.locations[props.locations.length - 1]

  const hasMoved = firstLoc !== lastLoc


  return <GoogleMap
    ref={ props.onMapMounted }
    defaultZoom={ 18 }
    defaultCenter={{ lat: -34.397, lng: 150.644 }}>

    <Marker position={ firstLoc } />
    {
      hasMoved
        ? <Marker position={ lastLoc } />
        : ''
    }

    { props.panToMarker() }


    <Polyline path={ props.locations } />
  </GoogleMap>
})
