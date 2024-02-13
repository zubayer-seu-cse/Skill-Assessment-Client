import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export const NavigationBar = () => {
    const navigate = useNavigate()
    const [visibile, setVisible] = useState(false)
    const [loggedInUser, setLoggedInUser] = useState({});

    useEffect(() => {
        setLoggedInUser(JSON.parse(localStorage.getItem("seu-student-registration")))
    }, [])

    const logout = () => {
        const isConfirm = window.confirm("Are you sure?")
        if (isConfirm) {
            localStorage.removeItem("seu-student-registration")
            navigate("/login")
        }
    }
    return (
        <>
            <div className='p-2'>
                <div className='flex justify-between items-center px-8 h-[50px] font-bold rounded-md bg-[#0087BD] text-white'>
                    <div className='text-[20px]'>
                        <Link to={"/"}>SEU Course Registration</Link>
                    </div>
                    <div onClick={() => setVisible(!visibile)} style={loggedInUser?._id ? { display: "block" } : { display: "none" }}>
                        <img src="/seu-hamburger-menu.svg" className='lg:hidden w-[30px]' alt="" />
                    </div>
                    <div className='hidden lg:block' >
                        <div className='flex items-center' style={loggedInUser?._id ? { display: "flex" } : { display: "none" }} >
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
                                <button onClick={logout} className='text-black px-4 py-1 rounded-2xl bg-white' >Logout</button>
                            </div>
                        </div>
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
