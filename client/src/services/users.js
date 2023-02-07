import axios from "axios"

const baseUrl = "http://localhost:3001/api/users"

const addUser = async (user) => {
  try {
    const res = await axios.post(`${baseUrl}/register`, user)
    return res.data
  } catch (e) {
    if (e.response) {
      console.log(e)
      console.log(e.response.data)
      throw new Error(e.response.data)
    }
    throw new Error("An error occurred")
  }
}
const login = async (user) => {
  try {
    const res = await axios.post(`${baseUrl}/login`, user)
    return res.data
  } catch (e) {
    if (e.response) {
      console.log(e)
      console.log(e.response.data)
      throw new Error(e.response.data)
    }
    throw new Error("An error occurred")
  }
}

const exports = {
  addUser,
  login,
}
export default exports
