const Home = () => {
    return (
        <section className=" relative bg-hero-pattern bg-center bg-cover  w-full h-[35rem]">
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
                    <form action="" className="flex flex-row gap-10">
                        <div className="flex flex-col gap-2 text-sm font-semibold">
                            <label htmlFor="" className="text-gray-500">
                                From
                            </label>
                            <input
                                className=" bg-transparent w-72 border-b-2 border-r-2 border-gray-400 h-10 p-3 text-lg text-gray-500"
                                type="text"
                            />
                        </div>
                        <div className="flex flex-col gap-2 text-sm font-semibold">
                            <label htmlFor="" className="text-gray-500">
                                To
                            </label>
                            <input
                                className=" bg-transparent w-72 border-b-2 border-r-2 border-gray-400 h-10 p-3 text-lg text-gray-500"
                                type="text"
                            />
                        </div>
                        <div className="flex flex-col gap-2 text-sm font-semibold">
                            <label htmlFor="" className="text-gray-500">
                                Departure
                            </label>
                            <input
                                className=" bg-transparent w-72 border-b-2 border-r-2 border-gray-400 h-10 p-3 text-lg text-gray-500"
                                type="text"
                            />
                        </div>

                        <button className=" bg-orange-400 text-lg rounded-xl font-semibold w-56">
                            Search Flight
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Home;
