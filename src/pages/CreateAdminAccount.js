import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { NavigationBar } from '../components/NavigationBar';

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

        axios.post("https://seu-course-registration.onrender.com/create-admin-account", { verification_key, name, username, email, password })
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
        <>
            <NavigationBar />
            <div>
                <p className='font-bold text-center text-[18px] mt-4'>Create Admin Account!</p>
            </div>
            <div className='flex justify-center mt-8'>
                <form onSubmit={login} className='flex flex-col w-full px-4 lg:w-[500px]'>
                    <div>
                        <label className='text-[13px] font-bold'>Verification Key</label>
                        <input name='verification_key' type='text' className='w-full mb-2 border-2 rounded' ></input>
                    </div>
                    <div>
                        <label className='text-[13px] font-bold'>Name</label>
                        <input name='name' type='text' className='w-full mb-2 border-2 rounded' ></input>
                    </div>
                    <div>
                        <label className='text-[13px] font-bold'>Username</label>
                        <input name='username' type='text' className='w-full mb-2 border-2 rounded' ></input>
                    </div>
                    <div>
                        <label className='text-[13px] font-bold'>Email</label>
                        <input name='email' type='text' className='w-full mb-2 border-2 rounded' ></input>
                    </div>
                    <div>
                        <label className='text-[13px] font-bold'>Password</label>
                        <input name='password' type='password' className='w-full mb-2 border-2 rounded' ></input>
                    </div>
                    <input type='submit' value={"Create Account"} className='p-2 px-4 bg-green-500 rounded-md mt-2 text-white font-bold' ></input>
                    <p>{err}</p>
                </form>
            </div>
            <div className='text-center font-bold mt-2'>
                <Link to={"/login"}>
                    Already have an account? <span className='text-blue-500'>Login</span>
                </Link>
            </div>
        </>
    )
}
