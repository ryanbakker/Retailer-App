import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Background from "../images/half-bg.png";

// styling inside products scss file

export default function MyListings(props) {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:4000/api/view-products").then((response) => {
      setData(response.data);
    });
  }, []);

  const deleteItem = (id) => {
    axios
      .delete(`http://localhost:4000/api/delete-product-by-id/${id}`)
      .then((response) => {
        alert("Listing deleted");
      });
  };

  return (
    <>
      <img src={Background} className="page-background" alt="page background" />

      <div className="my-listings-container">
        <div className="title">
          <h1>My Listings</h1>
        </div>
        <div className="item-wrapper">
          <div className="card-container">
            {data.map((item, index) => {
              return (
                <div key={index} className="card shadow">
                  {(item.thumb && (
                    <img
                      className="item-thumbnail"
                      src={`${"./images/" + item.thumb}`}
                      alt="product-img"
                    />
                  )) || (
                    <img
                      className="item-thumbnail"
                      src="./images/noImage.png"
                      alt="no-img"
                    />
                  )}
                  <div className="item-details">
                    <div>
                      <div className="item-title">
                        {item.year} {item.brand} {item.model}
                      </div>
                      <div className="item-detail">
                        {item.odometer}km &nbsp;|&nbsp; {item.engine}cc{" "}
                        &nbsp;|&nbsp; {item.fuel} &nbsp;|&nbsp;{" "}
                        {item.transmission}
                      </div>
                      <div className="item-price">
                        Asking price:{" "}
                        {(item.price && `$${item.price}`) || "Negotiation"}
                      </div>
                      <hr />
                      <div className="user-listing-btn">
                        <button
                          className="user-btn-edit"
                          onClick={() => {
                            navigate("/update-listing", {
                              state: item._id,
                            });
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="user-btn-delete"
                          onClick={() => deleteItem(item._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="spacing">a</div>
      </div>
    </>
  );
}
