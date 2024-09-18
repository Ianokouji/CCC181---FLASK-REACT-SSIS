import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axiosApi from "./axiosConfig";
import axios from 'axios'


const CollegeForm = ({colleges}) => {

  return(
    <>
      
    </>
  )
}



function App() {
  const [count, setCount] = useState(0);

    const [csrfToken, setCsrfToken] = useState('');
    const [colleges, setColleges] = useState([]);
    const [college_name,setCollegeName] = useState('');
    const [college_code,setCollegeCode] = useState('')
     

    // useEffect(() => {
    //   fetchColleges();
    // }, []);

    const fetchColleges = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/colleges/list");
        setColleges(response.data);
        console.log(response.data);
      } catch (err) {
        console.error("Error fetching Students");
      }
    };

    useEffect(() => {
      // Fetch CSRF token
      const fetchCsrfToken = async () => {
        try {
          const response = await axios.get('http://localhost:5000/api/csrf_token/', { withCredentials: true });
          setCsrfToken(response.data.csrf_token);
        } catch (error) {
          console.error('Error fetching CSRF token:', error);
        }
      };
  
      fetchCsrfToken();
      fetchColleges();
    }, []);

    // const addCollege = async () => {
    //   try {
        
    //     console.log(college_code,college_name)
    //     const response = await axiosApi.post("colleges/add",{
    //       College_Code:college_code,
    //       College_Name: college_name,
    //     });
    //     console.log("Headers sent:", response.config.headers);
        
    //     console.log("Headers sent:", response.config.headers);
    //     console.log(college_code,college_name)
    //   } catch (error) {
    //     console.error("Error Adding Colleges", error)
    //   }
    // }
  
    // Add new college
    const addCollege = async () => {
      try {
        // Validate fields before sending request
        if (!college_code || !college_name) {
          alert("Please fill in both fields");
          return;
        }
    
        const response = await axios.post(
          'http://localhost:5000/api/colleges/add',
          {
            College_Code: college_code,
            College_Name: college_name
          },
          {
            headers: {
              'X-CSRFToken': csrfToken,
            },
            withCredentials: true,
          }
        );
        console.log('College added successfully:', response.data);
      } catch (error) {
        console.error('Error adding college:', error);
      }
    };
  return (
  
    <div>
      <h3>Add College</h3>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="College Code"
          value={college_code}
          onChange={(e) => setCollegeCode(e.target.value)}
        />
        <input
          type="text"
          placeholder="College Name"
          value={college_name}
          onChange={(e) => setCollegeName(e.target.value)}
        />
        <button onClick={addCollege}>Add College</button>
      </form>

      <h1>Colleges List</h1>
      <ul>
        {colleges.map((college, index) => (
          <li key={index}>{college.College_Name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;



{/* <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}