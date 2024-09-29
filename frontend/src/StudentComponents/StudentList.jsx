function StudentList({ setDeleteStudent, setUpdateStudent, students }) {
  return (
    <div>
      <h1>Students</h1>
      <table>
        <thead>
          <tr>
            <th>Student ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Year Level</th>
            <th>Gender</th>
            <th>Program Code</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => {
            console.log(student.Student_Id);
            if (!student.Student_Id) {
              return;
            }
            return (
              <tr key={student.Student_Id}>
                <td>{student.Student_Id}</td>
                <td>{student.FirstName}</td>
                <td>{student.LastName}</td>
                <td>{student.Year_Level}</td>
                <td>{student.Gender}</td>
                <td>{student.Program_Code}</td>
                <td>
                  <button onClick={() => setUpdateStudent(student)}>
                    Update
                  </button>
                  <button onClick={() => setDeleteStudent(student)}>
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default StudentList;
