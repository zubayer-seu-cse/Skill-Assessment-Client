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
                gpa: parseFloat(temp[2]),
                passingYear: temp[3],
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
        <>
            <div>
                <p className='font-bold text-center text-[18px] mt-4'>Add a Student</p>
            </div>
            <div className='flex justify-center px-4 mt-2'>
                <form onSubmit={createStudent} className='flex flex-col lg:w-[600px]' >
                    <div>
                        <label className='text-[13px] font-bold'>Student ID</label>
                        <input name='studentId' type='text' className='w-full border-2 px-2 lg:px-4 rounded mb-2' placeholder='Student ID'></input>
                    </div>
                    <div className='grid grid-cols-3 gap-2'>
                        <div>
                            <label className='text-[13px] font-bold'>First Name</label>
                            <input name='firstName' type='text' className='w-full border-2 px-2 lg:px-4 rounded mb-2' placeholder='First Name' ></input>
                        </div>

                        <div>
                            <label className='text-[13px] font-bold'>Middle Name</label>
                            <input name='middleName' type='text' className='w-full border-2 px-2 lg:px-4 rounded mb-2' placeholder='Middle Name' ></input>
                        </div>

                        <div>
                            <label className='text-[13px] font-bold'>Last Name</label>
                            <input name='lastName' type='text' className='w-full border-2 px-2 lg:px-4 rounded mb-2' placeholder='Last Name' ></input>
                        </div>
                    </div>
                    <div>
                        <label className='text-[13px] font-bold'>Gender</label>
                        <input name='gender' type='text' className='w-full border-2 px-2 lg:px-4 rounded mb-2' placeholder='Gender'></input>
                    </div>
                    <div>
                        <label className='text-[13px] font-bold'>Phone Numbers</label>
                        <input name='phones' type='text' className='w-full border-2 px-2 lg:px-4 rounded mb-2' placeholder='Phone Numbers (Ex: 017...., 018....)'></input>
                    </div>
                    <div>
                        <label className='text-[13px] font-bold'>Emails</label>
                        <input name='emails' type='text' className='w-full border-2 px-2 lg:px-4 rounded mb-2' placeholder='Emails (If multiple, write them separated with comma)'></input>
                    </div>
                    <div>
                        <label className='text-[13px] font-bold'>Education</label>
                        <input name='education' type='text' className='w-full border-2 px-2 lg:px-4 rounded mb-2' placeholder='Educations (Ex: HSC-EUSC-5-2020, .....)'></input>
                    </div>
                    <div>
                        <label className='text-[13px] font-bold'>Address</label>
                        <input name='address' type='text' className='w-full border-2 px-2 lg:px-4 rounded mb-2' placeholder='Address'></input>
                    </div>
                    <input value='Add Student' type='submit' className='bg-green-500 text-white font-bold rounded-md px-4 py-2 mt-2'></input>
                    <ErrorMessage message={err} />
                </form>
            </div>
        </>
    )
}
