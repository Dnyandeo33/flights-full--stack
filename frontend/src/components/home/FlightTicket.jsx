import axios from 'axios';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { flightData } from '../../App';
import useGetUserId from '../../hooks/useGetUserId';

const FlightTicket = () => {
    const { filterFlight } = useContext(flightData);
    const id = useGetUserId();
    const navigate = useNavigate();

    const bookTicket = async (_id) => {
        navigate('/my-booking');
        try {
            await axios.put(`http://localhost:3000/my-booking`, {
                _id,
                id
            });
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <>
            {filterFlight.map((flights) => {
                const {
                    _id,
                    departure_time,
                    airline,
                    flight_number,
                    departure_city,
                    departure_airport,
                    arrival_city,
                    arrival_time,
                    arrival_airport,
                    price
                } = flights;
                return (
                    <div
                        key={_id}
                        className=" container mx-auto w-full h-80 border-2 border-gray-400 m-2 mb-5 shadow-md shadow-black rounded-2xl"
                    >
                        <h1 className="px-5 bg-gray-200 rounded-t-2xl p-3 uppercase font-semibold">
                            Departure:
                            <span className="font-normal">
                                {departure_time}
                            </span>
                        </h1>
                        <h3 className="mt-3 mx-5 p-2 bg-slate-400 rounded-lg inline-block text-center">
                            Economy
                        </h3>
                        <div className="flex flex-row justify-between px-5 py-5">
                            <div>
                                <ul className="flex flex-col">
                                    <li className="font-semibold text-xl">
                                        {airline}
                                    </li>
                                    <li className="text-gray-400">
                                        Flight No: {flight_number}
                                    </li>
                                    <li className="text-gray-400">
                                        Wight: 23kg
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <ul className="flex flex-col">
                                    <li className="font-semibold text-xl">
                                        {departure_time}
                                    </li>
                                    <li className="text-gray-400">
                                        {departure_city}
                                    </li>
                                    <li className="text-gray-400">
                                        {departure_airport}
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <ul className="flex flex-col">
                                    <li className="font-semibold text-xl">
                                        {arrival_time}
                                    </li>
                                    <li className="text-gray-400">
                                        {arrival_city}
                                    </li>
                                    <li className="text-gray-400">
                                        {arrival_airport}
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="flex flex-row justify-between bg-gray-100  rounded-b-2xl px-5 py-4 ">
                            <div className="flex flex-row justify-between gap-8">
                                <ul className="flex flex-col">
                                    <li className="text-gray-400">
                                        Standard Ticket
                                    </li>
                                    <li className="font-semibold">${price}</li>
                                    <li className="text-gray-400">
                                        price per adult
                                    </li>
                                </ul>
                                <button
                                    onClick={() => bookTicket(_id)}
                                    className=" bg-blue-400 w-40 rounded-lg text-lg font-semibold"
                                >
                                    Book
                                </button>
                            </div>
                            <div className="flex flex-row justify-between gap-8">
                                <ul className="flex flex-col">
                                    <li className="text-gray-400">
                                        Flexible Ticket
                                    </li>
                                    <li className="font-semibold">$600</li>
                                    <li className="text-gray-400">
                                        price per adult
                                    </li>
                                </ul>
                                <button className=" bg-blue-400 w-40 rounded-lg text-lg font-semibold">
                                    Book
                                </button>
                            </div>
                        </div>
                    </div>
                );
            })}
        </>
    );
};

export default FlightTicket;
