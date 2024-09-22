// import { useEffect, useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import { useEffect, useState, createContext } from "react";
import "./App.css";
import CollegePage from "./CollegeComponents/CollegePage";
import axios from "axios";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Homepage";

export const CSRFContext = createContext();

function App() {
  const [csrfToken, setCsrfToken] = useState("");

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
    <CSRFContext.Provider value={csrfToken}>
      <Router>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/api/colleges" element={<CollegePage />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Router>
    </CSRFContext.Provider>
  );
}

export default App;

{
  /* <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */
}
