import React, { useState } from 'react'
import { json, useNavigate } from 'react-router-dom'

export const Login = () => {
    const navigate = useNavigate()
    const [err, setErr] = useState("");
    
    const login = (e) =>{
        e.preventDefault()

        const username = e.target.username.value
        const password = e.target.password.value

        fetch("http://localhost:8080/login", {
            method: "POST",
            headers:{
                "content-type" : "application/json"
            },
            body: JSON.stringify({username, password})
        })
        .then(res => res.json())
        .then(data => {
            if(data._id != "N/A"){
                navigate("/")
            } else {
                setErr("Username or Password is incorrect!")
            }
        })
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
