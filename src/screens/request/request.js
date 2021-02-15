import React from 'react';
import Form from './components/form/form.js';
import { fetchTurnos } from '../../apis/fetchTurnos.js';
import { postTurn } from '../../apis/postTurn.js';
import { fetchTurnosSelectDay } from '../../apis/fetchTurnosSelectDay.js';
import './request.css';
import logo from '../../assets/Logo Jotas (2).png';

class Request extends React.Component{
    constructor(){
        super();
        this.state={
            fecha: '',
            day: null,
            date: 0,
            month: 0,
            year: 0,
            time: 0 ,
            work: '----',
            petName:'' ,
            customerName:'' ,
            dni:0,
            phoneNumber: 0,
            customerAdress:'' ,
            customerEmail:'',
            turnosActuales: [],
            turnosHoy: [],
            selectDayTurns: [],
            disableDays: []
        }

        this.handleSend = this.handleSend.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onClickDay = this.onClickDay.bind(this);
    }

    //Función que obtiene los turnos de la DB y lo coloca en el state del componente
    getTurnos = async () => {
        const res = await fetchTurnos();
        this.setState({turnosActuales: res.data});
    }

    //Función que coloca en el state del componente los turnos que hay en la fecha real de la ejecución de este (De forma automática);
    getTurnosHoy = async (actuallyDate) => {
        await fetchTurnosSelectDay(actuallyDate)
    }

    //Función que obtiene los turnos de la DB filtrados a gusto. pasando por parametros un objeto con datos a tener en cuenta para el filtrado de los turnos. EJEMPLO: {fecha: "15-11-2020"} o {day: 4, petName: "Nami"}
    fetchTurnosSelectDay = async (data) =>{
        const res = await fetchTurnosSelectDay(data)
        await this.setState({selectDayTurns: res.data});
    }

    //Función que se ejecuta apenas se carga la aplicación. suele tener otras funciones dentro.
    async componentDidMount() {
        await this.fetchTurnos2Semanas()    ;
    }

    fetchTurnos2Semanas = async () => {
        let arrayTurnsToDisable = [];
        let fecha = new Date().getTime() + 86400000;
        let fechaString = this.ensambladorFechaMilisegundos(fecha)

        for(let i = 0; i < 14; i++){
            await this.fetchTurnosSelectDay({ fecha: fechaString })
            if(this.state.selectDayTurns.length >= 6){
                arrayTurnsToDisable.push(fechaString);
            } 
            fecha = fecha + 86400000;
            fechaString = this.ensambladorFechaMilisegundos(fecha);
            }
            this.setState({disableDays: arrayTurnsToDisable});
    }

    ensambladorFechaMilisegundos = (date) =>{
        let fecha = new Date(date);
        return fecha.getDate() + '-' + (fecha.getMonth() + 1) + '-' + fecha.getFullYear();
    }

    //Función que captura los cambios ocurridos en los campos del Form y los guarda en el state
    handleChange(e){
        let {name, value} = e.target;
        this.setState({[name]: value.toUpperCase()})
    }

    //Función que captura los cambios ocurridos en el calendar y los guarda en el state. day, date, month, year. También guarda en el state los turnos del día seleccionado en el calendar.
    async onClickDay(value, e){
        let selectFecha = new Date(value)
        let day = selectFecha.getDay();
        let date =  selectFecha.getDate();
        let month = selectFecha.getMonth()+1;
        let year = selectFecha.getFullYear();
                
        this.setState({day:day})
        this.setState({date:date})
        this.setState({month:month})
        this.setState({year:year})
        this.setState({fecha: date+'-'+month+'-'+year})
    }

    //Función que hace un método post a la Api y postea un nuevo turno.
    postTurn = async (data) => {
        await postTurn(data);
    }

    verificadorTurnoRepetido(turns, actuallyTurn){
        let repeat = false;

        turns.forEach(turn =>{
            if(turn.customerName === actuallyTurn.customerName && turn.petName === actuallyTurn.petName && turn.dni.toString() === actuallyTurn.dni){
                repeat = true;
            }
        });

        return repeat;
    }

    //Función que toma la data que se va a enviar con el post del turno. Valida las condiciones para que se envíe el turno e invoca al método postTurn una vez pasada las validaciones.
    handleSend = async (e) => {
        e.preventDefault()
        const { fecha, day, date, month, year, time, work, petName , customerName, dni, phoneNumber, customerAdress, customerEmail } = this.state;
        const data = {
            fecha: fecha,
            day: day,
            date: date,
            month: month,
            year: year,
            time: time,
            work: work,
            petName: petName,
            customerName: customerName,
            dni: dni,
            phoneNumber: phoneNumber,
            customerAdress: customerAdress,
            customerEmail: customerEmail
        }

        await this.fetchTurnosSelectDay({fecha: date+'-'+month+'-'+year});
        
        console.log(this.verificadorTurnoRepetido(this.state.selectDayTurns, {customerName, petName, dni}));

        if(fecha === '' ||  work === '----' || petName === '' || customerName === '' || customerAdress === '' || customerEmail === ''){
            alert('Debe Completar todos los campos.');
        }else if(day === null || date === 0 || month === 0 || year === 0 || phoneNumber === 0 || dni === 0){
            alert('Debe Completar todos los campos.');
        }else if(day === 0){
            alert('No hay turnos disponibles los días domingo y feriados.')
        }else if(this.state.selectDayTurns.length >= 6){
            alert('Ya no hay turnos disponibles el día seleccionado');
        }else if(this.verificadorTurnoRepetido(this.state.selectDayTurns, {customerName, petName, dni})){
            alert('Ya tiene turnos para el día seleccionado.')
        }else{
            await this.postTurn(data);
            await this.getTurnos();
            alert('Turno confirmado con éxito.');
        }
    }
    
    render(){
        return(
            <div className="request">
                <div className="logoAndPresentation-section">
                    <img alt="Logo Jotas Pet" src={logo} className="logo"/>
                    <div className="text-container">
                        <h1 className="title">
                            Bienvenido!!
                        </h1>
                        <p className="parrafo">
                            Completa el siguiente formulario para tomar turno de peluquería.<br/><br/>La disponibilidad es de Lunes a Sábados.</p>
                            <h3>
                                Contáctanos:
                            </h3>
                            <ul>
                                <li>Whatsapp</li>
                                <li>Instagram</li>
                                <li>Facebook</li>
                            </ul>
                    </div>
                </div>
                <div className="form-section">
                    <Form handleSend = {this.handleSend} handleChange={this.handleChange} onClickDay= {this.onClickDay} daysToDisable={this.state.disableDays}></Form>
                </div>
            </div>    
        )
    }
}

export default Request;