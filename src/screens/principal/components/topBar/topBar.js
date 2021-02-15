import React from 'react'
import { Link } from "react-router-dom";
import './topBar.css';
import Logo from './components/logo.js';
import TopBarButtons from './components/topBarButtons.js';
import TopBarModal from './components/topBarModal.js';

class TopBar extends React.Component{
    render(){
        return(
            <div className="topBar">
                <Logo></Logo>
                <TopBarButtons></TopBarButtons>
                <Link to='/turnos'>
                    <button>Solicitar turno</button>
                </Link>
                <TopBarModal></TopBarModal>
            </div>
        )
    }
}

export default TopBar;