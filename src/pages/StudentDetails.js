import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export const StudentDetails = () => {
    const { studentId } = useParams()
    const [student, setStudent] = useState({})
    useEffect(() => {
        axios.get("http://localhost:8080/get-student-info/" + studentId).then(res => setStudent(res.data))
    }, [])
    return (
        <div className='flex flex-col items-center mt-2'>
            <p className='text-center font-bold mb-4'>Details of {student.studentId}</p>
            <table className='border-2 border-black'>
                <tr>
                    <td className='px-4 border-2 border-black text-center'>ID</td>
                    <td className='px-4 border-2 border-black text-center'>{student.studentId}</td>
                </tr>
                <tr>
                    <td className='px-4 border-2 border-black text-center'>Name</td>
                    <td className='px-4 border-2 border-black text-center'>{student.name?.firstName + " " + student.name?.middleName + " " + student.name?.lastName}</td>
                </tr>
                <tr>
                    <td className='px-4 border-2 border-black text-center'>Gender</td>
                    <td className='px-4 border-2 border-black text-center'>{student.gender}</td>
                </tr>
                <tr>
                    <td className='px-4 border-2 border-black text-center'>Phone Numbers</td>
                    <td className='px-4 border-2 border-black text-center'>{student.phones?.join(", ")}</td>
                </tr>
                <tr>
                    <td className='px-4 border-2 border-black text-center'>Emails</td>
                    <td className='px-4 border-2 border-black text-center'>{student.emails?.join(", ")}</td>
                </tr>
                {
                    student.education?.length ?
                        <tr>
                            <td className='px-4 border-2 border-black text-center'>Education:</td>
                            <td className='px-4 border-2 border-black text-center'>
                                <table className='border-2 border-black my-4'>
                                    <tr>
                                        <th className='px-4 border-2 border-black'>Degree</th>
                                        <th className='px-4 border-2 border-black'>Institute</th>
                                        <th className='px-4 border-2 border-black'>GPA</th>
                                        <th className='px-4 border-2 border-black'>Passing Year</th>
                                    </tr>
                                    {student.education?.map(edu => (
                                        <tr>
                                            <td className='px-4 border-2 border-black text-center'>{edu.degree}</td>
                                            <td className='px-4 border-2 border-black text-center'>{edu.institute}</td>
                                            <td className='px-4 border-2 border-black text-center'>{edu.gpa}</td>
                                            <td className='px-4 border-2 border-black text-center'>{edu.passingYear}</td>
                                        </tr>
                                    ))}
                                </table>
                            </td>
                        </tr>
                        :
                        ""
                }
                <tr>
                    <td className='px-4 border-2 border-black text-center'>Address</td>
                    <td className='px-4 border-2 border-black text-center'>{student.address}</td>
                </tr>
                {
                    student.assignedCourses?.length ?
                        <tr>
                            <td className='px-4 border-2 border-black text-center'>Assigned Courses</td>
                            <td className='px-4 border-2 border-black text-center'>
                                <table className='border-2 border-black my-4'>
                                    <tr>
                                        <th className='px-4 border-2 border-black'>Course Title</th>
                                        <th className='px-4 border-2 border-black'>Course Code</th>
                                        <th className='px-4 border-2 border-black'>Credits</th>
                                    </tr>
                                    {student.assignedCourses?.map(course => (
                                        <tr>
                                            <td className='px-4 border-2 border-black text-center'>{course.courseTitle}</td>
                                            <td className='px-4 border-2 border-black text-center'>{course.courseCode}</td>
                                            <td className='px-4 border-2 border-black text-center'>{course.credits}</td>
                                        </tr>
                                    ))}
                                </table>
                            </td>
                        </tr>
                        :
                        ""
                }

            </table>
        </div>
    )
}
