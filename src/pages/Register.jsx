import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { toast } from 'react-toastify';

const Register = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            await api.post("/auth/register", {
                name,
                email,
                password
            });

            // toast.apply("Registration Successfull");
            alert("Registration Successfull");
            navigate("/login")
        } catch (error) {
            console.log(error);
            // toast.error("Registration failed");
            alert("Registration failed");
        }
    };

    return (
        <div>
            <h1 style={{textAlign:'center', color: 'black'}}>Register</h1>

            <div style={{display: 'flex', justifyContent: 'center'}}>
                <div style={{
                    border: '2px solid black', padding: '2rem', width: '100%',
                    textAlign: 'center', width: '20rem', height: '10rem', alignItems: 'center',
                    backgroundColor: 'GrayText'
                }}>
                    Name :
                    <input
                        type='text'
                        placeholder='Enter name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <br /><br />
                    Email:
                    <input
                        type='email'
                        placeholder='Enter email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <br /><br />
                    Password:
                    <input
                        type='password'
                        placeholder='Enter password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <br /><br />

                    <button style={{backgroundColor: 'blue', color: "whitesmoke", padding: "6px 15px"}} onClick={handleRegister}>Register</button>
                </div>
            </div>
        </div>
    )
}

export default Register