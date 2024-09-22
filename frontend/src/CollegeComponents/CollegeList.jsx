import { useEffect, useState } from "react";
// import { CSRFContext } from "./CollegePage";
import axios from "axios";

function CollegeList({ setDeleteCollege, setUpdateCollege, colleges }) {
  return (
    <div>
      <h1>Colleges</h1>

      <table>
        <thead>
          <tr>
            <th>College Code</th>
            <th>College Name</th>
          </tr>
        </thead>
        <tbody>
          {colleges.map((college) => {
            return (
              <tr key={college.College_Code}>
                <td>{college.College_Code}</td>
                <td>{college.College_Name}</td>
                <td>
                  <button onClick={() => setUpdateCollege(college)}>
                    Update
                  </button>
                  <button onClick={() => setDeleteCollege(college)}>
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

export default CollegeList;
