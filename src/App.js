import React, { Component } from 'react'
import './App.css';
import Map from './component/Map'
import SquareAPI from './API/'
import BurgerMenu from './component/Menu'

class App extends Component {

  constructor() {
    super();
    this.state = {
      venues: [],
      markers: [],
      updateSuperState: obj =>{
        this.setState(obj)
      }
    }
  }

  closeMarkers = () => {
    const markers = this.state.markers.map(marker => {
      marker.isOpen = false
      return marker
    })
    this.setState({ markers: Object.assign(this.state.markers, markers) })
  }

  handleMarkerClick = (marker) => {
    this.closeMarkers()
    marker.isOpen = true
    this.setState({ markers: Object.assign(this.state.markers, marker) })
    const venue = this.state.venues.find(venue => venue.id === marker.id)
    SquareAPI.getVenueDetails(marker.id)
      .then(res => {
        const currentVenue = Object.assign(venue, res.response.venue)
        this.setState({ venues: Object.assign(this.state.venues, currentVenue) })
      })
  }

  handleListItemClick = venue => {
    const marker = this.state.markers.find(marker => marker.id === venue.id)
    this.handleMarkerClick(marker)
    console.log(venue)
  }

  componentDidMount() {
    SquareAPI.search({
      ll: "33.42,-111.83",
      query: 'coffee'
    }).then(results => {
      const { venues } = results.response;
      const markers = venues.map(venue => {
        return {
          lat: venue.location.lat,
          lng: venue.location.lng,
          isOpen: false,
          isVisible: true,
          id: venue.id
        }
      })
      this.setState({ venues, markers })
      console.log(results)
    }).catch(error => {
      alert('FourSquare API Failed. Please check connection and try again')
      console.log(error);
    })
  }

  render() {
    return (
      <div className="app">
        <BurgerMenu {...this.state} handleListItemClick={this.handleListItemClick} />
        <Map {...this.state} handleMarkerClick={this.handleMarkerClick} />
      </div>
    );
  }
}

export default App;

/*tutorial from here: https://www.youtube.com/watch?v=ywdxLNjhBYw&list=PLgOB68PvvmWCGNn8UMTpcfQEiITzxEEA1
and from here: https://www.youtube.com/watch?v=Q0vzqlnWWZw&list=PL4rQq4MQP1crXuPtruu_eijgOUUXhcUCP&index=2
with help from here https://github.com/tomchentw/react-google-maps/issues/175 and here https://codeshare.co.uk/blog/how-to-style-the-google-maps-popup-infowindow/
map styling from here https://snazzymaps.com/style/11/blue
*/