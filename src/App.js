import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { CourseRegistration } from './pages/CourseRegistration';
import { Test } from './pages/Test';
import { Login } from './pages/Login';
import { CreateCourse } from './pages/CreateCourse';
import { CreateStudent } from './pages/CreateStudent';

function App() {
  return (
    <Routes>
      <Route element={<HomePage/>} path='/' ></Route>
      <Route element={<Test/>} path='/test' ></Route>
      <Route element={<CourseRegistration/>} path='/course-registration' ></Route>
      <Route element={<CreateCourse/>} path='/create-course' ></Route>
      <Route element={<CreateStudent/>} path='/create-student' ></Route>
      <Route element={<Login/>} path='/login' ></Route>
    </Routes>
  );
}

export default App;
