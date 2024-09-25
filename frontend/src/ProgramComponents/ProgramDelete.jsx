import { useContext } from "react";
import { CSRFContext } from "../App";
import axios from "axios";


function ProgramDelete({cancelDelete, deleteCallback, programToDelete}) {
    const csrfToken = useContext(CSRFContext)
    
    const deleteProgram = async () => {
        try {
            if(!programToDelete) {
                alert("Program to Delete could not be found!")
                return
            }

            const request = await axios.delete(
                `http://localhost:5000/api/programs/delete/${programToDelete.Program_Code}`,
                {
                    headers: {
                        "X-CSRFToken": csrfToken,
                    },
                    withCredentials: true,
                }       
            );
            deleteCallback();
            console.log("Program Deleted succcessfully");
        } catch (error) {
            alert(error)
            console.error(error)
        }
    }

    return (
        <div>
            <h3>Delete Program</h3>
            <p>{`Would you like to delete ${programToDelete.Program_Name}`}</p>
            <button onClick={deleteProgram}>Yes</button>
            <button onClick={cancelDelete}>No</button>
        </div>
    )
}

export default ProgramDelete;