import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { CourseCard } from '../components/CourseCard'
import { StudentCard } from '../components/StudentCard'
import { SearchStudents } from '../components/SearchStudents'
import { SearchCourses } from '../components/SearchCourses'
import { useNavigate } from 'react-router-dom'
import { NavigationBar } from '../components/NavigationBar'

export const HomePage = ({ courseListState, studentListState }) => {
  const navigate = useNavigate()
  const [loggedInUser, setLoggedInUser] = useState(JSON.parse(localStorage.getItem("seu-student-registration")))

  useEffect(() => {
    if (!loggedInUser?._id) {
      navigate("/login")
    }
  }, [])

  useEffect(() => {
    axios.get("https://seu-course-registration.onrender.com/get-course-list")
      .then(res => courseListState.setCourseList(res.data))
      .catch(err => console.error(err.message));

    axios.get("https://seu-course-registration.onrender.com/get-student-list")
      .then(res => studentListState.setStudentList(res.data))
      .catch(err => console.error(err.message));
  }, [])


  return (
    <>
      <NavigationBar />

      <div className='text-center font-bold text-[18px]'>
        <p>Welcome, <span className='text-green-500'>{loggedInUser?.name}</span></p>
      </div>

      <div className='grid grid-cols-1 lg:gap-8 lg:grid-cols-2 mx-4 lg:mx-8'>

        <div className='my-4 text-[14px] lg:text-[15px]'>
          <div>
            <p className='font-bold text-center text-[18px] mt-4'>Students List</p>
          </div>
          <SearchStudents setStudentList={studentListState.setStudentList} />
          <div className='grid grid-cols-3 rounded-md my-2 font-bold'>
            <p className='text-center'>Name</p>
            <p className='text-center'>Student Id</p>
          </div>
          {
            studentListState.studentList?.map(student => <StudentCard student={student} key={student._id} />)
          }
        </div>

        <div className='my-4 text-[14px] lg:text-[15px]'>
          <div>
            <p className='font-bold text-center text-[18px] mt-4'>Courses List</p>
          </div>
          <SearchCourses setCourseList={courseListState.setCourseList} />
          <div className='grid grid-cols-4 rounded-md my-2 font-bold'>
            <p className='text-center'>Course Title</p>
            <p className='text-center'>CourseCode</p>
            <p className='text-center'>Course Credits</p>
          </div>
          {
            courseListState.courseList?.map(course => <CourseCard course={course} setCourseList={courseListState.setCourseList} key={course._id} />)
          }
        </div>
      </div>
    </>
  )
}
