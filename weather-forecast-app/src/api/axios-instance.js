import axios from 'axios';

const axiosInstance = axios.create();


// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Modify the request config here (add headers, authentication tokens)
        const accessToken = sessionStorage.getItem("accessToken");
    // If token is present add it to request's Authorization Header
    if (accessToken) {
      if (config.headers) config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    // Handle request errors here

    return Promise.reject(error);
  }
);
// End of Request interceptor



// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Modify the response data here

    return response;
  },
  (error) => {
    // Handle response errors here
    return Promise.reject(error);
  }
);
// End of Response interceptor

export default axiosInstance;