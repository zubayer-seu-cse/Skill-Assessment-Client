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
            const { data } = await axios.get("http://localhost:8080/get-student-list")
            setStudentList(data)
        } else {
            const { data } = await axios.get("http://localhost:8080/search-student/" + keyword)
            setStudentList(data)
        }
    }
    return (
        <form onSubmit={search}>
            <input onChange={search} type="text" name="searchText" className='h-[30px] w-[200px] lg:w-[300px] rounded-full m-4 px-4 border-black border-[2px]' />
            <input type='submit' value="Search" className='font-bold px-2 py-1 rounded-md bg-green-500 text-white' />
        </form>
    )
}
