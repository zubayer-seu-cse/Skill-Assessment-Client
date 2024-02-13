import axios from 'axios';
import React from 'react'

export const SearchStudents = ({ setStudentList }) => {
    const search = async (e) => {
        e.preventDefault()
        let searchText;
        if (e.type == "change") {
            searchText = e.target.value;
            if (searchText.length < 4 && searchText.length > 0) {
                return
            }
        } else {
            searchText = e.target.searchText.value;
        }
        const keyword = searchText.length == 0 ? "all" : searchText
        if (keyword == "all") {
            const { data } = await axios.get("https://seu-course-registration.onrender.com/get-student-list")
            setStudentList(data)
        } else {
            const { data } = await axios.post("https://seu-course-registration.onrender.com/search-student", {keyword})
            setStudentList(data)
        }
    }
    return (
        <form onSubmit={search} className='flex items-center'>
            <input onChange={search} type="text" name="searchText" className='grow focus:shadow-2 focus:border-0 focus:outline-0 focus-:h-[35px] h-[30px] w-[200px] lg:w-[300px] rounded-full mr-2 lg:mr-4 px-4 border-black border-[2px]' />
            <input type='submit' value="Search" className='cursor-pointer h-[35px] font-bold px-2 py-1 rounded-md bg-blue-500 text-white' />
        </form>
    )
}
