import React from 'react'
//import { Link } from "react-router-dom";
import TopBar from './components/topBar/topBar.js'


class Principal extends React.Component{
    render(){
        return(
            <div>
                <TopBar></TopBar>
                <h1>Pantalla principal</h1>
            </div>
        )
    }
}

export default Principal;