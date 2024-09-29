import { useState, useEffect, useContext } from "react";
import { CSRFContext } from "../App";
import axios from "axios";

function CollegeForm({
  collegeToUpdate = {},
  updateCallBack,
  closeCollegeForm,
  errorCallBack,
}) {
  const [college_name, setCollegeName] = useState("");
  const [college_code, setCollegeCode] = useState("");
  const csrfToken = useContext(CSRFContext);
  // console.log(csrfToken);

  useEffect(() => {
    setCollegeCode(collegeToUpdate.College_Code || "");
    setCollegeName(collegeToUpdate.College_Name || "");
  }, [collegeToUpdate]);

  const updating = Object.keys(collegeToUpdate).length !== 0;

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
      console.log("College updated successfully", response.data);
      setCollegeCode("");
      setCollegeName("");
      updateCallBack(response.data.message);
    } catch (error) {
      errorCallBack(`Error in updating College ${error?.response?.data?.message}`);
    }
  };

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
      console.log("College added successfully:", response.data);
      setCollegeCode("");
      setCollegeName("");
      updateCallBack(response.data.message);
    } catch (error) {
      errorCallBack(`Error adding college: ${error?.response?.data?.message}`)
    }
  };

  const getOperation = () => {
    updating ? updateCollege() : addCollege();
  };

  return (
    <div>
      <span
        className="closeCollegeForm"
        onClick={closeCollegeForm}
        style={{ cursor: "pointer" }}
      >
        &times;
      </span>
      <h3>Add College</h3>
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
