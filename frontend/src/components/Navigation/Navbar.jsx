import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className=" bg-blue-950 w-full h-32">
            <div className="container mx-auto flex flex-row justify-between">
                <div className="flex flex-row justify-center items-center">
                    <Link to="/">
                        <h1 className=" text-3xl font-bold text-white">
                            AirTravel
                        </h1>
                    </Link>
                </div>
                <div className="flex flex-col">
                    <div className="mt-5">
                        <ul className="flex flex-row justify-end gap-5">
                            <Link to="/sign-in">
                                <li className="text-lg cursor-pointer text-white">
                                    SignIn & SignUp
                                </li>
                            </Link>
                            <Link>
                                <li className=" text-lg cursor-pointer text-white">
                                    Helpline
                                </li>
                            </Link>
                        </ul>
                    </div>
                    <div className="mt-3">
                        <ul className="flex flex-row justify-between items-center gap-5">
                            <Link>
                                <li className="border-white rounded-md text-lg cursor-pointer text-white">
                                    Prepare for Travel
                                </li>
                            </Link>
                            <Link>
                                <li className=" text-lg cursor-pointer text-white ">
                                    My booking
                                </li>
                            </Link>
                            <Link>
                                <li className=" text-lg cursor-pointer  text-white ">
                                    Discover AirTravel
                                </li>
                            </Link>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
