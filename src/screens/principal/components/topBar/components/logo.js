import React from 'react'
import '../topBar.css';
import logoUrl from '../../../../../assets/Logos Jotas 1.png';

class Logo extends React.Component{
    render(){
        return(
            <div className="divLogo">
                <img alt="Logo Jotas Pet" src={logoUrl} className="logo"></img>
            </div>
        )
    }
}

export default Logo;