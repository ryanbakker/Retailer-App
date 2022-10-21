import React from "react";
import Products from "./Components/Products";
import Login from "./Components/Login";
import { Routes, Route, Link } from "react-router-dom";
import { useState } from "react";

// Component imports
import ListItem from "./Components/ListItem";
import Home from "./Components/Home";
import MyListings from "./Components/MyListings";
import EditListing from "./Components/EditListing";

// Component styling imports
import "./App.scss";
import "./styles/nav.scss";
import "./styles/home.scss";
import "./styles/products.scss";
import "./styles/comments.scss";
import "./styles/edit-listing.scss";
import "./styles/list-items.scss";

function App() {
  // Welcome banner
  console.log(
    "%c Welcome to Retailer",
    "background-color: #314369; color: #ffd65b; padding: 10px 20px; font-family: zeitung-micro,sans-serif; font-size: 15px; width: 100%;"
  );

  // Mockup testing info
  console.log("for login testing use --> ", "example");

  return (
    <div className="App">
      {/* nav bar */}
      <Menu />

      {/* app routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/listings" element={<Products />} />
        <Route path="/add-listing" element={<ListItem />} />
        <Route path="/my-listings" element={<MyListings />} />
        <Route path="/update-listing" element={<EditListing />} />
      </Routes>
    </div>
  );
}

function Menu() {
  const [logged, setLogin] = useState(false);
  const isLoggedIn = (isLoggedIn) => {
    setLogin(isLoggedIn);
  };

  return (
    <div className="nav">
      <Link className="site-logo" to="/">
        Retail<span>er</span>
      </Link>
      <ul className="nav-list">
        <li>
          <Link className="link-item" to="/">
            Home
          </Link>
        </li>
        <li>
          <Link className="link-item" to="/listings">
            Listings
          </Link>
        </li>
        {logged && (
          <>
            <li>
              <Link to="/add-listing" className="link-item">
                Add Listing
              </Link>
            </li>
            <li>
              <Link to="/my-listings" className="link-item">
                My Listings
              </Link>
            </li>
          </>
        )}
        <li className="login-graphic">
          <Login onUpdateLoggedInState={isLoggedIn} />
        </li>
      </ul>
    </div>
  );
}

export default App;
