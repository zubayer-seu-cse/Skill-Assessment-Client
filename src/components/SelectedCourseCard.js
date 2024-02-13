import React from 'react'

export const SelectedCourseCard = ({ course, selectedCoursesState }) => {
    const removeSelectedCourse = () => {
        const updatedSelectedCourses = selectedCoursesState.selectedCourses?.filter(c => c._id != course._id);
        selectedCoursesState?.setSelectedCourses(updatedSelectedCourses);
    }
    return (
        <div className='flex justify-between p-2 font-bold bg-blue-500 rounded-md mr-2 mt-2'>
            <span className='pr-2 text-white' >{course.courseCode}</span>
            <button className='text-[13px] text-white pr-2' onClick={removeSelectedCourse}>X</button>
        </div>
    )
}
