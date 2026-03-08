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
            await api.post("/auth/register" , {
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
        <h1>Register</h1>

        <input
           type='text'
           placeholder='Enter name'
           value={name}
           onChange={(e) => setName(e.target.value)}
        />

        <br /><br />

        <input 
           type='email'
           placeholder='Enter email'
           value={email}
           onChange={(e) => setEmail(e.target.value)}
        />

        <br /><br />

        <input 
           type='password'
           placeholder='Enter password'
           value={password}
           onChange={(e) => setPassword(e.target.value)}
        />

        <br /><br />

        <button onClick={handleRegister}>Register</button>
    </div>
  )
}

export default Register