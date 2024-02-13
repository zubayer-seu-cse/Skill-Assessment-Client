import axios from 'axios'
import React from 'react'

export const CourseCard = ({ course, setCourseList }) => {
  const deleteCourse = () => {
    const isConfirm = window.confirm("Are you sure?")
    if (isConfirm) {
      axios.delete("http://localhost:8080/delete-course/" + course._id)
        .then(() => setCourseList(courseList => courseList.filter(c => c._id != course._id)))
    }
  }
  return (
    <div className='grid grid-cols-4 p-2 shadow-1 hover:shadow-2 rounded-md my-2 font-bold'>
      <p className='flex items-center justify-center px-4'>{course.courseTitle}</p>
      <p className='flex items-center justify-center px-4'>{course.courseCode}</p>
      <p className='flex items-center justify-center px-4'>{course.credits}</p>
      <button onClick={deleteCourse} className='flex items-center justify-center px-4 text-red-700'>delete</button>
    </div>
  )
}
