import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { CourseCard } from '../components/CourseCard'
import { StudentCard } from '../components/StudentCard'

export const HomePage = ({courseList, studentList}) => {
  return (
    <div className='grid grid-cols-2 mx-8'>
      <div>
        <div className='grid grid-cols-2 rounded-md my-2 font-bold'>
          <p className='text-center'>Name</p>
          <p className='text-center'>Student Id</p>
        </div>
        {
          studentList.map(student => <StudentCard student={student} key={student._id} />)
        }
      </div>
      <div className='px-8'>
        <div className='grid grid-cols-3 rounded-md my-2 font-bold'>
          <p className='text-center'>Course Title</p>
          <p className='text-center'>CourseCode</p>
          <p className='text-center'>Course Credits</p>
        </div>
        {
          courseList.map(course => <CourseCard course={course} key={course._id} />)
        }
      </div>
    </div>
  )
}
