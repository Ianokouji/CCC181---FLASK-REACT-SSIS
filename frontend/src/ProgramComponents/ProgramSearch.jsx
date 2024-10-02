/**
 * ProgramSearch Component
 * 
 * This component provides a search bar that allows users to search for programs by either 
 * Program Code, Program Name and College Code, using a dropdown to choose the search type.
 * 
 * 
 * */




import { useEffect, useState } from "react";
import axios from "axios";

function ProgramSearch({ setSearchResults }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("P_CODE");
  const [isSearchNotFound, setSearchNotFound] = useState(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(null);           // Track the cancel token


  // Sends request to the backend and returns the response to the parent component
  const searchProgram = async (input, cancelToken) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/programs/search/${searchType}/${input}`,
        { cancelToken: cancelToken.token }
      );
      setSearchResults(response.data);

      // Set not found state if no results
      if (response.data.length === 0) {
        setSearchNotFound(true);
        setSearchResults([""]);
      } else {
        setSearchNotFound(false);
      }
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Request canceled", error.message);
      } else {
        console.error("Error in searching Programs: ", error);
      }
    }
  };

 

  useEffect(() => {
    if (searchQuery.length === 0) {
      setSearchResults([]);
      setSearchNotFound(false);
    } else {
      // Cancel the previous request if it exists
      if (cancelTokenSource) {
        cancelTokenSource.cancel("Operation cancel due to new request!");
      }

      // Create a new cancel token
      const source = axios.CancelToken.source();
      setCancelTokenSource(source);

       // Set a timeout for debouncing
      const timer = setTimeout(() => {
        searchProgram(searchQuery, source);
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
  }, [searchQuery, searchType]);

  // Handler for the changes in the fields 
  const handleInput = async (e) => {
    setSearchQuery(e.target.value);
  };

  const handleType = (e) => {
    setSearchType(e.target.value);
  };

  // Available search types
  const searchTypes = {
    P_CODE: "Program Code",
    C_CODE: "College Code",
    NAME: "Program Name",
  };

  // Skeleton render of the Program search Component
  return (
    <div className="search">
      {isSearchNotFound && <h3>Program Not Found</h3>}
      <div>
        <select value={searchType} onChange={handleType}>
          <option value="P_CODE">Program Code</option>
          <option value="NAME">Program Name</option>
          <option value="C_CODE">College Code</option>
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

export default ProgramSearch;
