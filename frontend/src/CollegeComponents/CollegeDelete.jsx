/**
 * CollegeDelete Component
 * 
 * This component displays a confirmation dialog for deleting a college. 
 * It prompts the user to confirm the action before making the deletion.
 * 
 * */




import { useContext } from "react";
import { CSRFContext } from "../App";
import axios from "axios";

// Sends request to the backend containing which college to delete based on the `collegeToDelete` props and sends the response to the parent component
function CollegeDelete({ cancelDelete, deleteCallBack, collegeToDelete }) {
  const csrfToken = useContext(CSRFContext);

  const deleteCollege = async () => {
    try {
      if (!collegeToDelete) {
        alert("College to Delete could not be found!");
        return;
      }

      const request = await axios.delete(
        `http://localhost:5000/api/colleges/delete/${collegeToDelete.College_Code}`,
        {
          headers: {
            "X-CSRFToken": csrfToken,
          },
          withCredentials: true,
        }
      );
      deleteCallBack(request.data.message);
      console.log("College deleted successfully");
    } catch (error) {
      alert(error);
      console.error(error);
    }
  };

  // Actual skeleton of the Component
  return (
    <>
      <div className="delete">
        <h1 className="delete-warning">WARNING</h1>
        <h2>Delete College</h2>
        <p>{`Would you like to delete ${collegeToDelete.College_Name}?`}</p>
        <div className="options-delete">
          <button className="confirm-delete" onClick={deleteCollege}>
            Yes
          </button>
          <button className="cancel-delete" onClick={cancelDelete}>
            No
          </button>
        </div>
      </div>
    </>
  );
}

export default CollegeDelete;
