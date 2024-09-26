import { useState, useEffect, useContext } from "react";
import { CSRFContext } from "../App";
import axios from "axios";

function ProgramForm({
  programToUpdate = {},
  updateCallBack,
  closeProgramForm,
}) {
  const [colleges, setColleges] = useState([]);
  const [program_name, setProgramName] = useState("");
  const [program_code, setProgramCode] = useState("");
  const [college_code, setCollegeCode] = useState("");
  const csrfToken = useContext(CSRFContext);

  useEffect(() => {
    setProgramCode(programToUpdate.Program_Code || "");
    setProgramName(programToUpdate.Program_Name || "");
    setCollegeCode(programToUpdate.College_Code || "");
    fetchColleges();
  }, [programToUpdate]);

  const updating = Object.keys(programToUpdate).length !== 0;

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
      console.log("Program updated successsfully:", response.config.data);
      setProgramCode("");
      setProgramName("");
      updateCallBack();
    } catch (error) {
      alert(error?.response?.data?.message);
      console.error("Error updating Program:", error?.response?.data?.message);
    }
  };

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
      console.log("Program added successsfully:", response.config.data);
      setProgramCode("");
      setProgramName("");
      updateCallBack();
    } catch (error) {
      alert(error?.response?.data?.message);
      console.error("Error adding Program:", error?.response?.data?.message);
    }
  };

  const getOperation = () => {
    updating ? updateProgram() : addProgram();
  };

  const handleComboBox = (e) => {
    setCollegeCode(e.target.value);
  };

  return (
    <div>
      <span
        className="closeProgramForm"
        onClick={closeProgramForm}
        style={{ cursor: "pointer" }}
      >
        &times;
      </span>
      <h3>Add Program</h3>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="Program Code"
          value={program_code}
          onChange={(e) => setProgramCode(e.target.value)}
        />
        <input
          type="text"
          placeholder="College Name"
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
