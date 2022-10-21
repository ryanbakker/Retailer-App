import React from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Modal from "react-modal";
import { MdDoneAll } from "react-icons/md";
import Background from "../images/half-bg.png";

function EditListing() {
  let navigate = useNavigate();
  let location = useLocation();
  const [product, setProduct] = useState({});

  const onGoBack = (event) => {
    navigate(-1);
  };

  const [modalIsOpen, setIsOpen] = React.useState(false);

  // eslint-disable-next-line no-unused-vars
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    loadEventDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadEventDetails = (event) => {
    if (location.state) {
      axios
        .get(`http://localhost:4000/api/view-product-by-id/${location.state}`)
        .then((response) => {
          if (response.status === 200 && response.data != null) {
            setProduct(response.data);
          }
        });
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();

    let currentForm = event.target;

    let updateData = {
      year: currentForm.elements["product_year"].value,
      brand: currentForm.elements["product_brand"].value,
      model: currentForm.elements["product_model"].value,
      price: currentForm.elements["product_price"].value,
      odometer: currentForm.elements["product_odometer"].value,
      engine: currentForm.elements["product_engine"].value,
      fuel: currentForm.elements["product_fuel"].value,
      transmission: currentForm.elements["product_transmission"].value,
      features: currentForm.elements["product_features"].value,
      description: currentForm.elements["product_description"].value,
      thumb: currentForm.elements["product_thumb"].value,
    };

    console.table(updateData);

    axios
      .put(
        `http://localhost:4000/api/update-product/${location.state}`,
        updateData
      )
      .then((response) => {
        if (response.data.error) {
          console.log("Update Error");
        } else {
          setIsOpen(true);
          console.log("Update Successful");
        }
      });
  };

  return (
    <>
      <img src={Background} className="page-background" alt="Page background" />
      <div className="edit-listing">
        <div className="edit-listing-container">
          <h1 className="title">Edit your product</h1>

          <form onSubmit={onSubmit}>
            <div className="row-one">
              <p className="form-item">
                <label>Year:</label>
                <input
                  type="text"
                  placeholder="year"
                  name="product_year"
                  defaultValue={product.year}
                />
              </p>
              <p className="form-item">
                <label>Brand:</label>
                <input
                  type="text"
                  placeholder="brand"
                  name="product_brand"
                  defaultValue={product.brand}
                />
              </p>
            </div>
            <div className="row-two">
              <p className="form-item">
                <label>Model:</label>
                <input
                  type="text"
                  placeholder="model"
                  name="product_model"
                  defaultValue={product.model}
                />
              </p>
              <p className="form-item">
                <label>Price:</label>
                <input
                  type="text"
                  placeholder="price"
                  name="product_price"
                  defaultValue={product.price}
                />
              </p>
            </div>

            <div className="row-three">
              <p className="form-item">
                <label>Odometer:</label>
                <input
                  type="text"
                  placeholder="odometer"
                  name="product_odometer"
                  defaultValue={product.odometer}
                />
              </p>
              <p className="form-item">
                <label>Engine:</label>
                <input
                  type="text"
                  placeholder="engine"
                  name="product_engine"
                  defaultValue={product.engine}
                />
              </p>
            </div>

            <div className="row-four">
              <p className="form-item">
                <label>Fuel Type:</label>
                <input
                  type="text"
                  placeholder="fuel"
                  name="product_fuel"
                  defaultValue={product.fuel}
                />
              </p>
              <p className="form-item">
                <label>Transmission:</label>
                <input
                  type="text"
                  placeholder="transmission"
                  name="product_transmission"
                  defaultValue={product.transmission}
                />
              </p>
            </div>

            <div className="row-five">
              <p className="form-item">
                <label>Image:</label>
                <input
                  type="text"
                  placeholder="thumb"
                  name="product_thumb"
                  defaultValue={product.thumb}
                />
              </p>
            </div>

            <div className="row-six">
              <p className="form-item">
                <label>Features:</label>
                <textarea
                  type="text"
                  placeholder="features"
                  name="product_features"
                  defaultValue={product.features}
                />
              </p>
            </div>

            <div className="row-seven">
              <p className="form-item">
                <label>Description:</label>
                <textarea
                  type="text"
                  placeholder="description"
                  name="product_description"
                  defaultValue={product.description}
                />
              </p>
            </div>
            <div className="edit-listing-btns">
              <button onClick={onGoBack} className="cancel-btn">
                Cancel
              </button>
              <button type="submit" className="submit-btn">
                Submit
              </button>
            </div>
          </form>
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
              backgroundColor: "rgba(240, 240, 240, 0.75)",
            },
            content: {
              position: "relative",
              margin: "auto",
              marginTop: "200px",
              width: "200px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              border: "1px solid black",
              background: "#fff",
              overflow: "auto",
              WebkitOverflowScrolling: "touch",
              borderRadius: "4px",
              outline: "none",
              padding: "20px",
            },
          }}
        >
          <div className="check-success">
            <p>Updated</p>
            <MdDoneAll size={52} color={"#ffb82f"} />
          </div>
        </Modal>
      </div>
    </>
  );
}

export default EditListing;
