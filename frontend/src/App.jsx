import axios from 'axios';
import { createContext, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import useGetUserId from './hooks/useGetUserId';

import './App.css';

import Navbar from './components/Navigation/Navbar';
import FlightTicket from './components/home/FlightTicket';
import Home from './components/home/Home';
import MyBooking from './components/home/MyBooking';
import SignIn from './components/user/SignIn';
import SignOut from './components/user/SignOut';
import SignUp from './components/user/SignUp';

export const flightData = createContext();

function App() {
    const id = useGetUserId();
    const [flightDetails, setFlightDetails] = useState([]);
    const [filterFlight, setFilterFlight] = useState([]);
    const [bookedFlight, setBookedFlight] = useState([]);
    console.log(bookedFlight);

    const [input, setInput] = useState({
        departure_city: '',
        arrival_city: '',
        departure_time: ''
    });

    useEffect(() => {
        const getFlightDetails = async () => {
            const response = await axios.get('http://localhost:3000/');
            setFlightDetails(response.data.Flights);
        };

        const getBookedFlightDetails = async () => {
            const response = await axios.get(
                `http://localhost:3000/my-booking/${id}`
            );
            setBookedFlight(response.data.myBooking);
        };
        getBookedFlightDetails();
        getFlightDetails();
    }, []);

    return (
        <flightData.Provider
            value={{
                flightDetails,
                input,
                setInput,
                filterFlight,
                setFilterFlight,
                bookedFlight
            }}
        >
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/flight-tickets" element={<FlightTicket />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/my-booking" element={<MyBooking />} />
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/sign-out" element={<SignOut />} />
            </Routes>
        </flightData.Provider>
    );
}

export default App;
