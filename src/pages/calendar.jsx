import React, { useState, useEffect } from 'react';
import Hourslider from '../components/hourslider';
import Cookies from 'js-cookie';
import Homebutton from '../components/homebutton';

function Calendars() {



    const today = new Date();
    const currentMonth = today.getMonth(); // 0-11 indexed
    const currentYear = today.getFullYear();
    let appointmentDate
    let cookie = Cookies.get(appointmentDate)

    let hour

    let day

    if (hour) {
        hour = cookie.hour.split('"')
        day = cookie.appoitmentDate + " " + hour[3]
    }

    console.log(day)
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    let firstDay = new Date(currentYear, currentMonth, 1).getDay();

    if (firstDay === 0) {
        firstDay = 7;
    }

    const firstDate = new Date().getDate();
    const previousDays = [];
    const afterDays = [];

    for (let i = firstDate; i >= 0; i--) {
        previousDays.push(i)
    }

    for (let i = 1; i < 31; i++) {
        afterDays.push(i)

    }

    const [Month, setMonth] = useState(currentMonth); // State initialized to current month index
    const [days, setDays] = useState(''); // State to track the selected day
    const [isDisabled, setIsDisabled] = useState(false);

    useEffect(() => {
        if (monthNames[Month] === "January") {
            setIsDisabled(true);
        } else {
            setIsDisabled(false);
        }
    }, [Month]); // Dependency array to trigger when `Month` changes


    const onClickIncrementMonth = () => {

        let newMonth = (Month + 1) % 12; // Increment month and wrap around after December
        setMonth(newMonth); // Update state

    };

    const onClickDecreaseMonth = () => {

        let newMonth = (Month - 1) % 12; // Increment month and wrap around after December
        setMonth(newMonth); // Update state

    };


    const generateDays = (month) => {
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        const firstDay = new Date(currentYear, month, 1).getDay() || 7;
        const rows = [];
        let currentDay = 0;
        let week = Array(firstDay - 1).fill(null);

        while (currentDay <= daysInMonth) {
            week.push(currentDay);
            if (week.length === 7) {
                rows.push(week);
                week = [];
            }
            currentDay++;
        }

        if (week.length > 0) {
            rows.push(week);
        }
        return rows;


    };

    const rows = generateDays(Month);


    const generateAppointment = async (day, month, year) => {
        const expirationDate = new Date();
        expirationDate.setTime(expirationDate.getTime() + (10 * 60 * 1000));
        const appointmentDate = month + " " + day + " " + year;
        Cookies.set('appoitmentDate', appointmentDate, { expires: expirationDate });
        setDays(appointmentDate); // Update state with the selected date

        return appointmentDate

    }




    return (
        <>
            <Homebutton />
            <table id="calendar" bgcolor="lightgrey" align="center"
                cellSpacing="21" cellPadding="21">
                <caption id="table-caption" align="top">
                    <button onClick={onClickDecreaseMonth} disabled={isDisabled} >previous month</button>
                    {monthNames[Month] + " " + currentYear}
                    <button onClick={onClickIncrementMonth} >next month</button>
                </caption>
                <thead>
                    <tr>
                        <th>Sun</th>
                        <th>Mon</th>
                        <th>Tue</th>
                        <th>Wed</th>
                        <th>Thu</th>
                        <th>Fri</th>
                        <th>Sat</th>
                    </tr>
                </thead>
                <tbody>
                    <tr></tr>
                    {rows.map((week, index) => (
                        <tr key={index}>
                            {week.map((day, idx) => (
                                <td key={idx} id={day} onClick={() => generateAppointment(day, monthNames[Month], currentYear)} ><a href="#" id="days">
                                    {day || '\u00A0'}</a>
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <button id="next"><a href="http://localhost:5173/services">Next</a></button>
            <Hourslider id="hourslider" />
            <p id="scheduled-day">Appointment Date: {days || 'No date selected'}</p>        </>

    )
}


export default Calendars