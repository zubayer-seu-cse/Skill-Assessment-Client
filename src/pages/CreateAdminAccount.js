import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export const CreateAdminAccount = () => {
    const navigate = useNavigate()
    const [err, setErr] = useState("");

    const login = (e) => {
        e.preventDefault()

        const verification_key = e.target.verification_key.value
        const name = e.target.name.value
        const username = e.target.username.value
        const email = e.target.email.value
        const password = e.target.password.value

        axios.post("http://localhost:8080/create-admin-account", { verification_key, name, username, email, password })
            .then(res => {
                if (res.data._id) {
                    localStorage.setItem("seu-student-registration", JSON.stringify(res.data))
                    navigate("/")
                } else {
                    alert("an error occured")
                }
            })
            .catch(err => setErr(err.message))
    }
    return (
        <div className='flex justify-center mt-8'>
            <form onSubmit={login} className='flex flex-col lg:w-[500px]'>
                <input name='verification_key' type='text' className='border-2 rounded' ></input>
                <input name='name' type='text' className='border-2 rounded' ></input>
                <input name='username' type='text' className='border-2 rounded' ></input>
                <input name='email' type='text' className='border-2 rounded' ></input>
                <input name='password' type='password' className='border-2 rounded' ></input>
                <input type='submit' value={"Login"} ></input>
                <p>{err}</p>
            </form>
        </div>
    )
}
