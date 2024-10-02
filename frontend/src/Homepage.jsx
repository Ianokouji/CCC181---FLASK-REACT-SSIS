/**
 * This is the Home component for the Simple Student Information System.
 * It acts as the homepage of the application and provides navigation links 
 * to the College, Programs, and Students pages.
 * 
 * Features:
 * - Displays logos for Vite and React with clickable links to their official websites.
 * - Renders the title of the application.
 * - Provides navigation links to different pages in the app using React Router's `Link` component.
 * - Displays author information at the bottom of the page.
 * 
 * Styling is managed by the associated "App.css" file.
 */


import React from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Link } from "react-router-dom";
import "./App.css";

function Home() {
  return (
    <>
      <div className="homepage-parent">
        <div>
          <a href="https://vitejs.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <h1 className="home-title">Simple Student Information System</h1>
        <div className="card">
          <div className="PageLinks">
            <Link to="/api/colleges" className="nav-link">
              Colleges
            </Link>
            <Link to="/api/programs" className="nav-link">
              Programs
            </Link>
            <Link to="/api/students" className="nav-link">
              Students
            </Link>
          </div>

          <p className="author-name">Ian Gabriel D. Paulmino</p>
          <p className="author">Author</p>
          
        </div>
      </div>
    </>
  );
}

export default Home;
