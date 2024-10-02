/**
 * CollegeSearch Component
 * 
 * This component provides a search bar that allows users to search for colleges by either 
 * College Code or College Name, using a dropdown to choose the search type.
 * 
 * 
 * */





import { useEffect, useState } from "react";
import axios from "axios";

function CollegeSearch({ setSearchResults }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("Code");
  const [isSearchNotFound, setSearchNotFound] = useState(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(null);             // Track the cancel token


  // Sends request to the backend and returns the response to the parent component
  const searchCollege = async (input, cancelToken) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/colleges/search/${searchType}/${input}`,
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
        console.error(`Error in searching Colleges:`, error);
      }
    }
  };


  useEffect(() => {
    if (searchQuery.length === 0) {
      // Clear search results if input is empty
      setSearchResults([]);
      setSearchNotFound(false);
    } else {
      // Cancel the previous request if it exists
      if (cancelTokenSource) {
        cancelTokenSource.cancel("Operation cancel due to new request");
      }

      // Create a new cancel token
      const source = axios.CancelToken.source();
      setCancelTokenSource(source);

      // Set a timeout for debouncing
      const timer = setTimeout(() => {
        searchCollege(searchQuery, source);
      }, 300);


      // Clean up timeout and cancel token on effect cleanup
      return () => {
        clearTimeout(timer);
        if (source) {
          source.cancel(
            "Operation cancelled due to component unmount or new request"
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

  // Skeleton render of the Student search Component
  return (
    <>
      <div className="search">
        {isSearchNotFound && <h3>College Not Found</h3>}
        <div>
          <select value={searchType} onChange={handleType}>
            <option value="Code">College Code</option>
            <option value="Name">College Name</option>
          </select>
        </div>

        <div>
          <input
            type="Text"
            placeholder={`Search by ${
              searchType === "Code" ? "College Code" : "College Name"
            }`}
            value={searchQuery}
            onChange={handleInput}
          ></input>
        </div>
      </div>
    </>
  );
}
export default CollegeSearch;
