import React, { useState } from "react";
import "./Login.css";
import {
  emailSignInBtnHandler,
  googleSignInBtnHandler,
  // githubSignInBtnHandler,
  linkedinSignInBtnHandler,
  instagramSignInBtnHandler,
  // checkHandler,
  // logout,
} from "../Signup/SignupScript";
import signupImg from "../../assets/signup_img.jpg";
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";
import { FaGoogle } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { NavLink } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="Signup Login">
      <h2>Welcome Back!!</h2>
      <div className="Signup-container">
        <img src={signupImg} alt="" />
        <form
          className="Signup-form"
          onSubmit={(e) => emailSignInBtnHandler(e, username, password)}
        >
          <div className="Signup-btn-container">
            <div> <NavLink to="/signup">SignUp</NavLink></div>
            <div>
              LogIn
            </div>
          </div>

          <div className="Signup-form-inputElement">
            <FaUser className="Signup-form-inputElement-icon" />
            <input
              id="username"
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              placeholder="E-mail or Username*"
              required
            />
          </div>

          <div className="Signup-form-inputElement">
            <FaLock className="Signup-form-inputElement-icon" />
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password*"
            />
            {showPassword ? (
              <FaEyeSlash
                onClick={() => setShowPassword(!showPassword)}
                className="Signup-form-inputElement-icon"
              />
            ) : (
              <FaEye
                onClick={() => setShowPassword(!showPassword)}
                className="Signup-form-inputElement-icon"
              />
            )}
          </div>

          <button type="submit" className="Signup-submit-btn">
            Login Now
          </button>
          <div className="Signup-line">
            <hr />
            <div>OR</div>
            <hr />
          </div>
          <div className="other-signup-option-container">
            <div
              className="other-signup-option"
              onClick={googleSignInBtnHandler}
            >
              <FaGoogle />
            </div>
            <div
              className="other-signup-option"
              onClick={linkedinSignInBtnHandler}
            >
              <FaLinkedinIn />
            </div>
            <div
              className="other-signup-option"
              onClick={instagramSignInBtnHandler}
            >
              <FaInstagram />
            </div>
          </div>
          <div className="Signup-already-account">
            <span>Don't have account?</span>
            <NavLink to="/signup"> Create Now!!</NavLink>
          </div>
        </form>
      </div>

      {/* <button onClick={checkHandler}>Check</button>
      <button onClick={logout}>Logout</button> */}
    </div>
  );
}
