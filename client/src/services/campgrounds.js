import axios from "axios"

//const baseUrl = "http://localhost:3001/api/campgrounds/"
const baseUrl = "/api/campgrounds/"
let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}
const getAll = async () => {
  const req = await axios.get(baseUrl)
  return req.data
}
const getOne = async (id) => {
  const req = await axios.get(`${baseUrl}/${id}`)
  return req.data
}

const create = async (campground) => {
  const config = {
    headers: { Authorization: token },
  }
  try {
    const res = await axios.post(baseUrl, campground, config)
    return res.data
  } catch (e) {
    if (e.response) {
      throw new Error(e.response.data)
    }
    throw new Error("An error occurred")
  }
}

const edit = async (id, campground) => {
  try {
    const res = await axios.put(`${baseUrl}/${id}`, campground)
    return res.data
  } catch (e) {
    if (e.response) {
      throw new Error(e.response.data)
    }
    throw new Error("An error occurred")
  }
}
const deleteCamp = async (id) => {
  const res = await axios.delete(`${baseUrl}/${id}`)
  return res.data
}

const exports = {
  getAll,
  getOne,
  create,
  edit,
  deleteCamp,
  setToken,
}
export default exports
