/**
 * StudentPage Component
 * 
 * This is the main component for managing students. It handles:
 * - Listing students.
 * - Searching for students.
 * - Adding, updating, and deleting students.
 * 
 * It includes multiple child components such as `StudentList`, `StudentForm`, `StudentDelete`, 
 * and `StudentSearch`. It also manages the modal state for displaying success or error messages.
 * 
 * 
 * */
import { useEffect, useState } from "react";
import StudentList from "./StudentList";
import StundentForm from "./StudentForm";
import StudentDelete from "./StudentDelete";
import StudentSearch from "./StudentSearch";
import Failed from "../UtilityComponents/Failed";
import Success from "../UtilityComponents/Success";
import Navbar from "../UtilityComponents/Navbar";
import axios from "axios";


// Component Initialization
function StudentPage() {
  const [students, setStudents] = useState([]);
  const [studentToUpdate, setStudentToUpdate] = useState({});
  const [isStudentFormOpen, setStudentForm] = useState(false);
  const [isStudentDeleteOpen, setStudentDeleteComp] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState({});
  const [searchResults, setSearchResults] = useState([]);
  const [modalState, setModalState] = useState({
    type: null,
    message: "",
  });

  const fetchStudents = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/students/list`
      );
      setStudents(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error in fetching Students", error);
    }
  };

  // Fetch student data everytime the component mounts
  useEffect(() => {
    fetchStudents();
  }, []);

  // Callback Functions
  const afterUpdateStudent = (message) => {
    fetchStudents();
    setStudentForm(false);
    showModal("success", message);
  };

  const afterDeleteStudent = (message) => {
    fetchStudents();
    setStudentDeleteComp(false);
    showModal("success", message);
  };

  const errorCallback = (message) => {
    showModal("failed", message);
  };

  // Modal Operations
  const closeStudentForm = () => {
    setStudentForm(false);
    setStudentToUpdate({});
  };

  const closeStudentDelete = () => {
    setStudentDeleteComp(false);
    setStudentToDelete({});
  };

  const openStudentForm = () => {
    setStudentForm(true);
  };

  // Modal Operations for responses
  const closeModal = function () {
    setModalState({
      type: null,
      message: "",
    });
  };

  const showModal = function (type, message) {
    setModalState({
      type: type,
      message: message,
    });

    setTimeout(() => {
      closeModal();
    }, 10000);
  };

  // Setting Student for Operations
  const setUpdateStudent = (student) => {
    if (isStudentFormOpen) return;
    setStudentToUpdate(student);
    setStudentForm(true);
  };

  const setDeleteStudent = (student) => {
    if (isStudentDeleteOpen) return;
    setStudentToDelete(student);
    setStudentDeleteComp(true);
  };

  // Conditional Render of Students
  const displaySearch = searchResults?.length > 0 ? searchResults : students;

  // Rendering the child components and passing the proper props
  return (
    <div className="parent-div">
      <div className="side-div">
        <Navbar/>
      </div>
      <div className="outer-content-div">
        <div className="search-div">
          <StudentSearch setSearchResults={setSearchResults} />
        </div>

        <div className="content-div">
          <div className="transparency">
            {modalState.type === "failed" && (
              <Failed onClose={closeModal} Message={modalState.message} />
            )}

            {modalState.type === "success" && (
              <Success Message={modalState.message} onclose={closeModal} />
            )}

            <button className="add-btn" onClick={openStudentForm}>Add Student</button>
            {isStudentFormOpen && (
              <StundentForm
                studentToUpdate={studentToUpdate}
                updateCallBack={afterUpdateStudent}
                closeStudentForm={closeStudentForm}
                errorCallback={errorCallback}
              />
            )}

            {isStudentDeleteOpen && (
              <StudentDelete
                cancelDelete={closeStudentDelete}
                deleteCallBack={afterDeleteStudent}
                studentToDelete={studentToDelete}
              />
            )}
            <StudentList
              setUpdateStudent={setUpdateStudent}
              setDeleteStudent={setDeleteStudent}
              students={displaySearch}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentPage;
