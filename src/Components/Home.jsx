import React from "react";
import HomeVector from "../images/homeVector.png";
import Background from "../images/home-bg.png";

function Home() {
  return (
    <>
      <img src={Background} className="page-background" alt="Page background" />
      <div className="home-container">
        <div className="home-text">
          <h1>
            <span>Automotive</span>
            <br />
            Online Store
          </h1>
          <p className="home-overview">
            Buy and sell from a range of listed items in your community.
          </p>

          {/* listings button */}
          <a href="/listings">Listings</a>
        </div>

        {/* home artwork */}
        <img src={HomeVector} alt="" />
      </div>
      {/* home page footer */}
      <h3>Ryan Bakker | 2022 | Yoobee Application Development Summative</h3>
    </>
  );
}

export default Home;
