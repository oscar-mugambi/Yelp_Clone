require("dotenv").config()
const db = require("./db")
const express = require("express")
const morgan = require("morgan")
var cors = require("cors")

const app = express()
app.use(cors())

app.use(express.json())

//get all restaurants
app.get("/api/v1/restaurants", async (req, res) => {
  try {
    const restaurantRatingsData = await db.query(
      "select * from restaurants left join (select restaurant_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id;"
    )

    res.status(200).json({
      status: "success",
      results: restaurantRatingsData.rows.length,
      data: {
        restaurants: restaurantRatingsData.rows,
      },
    })
  } catch (error) {
    res.send(error)
  }
})

//get an individual restaurant
app.get("/api/v1/restaurants/:id", async (req, res) => {
  try {
    const result = await db.query(
      "select * from restaurants left join (select restaurant_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id where id=$1;",
      [req.params.id]
    )

    const reviews = await db.query(
      "select * from reviews where restaurant_id=$1",
      [req.params.id]
    )

    res.status(200).json({
      status: "success",
      data: {
        restaurant: result.rows[0],
        reviews: reviews.rows,
      },
    })
  } catch (error) {
    res.send(error)
  }
})

//create a restaurant
app.post("/api/v1/restaurants", async (req, res) => {
  try {
    const results = await db.query(
      "INSERT INTO restaurants (name,location,price_range) values($1, $2, $3) returning *",
      [req.body.name, req.body.location, req.body.price_range]
    )

    res.status(201).json({
      status: "success",
      data: {
        restaurant: results.rows[0],
      },
    })
  } catch (error) {
    console.log(error)
    res.send(error)
  }
})

//update restaurant

app.patch("/api/v1/restaurants/:id", async (req, res) => {
  try {
    const { name, location, price_range } = req.body
    const results = await db.query(
      "UPDATE restaurants SET name=$1, location=$2, price_range=$3 where id=$4 returning *",
      [name, location, price_range, req.params.id]
    )
    res.status(200).json({
      status: "success",
      data: {
        restaurant: results.rows[0],
      },
    })
  } catch (error) {
    res.send(error)
  }
})

//delete restaurant

app.delete("/api/v1/restaurants/:id", async (req, res) => {
  try {
    const results = await db.query("DELETE FROM restaurants where id=$1", [
      req.params.id,
    ])
    res.status(204).json({
      status: "success",
    })
  } catch (error) {
    res.send(error)
  }
})

const port = process.env.PORT || 3000

app.post("/api/v1/restaurants/:id/addReview", async (req, res) => {
  try {
    const newReview = await db.query(
      "INSERT INTO reviews (restaurant_id,name, review, rating) values ($1,$2,$3,$4);",
      [req.params.id, req.body.name, req.body.review, req.body.rating]
    )

    res.status(201).json({
      status: "success",
      data: {
        review: newReview.rows[0],
      },
    })
  } catch (error) {
    console.log(error)
  }
})

app.listen(port, () => {
  console.log(`running  on ${port}`)
})
