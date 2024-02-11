import React from 'react'
import { Link } from 'react-router-dom'

export const NavigationBar = () => {
    return (
        <div className='flex justify-between px-8 h-[50px] items-center font-bold'>
            <div className='text-[20px]'>
                <Link to={"/"}>Course Registration DashBorad</Link>
            </div>
            <div className='flex'>
                <div className='mr-4'>
                    <Link to={"/course-registration"}>Register Course</Link>
                </div>
                <div className='mr-4'>
                    <Link to={"/create-course"}>Create Course</Link>
                </div>
                <div className='mr-4'>
                    <Link to={"/create-student"}>Create Student</Link>
                </div>
            </div>
        </div>
    )
}
