import React, { Component } from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const MyMapComponent = withScriptjs(
    withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={14}
    defaultCenter={{ lat: 33.42, lng: -111.83}}
  >
    {props.markers &&
        props.markers
        .filter(marker => marker.isVisible)
        .map((marker, idx) => (
            <Marker key={idx} position = {{ lat: marker.lat, lng: marker.lng }} />
        ))
     }
  </GoogleMap>
))


export default class Map extends Component{
    render() {
        return(
            <MyMapComponent
                {...this.props}
                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCnPeVOPbLkPtwjEbH9MKDppTkoFSVmKdA"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `100vh` }} />}
                mapElement={<div style={{ height: `100%` }} />}
            />
        )
    }
}