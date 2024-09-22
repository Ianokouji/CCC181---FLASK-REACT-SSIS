import { useEffect, useState, useContext } from "react";
import { CSRFContext } from "../App";
import axios from "axios";

function CollegeDelete({ cancelDelete, deleteCallBack, collegeToDelete }) {
  const csrfToken = useContext(CSRFContext);

  const deleteCollege = async () => {
    try {
      if (!collegeToDelete) {
        alert("College to Delete Could not be found");
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
      deleteCallBack();
      console.log("College deleted successfully");
    } catch (error) {
      alert(error);
      console.error(error);
    }
  };

  return (
    <>
      <div>
        <h3>Delete College</h3>
        <h5>{`Would you like to delete ${collegeToDelete.College_Name}?`}</h5>
        <button onClick={deleteCollege}>Yes</button>
        <button onClick={cancelDelete}>No</button>
      </div>
    </>
  );
}

export default CollegeDelete;
