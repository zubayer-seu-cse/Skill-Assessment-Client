import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export const CreateCourse = () => {
    const navigate = useNavigate();
    const [err, setErr] = useState("");

    const createCourse = async (e) => {
        e.preventDefault();

        const courseCode = e.target.courseCode.value;
        const courseTitle = e.target.courseTitle.value;
        const credits = e.target.credits.value;

        const { data } = await axios.post("http://localhost:8080/create-course", { courseCode, courseTitle, credits })
        if (data._id) {
            navigate("/")
        } else {
            setErr("An error occured!")
        }
    }
    return (
        <div className='flex justify-center mt-8'>
            <form onSubmit={createCourse} className='flex flex-col lg:w-[500px] mt-8' >
                <input name='courseCode' type='text' className='border-2 rounded mt-2' placeholder='Course code'></input>
                <input name='courseTitle' type='text' className='border-2 rounded mt-2' placeholder='Course Title'></input>
                <input name='credits' type='text' className='border-2 rounded mt-2' placeholder='Number of Credits' ></input>
                <input value='create course' type='submit' className='bg-green-500 text-white font-bold rounded-md px-4 py-2 mt-2'></input>
                <div>
                    {err}
                </div>
            </form>
        </div>
    )
}
