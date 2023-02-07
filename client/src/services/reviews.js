import axios from "axios"

const baseUrl = "http://localhost:3001/api/campgrounds"

const addReview = async (id, review) => {
  const res = await axios.post(`${baseUrl}/${id}/reviews`, review)
  return res.data
}
const deleteReview = async (id, reviewId) => {
  const res = await axios.delete(`${baseUrl}/${id}/reviews/${reviewId}`)
  return res.data
}

const exports = {
  addReview,
  deleteReview,
}
export default exports
