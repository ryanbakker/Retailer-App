/* eslint-disable no-dupe-keys */
import React from "react";
import axios from "axios";
import { useRef } from "react";
import Modal from "react-modal";
import { HiCheck } from "react-icons/hi";
import { IoIosClose } from "react-icons/io";
import Background from "../images/half-bg.png";

function ListItem() {
  const yearRef = useRef();
  const priceRef = useRef();
  const thumbRef = useRef();
  const descriptionRef = useRef();
  const brandRef = useRef();
  const modelRef = useRef();
  const odometerRef = useRef();
  const engineRef = useRef();
  const fuelRef = useRef();
  const transmissionRef = useRef();
  const featuresRef = useRef();

  const [modalIsOpen, setIsOpen] = React.useState(false);

  // eslint-disable-next-line no-unused-vars
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const onSubmitCreate = (event) => {
    event.preventDefault();

    let formData = {
      year: yearRef.current.value,
      brand: brandRef.current.value,
      model: modelRef.current.value,
      price: priceRef.current.value,
      odometer: odometerRef.current.value,
      engine: engineRef.current.value,
      fuel: fuelRef.current.value,
      transmission: transmissionRef.current.value,
      features: featuresRef.current.value,
      description: descriptionRef.current.value,
      thumb: thumbRef.current.value,
    };

    // post listing with form data

    axios
      .post("//localhost:4000/api/create-product", formData)
      .then((response) => {
        console.log(response);
        setIsOpen(true);
      });
  };

  return (
    <>
      <img src={Background} className="page-background" alt="Page background" />
      <div className="list-item-container">
        <div className="title">
          <h1>List Your Car</h1>
        </div>

        <form onSubmit={onSubmitCreate} className="list-form">
          <div className="form-row-one">
            <p>
              Year
              <input
                type="text"
                placeholder="year manufactured..."
                ref={yearRef}
                required
              />
            </p>
            <p>
              Brand
              <input
                type="text"
                placeholder="vehicle brand..."
                ref={brandRef}
                required
              />
            </p>
          </div>
          <div className="form-row-two">
            <p>
              Model
              <input
                type="text"
                placeholder="vehicle model..."
                ref={modelRef}
                required
              />
            </p>
            <p>
              Price (nzd)
              <input
                type="text"
                placeholder="add price..."
                ref={priceRef}
                required
              />
            </p>
          </div>
          <div className="form-row-three">
            <p>
              Odometer (km)
              <input
                type="text"
                placeholder="odometer at time of listing..."
                ref={odometerRef}
                required
              />
            </p>
            <p>
              Engine Size (cc)
              <input
                type="text"
                placeholder="engine size in cc..."
                ref={engineRef}
                required
              />
            </p>
          </div>
          <div className="form-row-four">
            <p>
              Fuel Type
              <input
                type="text"
                placeholder="vehicles petrol type..."
                ref={fuelRef}
                required
              />
            </p>
            <p>
              Vehicle Transmission
              <input
                type="text"
                placeholder="add transmission type..."
                ref={transmissionRef}
                required
              />
            </p>
          </div>

          <p className="form-row-lg">
            Image Name
            <input
              type="text"
              placeholder="year-brand-model.jpeg"
              ref={thumbRef}
              required
            />
          </p>
          <p className="form-row-lg">
            Features
            <textarea
              name="w3review"
              rows="4"
              cols="50"
              placeholder="what makes your vehicle stand out..."
              ref={featuresRef}
              required
            />
          </p>
          <p className="form-row-lg">
            Description
            <textarea
              name="w3review"
              rows="4"
              cols="50"
              placeholder="description of your vehicle..."
              ref={descriptionRef}
              required
            />
          </p>
          <div className="post-button">
            <button type="submit">Post</button>
          </div>
        </form>
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
              top: "250px",
              left: "50%",
              marginLeft: "-150px",
              bottom: "250px",
              border: "1px solid #4E69A5",
              background: "#fff",
              overflow: "hidden",
              WebkitOverflowScrolling: "touch",
              borderRadius: "10px",
              outline: "none",
              padding: "25px",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gridTemplateRows: "1fr 1fr",
              width: "300px",
              display: "flex",
            },
          }}
        >
          <div className="close">
            <IoIosClose size={40} color={"#6c6666"} onClick={closeModal} />
          </div>
          <div className="check-success">
            <HiCheck size={65} color={"#FFB82F"} />
            <h4>Success</h4>
            <p>Your listing has posted</p>
          </div>
        </Modal>
      </div>
    </>
  );
}

export default ListItem;
