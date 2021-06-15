import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import "./App.css"
import Home from "./routes/Home"
import UpdatePage from "./routes/UpdatePage"
import RestaurantDetailPage from "./routes/RestaurantDetailPage"
import { RestaurantContextProvider } from "./context/RestaurantContext"

function App() {
  return (
    <RestaurantContextProvider>
      <div className="container ">
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/restaurant/:id" component={RestaurantDetailPage} />
            <Route exact path="/restaurant/:id/update" component={UpdatePage} />
          </Switch>
        </Router>
      </div>
    </RestaurantContextProvider>
  )
}

export default App
