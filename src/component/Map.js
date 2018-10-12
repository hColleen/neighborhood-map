/*global google */
import React, { Component } from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps"
import star from './images/star.svg.png'

const mapStyle = require('./mapStyle.json')

const MyMapComponent = withScriptjs(
    withGoogleMap((props) =>
        <GoogleMap
            defaultZoom={13}
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
                    .map((marker, idx, arr) => {
                        const venueInfo = props.venues.find(venue => venue.id === marker.id)
                        const markerIcon = `http://maps.google.com/mapfiles/ms/icons/red-dot.png`
                        let picture = ""
                        if (venueInfo.bestPhoto){
                            picture = `${venueInfo.bestPhoto.prefix}200x200${venueInfo.bestPhoto.suffix}`
                        } else {
                            picture = `${venueInfo.categories[0].icon.prefix}32${venueInfo.categories[0].icon.suffix}`
                        }
                        return (
                            <Marker
                                key={idx}
                                position={{ lat: marker.lat, lng: marker.lng }}
                                onClick={() => props.handleMarkerClick(marker)}
                                animation = {arr.length ===1 ? google.maps.Animation.BOUNCE : google.maps.Animation.DROP}
                                icon = {marker.isOpen === true ? star : markerIcon}
                            >
                                {marker.isOpen && venueInfo.location.formattedAddress && (
                                    <InfoWindow onCloseClick={marker.isOpen = false}>
                                        <div>
                                            <img src={picture} alt={"Venue"} />
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