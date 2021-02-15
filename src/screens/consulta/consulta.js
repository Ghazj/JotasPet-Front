import React from 'react';
import Listado from './components/listado/listado.js';
import { fetchTurnosSelectDay } from '../../apis/fetchTurnosSelectDay.js';
import Calendar from '../../globalComponents/calendar.js';
import './consulta.css';

class Consulta extends React.Component{
    constructor(props){
        super(props);
        this.state={
            selectFecha: '',
            turnosEnPantalla: [],
            fechaActual: new Date()
        }
        this.onClickDay = this.onClickDay.bind(this);
    }

    fetchTurnosSelectDay = async (data) =>{
        const res = await fetchTurnosSelectDay(data);
        this.setState({turnosEnPantalla: res.data});
        console.log(res.data)
    }

    async componentDidMount() {
        const fechaActual = String(this.state.fechaActual.getDate() + '-' + (this.state.fechaActual.getMonth() + 1) + '-' + this.state.fechaActual.getFullYear())
        this.fetchTurnosSelectDay({ fecha: fechaActual });
    }

    async onClickDay(value, e){
        console.log(e)
        console.log(value)
        const selectFecha = new Date(value)
        const date =  selectFecha.getDate();
        const month = selectFecha.getMonth()+1;
        const year = selectFecha.getFullYear();
        this.setState({selectFecha: date+'-'+month+'-'+year});
        this.fetchTurnosSelectDay({fecha: date+'-'+month+'-'+year});
    }

    render(){
        return(
            <div className="consulta">
                <h3 className="actual-date">{'Fecha: '+this.state.fechaActual.getDate() + '-' + (this.state.fechaActual.getMonth() + 1) + '-' + this.state.fechaActual.getFullYear()}</h3>
                <Calendar onClickDay = {this.onClickDay}></Calendar>
                <h3 className="actual-date">{'Fecha mostrada: '+ this.state.selectFecha}</h3>
                <Listado turnosEnPantalla={this.state.turnosEnPantalla}></Listado>
            </div>
        )
    }
}

export default Consulta;