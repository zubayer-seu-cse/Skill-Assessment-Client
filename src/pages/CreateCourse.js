import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { NavigationBar } from '../components/NavigationBar';

export const CreateCourse = () => {
    const navigate = useNavigate();
    const [err, setErr] = useState("");

    const createCourse = async (e) => {
        e.preventDefault();

        const courseCode = e.target.courseCode.value;
        const courseTitle = e.target.courseTitle.value;
        const credits = e.target.credits.value;

        const { data } = await axios.post("https://seu-course-registration.onrender.com/create-course", { courseCode, courseTitle, credits })
        if (data._id) {
            navigate("/")
        } else {
            setErr("An error occured!")
        }
    }
    return (
        <>
            <NavigationBar />
            <div>
                <p className='font-bold text-center text-[18px] mt-4'>Create a Course!</p>
            </div>
            <div className='flex justify-center mt-2'>
                <form onSubmit={createCourse} className='flex flex-col w-full p-4 lg:w-[500px]' >
                    <div>
                        <label className='text-[13px] font-bold'>Course Code</label>
                        <input name='courseCode' type='text' className='w-full border-2 rounded mb-2' placeholder='Course code'></input>
                    </div>
                    <div>
                        <label className='text-[13px] font-bold'>Course Title</label>
                        <input name='courseTitle' type='text' className='w-full border-2 rounded mb-2' placeholder='Course Title'></input>
                    </div>
                    <div>
                        <label className='text-[13px] font-bold'>Number of Credits</label>
                        <input name='credits' type='text' className='w-full border-2 rounded mb-2' placeholder='Number of Credits' ></input>
                    </div>
                    <input value='create course' type='submit' className='bg-green-500 text-white font-bold rounded-md px-4 py-2 mt-2'></input>
                    <div>
                        {err}
                    </div>
                </form>
            </div>
        </>
    )
}
