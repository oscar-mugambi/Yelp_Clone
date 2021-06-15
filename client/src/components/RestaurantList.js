import React, { useEffect, useContext } from "react"
import { useHistory } from "react-router-dom"
import RestaurantFinder from "../apis/RestaurantFinder"
import { RestaurantContext } from "../context/RestaurantContext"

import "./style.css"
import StarRating from "./StarRating"

const RestaurantList = () => {
  const { restaurants, setRestaurants } = useContext(RestaurantContext)
  let history = useHistory()

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await RestaurantFinder.get("/")
        setRestaurants(response.data.data.restaurants)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [setRestaurants])

  const handleDelete = async (e, id) => {
    e.stopPropagation()
    try {
      const response = await RestaurantFinder.delete(`/${id}`)
      setRestaurants(restaurants.filter((restaurant) => restaurant.id !== id))
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }
  const handleUpdate = async (e, id) => {
    e.stopPropagation()
    try {
      await RestaurantFinder.patch(`/${id}`)
      history.push(`/restaurant/${id}/update`)
    } catch (error) {
      console.log(error)
    }
  }

  const handleRestaurantSelect = (id) => {
    history.push(`/restaurant/${id}`)
  }

  const renderRating = (restaurant) => {
    if (!restaurant.count) {
      return <span className="text-warning">0 reviews</span>
    }

    return (
      <>
        <StarRating rating={restaurant.average_rating} />
        <span className="text-warning"> ({restaurant.count})</span>
      </>
    )
  }

  return (
    <div className="list-group">
      <table className="table table-hover table-striped table-dark">
        <thead className="bg-primary">
          <tr className="table-dark">
            <th scope="col">Restaurant</th>
            <th scope="col">Location</th>
            <th scope="col">Price Range</th>
            <th scope="col">Ratings</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {restaurants &&
            restaurants.map((restaurant) => (
              <tr
                key={restaurant.id}
                onClick={() => handleRestaurantSelect(restaurant.id)}
              >
                <td>{restaurant.name}</td>
                <td>{restaurant.location}</td>
                <td>{"$".repeat(restaurant.price_range)}</td>
                <td>{renderRating(restaurant)}</td>
                <td>
                  <button
                    onClick={(e) => handleUpdate(e, restaurant.id)}
                    className="btn btn-warning"
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    onClick={(e) => handleDelete(e, restaurant.id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default RestaurantList
