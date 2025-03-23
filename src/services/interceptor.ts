import axios, { AxiosError, AxiosResponse } from 'axios'

const api = axios.create({
  baseURL: 'https://fakestoreapi.com',
})

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if(token) {
      // ? initialize secure header for authorization
      config.headers = config.headers || {}
      config.headers['Authorization'] = token
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
// ? Generic Functions to process response and errors
const handleResponse = (response: AxiosResponse) => response.data
const handleError = (error: AxiosError) => Promise.reject(error)

api.interceptors.response.use(handleResponse, handleError)

export default api