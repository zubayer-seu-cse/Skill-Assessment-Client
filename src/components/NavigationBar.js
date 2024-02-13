import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export const NavigationBar = () => {
    const navigate = useNavigate()
    const [visibile, setVisible] = useState(false)
    const logout = () => {
        localStorage.removeItem("seu-student-registration")
        navigate("/login")
    }
    return (
        <>
            <div className='flex justify-between px-8 h-[50px] items-center font-bold'>
                <div className='text-[20px]'>
                    <Link to={"/"}>SEU Course Registration</Link>
                </div>
                <div onClick={() => setVisible(!visibile)}>
                    <img src="/seu-hamburger-menu.svg" className='lg:hidden w-[30px]' alt="" />
                </div>
                <div className='hidden lg:flex'>
                    <div className='mr-4'>
                        <Link to={"/course-registration"}>Register Course</Link>
                    </div>
                    <div className='mr-4'>
                        <Link to={"/create-course"}>Create Course</Link>
                    </div>
                    <div className='mr-4'>
                        <Link to={"/create-student"}>Create Student</Link>
                    </div>
                    <div className='mr-4'>
                        <button onClick={logout}>Logout</button>
                    </div>
                </div>
            </div>

            <div style={visibile ? { display: "flex" } : { display: "none" }} className='flex-col px-8 mb-8 items-center font-bold'>
                <div className='w-full text-center px-8 border-b-2 pb-1 border-black'>
                    <Link to={"/course-registration"}>Register Course</Link>
                </div>
                <div className='w-full text-center px-8 border-b-2 pb-1 border-black'>
                    <Link to={"/create-course"}>Create Course</Link>
                </div>
                <div className='w-full text-center px-8 border-b-2 pb-1 border-black'>
                    <Link to={"/create-student"}>Create Student</Link>
                </div>
                <div className='w-full text-center px-8 border-b-2 pb-1 border-black'>
                    <button onClick={logout}>Logout</button>
                </div>
            </div>
        </>
    )
}
