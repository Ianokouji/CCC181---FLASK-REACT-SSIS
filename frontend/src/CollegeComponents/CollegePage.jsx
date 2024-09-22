import { useEffect, useState, useContext, createContext } from "react";
import CollegeList from "./CollegeList";
import CollegeForm from "./CollegeForm";
import CollegeDelete from "./CollegeDelete";
import CollegeSearch from "./CollegeSearch";
// import { CSRFContext } from "../App";

// import "./App.css";
// import axiosApi from "./axiosConfig";
import axios from "axios";

// export const CSRFContext = createContext();

function CollegePage() {
  // const [csrfToken, setCsrfToken] = useState("");
  // const csrfToken = useContext(CSRFContext)
  const [colleges, setColleges] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isCollegeFormOpen, setCollegeForm] = useState(false);
  const [collegeToUpdate, setCollegeToUpdate] = useState({});
  const [isCollegeDeleteOpen, setCollegeDeleteComp] = useState(false);
  const [collegeToDelete, setCollegeDelete] = useState({});

  const fetchColleges = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/colleges/list"
      );
      setColleges(response.data);
      console.log(response.data);
    } catch (err) {
      console.error("Error fetching Students");
    }
  };

  useEffect(() => {
    // Fetch CSRF token
    // const fetchCsrfToken = async () => {
    //   try {
    //     const response = await axios.get(
    //       "http://localhost:5000/api/csrf_token/",
    //       { withCredentials: true }
    //     );
    //     setCsrfToken(response.data.csrf_token);
    //     console.log(response.data.csrf_token);
    //   } catch (error) {
    //     console.error("Error fetching CSRF token:", error);
    //   }
    // };

    // fetchCsrfToken();
    fetchColleges();
  }, []);

  // CallBack Functions
  const afterUpdateCollege = () => {
    fetchColleges();
    setCollegeForm(false);
  };

  const afterDeleteCollege = () => {
    fetchColleges();
    setCollegeDeleteComp(false);
  };

  // Modal Operations
  const openCollegeForm = () => {
    setCollegeForm(true);
  };

  const closeCollegeForm = () => {
    setCollegeForm(false);
    setCollegeToUpdate({});
  };

  const closeCollegeDelete = () => {
    setCollegeDeleteComp(false);
  };

  // Setting College for Update
  const setUpdateCollege = (college) => {
    if (isCollegeFormOpen) return;
    setCollegeToUpdate(college);
    setCollegeForm(true);
  };

  const setDeleteCollege = (college) => {
    if (isCollegeDeleteOpen) return;
    setCollegeDelete(college);
    setCollegeDeleteComp(true);
  };

  // Conditional Render of Colleges
  const displaySearch = searchResults?.length > 0 ? searchResults : colleges;

  return (
    <div>
      <span>
        <CollegeSearch setSearchResults={setSearchResults} />
      </span>
      <button onClick={openCollegeForm}>Add College</button>

      {isCollegeFormOpen && (
        <CollegeForm
          collegeToUpdate={collegeToUpdate}
          updateCallBack={afterUpdateCollege}
          closeCollegeForm={closeCollegeForm}
        />
      )}
      {isCollegeDeleteOpen && (
        <CollegeDelete
          cancelDelete={closeCollegeDelete}
          deleteCallBack={afterDeleteCollege}
          collegeToDelete={collegeToDelete}
        />
      )}
      <CollegeList
        setDeleteCollege={setDeleteCollege}
        setUpdateCollege={setUpdateCollege}
        colleges={displaySearch}
      />
    </div>
  );
}

export default CollegePage;
