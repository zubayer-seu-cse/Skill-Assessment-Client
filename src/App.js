import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { CourseRegistration } from './pages/CourseRegistration';
import { Test } from './pages/Test';
import { Login } from './pages/Login';
import { CreateCourse } from './pages/CreateCourse';
import { CreateStudent } from './pages/CreateStudent';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [courseList, setCourseList] = useState([])
  const [studentList, setStudentList] = useState([])

  useEffect(() => {
    axios.get("http://localhost:8080/get-course-list")
      .then(res => {
        setCourseList(res.data)
        console.log(res.data)
      })
      .catch(err => console.error(err.message));

    axios.get("http://localhost:8080/get-student-list")
      .then(res => {
        setStudentList(res.data)
        console.log(res.data)
      })
      .catch(err => console.error(err.message));
  }, [])


  return (
    <Routes>
      <Route element={<HomePage courseList={courseList} studentList={studentList} />} path='/' ></Route>
      <Route element={<Test/>} path='/test' ></Route>
      <Route element={<CourseRegistration courseList={courseList} studentList={studentList} />} path='/course-registration' ></Route>
      <Route element={<CreateCourse/>} path='/create-course' ></Route>
      <Route element={<CreateStudent/>} path='/create-student' ></Route>
      <Route element={<Login/>} path='/login' ></Route>
    </Routes>
  );
}

export default App;
