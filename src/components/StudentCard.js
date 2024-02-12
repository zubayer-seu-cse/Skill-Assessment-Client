import React from 'react'
import { useNavigate } from 'react-router-dom'

export const StudentCard = ({student}) => {
  const navigate = useNavigate()
  return (
    <div className='grid grid-cols-3 border-2 border-black rounded-md my-2 font-bold'>
        <p className='flex items-center justify-center px-4'>{student.name.firstName + " " + student.name.middleName}</p>
        <p className='flex items-center justify-center px-4'>{student.studentId}</p>
        <button onClick={()=> navigate("/student/" + student.studentId)}>See Details</button>
    </div>
  )
}
