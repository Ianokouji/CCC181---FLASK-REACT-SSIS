function ProgramList({ setDeleteProgram ,setUpdateProgram,programs }) {
  return (
    <div>
        <h1>Programs</h1>
      <table>
        <thead>
          <tr>
            <th>Program Code</th>
            <th>Program Name</th>
            <th>College Code</th>
          </tr>
        </thead>
        <tbody>
          {programs.map((program) => {
            return (
              <tr key={program.Program_Code}>
                <td>{program.Program_Code}</td>
                <td>{program.Program_Name}</td>
                <td>{program.College_Code}</td>
                <td>
                  <button onClick={() => setUpdateProgram(program)}>Update</button>
                  <button onClick={() => setDeleteProgram(program)}>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ProgramList;
