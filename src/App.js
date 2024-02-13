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
import { StudentDetails } from './pages/StudentDetails';
import { UpdateStudent } from './pages/UpdateStudent';

function App() {
  const [courseList, setCourseList] = useState([])
  const [studentList, setStudentList] = useState([])


  return (
    <Routes>
      <Route element={<HomePage courseListState={{courseList, setCourseList}} studentListState={{studentList, setStudentList}} />} path='/' ></Route>
      <Route element={<Test/>} path='/test' ></Route>
      <Route element={<CourseRegistration courseList={courseList} studentList={studentList} />} path='/course-registration' ></Route>
      <Route element={<CreateCourse/>} path='/create-course' ></Route>
      <Route element={<CreateStudent/>} path='/create-student' ></Route>
      <Route element={<StudentDetails/>} path='/student/:studentId' ></Route>
      <Route element={<UpdateStudent/>} path='/update-student/:studentId' ></Route>
      <Route element={<Login/>} path='/login' ></Route>
    </Routes>
  );
}

export default App;
