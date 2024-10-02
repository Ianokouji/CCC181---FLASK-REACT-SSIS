/**
 * CollegeList Component
 * 
 * This component renders a table of colleges and allows users to initiate actions 
 * to update or delete a college. Each college row includes buttons for editing or deleting.
 * */




import { FaTrash,FaRegEdit } from "react-icons/fa";

// Recieves the `colleges` props from the the parent component to render available colleges
function CollegeList({ setDeleteCollege, setUpdateCollege, colleges }) {
  return (
    <div>
      <h1 className="college-title">Colleges</h1>

      <table>
        <div className="table-container-college">
          <thead>
            <tr>
              <th>College Code</th>
              <th>College Name</th>
            </tr>
          </thead>
          <tbody>
            {colleges.map((college) => {
              if (!college.College_Code) {
                return;
              }
              return (
                <tr key={college.College_Code}>
                  <td>{college.College_Code}</td>
                  <td>{college.College_Name}</td>
                  <td>
                    <button className="update-btn" onClick={() => setUpdateCollege(college)}>
                      <FaRegEdit/>
                    </button>
                    <button className="delete-btn" onClick={() => setDeleteCollege(college)}>
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

export default CollegeList;
