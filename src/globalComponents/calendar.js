import React from 'react';
import ReactCalendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import itinerario from '../globalComponents/itinerario.js'

class Calendar extends React.Component{
    constructor(props){
        super(props);
        this.state={
            disableDays: props.disableDays
        }
    }

    render(){
        return(
            <div className="calendar">
                <ReactCalendar onClickDay = { this.props.onClickDay} maxDate = { this.props.maxDate } minDate = { this.props.minDate } tileDisabled = {({ activeStartDate, date, view }) => {
                    let fecha = String(date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear());
                    if(date.getDay() === 0){
                        return true
                    }else{
                        itinerario.push.apply(itinerario, this.props.disableDays)
                        return itinerario.includes(fecha);                      
                    }
                    }} />
            </div>
        )
    }
}

export default Calendar;