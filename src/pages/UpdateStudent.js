import React, { useEffect, useState } from 'react'
import { ErrorMessage } from '../components/ErrorMessage'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { SelectedCourseCard } from '../components/SelectedCourseCard';

export const UpdateStudent = () => {
    const { studentId } = useParams();
    const [student, setStudent] = useState({})
    const navigate = useNavigate();
    const [err, setErr] = useState();
    const [selectedCourses, setSelectedCourses] = useState([])


    useEffect(() => {
        axios.get("http://localhost:8080/get-student-info/" + studentId)
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
                passingYear: temp[2],
                gpa: parseFloat(temp[3]),
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
            const { data } = await axios.post("http://localhost:8080/update-student", studentData)
            if (!data._id) {
                setErr("Student Exists!")
                return
            } else{
                navigate('/student/' + data.studentId)
            }
        } catch (err) {
            setErr(err.message)
        }
    }

    return (
        <div className='flex justify-center mt-8'>
            <form onSubmit={updateStudent} className='flex flex-col lg:w-[600px] mt-8' >
                <input defaultValue={student.studentId} name='studentId' type='text' className='border-2 rounded mt-2' placeholder='Student ID'></input>
                <div>
                    <input contentEditable={true} defaultValue={student.name?.firstName} name='firstName' type='text' className='border-2 rounded mt-2' placeholder='First Name' ></input>
                    <input defaultValue={student.name?.middleName} name='middleName' type='text' className='border-2 rounded mt-2' placeholder='Middle Name' ></input>
                    <input defaultValue={student.name?.lastName} name='lastName' type='text' className='border-2 rounded mt-2' placeholder='Last Name' ></input>
                </div>
                <input defaultValue={student.gender} name='gender' type='text' className='border-2 rounded mt-2' placeholder='Gender'></input>
                <input defaultValue={student.phones?.join(", ")} name='phones' type='text' className='border-2 rounded mt-2' placeholder='Phone Numbers (Ex: 017...., 018....)'></input>
                <input defaultValue={student.emails?.join(", ")} name='emails' type='text' className='border-2 rounded mt-2' placeholder='Emails (If multiple, write them separated with comma)'></input>

                <input
                    defaultValue={student.education?.map(edu => edu.degree + "-" + edu.institute + "-" + edu.gpa + "-" + edu.passingYear).join(", ")}
                    name='education'
                    type='text'
                    className='border-2 rounded mt-2'
                    placeholder='Educations (Ex: HSC-EUSC-5-2020, .....)'
                ></input>

                <input defaultValue={student.address} name='address' type='text' className='border-2 rounded mt-2' placeholder='Address'></input>

                <div className='mt-4'>
                    <label className='text-[13px] font-bold'>Assigned Courses</label>
                    <div className='grid grid-cols-6 mt-1'>
                        {
                            selectedCourses?.map(course => <SelectedCourseCard course={course} selectedCoursesState={{ selectedCourses, setSelectedCourses }} />)
                        }
                    </div>
                </div>

                <input value='Update Student' type='submit' className='bg-green-500 text-white font-bold rounded-md px-4 py-2 mt-2'></input>
                <ErrorMessage message={err} />
            </form>
        </div>
    )
}