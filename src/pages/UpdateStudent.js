import React, { useEffect, useState } from 'react'
import { ErrorMessage } from '../components/ErrorMessage'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { SelectedCourseCard } from '../components/SelectedCourseCard';
import { NavigationBar } from '../components/NavigationBar';

export const UpdateStudent = () => {
    const { studentId } = useParams();
    const [student, setStudent] = useState({})
    const navigate = useNavigate();
    const [err, setErr] = useState();
    const [selectedCourses, setSelectedCourses] = useState([])

    useEffect(() => {
        axios.get("https://seu-course-registration.onrender.com/get-student-info/" + studentId)
            .then(res => {
                setStudent(res.data)
                setSelectedCourses(res.data.assignedCourses)
            })
            .catch(err => console.error(err.message))
    }, [])

    const updateStudent = async (e) => {
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
            _id: student._id,
            studentId,
            name: { firstName, middleName, lastName },
            gender,
            phones,
            emails,
            education,
            address,
            assignedCourses: selectedCourses
        }

        try {
            const { data } = await axios.post("https://seu-course-registration.onrender.com/update-student", studentData)
            if (!data._id) {
                setErr("Student Exists!")
                return
            } else {
                navigate('/student/' + data.studentId)
            }
        } catch (err) {
            setErr(err.message)
        }
    }

    return (

        <>
            <NavigationBar />
            <div>
                <p className='font-bold text-center text-[18px] mt-4'>
                    Update <span className='text-green-500'>{student.name?.firstName + "'s "}</span>
                    profile
                </p>
            </div>
            <div className='flex justify-center mt-4 mb-8 px-4'>
                <form onSubmit={updateStudent} className='flex flex-col lg:w-[600px]' >
                    <div>
                        <label className='text-[13px] font-bold'>Username</label>
                        <input defaultValue={student.studentId} name='studentId' type='text' className='border-2 rounded mb-2 w-full' placeholder='Student ID'></input>
                    </div>
                    <div className='grid grid-cols-3 gap-2'>
                        <div>
                            <label className='text-[13px] font-bold'>Username</label>
                            <input contentEditable={true} defaultValue={student.name?.firstName} name='firstName' type='text' className='border-2 rounded mb-2 w-full' placeholder='First Name' ></input>
                        </div>
                        <div>
                            <label className='text-[13px] font-bold'>Username</label>
                            <input defaultValue={student.name?.middleName} name='middleName' type='text' className='border-2 rounded mb-2 w-full' placeholder='Middle Name' ></input>
                        </div>
                        <div>
                            <label className='text-[13px] font-bold'>Username</label>
                            <input defaultValue={student.name?.lastName} name='lastName' type='text' className='border-2 rounded mb-2 w-full' placeholder='Last Name' ></input>
                        </div>
                    </div>
                    <div>
                        <label className='text-[13px] font-bold'>Username</label>
                        <input defaultValue={student.gender} name='gender' type='text' className='border-2 roundeb mb-2 w-full' placeholder='Gender'></input>
                    </div>
                    <div>
                        <label className='text-[13px] font-bold'>Username</label>
                        <input defaultValue={student.phones?.join(", ")} name='phones' type='text' className='border-2 rounded mb-2 w-full' placeholder='Phone Numberb ( w-fullEx: 017...., 018....)'></input>
                    </div>
                    <div>
                        <label className='text-[13px] font-bold'>Username</label>
                        <input defaultValue={student.emails?.join(", ")} name='emails' type='text' className='border-2 rounded mb-2 w-full' placeholder='Emails (If multipleb w w-fullrite them separated with comma)'></input>
                    </div>

                    <div>
                        <label className='text-[13px] font-bold'>Education</label>
                        <input
                            defaultValue={student.education?.map(edu => edu.degree + "-" + edu.institute + "-" + edu.gpa + "-" + edu.passingYear).join(", ")}
                            name='education'
                            type='text'
                            className='border-2 rounded mb-2 w-full'
                            placeholder='Educations (Ex: HSC-EUSC-5-2020, .....)'
                        ></input>
                    </div>

                    <div>
                        <label className='text-[13px] font-bold'>Username</label>
                        <input defaultValue={student.address} name='address' type='text' className='border-2 roundeb mb-2 w-full' placeholder='Address'></input>
                    </div>

                    <div className='mt-4'>
                        <label className='text-[13px] font-bold'>Assigned Courses</label>
                        <div className='grid grid-cols-3 lg:grid-cols-6 mt-1'>
                            {
                                selectedCourses?.map(course => <SelectedCourseCard course={course} selectedCoursesState={{ selectedCourses, setSelectedCourses }} />)
                            }
                        </div>
                    </div>

                    <input value='Update Student' type='submit' className='bg-green-500 text-white font-bold rounded-md px-4 py-2 mt-2'></input>
                    <ErrorMessage message={err} />
                </form>
            </div>
        </>
    )
}
