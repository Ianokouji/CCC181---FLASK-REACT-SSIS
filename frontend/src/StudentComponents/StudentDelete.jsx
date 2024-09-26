import { useContext } from "react";
import { CSRFContext } from "../App";
import axios from "axios";

function StudentDelete({cancelDelete, deleteCallBack, studentToDelete}) {
    const csrfToken = useContext(CSRFContext);
    
    const deleteStudent = async () => {
        try {
            if(!studentToDelete) {
                alert("Student to Delete could not be found!");
                return;
            }

            const request = await axios.delete(
                `http://localhost:5000/api/students/delete/${studentToDelete.Student_Id}`,
                {
                    headers: {
                        "X-CSRFToken": csrfToken,
                    },
                    withCredentials: true,
                }
            );
            deleteCallBack()
        } catch (error) {
            alert(error);
            console.error(error);
        }
    }

    return (
        <div>
            <h3>Delete Student</h3>
            <p>{`Would you like to delete Student ${studentToDelete.Student_Id}?`}</p>
            <button onClick={deleteStudent}>Yes</button>
            <button onClick={cancelDelete}>No</button>
        </div>
    )
}

export default StudentDelete;