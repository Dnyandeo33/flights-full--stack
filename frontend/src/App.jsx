import { createContext } from 'react';
import { Route, Routes } from 'react-router-dom';

import './App.css';

import Navbar from './components/Navigation/Navbar';
import Home from './components/home/Home';
import SignIn from './components/user/SignIn';
import SignOut from './components/user/SignOut';
import SignUp from './components/user/SignUp';

export const flightData = createContext();

function App() {
    return (
        <flightData.Provider value={{}}>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/sign-out" element={<SignOut />} />
            </Routes>
        </flightData.Provider>
    );
}

export default App;
