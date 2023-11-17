/* eslint-disable react/no-unescaped-entities */
import axios from 'axios';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { Link, useNavigate } from 'react-router-dom';
import validateEmail from '../../utils/validateEmail';
import validatePassword from '../../utils/validatePassword';

const SignIn = () => {
    const [_, setCookies] = useCookies(['access_token']);
    const navigate = useNavigate();

    // user login state
    const [userSignIn, setUserSignIn] = useState({
        email: '',
        password: ''
    });
    // error handle state
    const [formError, setFormError] = useState({
        email: '',
        password: ''
    });

    const [response, setResponse] = useState({});

    // handel error
    const [error, setError] = useState({});

    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUserSignIn({ ...userSignIn, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let inputError = {
            email: '',
            password: ''
        };

        if (!userSignIn.email && !userSignIn.password) {
            setFormError({
                ...inputError,
                email: 'Enter valid email address',
                password: `Password shouldn't be empty`
            });
            return;
        }
        if (!userSignIn.email) {
            setFormError({
                ...inputError,
                email: 'Enter valid email address'
            });
            return;
        }
        if (!userSignIn.password) {
            setFormError({
                ...inputError,
                password: `Password shouldn't be empty`
            });
            return;
        }

        setFormError(inputError);
        setFormError((prevState) => ({
            ...prevState,
            successMsg: `Registration successful, Please login!`
        }));

        const { email, password } = userSignIn;

        const isValidEmail = validateEmail(email);
        const isValidPassword = validatePassword(password);

        if (isValidEmail && isValidPassword) {
            const userSignIn = {
                email,
                password
            };

            // user login function
            const postLogin = async () => {
                try {
                    const res = await axios.post(
                        'http://localhost:3000/sign-in',
                        userSignIn,
                        { withCredentials: true }
                    );
                    if (res.status === 200) {
                        setResponse(res.data);
                        setCookies('token', res.data.token);
                        window.localStorage.setItem('id', res.data.id);
                        navigate('/');
                    }
                } catch (error) {
                    setError(error);
                }
            };
            postLogin();
            setUserSignIn({
                email: '',
                password: ''
            });
        } else {
            setError('email or password is not correct');
        }
    };

    return (
        <section className="m-8 border-2 border-gray-300 rounded-lg shadow-2xl p-8 container mx-auto w-[35rem] h-[35rem]">
            <h1 className="text-4xl text-gray-500 font-normal pt-5 pb-5">
                Sign In
            </h1>
            <p className="font-semibold text-gray-500 text-lg pb-5">
                Please enter your Travel ID (email address).
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                <div className="flex text-gray-500 flex-col pb-3">
                    <label htmlFor="email" className="text-xl pb-2">
                        Email
                    </label>
                    <input
                        autoComplete="off"
                        id="email"
                        name="email"
                        value={userSignIn.email}
                        onChange={handleInput}
                        type="email"
                        className=" h-12 text-xl p-2 border-b-2 border-r border-gray-400"
                    />
                </div>
                <p className="text-red-400 text-sm">{formError.email}</p>
                <div className="flex text-gray-500 flex-col pb-2">
                    <label htmlFor="password" className="text-xl pb-2">
                        Password
                    </label>
                    <input
                        autoComplete="off"
                        id="password"
                        name="password"
                        value={userSignIn.password}
                        onChange={handleInput}
                        type="password"
                        className=" h-12 text-xl p-2 border-b-2 border-r border-gray-400"
                    />
                </div>
                <p className="text-red-400 text-sm">{formError.password}</p>
                <p className=" text-green-600 text-sm">{response.message}</p>
                <button className=" bg-orange-400 text-xl rounded-xl font-normal h-14 w-full">
                    SignIn
                </button>
            </form>
            <p className="pt-3">
                If you don't have account sign up now for Travel ID.
            </p>
            <p>
                <Link
                    to="/sign-up"
                    className="font-semibold text-lg text-blue-700"
                >
                    Sign Up for Travel ID
                </Link>
            </p>
        </section>
    );
};

export default SignIn;
