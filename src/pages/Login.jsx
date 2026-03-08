import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';



const Login = () => {

    const { login } = useContext(AuthContext);

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();

    const handleFunction = async () => {

        try {
            const response = await api.post("/auth/login",
                {
                    email,
                    password
                }
            );

            login(response.data.token);
            navigate("/dashboard");

            console.log(response.data)

        } catch (error) {
            console.log(error)
        }
    };

    return (
        <div >
            <h1 style={{ color: 'black', textAlign: 'center' }}>Login</h1>

            <div style={{display: 'flex', justifyContent: 'center'}}>
                <div style={{
                    border: '2px solid black', height: '8rem', width: '20rem',
                    textAlign: 'center', padding: '4rem', backgroundColor: 'GrayText'
                }}>
                    Email:
                    <input
                        type="email"
                        placeholder='Enter email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='bg'
                    />

                    <br /><br />

                    Password:
                    <input
                        type="password"
                        placeholder='Enter password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <br /><br />
                    <button style={{backgroundColor: 'blueviolet', padding: '5px 10px', color: 'whitesmoke'}} onClick={handleFunction}>Login</button>
                </div>
            </div>

        </div>
    )
}

export default Login

// ✅ 1️⃣ Why do we use value={email}?
// The source of truth for this input is React state.
// This is called Controlled Component
// Meaning:
// -> The input does NOT control itself
// -> React controls the value
// -> UI always matches the state
// So:
// -> User types → onChange runs → state updates
// -> State updates → component re-renders → value updated
// UI and state are always in sync.



// ✅ 2️⃣ What happens if we remove it?
// if you remove it, you can still type
// But now it becomes 🔥 Uncontrolled Component
// Meaning:
// Browser manages the input
// React does NOT control it
// You lose synchronization with state

// example
// If you later try to reset form:
// setEmail("")
// The input will NOT clear.
// Because React is no longer controlling it.
// This is why engineers use controlled components.


// ✅ 3️⃣ Why useState instead of normal variable?
// example
// let count = 0;
// count = count + 1;
// React does NOT re-render.
// Why?
// Because React only re-renders when:
// -> State changes
// -> Props change
// Normal variables do not trigger re-render.
// But when we do:
// setCount(count + 1);
// React:
// -> Updates internal state
// -> Triggers re-render
// -> Updates UI
// That’s the real reason.