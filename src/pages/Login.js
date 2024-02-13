import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, json, useNavigate } from 'react-router-dom'

export const Login = () => {

    const navigate = useNavigate()
    const [err, setErr] = useState("");

    useEffect(() => {
        const loggedInUser = JSON.parse(localStorage.getItem("seu-student-registration"))
        if (loggedInUser?._id) {
            navigate("/")
        }
    }, [])

    const login = (e) => {
        e.preventDefault()

        const username = e.target.username.value
        const password = e.target.password.value

        axios.post("http://localhost:8080/login", { username, password })
            .then(res => {
                if (res.data?._id) {
                    localStorage.setItem("seu-student-registration", JSON.stringify(res.data))
                    navigate("/")
                } else {
                    setErr("Username or Password is incorrect!")
                }
            })
            .catch(err => setErr(err.message))
    }
    return (
        <>
            <div>
                <p className='font-bold text-center text-[18px] mt-4'>Login!</p>
            </div>
            <div className='flex justify-center mt-4'>
                <form onSubmit={login} className='flex flex-col w-full px-4 lg:w-[500px]'>
                    <div>
                        <label className='text-[13px] font-bold'>Username</label>
                        <input name='username' type='text' className='w-full border-2 rounded' ></input>
                    </div>
                    <div>
                        <label className='text-[13px] font-bold'>Password</label>
                        <input name='password' type='password' className='w-full border-2 rounded' ></input>
                    </div>

                    <input type='submit' value={"Login"} className='p-2 px-4 bg-green-500 rounded-md mt-2 text-white font-bold' ></input>
                    <p>{err}</p>
                </form>
            </div>
            <div className='text-center font-bold mt-2'>
                <Link to={"/create-admin-account"}>
                    Don't have an account? <span className='text-blue-500'>Register</span>
                </Link>
            </div>
        </>
    )
}
