import React, { useState } from "react"
import { useHistory, useLocation, useParams } from "react-router-dom"
import RestaurantFinder from "../apis/RestaurantFinder"

const AddReview = () => {
  const { id } = useParams()
  const location = useLocation()
  const history = useHistory()
  const [name, setName] = useState("")
  const [rating, setRating] = useState("Rating")
  const [reviewText, setReviewText] = useState("")

  const handleSubmitReview = async (e) => {
    e.preventDefault()

    try {
      await RestaurantFinder.post(`/${id}/addReview`, {
        name,
        review: reviewText,
        rating,
      })

      history.push("/")
      history.push(location.pathname)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="mb-2">
      <form action="">
        <div className="form-row">
          <div className="form-group col-8">
            <label htmlFor="name">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              id="name"
              placeholder="name"
              className="form-control"
            />
          </div>
          <div className="form-group col-4">
            <label htmlFor="rating">Rating</label>
            <select
              value={rating}
              id="rating"
              onChange={(e) => setRating(e.target.value)}
              className="custom-select"
            >
              <option disabled>Rating</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="review">Review</label>
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            id="review"
            className="form-control"
          ></textarea>
        </div>
        <button
          onClick={handleSubmitReview}
          type="submit"
          className="btn btn-primary"
        >
          submit
        </button>
      </form>
    </div>
  )
}

export default AddReview
