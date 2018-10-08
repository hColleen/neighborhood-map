import React, {Component} from 'react';
import { slide as Menu } from 'react-burger-menu';
import './Menu.css'

class BurgerMenu extends Component{
    render(){
        return(
            <Menu>
            <div className = "sidebar">
            <input type = {"search"} id = {"search"} placeholder = {"Filter"} />
            </div>
            </Menu>
        )
    }
}

export default BurgerMenu