/**
 * ProgramDelete Component
 * 
 * This component displays a confirmation dialog for deleting a program. 
 * It prompts the user to confirm the action before making the deletion.
 * 
 * */


import { useContext } from "react";
import { CSRFContext } from "../App";
import axios from "axios";


// Sends request to the backend containing which program to delete based on the `programsToDelete` props and sends the response to the parent component
function ProgramDelete({ cancelDelete, deleteCallback, programToDelete }) {
  const csrfToken = useContext(CSRFContext);

  const deleteProgram = async () => {
    try {
      if (!programToDelete) {
        alert("Program to Delete could not be found!");
        return;
      }

      const request = await axios.delete(
        `http://localhost:5000/api/programs/delete/${programToDelete.Program_Code}`,
        {
          headers: {
            "X-CSRFToken": csrfToken,
          },
          withCredentials: true,
        }
      );
      deleteCallback(request.data.message);
      console.log("Program Deleted succcessfully");
    } catch (error) {
      alert(error);
      console.error(error);
    }
  };


  // Actual skeleton of the Component
  return (
    <div className="delete">
      <h1 className="delete-warning">WARNING</h1>
      <h2>Delete Program</h2>
      <p>{`Would you like to delete ${programToDelete.Program_Name}`}</p>
      <div className="options-delete">
      <button className="confirm-delete" onClick={deleteProgram}>Yes</button>
      <button className="cancel-delete" onClick={cancelDelete}>No</button>
      </div>
    </div>
  );
}

export default ProgramDelete;
