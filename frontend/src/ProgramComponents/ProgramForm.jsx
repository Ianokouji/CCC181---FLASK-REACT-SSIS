/**
 * ProgramForm Component
 * 
 * This component handles both adding a new program and updating an existing program's information.
 * It uses form inputs to capture program details, and dynamically adjusts its behavior based 
 * on whether the form is for an update or a new entry.
 * 
 * */



import { useState, useEffect, useContext } from "react";
import { CSRFContext } from "../App";
import axios from "axios";

function ProgramForm({
  programToUpdate = {},
  updateCallBack,
  closeProgramForm,
  errorCallBack,
}) {

  // States for the fields and csrf token to be used for request
  const [colleges, setColleges] = useState([]);
  const [program_name, setProgramName] = useState("");
  const [program_code, setProgramCode] = useState("");
  const [college_code, setCollegeCode] = useState("");
  const csrfToken = useContext(CSRFContext);


  // Sets the data for the fields, if the `programToUpdate` props is empty it means the Form is adding else it is updating
  useEffect(() => {
    setProgramCode(programToUpdate.Program_Code || "");
    setProgramName(programToUpdate.Program_Name || "");
    setCollegeCode(programToUpdate.College_Code || "");
    fetchColleges();
  }, [programToUpdate]);


  // Checks for current state of the form
  const updating = Object.keys(programToUpdate).length !== 0;


  // Fetching available colleges for college ComboBox
  const fetchColleges = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/colleges/list"
      );
      setColleges(response.data);
      console.log(response.data);
    } catch (err) {
      console.error("Error fetching Colleges");
    }
  };


  // Sends request to the backend on which program to update and its new fields
  const updateProgram = async () => {
    try {
      if (!program_code || !program_name || !college_code) {
        alert("Please fill in all fields");
        return;
      }

      const response = await axios.patch(
        `http://localhost:5000/api/programs/update/${programToUpdate.Program_Code}`,
        {
          Program_Code: program_code,
          Program_Name: program_name,
          College_Code: college_code,
        },
        {
          headers: {
            "X-CSRFToken": csrfToken,
          },
          withCredentials: true,
        }
      );

      // Reseting the form after an update operation
      console.log("Program updated successsfully:", response.data);
      setProgramCode("");
      setProgramName("");
      updateCallBack(response.data.message);
    } catch (error) {
      errorCallBack(`Error in updating Program: ${error?.response?.data?.message}`)
    }
  };


   // Sends request to the backend on which program to add and its fields
  const addProgram = async () => {
    try {
      if (!program_code || !program_name || !college_code) {
        alert("Please fill in all fields");
        return;
      }

      const response = await axios.post(
        "http://localhost:5000/api/programs/add",
        {
          Program_Code: program_code,
          Program_Name: program_name,
          College_Code: college_code,
        },
        {
          headers: {
            "X-CSRFToken": csrfToken,
          },
          withCredentials: true,
        }
      );

      // Reseting the form after an add operation
      console.log("Program added successsfully:", response.data);
      setProgramCode("");
      setProgramName("");
      updateCallBack(response.data.message);
    } catch (error) {
      errorCallBack(`Error adding Program: ${error?.response?.data?.message}`)
    }
  };


  // Handling the render of the form based on which state it is in
  const getOperation = () => {
    updating ? updateProgram() : addProgram();
  };


  // Handlers for input change in the fields
  const handleComboBox = (e) => {
    setCollegeCode(e.target.value);
  };


  // Actual Form skeleton
  return (
    <div className="form">
      <span
        className="closeForm"
        onClick={closeProgramForm}
        style={{ cursor: "pointer" }}
      >
        &times;
      </span>
      <h3> {updating ? "Update Program" : "Add Program"}</h3>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="Program Code"
          value={program_code}
          onChange={(e) => setProgramCode(e.target.value)}
        />
        <input
          type="text"
          placeholder="Program Name"
          value={program_name}
          onChange={(e) => setProgramName(e.target.value)}
        />
        <select value={college_code} onChange={handleComboBox}>
            <option value="">Select College</option>
          {colleges.map((college) => (
            <option key={college.College_Code} value={college.College_Code}>
              {college.College_Code}
            </option>
          ))}
        </select>
        <button onClick={getOperation}>
          {updating ? "Update Program" : "Add Program"}
        </button>
      </form>
    </div>
  );
}

export default ProgramForm;
