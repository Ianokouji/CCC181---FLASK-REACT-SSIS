import { useState, useEffect } from "react";
import axios from "axios";

function StudentSearch({ setSearchResults }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("ID");
  const [isSearchNotFound, setSearchNotFound] = useState(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(null); // Track the cancel token

  const searchStudent = async (input, cancelToken) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/students/search/${searchType}/${input}`,
        { cancelToken: cancelToken.token }
      );

      setSearchResults(response.data);

      // Set not found state if no results
      response.data.length === 0
        ? setSearchNotFound(true)
        : setSearchNotFound(false);
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Request canceled", error.message);
      } else {
        console.error("Error in searching students: ", error);
      }
    }
  };

  const handleInput = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    if (searchQuery.length === 0) {
      // Clear search results if input is empty
      setSearchResults([]);
      setSearchNotFound(false);
    } else {
      // Cancel the previous request if it exists
      if (cancelTokenSource) {
        cancelTokenSource.cancel("Operation canceled due to new request.");
      }

      // Create a new cancel token
      const source = axios.CancelToken.source();
      setCancelTokenSource(source);

      // Set a timeout for debouncing
      const timer = setTimeout(() => {
        searchStudent(searchQuery, source);
      }, 300);

      // Clean up timeout and cancel token on effect cleanup
      return () => {
        clearTimeout(timer);
        if (source) {
          source.cancel(
            "Operation canceled due to component unmount or new request."
          );
        }
      };
    }
  }, [searchQuery, searchType]); // Added searchType as a dependency to reset on type change

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
        <input
          type="text"
          placeholder={`Search by ${searchTypes[searchType]}`}
          value={searchQuery}
          onChange={handleInput}
        />
      </div>
    </div>
  );
}

export default StudentSearch;
