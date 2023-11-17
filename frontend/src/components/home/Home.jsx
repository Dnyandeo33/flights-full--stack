import axios from 'axios';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { flightData } from '../../App';

const Home = () => {
    const { input, setInput, setFilterFlight } = useContext(flightData);
    const navigate = useNavigate();

    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInput({ ...input, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const getFlightInput = async () => {
            try {
                const { departure_city, arrival_city, departure_time } = input;
                const res = await axios.get(
                    `http://localhost:3000/?departure_city=${departure_city}&arrival_city=${arrival_city}&departure_time${departure_time}`,
                    {
                        withCredentials: true
                    }
                );
                setFilterFlight(res.data.Flights);
                if (res.status === 200) {
                    navigate('/flight-tickets');
                }
            } catch (error) {
                console.log(error);
            }
        };
        getFlightInput();
        setInput({
            departure_city: '',
            arrival_city: '',
            departure_time: ''
        });
        //}
    };
    return (
        <section>
            <div className="w-full h-[46rem]">
                <div className="relative bg-hero-pattern bg-center bg-cover w-full h-[36rem] ">
                    <div className=" absolute container mx-auto left-[9rem] top-[28rem] border-2 border-gray-300 shadow-2xl rounded-xl  bg-gray-100 w-[82%] h-[16rem]">
                        <div>
                            <div className="pl-10 h-20 flex flex-row items-center border-b-2 border-gray-300">
                                <ul className="flex flex-row gap-10">
                                    <li className=" cursor-pointer text-gray-400 hover:text-gray-700 ">
                                        Flights
                                    </li>
                                    <li className=" cursor-pointer text-gray-400 hover:text-gray-700  ">
                                        Rental Car
                                    </li>
                                    <li className=" cursor-pointer text-gray-400 hover:text-gray-700  ">
                                        Hotel
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="pl-10 mt-16">
                            <form
                                onSubmit={handleSubmit}
                                className="flex flex-row gap-10"
                            >
                                <div className="flex flex-col gap-2 text-sm font-semibold">
                                    <label
                                        htmlFor="departure_city"
                                        className="text-gray-500"
                                    >
                                        From
                                    </label>
                                    <input
                                        className=" bg-transparent w-72 border-b-2 border-r-2 border-gray-400 h-10 p-3 text-lg text-gray-500"
                                        type="text"
                                        autoComplete="off"
                                        id="departure_city"
                                        name="departure_city"
                                        placeholder="Departure city"
                                        value={input.departure_city}
                                        onChange={handleInput}
                                    />
                                </div>

                                <div className="flex flex-col gap-2 text-sm font-semibold">
                                    <label
                                        htmlFor="arrival_city"
                                        className="text-gray-500"
                                    >
                                        To
                                    </label>
                                    <input
                                        className=" bg-transparent w-72 border-b-2 border-r-2 border-gray-400 h-10 p-3 text-lg text-gray-500"
                                        type="text"
                                        autoComplete="off"
                                        id="arrival_city"
                                        name="arrival_city"
                                        placeholder="Arrival city"
                                        value={input.arrival_city}
                                        onChange={handleInput}
                                    />
                                </div>

                                <div className="flex flex-col gap-2 text-sm font-semibold">
                                    <label
                                        htmlFor="departure_time"
                                        className="text-gray-500"
                                    >
                                        Departure Date
                                    </label>
                                    <input
                                        className=" bg-transparent w-72 border-b-2 border-r-2 border-gray-400 h-10 p-3 text-lg text-gray-500"
                                        type="date"
                                        id="departure_time"
                                        name="departure_time"
                                        value={input.departure_time}
                                        onChange={handleInput}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className=" bg-orange-400 text-lg rounded-xl font-semibold w-56"
                                >
                                    Search Flight
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Home;
