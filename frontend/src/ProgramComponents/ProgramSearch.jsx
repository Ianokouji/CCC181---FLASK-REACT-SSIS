import { useEffect, useState } from "react";
import axios from "axios";

function ProgramSearch({ setSearchResults }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("P_CODE");
  const [isSearchNotFound, setSearchNotFound] = useState(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(null);

  const handleInput = async (e) => {
    setSearchQuery(e.target.value);
  };

  const searchProgram = async (input, cancelToken) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/programs/search/${searchType}/${input}`,
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
        console.error("Error in searching Programs: ", error);
      }
    }
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
        cancelTokenSource.cancel("Operation cancel due to new request!");
      }

      const source = axios.CancelToken.source();
      setCancelTokenSource(source);

      const timer = setTimeout(() => {
        searchProgram(searchQuery, source);
      }, 300);

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

  const searchTypes = {
    P_CODE: "Program Code",
    C_CODE: "College Code",
    NAME: "Program Name",
  };

  return (
    <div>
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
