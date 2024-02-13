import axios from 'axios';
import React, { useState } from 'react'
import { json, useNavigate } from 'react-router-dom'

export const Login = () => {
    
    const navigate = useNavigate()
    const [err, setErr] = useState("");
    
    const login = (e) =>{
        e.preventDefault()

        const username = e.target.username.value
        const password = e.target.password.value

        axios.post("http://localhost:8080/login", {username, password})
        .then(res => res.data._id? navigate("/") : setErr("Username or Password is incorrect!"))
        .catch(err => setErr(err.message))
    }
    return (
        <div className='flex justify-center mt-8'>
            <form onSubmit={login} className='flex flex-col lg:w-[500px]'>
                <input name='username' type='text' className='border-2 rounded' ></input>
                <input name='password' type='password' className='border-2 rounded' ></input>
                <input type='submit' value={"Login"} ></input>
                <p>{err}</p>
            </form>
        </div>
    )
}
