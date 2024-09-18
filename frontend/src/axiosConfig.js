// import axios from 'axios'

// const axiosApi = axios.create({
//     baseURL: 'http://localhost:5000/api',
//     withCredentials: true,
//     headers: {
//         'Content-type': 'application/json',
//     },
// });

// const fetchCsrfToken = async () => {
//     try {
//         const response = await axios.get('http://localhost:5000/api/csrf_token/')
//         return response.data.csrf_token;
//     } catch (error) {
//         console.error("Error in fetching CSRF",error);
//         return null;
//     }
// }

// axiosApi.interceptors.request.use(
//     async (config) => {
//         const csrfToken = await fetchCsrfToken();
//         if (csrfToken) config.headers['X-CSRFToken'] = csrfToken;
//         console.log(csrfToken)

//         return config
//     },
//     (error) => Promise.reject(`There has been an error in your csrf: ${error}`)

// )

import axios from 'axios';

const axiosApi = axios.create({
    baseURL: 'http://localhost:5000/api',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Fetch the CSRF token
const fetchCsrfToken = async () => {
    try {
        const response = await axios.get('http://localhost:5000/api/csrf_token/');
        return response.data.csrf_token;
    } catch (error) {
        console.error("Error fetching CSRF token", error);
        return null;
    }
};

// Interceptor to add CSRF token to all requests
axiosApi.interceptors.request.use(
    async (config) => {
        const csrfToken = await fetchCsrfToken();
        if (csrfToken) {
            config.headers['X-CSRFToken'] = csrfToken;
        }
        return config;
    },
    (error) => Promise.reject(`Error in CSRF setup: ${error}`)
);

export default axiosApi;


// Helper function to get CSRF tokens from cookies
// const getCookie = function(name) {
//     const value = `; ${document.cookie}`;
//     const parts = value.split(`; ${name}=`);
//     if (parts.length === 2) return parts.pop().split(';').shift();
// }



//export default axiosApi





// import axios from 'axios';

// const axiosApi = axios.create({
//     baseURL: 'http://localhost:5000/api',
//     withCredentials: true,
//     headers: {
//         'Content-type': 'application/json',
//     },
// });

// let cachedCsrfToken = null;

// const fetchCsrfToken = async () => {
//     try {
//         const response = await axios.get('http://localhost:5000/api/csrf_token/');
//         cachedCsrfToken = response.data.csrf_token;
//     } catch (error) {
//         console.error("Error fetching CSRF token", error);
//         cachedCsrfToken = null;
//     }
// };

// // Fetch CSRF token on app load
// fetchCsrfToken();

// axiosApi.interceptors.request.use(
//     async (config) => {
//         if (!cachedCsrfToken) {
//             await fetchCsrfToken();
//         }
//         if (cachedCsrfToken) {
//             config.headers['X-CSRFToken'] = cachedCsrfToken; // Ensure this matches
//         }
//         return config;
//     },
//     (error) => Promise.reject(`Error in CSRF setup: ${error}`)
// );

// export default axiosApi;