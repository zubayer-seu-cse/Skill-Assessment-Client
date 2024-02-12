import React from 'react'

export const CourseCard = ({course}) => {
  return (
    <div className='grid grid-cols-3 border-2 border-black rounded-md my-2 font-bold'>
        <p className='flex items-center justify-center px-4'>{course.courseTitle}</p>
        <p className='flex items-center justify-center px-4'>{course.courseCode}</p>
        <p className='flex items-center justify-center px-4'>{course.credits}</p>
    </div>
  )
}
