/**
 * ProgramList Component
 * 
 * This component renders a table of programs and allows users to initiate actions 
 * to update or delete a program. Each program row includes buttons for editing or deleting.
 * */



import { FaTrash,FaRegEdit } from "react-icons/fa";

// Recieves the `programs` props from the the parent component to render available programs
function ProgramList({ setDeleteProgram, setUpdateProgram, programs }) {
  return (
    <div>
      <h1 className="program-title">Programs</h1>
      <table>
        <div className="table-container-program">
        <thead>
          <tr>
            <th>Program Code</th>
            <th>Program Name</th>
            <th>College Code</th>
          </tr>
        </thead>
        <tbody>
          {programs.map((program) => {
            if (!program.Program_Code) {
              return;
            }
            return (
              <tr key={program.Program_Code}>
                <td>{program.Program_Code}</td>
                <td>{program.Program_Name}</td>
                <td>{program.College_Code}</td>
                <td>
                  <button className="update-btn" onClick={() => setUpdateProgram(program)}>
                    <FaRegEdit/>
                  </button>
                  <button className="delete-btn" onClick={() => setDeleteProgram(program)}>
                    <FaTrash/>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
        </div>
      </table>
    </div>
  );
}

export default ProgramList;
