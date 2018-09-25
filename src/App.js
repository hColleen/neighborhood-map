import React, { Component } from 'react';
import './App.css';

class App extends Component {

  componentDidMount(){
    this.renderMap()
  }
  renderMap = () =>{
    loadMapAPI("https://maps.googleapis.com/maps/api/js?key=AIzaSyCnPeVOPbLkPtwjEbH9MKDppTkoFSVmKdA&callback=initMap")
    window.initMap = this.initMap
  }

initMap = () => {
  let styles = [{"featureType": "all", "elementType": "all", "stylers": [{"hue": "#0000b0"},{"invert_lightness": "true"},{"saturation": -30}]}]
  const map = new window.google.maps.Map(document.getElementById('map'), {
    center: {lat: 33.42, lng: -111.83},
    zoom: 15,
    styles: styles
  })
}


  render() {
    return (
      <main>
        <div id="map"></div>
      </main>
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
