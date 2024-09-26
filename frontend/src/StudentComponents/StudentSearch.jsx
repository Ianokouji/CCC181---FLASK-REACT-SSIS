import { useState } from "react";
import axios from "axios";

function StudentSearch({ setSearchResults }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchType, setSearchType] = useState("ID");
    const [isSearchNotFound,setSearchNotFound] = useState(false);


    const handleInput = async (e) => {
        const input = e.target.value;
        setSearchQuery(input);

        if (input.length === 0) {
            setSearchResults([]);
            setSearchNotFound(false)
            return;
        }

        try {
            const response = await axios.get(
                `http://localhost:5000/api/students/search/${searchType}/${input}`
            );
            setSearchResults(response.data);

            response.data.length === 0
            ? setSearchNotFound(true)
            : setSearchNotFound(false);
        } catch (error) {
            console.error("Error in searching Programs: ", error);
        }
    };
    
    const handleType = (e) => {
        setSearchType(e.target.value);
    };

    const searchTypes = {
        ID: "Student ID",
        FIRST: "First Name",
        LAST: "Last Name",
    };

    return (
        <div>
            {isSearchNotFound && <h3>Student Not Found</h3>}
            <div>
                <select value={searchType} onChange={handleType}>
                    <option value="ID">ID</option>
                    <option value="FIRST">First Name</option>
                    <option value="LAST">Last Name</option>
                </select>
            </div>

            <div>
                <input type="text" 
                placeholder= {`Search by ${searchTypes[searchType]}`}
                value={searchQuery}
                onChange={handleInput}
                />
            </div>
        </div>
    )
}

export default StudentSearch;

