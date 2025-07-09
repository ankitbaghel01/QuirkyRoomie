import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:5000', // Replace with your backend URL
})

// Add a method to set a logout callback
let logoutCallback = null
export const setLogoutCallback = (cb) => {
  logoutCallback = cb
}

// Add a response interceptor to handle 401 errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token expired or invalid
      if (logoutCallback) logoutCallback()
    }
    return Promise.reject(error)
  }
)

export default api