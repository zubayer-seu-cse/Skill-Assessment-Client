import React, { useState } from 'react'
import { SelectStudentCard } from '../components/SelectStudentCard'
import { SelectCourseCard } from '../components/SelectCourseCard';
import { SelectedCourseCard } from '../components/SelectedCourseCard';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const CourseRegistration = ({ courseList, studentList }) => {
  const navigate = useNavigate()
  const [selectedCourses, setSelectedCourses] = useState([])
  const [visibilityToggle, setVisibilityToggle] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState({})

  const finalize = () => {
    axios.post("http://localhost:8080/assign-courses", { selectedStudent, selectedCourses })
      .then(res => navigate("/"))
      .catch(err => console.error(err.message))
  }

  return (
    <div className='px-8'>

      <div style={{ display: visibilityToggle ? "block" : "none" }} >
        {
          studentList.map(student => <SelectStudentCard setVisibilityToggle={setVisibilityToggle} student={student} setSelectedStudent={setSelectedStudent} />)
        }
      </div>

      <div style={{ display: visibilityToggle ? "none" : "block" }}>
        <p className='text-center font-bold'>Selected Courses for x</p>
        <div className='grid grid-cols-3 lg:grid-cols-12' >
          {
            selectedCourses.length ? selectedCourses.map(course => <SelectedCourseCard course={course} selectedCoursesState={{ selectedCourses, setSelectedCourses }} />)
              :
              <p className='text-center font-bold text-grey-500'>No coures assigned yet!</p>
          }
        </div>
        <div className='flex justify-end'>
          <button onClick={finalize} style={selectedCourses.length ? { display: "block" } : { display: "none" }} className='p-2 px-4 bg-green-500 rounded-md mt-2 text-white font-bold' >
            Finalize
          </button>
        </div>

        <p className='text-center font-bold'>Select Courses</p>
        <div>
          {
            courseList.map(course => <SelectCourseCard course={course} selectedCoursesState={{ selectedCourses, setSelectedCourses }} />)
          }
        </div>
      </div>
    </div>
  )
}
