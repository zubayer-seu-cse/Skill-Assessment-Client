import React from 'react'

export const SelectStudentCard = ({student, setVisibilityToggle, setSelectedStudent}) => {
  const select = () =>{
    setSelectedStudent(student)
    setVisibilityToggle(false)
  }
  return (
    <div className='grid grid-cols-3 shadow-1 rounded-md my-2 font-bold'>
      <p className='flex items-center justify-center px-4'>{student.name.firstName + " " + student.name.middleName}</p>
      <p className='flex items-center justify-center px-4'>{student.studentId}</p>
      <button onClick={select} >Assign Course</button>
    </div>
  )
}
