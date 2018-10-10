import React, { Component } from 'react';
import './App.css';
import Map from './component/Map'
import SquareAPI from './API/';


class App extends Component {

  constructor(){
    super();
    this.state = {
      venues: [],
      markers: []
    }
  }

  componentDidMount(){
    SquareAPI.search({
      ll: "33.42,-111.83",
      query: 'restaurant'
    }).then(results =>{
      const { venues } = results.response;
      const { markers } = venues.map(venue => {
        return{
            lat: venue.location.lat, 
            lng: venue.location.lng,
            isOpen: false,
            isVisible: true
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
          <Map {...this.state} />
    );  
  }
}

export default App;

//tutorial from here: https://www.youtube.com/watch?v=ywdxLNjhBYw&list=PLgOB68PvvmWCGNn8UMTpcfQEiITzxEEA1 and from here: https://www.youtube.com/watch?v=Q0vzqlnWWZw&list=PL4rQq4MQP1crXuPtruu_eijgOUUXhcUCP&index=2