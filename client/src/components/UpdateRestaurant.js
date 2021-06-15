import React, { useState, useEffect } from "react"
import { useParams, useHistory } from "react-router-dom"
import RestaurantFinder from "../apis/RestaurantFinder"

const UpdateRestaurant = (props) => {
  const { id } = useParams()
  let history = useHistory()
  const [name, setName] = useState("")
  const [location, setLocation] = useState("")
  const [priceRange, setPriceRange] = useState("")

  useEffect(() => {
    async function fetchData() {
      const response = await RestaurantFinder.get(`/${id}`)
      const { name, location, price_range } = response.data.data.restaurant
      setName(name)
      setLocation(location)
      setPriceRange(price_range)
    }
    fetchData()
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const updatedRestaurant = await RestaurantFinder.patch(`/${id}`, {
      name,
      location,
      price_range: priceRange,
    })
    history.push("/")
    console.log(updatedRestaurant)
  }

  return (
    <div>
      <form action="">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="name"
            type="text"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            id="location"
            type="text"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="price_range">Price Range</label>
          <input
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            id="price_range"
            type="number"
            className="form-control"
          />
        </div>
        <button type="submit" onClick={handleSubmit} className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  )
}

export default UpdateRestaurant
