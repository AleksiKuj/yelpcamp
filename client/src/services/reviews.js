import axios from "axios"

//const baseUrl = "http://localhost:3001/api/campgrounds"
const baseUrl = "/api/campgrounds"

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const addReview = async (id, review) => {
  const config = {
    headers: { Authorization: token },
  }
  try {
    const res = await axios.post(`${baseUrl}/${id}/reviews`, review, config)
    return res.data
  } catch (e) {
    if (e.response) {
      console.log(e.response.data)
      throw new Error(e.response.data)
    }
    throw new Error("An error occurred")
  }
  // const res = await axios.post(`${baseUrl}/${id}/reviews`, review, config)
  // return res.data
}
const deleteReview = async (id, reviewId) => {
  const res = await axios.delete(`${baseUrl}/${id}/reviews/${reviewId}`)
  return res.data
}

const exports = {
  addReview,
  deleteReview,
  setToken,
}
export default exports
