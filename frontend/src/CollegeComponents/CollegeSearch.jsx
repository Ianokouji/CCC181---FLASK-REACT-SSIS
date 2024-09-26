import { useEffect, useState } from "react";
import axios from "axios";

function CollegeSearch({ setSearchResults }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("Code");
  const [isSearchNotFound, setSearchNotFound] = useState(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(null);

  const searchCollege = async (input, cancelToken) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/colleges/search/${searchType}/${input}`,
        { cancelToken: cancelToken.token }
      );
      setSearchResults(response.data);

      response.data.length === 0
        ? setSearchNotFound(true)
        : setSearchNotFound(false);
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Request canceled", error.message);
      } else {
        console.error(`Error in searching Colleges:`, error);
      }
    }
  };

  const handleInput = async (e) => {
    setSearchQuery(e.target.value);
  };

  const handleType = (e) => {
    setSearchType(e.target.value);
  };

  useEffect(() => {
    if (searchQuery.length === 0) {
      setSearchResults([]);
      setSearchNotFound(false);
    } else {
      if (cancelTokenSource) {
        cancelTokenSource.cancel("Operation cancel due to new request");
      }

      const source = axios.CancelToken.source();
      setCancelTokenSource(source);

      const timer = setTimeout(() => {
        searchCollege(searchQuery, source);
      }, 300);

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

  return (
    <>
      <div>
        {isSearchNotFound && (
          <>
            <h3>College Not Found</h3>
          </>
        )}
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
