import axios from "axios"

const baseUrl = "http://localhost:3001/api/campgrounds/"

const getAll = async () => {
  const req = await axios.get(baseUrl)
  return req.data
}
const getOne = async (id) => {
  const req = await axios.get(`${baseUrl}/${id}`)
  return req.data
}

const create = async (campground) => {
  const res = await axios.post(baseUrl, campground)
  return res.data
}

const edit = async (id, campground) => {
  const res = await axios.put(`${baseUrl}/${id}`, campground)
  return res.data
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
}
export default exports
