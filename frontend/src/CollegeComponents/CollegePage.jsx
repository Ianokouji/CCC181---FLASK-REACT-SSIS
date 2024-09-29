import { useEffect, useState, useContext, createContext } from "react";
import CollegeList from "./CollegeList";
import CollegeForm from "./CollegeForm";
import CollegeDelete from "./CollegeDelete";
import CollegeSearch from "./CollegeSearch";
import Failed from "../UtilityComponents/Failed";
import Success from "../UtilityComponents/Success";
import axios from "axios";



function CollegePage() {
  const [colleges, setColleges] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isCollegeFormOpen, setCollegeForm] = useState(false);
  const [collegeToUpdate, setCollegeToUpdate] = useState({});
  const [isCollegeDeleteOpen, setCollegeDeleteComp] = useState(false);
  const [collegeToDelete, setCollegeToDelete] = useState({});
  const [modalState,setModalState] = useState({
    type: null,
    message: "",
  });

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

  useEffect(() => {
    fetchColleges();
  }, []);

  // CallBack Functions
  const afterUpdateCollege = (message) => {
    fetchColleges();
    setCollegeForm(false);
    showModal("success",message);
  };

  const afterDeleteCollege = (message) => {
    fetchColleges();
    setCollegeDeleteComp(false);
    showModal("success",message);
  };

  const errorCallBack = (message) => {
    showModal("failed",message);
  }

  // Modal Operations
  const openCollegeForm = () => {
    setCollegeForm(true);
  };

  const closeCollegeForm = () => {
    setCollegeForm(false);
    setCollegeToUpdate({});
  };

  const closeCollegeDelete = () => {
    setCollegeDeleteComp(false);
  };

  
  const closeModal = function(){
    setModalState({
      type: null,
      message: "",
    });
  };

  const showModal = function(type,message){
    setModalState({
      type: type,
      message: message,
    });

    setTimeout(() => {
      closeModal();
    },4000);
  };



  // Setting College for Update
  const setUpdateCollege = (college) => {
    if (isCollegeFormOpen) return;
    setCollegeToUpdate(college);
    setCollegeForm(true);
  };

  const setDeleteCollege = (college) => {
    if (isCollegeDeleteOpen) return;
    setCollegeToDelete(college);
    setCollegeDeleteComp(true);
  };

  // Conditional Render of Colleges
  const displaySearch = searchResults?.length > 0 ? searchResults : colleges;

  return (
    <div>
      {modalState.type === 'failed' && <Failed onClose={closeModal} Message={modalState.message}/>}

      {modalState.type === 'success' && <Success onclose={closeModal} Message={modalState.message}/>}
      <div>
        <CollegeSearch setSearchResults={setSearchResults} />
      </div>
      <button onClick={openCollegeForm}>Add College</button>

      {isCollegeFormOpen && (
        <CollegeForm
          collegeToUpdate={collegeToUpdate}
          updateCallBack={afterUpdateCollege}
          closeCollegeForm={closeCollegeForm}
          errorCallBack={errorCallBack}
        />
      )}
      {isCollegeDeleteOpen && (
        <CollegeDelete
          cancelDelete={closeCollegeDelete}
          deleteCallBack={afterDeleteCollege}
          collegeToDelete={collegeToDelete}
        />
      )}
      <CollegeList
        setDeleteCollege={setDeleteCollege}
        setUpdateCollege={setUpdateCollege}
        colleges={displaySearch}
      />
    </div>
  );
}

export default CollegePage;
