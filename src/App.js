import React, { Component } from 'react';
import './App.css';
import BurgerMenu from './component/Menu';
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
            title: venue.name,
            isOpen: false,
            isVisible: true
            }
        })
        this.setState({ venues, markers })
        console.log(results)
      }).catch(error => {
        alert('FourSquare API Failed. Please check connection and try again')
      })
 }

  render() {
    return (
        <main>
          <BurgerMenu {...this.state} />
          <Map />
        </main>
    );  
  }
}

export default App;

//tutorial from here: https://www.youtube.com/watch?v=ywdxLNjhBYw&list=PLgOB68PvvmWCGNn8UMTpcfQEiITzxEEA1