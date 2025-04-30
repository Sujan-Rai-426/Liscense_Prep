import { useState } from "react";
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Admin_Login from './pages/Admin_Login';
import Footer from './components/Footer';
import ProtectedRoute from './context/ProtectedRoute';

import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Admin_Signup from "./pages/Admin_Signup";
import Unavailable from "./pages/Unavailable";
import Dummy_Exam from "./pages/Dummy_Exam";

function App() {

  // <---------------------> State to manage the mode (light/dark) <---------------------->
  const [mode, setMode] = useState({
    backgroundColor: '#1e1e2f', // Dark mode background
    color: '#e0e0e0'            // Light Text Color 
  });
  
  const toggleMode = () => {
    if (mode.backgroundColor === '#1e1e2f') {
      setMode({
        backgroundColor: '#f5f7fa',// light mode background
        color: '#212529'        // Dark Text Color  
      });
    } else {
      setMode({
        backgroundColor: '#1e1e2f', // Dark mode background
        color: '#e0e0e0'            // Light Text Color 
      });
    }
  };


  return (
    <Router>
      <Navbar mode={mode} toggleMode={toggleMode} style={{ zIndex: 10 }} />
      
      <div style={mode}>
        <div className="container min-vh-100">
        <Routes>
            {/* Routes that don't need Authorization */}
          <Route exact path="/" element={<Home mode={mode} />} />
          <Route exact path="/unavailable" element={<Unavailable mode={mode} />} />
          <Route exact path="/admin_login" element={<Admin_Login mode={mode} />} />
          <Route exact path='/admin_signup' element={ <Admin_Signup mode={mode} /> } />
          <Route exact path='/dummy_exam' element={ <Dummy_Exam mode={mode} /> } />
          {/* Protected Routes where only logged-in admins can access */}
          <Route element={<ProtectedRoute />}>
            <Route exact path="/admin" element={<Admin mode={mode} />} />
          </Route>
        </Routes>

        </div>
      </div>

      <Footer />
    </Router>
  );
}

export default App;
