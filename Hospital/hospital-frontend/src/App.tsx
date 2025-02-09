import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
// import Signup from "./components/SignUp";
import Departments from "./pages/Departments";
import withAuth from "./withAuth"; // Import the HOC
import GeneralMedicine from "./pages/GeneralMedicine";
import AppointmentForm from "./pages/AppointmentForm";
import Home from "./pages/Home";
import ErrorPage from "./components/ErrorPage";

const ProtectedServices = withAuth(Departments); // Wrap the component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home/>}/>
        <Route path="/login" element={<Login />} />
        {/* Protected Route using HOC */}
        <Route path="/departments" element={<Departments />} />
        <Route path="/general-medicine" element={<GeneralMedicine />} />
        <Route path="/appointment-form" element={<AppointmentForm />} />
        {/* Redirect unknown paths */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
