import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'

export const StudentDetails = () => {
    const navigate = useNavigate()
    const { studentId } = useParams()
    const [student, setStudent] = useState({})
    useEffect(() => {
        axios.get("https://seu-course-registration.onrender.com/get-student-info/" + studentId).then(res => setStudent(res.data))
    }, [])

    const deleteAccount = () => {
        const isConfirm = window.confirm("Are you sure?")
        if (isConfirm) {
            axios.delete("https://seu-course-registration.onrender.com/delete-student-account/" + student._id).then(() => navigate("/"))
        }
    }
    return (
        <div className='flex flex-col items-center mt-2 text-[14px] lg:text-[16px]'>
            <p className='text-center font-bold mb-4'>Details of <span className='text-green-500'>{student.name?.firstName}</span></p>
            <table className='border-2 border-black'>
                <tr>
                    <td className='px-1 lg:px-4 border-2 border-black text-center'>ID</td>
                    <td className='px-1 lg:px-4 border-2 border-black text-center'>{student.studentId}</td>
                </tr>
                <tr>
                    <td className='px-1 lg:px-4 border-2 border-black text-center'>Name</td>
                    <td className='px-1 lg:px-4 border-2 border-black text-center'>{student.name?.firstName + " " + student.name?.middleName + " " + student.name?.lastName}</td>
                </tr>
                <tr>
                    <td className='px-1 lg:px-4 border-2 border-black text-center'>Gender</td>
                    <td className='px-1 lg:px-4 border-2 border-black text-center'>{student.gender}</td>
                </tr>
                <tr>
                    <td className='px-1 lg:px-4 border-2 border-black text-center'>Phone Numbers</td>
                    <td className='px-1 lg:px-4 border-2 border-black text-center'>{student.phones?.join(", ")}</td>
                </tr>
                <tr>
                    <td className='px-1 lg:px-4 border-2 border-black text-center'>Emails</td>
                    <td className='px-1 lg:px-4 border-2 border-black text-center'>{student.emails?.join(", ")}</td>
                </tr>
                {
                    student.education?.length ?
                        <tr>
                            <td className='px-4 border-2 border-black text-center'>Education:</td>
                            <td className='px-4 border-2 border-black text-center'>
                                <table className='border-2 border-black my-4'>
                                    <tr>
                                        <th className='px-1 lg:px-4 border-2 border-black'>Degree</th>
                                        <th className='px-1 lg:px-4 border-2 border-black'>Institute</th>
                                        <th className='px-1 lg:px-4 border-2 border-black'>GPA</th>
                                        <th className='px-1 lg:px-4 border-2 border-black'>Passing Year</th>
                                    </tr>
                                    {student.education?.map(edu => (
                                        <tr>
                                            <td className='px-1 lg:px-4 border-2 border-black text-center'>{edu.degree}</td>
                                            <td className='px-1 lg:px-4 border-2 border-black text-center'>{edu.institute}</td>
                                            <td className='px-1 lg:px-4 border-2 border-black text-center'>{edu.gpa}</td>
                                            <td className='px-1 lg:px-4 border-2 border-black text-center'>{edu.passingYear}</td>
                                        </tr>
                                    ))}
                                </table>
                            </td>
                        </tr>
                        :
                        ""
                }
                <tr>
                    <td className='px-1 lg:px-4 border-2 border-black text-center'>Address</td>
                    <td className='px-1 lg:px-4 border-2 border-black text-center'>{student.address}</td>
                </tr>
                {
                    student.assignedCourses?.length ?
                        <tr>
                            <td className='px-1 lg:px-4 border-2 border-black text-center'>Assigned Courses</td>
                            <td className='px-1 lg:px-4 border-2 border-black text-center'>
                                <div className='flex justify-center '>
                                    <table className='border-2 border-black my-4'>
                                        <tr>
                                            <th className='px-1 lg:px-4 border-2 border-black'>Course Title</th>
                                            <th className='px-1 lg:px-4 border-2 border-black'>Course Code</th>
                                            <th className='px-1 lg:px-4 border-2 border-black'>Credits</th>
                                        </tr>
                                        {student.assignedCourses?.map(course => (
                                            <tr>
                                                <td className='px-1 lg:px-4 border-2 border-black text-center'>{course.courseTitle}</td>
                                                <td className='px-1 lg:px-4 border-2 border-black text-center'>{course.courseCode}</td>
                                                <td className='px-1 lg:px-4 border-2 border-black text-center'>{course.credits}</td>
                                            </tr>
                                        ))}
                                    </table>
                                </div>
                            </td>
                        </tr>
                        :
                        ""
                }

            </table>

            <div className='mb-8'>
                <button onClick={() => navigate('/update-student/' + student.studentId)} className='p-2 mr-4 px-4 bg-green-500 rounded-md mt-2 text-white font-bold'>
                    Update
                </button>
                <button onClick={deleteAccount} className='p-2 px-4 bg-red-700 rounded-md mt-2 text-white font-bold'>
                    Delete this Student Account!
                </button>
            </div>
        </div>
    )
}
