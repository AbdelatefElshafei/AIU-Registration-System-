import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AcademicRecords from "./components/AcademicRecords";
import ChatBot from "./components/ChatBot";
import Dashboard from "./components/Dashboard";
import DropClasses from "./components/DropClasses";
import EnrollmentAppointment from "./components/EnrollmentAppointment";
import EnrollmentRequirement from "./components/EnrollmentRequirement";
import ManageClasses from "./components/ManageClasses";
import Navbar from "./components/navbar";
import PaymentPage from "./components/PaymentPage";
import Registration from "./components/Registration";
import SemesterCourses from "./components/SemesterCourses";
import UserSettings from "./components/UserSettings";
import ViewMyClasses from "./components/ViewMyClasses";
import YearFour from "./components/YearFour";
import YearOne from "./components/YearOne";
import YearThree from "./components/YearThree";
import YearTwo from "./components/YearTwo";
import ContactUs from "./Contact";
import Courses from "./Courses";
import FacultyInfo from "./faculty";
import "./index.css";
import Landingpage from "./Landingpage";
import Login from "./Login";
import Register from "./Register";
import ResearchInfo from "./ResearchInfo";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/faculty" element={<FacultyInfo />} />
        <Route path="/settings" element={<UserSettings/>}/>
        <Route path="/research" element={<ResearchInfo />} />
        <Route path="/contact" element={<ContactUs/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/academic" element={<AcademicRecords />} />
        <Route path="/payments" element={<PaymentPage/>} />
        
        {/* Manage Classes*/}
        <Route path="/manage-classes" element={<ManageClasses />} />
        <Route path="/view-classes" element={<ViewMyClasses />} />
        <Route path="/enrollment-appointment" element={<EnrollmentAppointment />} />
        <Route path="/enrollment-requirement" element={<EnrollmentRequirement />} />
        <Route path="/drop-classes" element={<DropClasses />} />
        
        {/* Year */}
        <Route path="/year-one" element={<YearOne />} />
        <Route path="/year-two" element={<YearTwo />} />
        <Route path="/year-three" element={<YearThree />} />
        <Route path="/year-four" element={<YearFour />} />
        
        {/* Semester */}
        <Route path="/year-one/first-semester" element={<SemesterCourses year="First Year" semester="First Semester" />} />
        <Route path="/year-one/second-semester" element={<SemesterCourses year="First Year" semester="Second Semester" />} />
        <Route path="/year-two/first-semester" element={<SemesterCourses year="Second Year" semester="First Semester" />} />
        <Route path="/year-two/second-semester" element={<SemesterCourses year="Second Year" semester="Second Semester" />} />
        <Route path="/year-three/first-semester" element={<SemesterCourses year="Third Year" semester="First Semester" />} /> 
        <Route path="/year-three/second-semester" element={<SemesterCourses year="Third Year" semester="Second Semester" />} />
        <Route path="/year-four/first-semester" element={<SemesterCourses year="Fourth Year" semester="First Semester" />} />
        <Route path="/year-four/second-semester" element={<SemesterCourses year="Fourth Year" semester="Second Semester" />} />
      </Routes>
      <ChatBot />
    </Router>
  </StrictMode>
);
