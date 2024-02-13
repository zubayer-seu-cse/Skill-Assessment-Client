import React, { useEffect, useState } from 'react'
import { SelectStudentCard } from '../components/SelectStudentCard'
import { SelectCourseCard } from '../components/SelectCourseCard';
import { SelectedCourseCard } from '../components/SelectedCourseCard';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const CourseRegistration = () => {
  const [courseList, setCourseList] = useState([])
  const [studentList, setStudentList] = useState([])

  useEffect(() => {
    axios.get("https://seu-course-registration.onrender.com/get-course-list")
      .then(res => setCourseList(res.data))
      .catch(err => console.error(err.message));

    axios.get("https://seu-course-registration.onrender.com/get-student-list")
      .then(res => setStudentList(res.data))
      .catch(err => console.error(err.message));
  }, [])

  const navigate = useNavigate()
  const [selectedCourses, setSelectedCourses] = useState([])
  const [visibilityToggle, setVisibilityToggle] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState({})

  const finalize = () => {
    axios.post("https://seu-course-registration.onrender.com/assign-courses", { selectedStudent, selectedCourses })
      .then(res => navigate("/"))
      .catch(err => console.error(err.message))
  }

  return (
    <div className='px-8 text-[14px] lg:text-[15px]'>

      <div style={{ display: visibilityToggle ? "block" : "none" }} >
        <div className='grid grid-cols-3 rounded-md my-2 font-bold'>
          <p className='text-center'>Name</p>
          <p className='text-center'>Student Id</p>
        </div>
        {
          studentList.map(student => <SelectStudentCard setVisibilityToggle={setVisibilityToggle} student={student} setSelectedStudent={setSelectedStudent} />)
        }
      </div>

      <div style={{ display: visibilityToggle ? "none" : "block" }}>


        <p className='text-center font-bold'>Selected Courses for <span className='text-green-500'>{selectedStudent.name?.firstName}</span></p>
        <div className='grid grid-cols-3 lg:grid-cols-12 mt-4' >
          {
            selectedCourses.length ? selectedCourses.map(course => <SelectedCourseCard course={course} selectedCoursesState={{ selectedCourses, setSelectedCourses }} />)
              :
              <p className='text-center font-bold text-grey-500 col-span-3'>No coures assigned yet!</p>
          }
        </div>

        <div className='flex justify-end'>
          <button onClick={finalize} style={selectedCourses.length ? { display: "block" } : { display: "none" }} className='p-2 px-4 bg-green-500 rounded-md mt-2 text-white font-bold' >
            Finalize
          </button>
        </div>



        <p className='text-center font-bold mt-8'>Available Courses</p>
        <div>
          {
            courseList.map(course => <SelectCourseCard course={course} selectedCoursesState={{ selectedCourses, setSelectedCourses }} />)
          }
        </div>
      </div>
    </div>
  )
}
