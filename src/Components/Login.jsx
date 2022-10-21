import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa";

function Login(props) {
  const navigate = useNavigate();
  const usernameInputRef = useRef();
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setLoggedInStatus] = useState(false);

  // eslint-disable-next-line no-unused-vars
  const [allowedUsernamesArray, setAllowedUsernamesArray] = useState([
    // allowed login usernames
    "kevin.dowd",
    "ryanbakker",
    "example",
  ]);

  useEffect(() => {
    if (Cookies.get("logged_in")) {
      setLoggedInStatus(true);
      props.onUpdateLoggedInState(true);
    }
  }, [props]);

  const showLoginForm = () => {
    setShowLogin(!showLogin);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    let userName = usernameInputRef.current.value;
    console.log(userName);

    if (allowedUsernamesArray.includes(userName)) {
      console.log("Login Accepted");
      Cookies.set("logged_in", true, { expires: 1 });
      setLoggedInStatus(true);
      props.onUpdateLoggedInState(true);
      hideLoginBtn();
    }
  };

  // hide and reveal login button

  const hideLoginBtn = () => {
    document.querySelector(".login-wrapper span").classList.add("log-remove");
  };

  const showLoginBtn = () => {
    document.querySelector(".login-wrapper span").classList.add("log-show");
  };

  // back to home on logout

  const onLogout = () => {
    Cookies.remove("logged_in");
    props.onUpdateLoggedInState(false);
    navigate("/");
    showLoginBtn();
  };

  return (
    <div className="login-wrapper">
      <p onClick={showLoginForm}>
        <span>Login</span>{" "}
      </p>

      {showLogin && !isLoggedIn && (
        <form onSubmit={onSubmit} className="login-window">
          <input
            type="text"
            placeholder="username"
            ref={usernameInputRef}
            required
          />
          <button type="submit" className="login-submit">
            <FaAngleRight />
          </button>
        </form>
      )}
      {showLogin && isLoggedIn && (
        <form onSubmit={onLogout}>
          <button type="submit" className="logout">
            Logout
          </button>
        </form>
      )}
    </div>
  );
}

export default Login;
