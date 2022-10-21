import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import Background from "../images/half-bg.png";
import ProductsVector from "../images/listingsVector.png";
import ModalRightBg from "../images/modalGraphicRight.png";
import Comments from "./Comments";

export default function Products() {
  // eslint-disable-next-line no-unused-vars
  const [item, setItem] = useState("");
  const [mydata, setData] = useState([]);
  const [year, setYear] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [thumb, setThumb] = useState("");
  const [description, setDescription] = useState("");
  const [features, setFeatures] = useState("");
  const [price, setPrice] = useState("");
  const [odometer, setOdometer] = useState("");
  const [engine, setEngine] = useState("");
  const [fuel, setFuel] = useState("");
  const [transmission, setTransmission] = useState("");
  const [modalIsOpen, setIsOpen] = React.useState(false);

  // eslint-disable-next-line no-unused-vars
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
    console.clear();
  }

  function onBuy(id) {
    console.log("buy");
  }

  const getSingle = (id) => {
    console.log(id);
    axios
      .get(`http://localhost:4000/api/view-product-by-id/${id}`)
      .then((response) => {
        console.table(response.data);
        setYear(response.data.year);
        setBrand(response.data.brand);
        setModel(response.data.model);
        setDescription(response.data.description);
        setFeatures(response.data.features);
        setPrice(response.data.price);
        setItem(response.data.item);
        setOdometer(response.data.odometer);
        setEngine(response.data.engine);
        setFuel(response.data.fuel);
        setTransmission(response.data.transmission);
        setThumb(response.data.thumb);
        setIsOpen(true);
      });
  };

  useEffect(() => {
    axios.get("http://localhost:4000/api/view-products").then((response) => {
      setData(response.data);
    });
  }, []);

  return (
    <>
      <img src={Background} className="page-background" alt="page background" />
      <div className="products-heading">
        <img src={ProductsVector} alt="" />
        <div className="heading-content">
          <h1>
            <span>Current</span>
            <br />
            Listings
          </h1>
          <p className="home-overview">
            View below the currently listed vehicles for sale. Go to your
            account to list your own vehicle.
          </p>
        </div>
      </div>

      <div className="products-container">
        <h1>View Listings</h1>
        <div className="item-wrapper">
          <div className="card-container">
            {mydata.map((item, index) => {
              return (
                <div
                  key={index}
                  className="card shadow"
                  onClick={() => getSingle(item._id)}
                >
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
                      <div className="item-feature">{item.features}</div>
                      <hr />
                      <div className="item-price">
                        Asking price:{" "}
                        {(item.price && `$${item.price}`) || "Negotiation"}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          ariaHideApp={false}
          style={{
            overlay: {
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(255, 255, 255, 0.7)",
            },
            content: {
              position: "absolute",
              top: "20px",
              left: "50%",
              marginLeft: "-425px",
              bottom: "20px",
              border: "1px solid #4E69A5",
              background: "#fff",
              overflow: "auto",
              WebkitOverflowScrolling: "touch",
              borderRadius: "10px",
              outline: "none",
              padding: "25px",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gridTemplateRows: "1fr 1fr",
              width: "850px",
            },
          }}
        >
          <img src={ModalRightBg} alt="" className="modal-bg-right" />
          <button className="close-button" onClick={closeModal}>
            Close
          </button>

          {/* Modal Image Tile */}

          <div className="modal-img-tile">
            {(thumb && (
              <img
                className="modal-thumbnail"
                src={`${"./images/" + thumb}`}
                alt="Car"
              />
            )) || (
              <img
                className="modal-thumbnail"
                src="./images/noImage.png"
                alt="no-img"
              />
            )}
          </div>

          {/* Modal Information tile */}

          <div className="modal-info-tile">
            <div className="modal-title">
              {year}&nbsp;{brand}&nbsp;{model}
            </div>
            <div className="modal-details">
              {odometer}km &nbsp;|&nbsp; {engine}cc &nbsp;|&nbsp; {fuel}{" "}
              &nbsp;|&nbsp; {transmission}
            </div>

            <div className="modal-features">{features}</div>

            <hr />

            <div className="modal-price">
              {" "}
              Asking price: {(price && `$${price}`) || "Negotiation"}
            </div>

            <div className="modal-btns">
              <button className="modal-contact-btn shadow">
                Contact Seller
              </button>
              <button className="modal-buy-btn shadow" onClick={onBuy}>
                Buy Now
              </button>
            </div>
          </div>

          {/* Modal description tile */}

          <div className="modal-description-tile">
            <div className="modal-description">
              <h4 className="modal-heading">Description</h4>
              <p>{description}</p>
            </div>
          </div>

          <div className="modal-message-tile">
            <h4 className="modal-heading">Comments</h4>
            <Comments />
          </div>
        </Modal>
        <div className="spacing">a</div>
      </div>
    </>
  );
}
