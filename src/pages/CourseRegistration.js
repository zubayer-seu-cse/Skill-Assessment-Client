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
    axios.post("http://localhost:8080/assign-courses", {selectedStudent, selectedCourses})
    .then(res => navigate("/"))
    .catch(err => console.error(err.message))
  }

  return (
    <div>

      <div style={{ display: visibilityToggle ? "block" : "none" }} >
        {
          studentList.map(student => <SelectStudentCard setVisibilityToggle={setVisibilityToggle} student={student} setSelectedStudent={setSelectedStudent} />)
        }
      </div>

      <div style={{ display: visibilityToggle ? "none" : "block" }}>
        <p className='text-center font-bold'>Selected Courses for x</p>
        <div>
          {
            selectedCourses.length ? selectedCourses.map(course => <SelectedCourseCard course={course} selectedCoursesState={{ selectedCourses, setSelectedCourses }} />)
              :
              <p className='text-center font-bold text-grey-500'>No coures assigned yet!</p>
          }
        </div>
        <button onClick={finalize} style={selectedCourses.length ? { display: "block" } : { display: "none" }} >Finalize</button>

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
