import React, { Component } from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps"

const mapStyle = require('./mapStyle.json')

const MyMapComponent = withScriptjs(
    withGoogleMap((props) =>
        <GoogleMap
            defaultZoom={16}
            defaultCenter={{ lat: 33.42, lng: -111.83 }}
            defaultOptions={{
                styles: mapStyle,
                streetViewControl: false,
                scaleControl: false,
                mapTypeControl: false,
                panControl: false,
                zoomControl: false,
                rotateControl: false,
                fullscreenControl: false
            }}
            disableDefaultUI
        >
            {props.markers &&
                props.markers
                    .filter(marker => marker.isVisible)
                    .map((marker, idx) => {
                        const venueInfo = props.venues.find(venue => venue.id === marker.id)
                        return (
                            <Marker key={idx} position={{ lat: marker.lat, lng: marker.lng }} onClick={() => props.handleMarkerClick(marker)}>
                                {marker.isOpen && venueInfo.location.formattedAddress && (
                                    <InfoWindow>
                                            <div>
                                                <h3>{venueInfo.name}</h3>
                                                <p>{venueInfo.location.formattedAddress}</p>
                                        </div>
                                    </InfoWindow>)}
                            </Marker>
                        )
                    }
                    )
            }
        </GoogleMap>
    ))


export default class Map extends Component {
    render() {
        return (
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