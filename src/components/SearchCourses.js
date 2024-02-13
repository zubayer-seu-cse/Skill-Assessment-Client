import axios from 'axios';
import React from 'react'

export const SearchCourses = ({ setCourseList }) => {
    const search = async (e) => {

        e.preventDefault()
        let searchText;

        if (e.type == "change") {
            searchText = e.target.value;
        } else {
            searchText = e.target.searchText.value;
        }

        const keyword = searchText.length == 0 ? "all" : searchText

        if (keyword == "all") {
            const { data } = await axios.get("http://localhost:8080/get-course-list")
            setCourseList(data)
        } else {
            const { data } = await axios.get("http://localhost:8080/search-courses/" + keyword)
            setCourseList(data)
        }
    }
    return (
        <form onSubmit={search} className='flex items-center'>
            <input onChange={search} type="text" name="searchText" className='grow h-[30px] w-[200px] lg:w-[300px] rounded-full mr-2 lg:mr-4 px-4 border-black border-[2px]' />
            <input type='submit' value="Search" className='h-[35px] font-bold px-2 py-1 rounded-md bg-orange-400 text-white' />
        </form>
    )
}
