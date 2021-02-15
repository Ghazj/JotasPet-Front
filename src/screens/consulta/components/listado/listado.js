import React from 'react';
import './listado.css';


class Listado extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            fechaHoy: new Date()
        }
    }

    maxDate(){
        const twoWeeksInMiliseconds = 1209600033.2;
        const fechaHoyEnMilisegundos = this.state.fechaHoy.getTime();
        return twoWeeksInMiliseconds + fechaHoyEnMilisegundos;
    }

    minDate(){
        const oneDayInMiliseconds = 86400000;
        const fechaHoyEnMilisegundos = this.state.fechaHoy.getTime();
        return oneDayInMiliseconds + fechaHoyEnMilisegundos;
    }

    render(){
        return(
            <>
            <h3 className="list-title">{'Listado de turnos: ' + this.props.turnosEnPantalla.length}</h3>
            <div className="listado">
                {this.props.turnosEnPantalla.map((turn, i)=>(
                        <div className="turnCard" key={i}>       
                            <div className="numerador-container">
                                <h1 className="numerador">#{i+1}</h1>
                                <h1>{turn.petName} - {turn.work}</h1><br/>
                            </div>
                            <div>
                                <j><strong>Dueño:</strong> {turn.customerName}</j><br/>
                                <j><strong>DNI:</strong> {turn.dni}</j><br/>
                                <j><strong>Dirección:</strong> {turn.customerAdress}</j><br/>
                                <j><strong>Teléfono:</strong> {turn.phoneNumber}</j><br/>
                                <j><strong>Email:</strong> {turn.customerEmail}</j><br/>
                                <j><strong>Fecha:</strong> {turn.fecha}</j>
                                <div className="buttons-container">
                                    <button id="confirmButton">Presente</button>
                                    <button id="discardButton">Ausente</button>
                                </div>
                            </div>
                        </div>
                ))
                }
            </div>
            </>
        )
    }
}

export default Listado;