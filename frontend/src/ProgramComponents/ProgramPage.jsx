import { useState, useEffect } from "react";
import ProgramList from "./ProgramList";
import ProgramForm from "./ProgramForm";
import ProgramDelete from "./ProgramDelete";
import ProgramSearch from "./ProgramSearch";
import Failed from "../UtilityComponents/Failed";
import Success from "../UtilityComponents/Success";
import axios from "axios";

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
    }, 4000);
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

  return (
    <div>
      {modalState.type === "failed" && (
        <Failed onClose={closeModal} Message={modalState.message} />
      )}

      {modalState.type === "success" && (
        <Success onclose={closeModal} Message={modalState.message} />
      )}
      <div>
        <ProgramSearch setSearchResults={setSearchResults} />
      </div>

      <button onClick={openProgramForm}>Add Program</button>
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
  );
}
export default ProgramPage;
