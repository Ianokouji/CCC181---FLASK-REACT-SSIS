import { useState } from "react";
import axios from "axios";

function ProgramSearch({ setSearchResults }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("Code");
  const [isSearchNotFound, setSearchNotFound] = useState(false);

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
        `http://localhost:5000/api/programs/search/${searchType}/${input}`
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

  return (
    <div>
      {isSearchNotFound && <h3>Program Not Found</h3>}
      <div>
        <select value={searchType} onChange={handleType}>
          <option value="Code">Program Code</option>
          <option value="Name">Program Name</option>
        </select>
      </div>

      <div>
        <input
          type="text"
          placeholder={`Search by ${
            searchType === "Code" ? "Program Code" : "Program Name"
          }`}
          value={searchQuery}
          onChange={handleInput}
        />
      </div>
    </div>
  );
}

export default ProgramSearch;
