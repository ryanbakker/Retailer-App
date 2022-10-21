import React from "react";
import axios from "axios";
import { useRef } from "react";
import { useEffect, useState } from "react";
import { IoEnterOutline } from "react-icons/io5";

export default function Comments() {
  const [data, setData] = useState([]);
  const commentMessage = useRef();
  const commentUsername = useRef();

  useEffect(() => {
    axios.get("http://localhost:4000/api/view-comment").then((response) => {
      setData(response.data);
    });
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    console.log(commentMessage.current.value);

    let formData = {
      comment: commentMessage.current.value,
      user: commentUsername.current.value,
    };

    // create comment with form data

    axios
      .post("//localhost:4000/api/create-comment", formData)
      .then((response) => {
        console.log(response);
      });
  };

  return (
    <>
      <div className="comments-box">
        <div className="tester-one">
          {data.map((item, index) => {
            return (
              <div key={index} className="tester-two">
                <h4>{item.user}</h4>
                <h5>{item.comment}</h5>
              </div>
            );
          })}
        </div>
        <div className="post-comment">
          <form onSubmit={onSubmit} className="no-form">
            <input
              type="text"
              className="usernameComment"
              ref={commentUsername}
              placeholder="Username"
            />
            <input
              type="text"
              ref={commentMessage}
              placeholder="Leave a comment..."
            />
            <button type="submit">
              <IoEnterOutline />
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
