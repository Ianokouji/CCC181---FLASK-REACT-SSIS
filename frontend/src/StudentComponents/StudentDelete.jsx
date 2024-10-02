/**
 * StudentDelete Component
 * 
 * This component displays a confirmation dialog for deleting a student. 
 * It prompts the user to confirm the action before making the deletion.
 * 
 * */

import { useContext } from "react";
import { CSRFContext } from "../App";
import axios from "axios";

function StudentDelete({ cancelDelete, deleteCallBack, studentToDelete }) {
  const csrfToken = useContext(CSRFContext);

  // Sends request to the backend containing which student to delete base on the `studentToDelete` props and sends the response to the parent component 
  const deleteStudent = async () => {
    try {
      if (!studentToDelete) {
        alert("Student to Delete could not be found!");
        return;
      }

      const request = await axios.delete(
        `http://localhost:5000/api/students/delete/${studentToDelete.Student_Id}`,
        {
          headers: {
            "X-CSRFToken": csrfToken,
          },
          withCredentials: true,
        }
      );
      deleteCallBack(request.data.message);
      console.log(request.data.message);
    } catch (error) {
      alert(error);
      console.error(error);
    }
  };


  // Actual skeleton of the Component
  return (
    <div className="delete">
      <h1 className="delete-warning">WARNING</h1>
      <h2>Delete Student</h2>
      <p>{`Would you like to delete Student ${studentToDelete.Student_Id}?`}</p>
      <div className="options-delete">
      <button className="confirm-delete" onClick={deleteStudent}>Yes</button>
      <button className="cancel-delete" onClick={cancelDelete}>No</button>
      </div>
    </div>
  );
}

export default StudentDelete;
