/* eslint-disable react/no-unescaped-entities */
import { Link } from 'react-router-dom';

const SignUp = () => {
    return (
        <section className="m-12 border-2 border-gray-300 rounded-lg shadow-2xl p-8 container mx-auto w-[35rem] h-[42rem]">
            <h1 className="text-4xl text-gray-500 font-normal pt-5 pb-5">
                Sign Up
            </h1>
            <p className="font-semibold text-gray-500 text-lg pb-10">
                Please enter your Travel ID (email address).{' '}
            </p>
            <form action="" className="flex flex-col gap-5">
                <div className="flex text-gray-500 flex-col pb-3">
                    <label htmlFor="" className="text-xl pb-2">
                        Email
                    </label>
                    <input
                        type="email"
                        className=" h-12 text-xl p-2 border-b-2 border-r border-gray-400"
                    />
                </div>
                <div className="flex text-gray-500 flex-col pb-2">
                    <label htmlFor="" className="text-xl pb-2">
                        Password
                    </label>
                    <input
                        type="password"
                        className=" h-12 text-xl p-2 border-b-2 border-r border-gray-400"
                    />
                </div>
                <div className="flex text-gray-500 flex-col pb-2">
                    <label htmlFor="" className="text-xl pb-2">
                        Confirm password
                    </label>
                    <input
                        type="password"
                        className=" h-12 text-xl p-2 border-b-2 border-r border-gray-400"
                    />
                </div>
                <button className=" bg-orange-400 text-xl rounded-xl font-normal h-14 w-full">
                    SignUp
                </button>
            </form>
            <p className="pt-3">If you have account sign in.</p>
            <p>
                <Link
                    to="/sign-in"
                    className="font-semibold text-lg text-blue-700"
                >
                    Sign in for Travel ID
                </Link>
            </p>
        </section>
    );
};

export default SignUp;
