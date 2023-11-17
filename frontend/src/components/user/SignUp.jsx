/* eslint-disable react/no-unescaped-entities */
import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import validateEmail from '../../utils/validateEmail';
import validatePassword from '../../utils/validatePassword';
import verifyPassword from '../../utils/verifyPassword';

('use client');

const SignUp = () => {
    const navigate = useNavigate();

    // registration state
    const [userSignUp, setUserSignUp] = useState({
        email: '',
        password: '',
        rePassword: ''
    });

    // form error state
    const [formError, setFormError] = useState({
        email: '',
        password: '',
        rePassword: ''
    });

    // handle server response state
    const [response, setResponse] = useState({});

    // handle input
    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUserSignUp({ ...userSignUp, [name]: value });
    };

    // handle submit and validation
    const handleSubmit = (e) => {
        e.preventDefault();
        let inputError = {
            email: '',
            password: '',
            rePassword: ''
        };

        if (
            !userSignUp.email &&
            !userSignUp.password &&
            !userSignUp.rePassword
        ) {
            setFormError({
                ...inputError,
                email: 'Enter valid email address',
                password: `Password shouldn't be empty`
            });
            return;
        }
        if (!userSignUp.email) {
            setFormError({
                ...inputError,
                email: 'Enter valid email address'
            });
            return;
        }
        if (!userSignUp.password) {
            setFormError({
                ...inputError,
                password: `Password shouldn't be empty`
            });
            return;
        }
        if (!userSignUp.password !== !userSignUp.rePassword) {
            setFormError({
                ...inputError,
                rePassword: `Password & confirm password should be same`
            });
            return;
        }

        setFormError(inputError);
        setFormError((prevState) => ({
            ...prevState,
            successMsg: `Registration successful, Please login!`
        }));

        const { email, password, rePassword } = userSignUp;

        const isValidEmail = validateEmail(email);
        const isValidPassword = validatePassword(password);
        const isVerifyPassword = verifyPassword(password, rePassword);

        if (isValidEmail && isValidPassword && isVerifyPassword) {
            const newUser = { email, password, rePassword };

            const postRegister = async () => {
                try {
                    const res = await axios.post(
                        'http://localhost:3000/sign-up',
                        newUser
                    );
                    setResponse(res.data);
                    navigate('/sign-in');
                } catch (error) {
                    console.log(error);
                }
            };
            postRegister();
            setUserSignUp({
                email: '',
                password: '',
                rePassword: ''
            });
        } else {
            setError('Email or password is not correct');
        }
    };

    return (
        <section className="m-5 border-2 border-gray-300 rounded-lg shadow-2xl p-8 container mx-auto w-[35rem] h-[46rem]">
            <h1 className="text-4xl text-gray-500 font-normal pt-5 pb-5">
                Sign Up
            </h1>
            <p className="font-semibold text-gray-500 text-lg pb-8">
                Please enter your Travel ID (email address).{' '}
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                <div className="flex text-gray-500 flex-col pb-2">
                    <label htmlFor="email" className="text-xl pb-2">
                        Email
                    </label>
                    <input
                        autoComplete="off"
                        id="email"
                        name="email"
                        value={userSignUp.email}
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
                        value={userSignUp.password}
                        onChange={handleInput}
                        type="password"
                        className=" h-12 text-xl p-2 border-b-2 border-r border-gray-400"
                    />
                </div>
                <p className="text-red-400 text-sm">{formError.password}</p>
                <div className="flex text-gray-500 flex-col pb-2">
                    <label htmlFor="rePassword" className="text-xl pb-2">
                        Confirm password
                    </label>
                    <input
                        autoComplete="off"
                        id="rePassword"
                        name="rePassword"
                        value={userSignUp.rePassword}
                        onChange={handleInput}
                        type="password"
                        className=" h-12 text-xl p-2 border-b-2 border-r border-gray-400"
                    />
                </div>
                <p className="text-red-400 text-sm">{formError.rePassword}</p>
                <p className=" text-green-600 text-sm">{response.message}</p>
                <button
                    type="submit"
                    className=" bg-orange-400 text-xl rounded-xl font-normal h-14 w-full"
                >
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
