import { useState, useEffect } from "react";
import ProgramList from "./ProgramList";
import ProgramForm from "./ProgramForm";
import ProgramDelete from "./ProgramDelete";
import ProgramSearch from "./ProgramSearch";
import axios from "axios";

function ProgramPage() {
  const [programs, setPrograms] = useState([]);
  const [programToUpdate, setProgramToUpdate] = useState({});
  const [isProgramFormOpen, setProgramForm] = useState(false);
  const [isProgramDeleteOpen, setProgramDeleteComp] = useState(false);
  const [programTodelete, setProgramToDelete] = useState({});
  const [searchResults, setSearchResults] = useState([]);

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
  const afterUpdateProgram = () => {
    fetchPrograms();
    setProgramForm(false);
  };

  const afterDeleteProgram = () => {
    fetchPrograms();
    setProgramDeleteComp(false);
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
      <div>
        <ProgramSearch setSearchResults={setSearchResults} />
      </div>

      <button onClick={openProgramForm}>Add Program</button>
      {isProgramFormOpen && (
        <ProgramForm
          programToUpdate={programToUpdate}
          updateCallBack={afterUpdateProgram}
          closeProgramForm={closeProgramForm}
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
