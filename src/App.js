import React, { Component } from 'react';
import './App.css';
import axios from 'axios'
import Sidebar from "react-sidebar";

const mql = window.matchMedia(`(min-width: 800px)`);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarDocked: mql.matches,
      sidebarOpen: false
    };
 
    this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }
 
  componentWillMount() {
    mql.addListener(this.mediaQueryChanged);
  }
 
  componentWillUnmount() {
    this.state.mql.removeListener(this.mediaQueryChanged);
  }
 
  onSetSidebarOpen(open) {
    this.setState({ sidebarOpen: open });
  }
 
  mediaQueryChanged() {
    this.setState({ sidebarDocked: mql.matches, sidebarOpen: false });
  }

  state = {
    venues: [],
    venueID: []
  }

  componentDidMount(){
    this.getVenues()
  }

  renderMap = () =>{
    loadMapAPI("https://maps.googleapis.com/maps/api/js?key=AIzaSyCnPeVOPbLkPtwjEbH9MKDppTkoFSVmKdA&callback=initMap")
    window.initMap = this.initMap
  }

  getVenues = () => {
    const endPoint = "https://api.foursquare.com/v2/venues/explore?"
    const parameters = {
      client_id: "JKLNY4U2KT3FAS2L2AHI50NEEO0BHAY0A004ALOQEEBS5AIW",
      client_secret: "A5ZD1JNOSWUQ0MKYLOV0B1F03YK1PW2CLWPDL45VYPPSQA2W",
      query: "coffee",
      ll: "33.42,-111.83",
      v: "20182507"
    }
    axios.get(endPoint + new URLSearchParams(parameters))
    .then(response => {
        this.setState({
        venues: response.data.response.groups[0].items
        })
      this.renderMap()
      })
    .catch(error =>{
      console.log("Error" + error)
    })
  }

  getVenueInfo = () => {
    const endPoint = "https://api.foursquare.com/v2/venues/?"
    const parameters = {
      client_id: "JKLNY4U2KT3FAS2L2AHI50NEEO0BHAY0A004ALOQEEBS5AIW",
      client_secret: "A5ZD1JNOSWUQ0MKYLOV0B1F03YK1PW2CLWPDL45VYPPSQA2W",
      venue_id: venueID,
      v: "20182507"
    }
    axios.get(endPoint + new URLSearchParams(parameters))
    .then(response => {
        console.log(response)
      })
    .catch(error =>{
      console.log("Error" + error)
    })
  }

initMap = () => {
  const styles = [{"featureType": "all", "elementType": "all", "stylers": [{"hue": "#0000b0"},{"invert_lightness": "true"},{"saturation": -30}]}]
  const map = new window.google.maps.Map(document.getElementById('map'), {
    center: {lat: 33.415076, lng: -111.831389},
    zoom: 16,
    styles: styles
  })

  let infoWindow = new window.google.maps.InfoWindow()

  this.state.venues.map(myVenue =>{

  venueID = myVenue.id

    let marker = new window.google.maps.Marker({
      position: {lat: myVenue.venue.location.lat, lng: myVenue.venue.location.lng},
      map: map,
      title: myVenue.venue.name
    })

    let contentString = `${myVenue.venue.name}<br />
    ${myVenue.venue.location.address}`


    marker.addListener('click', function(){
      infoWindow.setContent(contentString)
      infoWindow.open(map, marker)
    })

  })
}


  render() {
    return (
      <Sidebar
        sidebar={<b>Sidebar content</b>}
        open={this.state.sidebarOpen}
        docked={this.state.sidebarDocked}
        onSetOpen={this.onSetSidebarOpen}
      >
        <main>
          <div id="map"></div>
        </main>
      </Sidebar>
    );
  }
}


function loadMapAPI(url){
  let index = window.document.getElementsByTagName('script')[0]
  let script = window.document.createElement('script')
  script.src = url
  script.asynch = true
  script.defer = true
  index.parentNode.insertBefore(script, index)
}

export default App;

//tutorial from here: https://www.youtube.com/watch?v=ywdxLNjhBYw&list=PLgOB68PvvmWCGNn8UMTpcfQEiITzxEEA1