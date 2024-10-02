/**
 * This is the main App component of the React application.
 * It handles routing between different pages and fetches a CSRF token on component mount.
 * 
 * The app includes routes for:
 * - Homepage
 * - CollegePage (to display college data)
 * - ProgramPage (to display program data)
 * - StudentPage (to display student data)
 * 
 * It uses React's Context API to pass the CSRF token across components.
 */


import { useEffect, useState, createContext } from "react";
import "./App.css";
import CollegePage from "./CollegeComponents/CollegePage";
import ProgramPage from "./ProgramComponents/ProgramPage";
import StudentPage from "./StudentComponents/StudentPage";

import axios from "axios";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Homepage";

// Create a context to share the CSRF token across components
export const CSRFContext = createContext();

function App() {
  // State to store the CSRF token
  const [csrfToken, setCsrfToken] = useState("");

   // useEffect hook to fetch the CSRF token when the component mounts
  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/csrf_token/",
          { withCredentials: true }
        );
        setCsrfToken(response.data.csrf_token);
        console.log(response.data.csrf_token);
      } catch (error) {
        console.error("Error fetching CSRF token:", error);
      }
    };

    fetchCsrfToken();
  }, []);

  return (
    // Provide the CSRF token to the app's components via Context API
    <CSRFContext.Provider value={csrfToken}>
      <Router>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/api/colleges" element={<CollegePage />} />
          <Route path="/api/programs" element={<ProgramPage/>} />
          <Route path="api/students" element={<StudentPage/>} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Router>
    </CSRFContext.Provider>
  );
}

export default App;

