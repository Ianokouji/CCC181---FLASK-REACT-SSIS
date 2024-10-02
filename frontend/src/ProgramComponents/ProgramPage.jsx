/**
 * ProgramPage Component
 * 
 * This is the main component for managing programs. It handles:
 * - Listing programs.
 * - Searching for programs.
 * - Adding, updating, and deleting programss.
 * 
 * It includes multiple child components such as `ProgramList`, `ProgramForm`, `ProgramDelete`, 
 * and `ProgramSearch`. It also manages the modal state for displaying success or error messages.
 * 
 * 
 * */




import { useState, useEffect } from "react";
import ProgramList from "./ProgramList";
import ProgramForm from "./ProgramForm";
import ProgramDelete from "./ProgramDelete";
import ProgramSearch from "./ProgramSearch";
import Failed from "../UtilityComponents/Failed";
import Success from "../UtilityComponents/Success";
import Navbar from "../UtilityComponents/Navbar";
import axios from "axios";


// Component Initialization
function ProgramPage() {
  const [programs, setPrograms] = useState([]);
  const [programToUpdate, setProgramToUpdate] = useState({});
  const [isProgramFormOpen, setProgramForm] = useState(false);
  const [isProgramDeleteOpen, setProgramDeleteComp] = useState(false);
  const [programTodelete, setProgramToDelete] = useState({});
  const [searchResults, setSearchResults] = useState([]);
  const [modalState, setModalState] = useState({
    type: null,
    message: "",
  });

  const fetchPrograms = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/programs/list"
      );
      setPrograms(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error in fetching programs", error);
    }
  };

  // Fetch student data everytime the component mounts
  useEffect(() => {
    fetchPrograms();
  }, []);

  // Callback Functions
  const afterUpdateProgram = (message) => {
    fetchPrograms();
    setProgramForm(false);
    showModal("success", message);
  };

  const afterDeleteProgram = (message) => {
    fetchPrograms();
    setProgramDeleteComp(false);
    showModal("success", message);
  };

  const errorCallBack = (message) => {
    showModal("failed", message);
  };

  // Modal Operations
  const closeProgramForm = () => {
    setProgramForm(false);
    setProgramToUpdate({});
  };

  const closeProgramDelete = () => {
    setProgramDeleteComp(false);
    setProgramToDelete({});
  };

  const openProgramForm = () => {
    setProgramForm(true);
  };


  // Modal Operations for responses
  const closeModal = function () {
    setModalState({
      type: null,
      message: "",
    });
  };

  const showModal = function (type, message) {
    setModalState({
      type: type,
      message: message,
    });

    setTimeout(() => {
      closeModal();
    }, 10000);
  };

  // Setting Program for Operations
  const setUpdateProgram = (program) => {
    if (isProgramFormOpen) return;
    setProgramToUpdate(program);
    setProgramForm(true);
  };

  const setDeleteProgram = (program) => {
    if (isProgramDeleteOpen) return;
    setProgramToDelete(program);
    setProgramDeleteComp(true);
  };

  // Conditional Render of Programs
  const displaySearch = searchResults?.length > 0 ? searchResults : programs;


  // Rendering the child components and passing the proper props
  return (
    <div className="parent-div">
      <div className="side-div">
        <Navbar/>
      </div>
      <div className="outer-content-div">
        <div className="search-div">
          <ProgramSearch setSearchResults={setSearchResults} />
        </div>

        <div className="content-div program-content">
          <div className="transparency">
            {modalState.type === "failed" && (
              <Failed onClose={closeModal} Message={modalState.message} />
            )}

            {modalState.type === "success" && (
              <Success onclose={closeModal} Message={modalState.message} />
            )}
            <button className="add-btn" onClick={openProgramForm}>
              Add Program
            </button>
            {isProgramFormOpen && (
              <ProgramForm
                programToUpdate={programToUpdate}
                updateCallBack={afterUpdateProgram}
                closeProgramForm={closeProgramForm}
                errorCallBack={errorCallBack}
              />
            )}

            {isProgramDeleteOpen && (
              <ProgramDelete
                cancelDelete={closeProgramDelete}
                deleteCallback={afterDeleteProgram}
                programToDelete={programTodelete}
              />
            )}

            <ProgramList
              setDeleteProgram={setDeleteProgram}
              setUpdateProgram={setUpdateProgram}
              programs={displaySearch}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProgramPage;
