import React, { useState, useContext } from "react"
import RestaurantFinder from "../apis/RestaurantFinder"
import { RestaurantContext } from "../context/RestaurantContext"

const AddRestaurant = () => {
  const [name, setName] = useState("")
  const [location, setLocation] = useState("")
  const [priceRange, setPriceRange] = useState("Price Range")

  const { addRestaurant } = useContext(RestaurantContext)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await RestaurantFinder.post("/", {
        name,
        location,
        price_range: priceRange,
      })
      console.log(response)
      addRestaurant(response.data.data.restaurant)
      console.log(response)
    } catch (error) {}
  }

  return (
    <div className="mb-4">
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="row">
            <div className="col">
              <input
                value={name}
                type="text"
                className="form-control"
                placeholder="name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="col">
              <input
                value={location}
                type="text"
                className="form-control"
                placeholder="location"
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div className="col">
              <select
                value={priceRange}
                className="custom-select form-control"
                onChange={(e) => setPriceRange(e.target.value)}
              >
                <option disabled>Price Range</option>
                <option value="1">$</option>
                <option value="2">$$</option>
                <option value="3">$$$</option>
                <option value="4">$$$$</option>
                <option value="5">$$$$$</option>
              </select>
            </div>
            <div className="col">
              <button type="submit" className="btn btn-primary form-control">
                Add
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default AddRestaurant
