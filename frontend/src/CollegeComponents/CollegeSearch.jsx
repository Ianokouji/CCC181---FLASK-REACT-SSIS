import { useState } from "react";
import axios from "axios";

function CollegeSearch({ setSearchResults }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("Code");
  const [isSearchNotFound, setSearchNotFound] = useState(false);

  const handleInput = async (e) => {
    const input = e.target.value;
    setSearchQuery(input);

    if (input.length === 0) {
      setSearchResults([]);
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:5000/api/colleges/search/${searchType}/${input}`
      );
      setSearchResults(response.data);
      

      response.data.length === 0
        ? setSearchNotFound(true)
        : setSearchNotFound(false);
    } catch (error) {
      console.error(`Error in searching Colleges:`, error);
    }
  };

  const handleType = (e) => {
    setSearchType(e.target.value);
  };

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




// import { useState } from "react";
// import axios from "axios";

// function CollegeSearch({ setSearchResults }) {
//   const [searchQuery, setSearchQuery] = useState(""); // This state should track the input field's value
//   const [searchType, setSearchType] = useState("Code");
//   const [isSearchNotFound, setSearchNotFound] = useState(false);

//   const handleInput = async (e) => {
//     const input = e.target.value;
//     setSearchQuery(input); // Set the input value to searchQuery

//     if (input.length === 0) {
//       setSearchResults([]); // Clear results when input is empty
//       return;
//     }

//     try {
//       const response = await axios.get(
//         `http://localhost:5000/api/colleges/search/${searchType}/${input}`
//       );
//       setSearchResults(response.data); // Update the search results in the parent
//       console.log(response.data);

//       response.data.length === 0
//         ? setSearchNotFound(true)
//         : setSearchNotFound(false);
//     } catch (error) {
//       console.error(`Error in searching Colleges:`, error);
//     }
//   };

//   const handleType = (e) => {
//     setSearchType(e.target.value);
//   };

//   return (
//     <>
//       <div>
//         {isSearchNotFound && (
//           <>
//             <h3>College not Found</h3>
//           </>
//         )}
//         <div>
//           <select value={searchType} onChange={handleType}>
//             <option value="Code">College Code</option>
//             <option value="Name">College Name</option>
//           </select>
//         </div>

//         <div>
//           <input
//             type="text"
//             placeholder={`Search by ${searchType === "Code" ? "College Code" : "College Name"}`}
//             value={searchQuery} // Bind input field to searchQuery
//             onChange={handleInput}
//           />
//         </div>
//       </div>
//     </>
//   );
// }
// export default CollegeSearch;