
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import "@fortawesome/fontawesome-free/css/all.min.css";
import UserDashboard from "./components/Userdashboard";
import ApplyServices from "./components/Applyservice";
import ApplicationStatus from "./components/Applicationstatus";
import UserProfile from "./components/Userprofile";
import AdminDashboard from "./components/Admindashboard";
import StaffDashboard from "./components/Staffdashboard";
import Privateroutes from "./components/Privateroutes";
function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route element={<Privateroutes/>}>
            <Route path="/user-dashboard" element={<UserDashboard />} />
            <Route path="/staff-dashboard" element={<StaffDashboard />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/apply-services" element={<ApplyServices />} />
            <Route path="/application-status" element={<ApplicationStatus />} />
            <Route path="/my-profile" element={<UserProfile />} />
            </Route>
          </Routes>
        </main>
           </div>
    </Router>
  );
}

export default App;
