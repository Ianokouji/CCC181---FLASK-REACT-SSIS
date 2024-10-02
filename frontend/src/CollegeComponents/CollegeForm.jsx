/**
 * CollegeForm Component
 * 
 * This component handles both adding a new college and updating an existing college's information.
 * It uses form inputs to capture college details, and dynamically adjusts its behavior based 
 * on whether the form is for an update or a new entry.
 * 
 * */



import { useState, useEffect, useContext } from "react";
import { CSRFContext } from "../App";
import axios from "axios";

function CollegeForm({
  collegeToUpdate = {},
  updateCallBack,
  closeCollegeForm,
  errorCallBack,
}) {

  // States for the fields and csrf token to be used for request
  const [college_name, setCollegeName] = useState("");
  const [college_code, setCollegeCode] = useState("");
  const csrfToken = useContext(CSRFContext);
  

  // Sets the data for the fields, if the `collegeToUpdate` props is empty it means the Form is adding else it is updating
  useEffect(() => {
    setCollegeCode(collegeToUpdate.College_Code || "");
    setCollegeName(collegeToUpdate.College_Name || "");
  }, [collegeToUpdate]);

  // Checks for current state of the form
  const updating = Object.keys(collegeToUpdate).length !== 0;


  // Sends request to the backend on which college to update and its new fields
  const updateCollege = async () => {
    try {
      // Check fields before sending request
      if (!college_code || !college_name) {
        alert("Please fill in both fields");
        return;
      }

      const response = await axios.patch(
        `http://localhost:5000/api/colleges/update/${collegeToUpdate.College_Code}`,
        {
          College_Code: college_code,
          College_Name: college_name,
        },
        {
          headers: {
            "X-CSRFToken": csrfToken,
          },
          withCredentials: true,
        }
      );

      // Reseting the form after an update operation
      console.log("College updated successfully", response.data);
      setCollegeCode("");
      setCollegeName("");
      updateCallBack(response.data.message);
    } catch (error) {
      errorCallBack(`Error in updating College ${error?.response?.data?.message}`);
    }
  };


  // Sends request to the backend on which college to add and its fields
  const addCollege = async () => {
    try {
      // Validate fields before sending request
      if (!college_code || !college_name) {
        alert("Please fill in both fields");
        return;
      }

      const response = await axios.post(
        "http://localhost:5000/api/colleges/add",
        {
          College_Code: college_code,
          College_Name: college_name,
        },
        {
          headers: {
            "X-CSRFToken": csrfToken,
          },
          withCredentials: true,
        }
      );

      // Reseting the form after an add operation
      console.log("College added successfully:", response.data);
      setCollegeCode("");
      setCollegeName("");
      updateCallBack(response.data.message);
    } catch (error) {
      errorCallBack(`Error adding college: ${error?.response?.data?.message}`)
    }
  };

  // Handling the render of the form based on which state it is in
  const getOperation = () => {
    updating ? updateCollege() : addCollege();
  };

  
  // Actual Form skeleton
  return (
    <div className="form">
      <span
        className="closeForm"
        onClick={closeCollegeForm}
        style={{ cursor: "pointer" }}
      >
        &times;
      </span>
      <h3>{updating ? "Update College" : "Add College"}</h3>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="College Code"
          value={college_code}
          onChange={(e) => setCollegeCode(e.target.value)}
        />
        <input
          type="text"
          placeholder="College Name"
          value={college_name}
          onChange={(e) => setCollegeName(e.target.value)}
        />
        <button onClick={getOperation}>
          {updating ? "Update College" : "Add College"}
        </button>
      </form>
    </div>
  );
}

export default CollegeForm;
