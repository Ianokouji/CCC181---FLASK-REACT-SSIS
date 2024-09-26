import { useEffect, useState } from "react";
import StudentList from "./StudentList";
import StundentForm from "./StudentForm";
import StudentDelete from "./StudentDelete";
import StudentSearch from "./StudentSearch"
import axios from "axios";


function StudentPage() {
  const [students, setStudents] = useState([]);
  const [studentToUpdate, setStudentToUpdate] = useState({});
  const [isStudentFormOpen, setStudentForm] = useState(false);
  const [isStudentDeleteOpen, setStudentDeleteComp] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState({});
  const [searchResults, setSearchResults] = useState([]);

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

  useEffect(() => {
    fetchStudents();
  }, []);

  // Callback Functions
  const afterUpdateStudent = () => {
    fetchStudents();
    setStudentForm(false);
  };

  const afterDeleteStudent = () => {
    fetchStudents();
    setStudentDeleteComp(false);
  }

  // Modal Operations
  const closeStudentForm = () => {
    setStudentForm(false);
    setStudentToUpdate({});
  };

  const closeStudentDelete = () => {
    setStudentDeleteComp(false);
    setStudentToDelete({})
  }

  const openStudentForm = () => {
    setStudentForm(true);
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
  const displaySearch = searchResults?.length > 0 ? searchResults : students

  return (
    <div>
      <div>
        <StudentSearch setSearchResults={setSearchResults} />
      </div>

      <button onClick={openStudentForm}>Add Student</button>
      {isStudentFormOpen && (
        <StundentForm
          studentToUpdate={studentToUpdate}
          updateCallBack={afterUpdateStudent}
          closeStudentForm={closeStudentForm}
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
  );
}

export default StudentPage;
