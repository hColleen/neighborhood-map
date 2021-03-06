import React, { Component } from 'react';
import { stack as Menu } from 'react-burger-menu';
import './Menu.css'
import VenueList from './VenueList'

class BurgerMenu extends Component {

    constructor() {
        super()
        this.state = {
            query: "",
            venues: []
        }
    }

    handleFilterVenues = () =>{
        //filter list based on user input
        if (this.state.query.trim() !== ''){
            const venues = this.props.venues.filter(venue => venue.name.toLowerCase().includes(this.state.query.toLowerCase()))
            return venues
        } else {
            return this.props.venues
        }
    }
    handleChange =e =>{
        //hide markers based on user input
        this.setState({ query: e.target.value })
        const markers = this.props.venues.map(venue => {
            const isMatched = venue.name.toLowerCase().includes(e.target.value.toLowerCase())
            const marker = this.props.markers.find(marker => marker.id === venue.id)
            if (isMatched){
                marker.isVisible = true;
            } else {
                marker.isVisible = false;
            }
            return marker;
        })
        this.props.updateSuperState({markers: markers})
    }
    render() {
        return (
            <Menu noOverlay right>
                <div className="sidebar">
                    <header><b>Find Your Fancy</b></header>
                    <input type={"search"} id={"search"} aria-label={"Filter Venues"} placeholder={"Filter"} onChange = {this.handleChange} />
                    <VenueList {...this.props} venues = {this.handleFilterVenues()} handleListItemClick={this.props.handleListItemClick} />
                </div>
            </Menu>
        )
    }
}

export default BurgerMenu