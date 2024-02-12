import React from 'react'

export const StudentCard = ({student}) => {
  return (
    <div className='grid grid-cols-3 border-2 border-black rounded-md my-2 font-bold'>
        <p className='flex items-center justify-center px-4'>{student.name.firstName + " " + student.name.middleName}</p>
        <p className='flex items-center justify-center px-4'>{student.studentId}</p>
    </div>
  )
}
