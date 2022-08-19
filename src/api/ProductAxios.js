import axios from 'axios'

var instance = axios.create({
  baseURL: 'http://localhost:8001/api'
})

export default instance
