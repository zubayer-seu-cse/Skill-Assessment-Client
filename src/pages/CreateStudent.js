import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ErrorMessage } from '../components/ErrorMessage';

export const CreateStudent = () => {

    const navigate = useNavigate();
    const [err, setErr] = useState();

    const createStudent = async (e) => {
        e.preventDefault();

        const studentId = e.target.studentId.value;

        const firstName = e.target.firstName.value;
        const middleName = e.target.middleName.value;
        const lastName = e.target.lastName.value;

        const gender = e.target.gender.value;

        const phones = e.target.phones.value.split(', ');

        const emails = e.target.emails.value.split(', ');

        const educationTemp = e.target.education.value.split(', ');
        const education = educationTemp.map(entry => {
            const temp = entry.split("-");
            const eduEntry = {
                degree: temp[0],
                institute: temp[1],
                passingYear: temp[2],
                gpa: parseFloat(temp[3]),
            }
            return eduEntry;
        })

        const address = e.target.address.value;

        const studentData = {
            studentId,
            name: { firstName, middleName, lastName },
            gender,
            phones,
            emails,
            education,
            address,
            assignedCourses: []
        }

        try {
            const { data } = await axios.post("http://localhost:8080/create-student", studentData)
            if (!data._id) {
                setErr("Student Exists!")
            } else {
                navigate("/")
            }

        } catch (err) {
            setErr(err.message)
        }
    }
    return (
        <div className='flex justify-center mt-8'>
            <form onSubmit={createStudent} className='flex flex-col lg:w-[600px] mt-8' >
                <input name='studentId' type='text' className='border-2 rounded mt-2' placeholder='Student ID'></input>
                <div>
                    <input name='firstName' type='text' className='border-2 rounded mt-2' placeholder='First Name' ></input>
                    <input name='middleName' type='text' className='border-2 rounded mt-2' placeholder='Middle Name' ></input>
                    <input name='lastName' type='text' className='border-2 rounded mt-2' placeholder='Last Name' ></input>
                </div>
                <input name='gender' type='text' className='border-2 rounded mt-2' placeholder='Gender'></input>
                <input name='phones' type='text' className='border-2 rounded mt-2' placeholder='Phone Numbers (Ex: 017...., 018....)'></input>
                <input name='emails' type='text' className='border-2 rounded mt-2' placeholder='Emails (If multiple, write them separated with comma)'></input>
                <input name='education' type='text' className='border-2 rounded mt-2' placeholder='Educations (Ex: HSC-EUSC-5-2020, .....)'></input>
                <input name='address' type='text' className='border-2 rounded mt-2' placeholder='Address'></input>
                <input value='Add Student' type='submit' className='bg-green-500 text-white font-bold rounded-md px-4 py-2 mt-2'></input>
                <ErrorMessage message={err} />
            </form>
        </div>
    )
}
