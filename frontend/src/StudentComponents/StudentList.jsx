/**
 * StudentList Component
 * 
 * This component renders a table of students and allows users to initiate actions 
 * to update or delete a student. Each student row includes buttons for editing or deleting.
 * */

import { FaTrash,FaRegEdit } from "react-icons/fa";

// Recieves the `students` props from the the parent component to render available students
function StudentList({ setDeleteStudent, setUpdateStudent, students }) {
  return (
    <div>
      <h1>Students</h1>
      <table>
        <div className="table-container-student">
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
                  <button className="update-btn" onClick={() => setUpdateStudent(student)}>
                    <FaRegEdit/>
                  </button>
                  <button className="delete-btn" onClick={() => setDeleteStudent(student)}>
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

export default StudentList;
