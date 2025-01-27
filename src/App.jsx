
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../public/components/Navbar";
import Home from "../public/components/Home";
import Register from "../public/components/Register";
import Login from "../public/components/Login";
import "@fortawesome/fontawesome-free/css/all.min.css";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
           </div>
    </Router>
  );
}

export default App;
