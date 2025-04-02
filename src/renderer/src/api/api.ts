import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:9090/api', // Укажи свой URL
  headers: { 'Content-Type': 'application/json' }
})

export default api
