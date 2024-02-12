import React from 'react'

export const SelectedCourseCard = ({ course, selectedCoursesState }) => {
    const removeSelectedCourse = () => {
        const updatedSelectedCourses = selectedCoursesState.selectedCourses.filter(c => c._id != course._id);
        selectedCoursesState.setSelectedCourses(updatedSelectedCourses);
    }
    return (
        <div>
            {course.courseCode}
            <button onClick={removeSelectedCourse}>X</button>
        </div>
    )
}
