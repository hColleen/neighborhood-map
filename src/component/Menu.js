import React, {Component} from 'react';
import { slide as Menu } from 'react-burger-menu';
import './Menu.css'
import VenueList from './VenueList'

class BurgerMenu extends Component{
    render(){
        return(
            <Menu>
            <div className = "sidebar">
            <b>Find Your Fancy</b>
            <input type = {"search"} id = {"search"} placeholder = {"Filter"} />
            <VenueList />
            </div>
            </Menu>
        )
    }
}

export default BurgerMenu