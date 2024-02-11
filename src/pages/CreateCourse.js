import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export const CreateCourse = () => {
    const navigate = useNavigate();
    const [err, setErr] = useState("");

    const createCourse = (e) => {
        e.preventDefault();

        const courseCode = e.target.courseCode.value;
        const courseTitle = e.target.courseTitle.value;
        const credits = e.target.credits.value;

        fetch("http://localhost:8080/create-course", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ courseCode, courseTitle, credits })
        })
            .then(res => res.json())
            .then(data => {
                if (data._id != "N/A") {
                    navigate("/")
                } else {
                    setErr("An error occured!")
                }
            })
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
