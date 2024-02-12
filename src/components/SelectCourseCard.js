import React, { useState } from 'react'
import { SelectedCourseCard } from './SelectedCourseCard'

export const SelectCourseCard = ({ course, selectedCoursesState }) => {
  const select = () => {
    selectedCoursesState.setSelectedCourses([...selectedCoursesState.selectedCourses, course])
  }
  return (
    <div>
      <div className='grid grid-cols-4 border-2 border-black rounded-md my-2 font-bold'>
        <p className='flex items-center justify-center px-4'>{course.courseTitle}</p>
        <p className='flex items-center justify-center px-4'>{course.courseCode}</p>
        <p className='flex items-center justify-center px-4'>{course.credits}</p>
        <button onClick={select}>Select</button>
      </div>
    </div>
  )
}
