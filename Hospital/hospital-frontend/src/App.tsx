import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Departments from "./pages/Departments";
import GeneralMedicine from "./pages/GeneralMedicine";
import AppointmentForm from "./pages/AppointmentForm";
import Home from "./pages/Home";
import ErrorPage from "./components/ErrorPage";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/home" element={<Home/>}/>
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
