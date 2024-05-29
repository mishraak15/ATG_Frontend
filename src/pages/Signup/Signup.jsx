import React, { useState } from "react";
import "./Signup.css";
import {
  emailSignInBtnHandler,
  googleSignInBtnHandler,
  // githubSignInBtnHandler,
  linkedinSignInBtnHandler,
  instagramSignInBtnHandler,
  // checkHandler,
  // logout,
} from "./SignupScript";
import signupImg from "../../assets/signup_img.jpg";
import { FaUser } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";
import { FaGoogle } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="Signup">
      <h2>Welcome Back!!</h2>
      <div className="Signup-container">
        <img src={signupImg} alt="" />
        <form
          className="Signup-form"
          onSubmit={(e) => {
            emailSignInBtnHandler(e, username, email, password, navigate);
          }}
        >
          <div className="Signup-btn-container">
            <div>SignUp</div>
            <div>
              <NavLink to="/login">LogIn</NavLink>
            </div>
          </div>

          <div className="Signup-form-inputElement">
            <FaUser className="Signup-form-inputElement-icon" />
            <input
              id="username"
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username*"
              required
            />
          </div>

          <div className="Signup-form-inputElement">
            <MdAlternateEmail className="Signup-form-inputElement-icon" />
            <input
              id="email"
              type="text"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-mail*"
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

          <div className="Signup-form-condition-container">
            <input type="checkbox" name="condition" id="condition" required />
            <label htmlFor="condition">
              I agree to all the Terms and Conditon and I am over 18 years of
              age.
            </label>
          </div>

          <button type="submit" className="Signup-submit-btn">
            Create an Account
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
            <span>Alreadry have account. </span>
            <NavLink to=""> Log-in Now!!</NavLink>
          </div>
        </form>
      </div>

      {/* <button onClick={checkHandler}>Check</button>
      <button onClick={logout}>Logout</button> */}
    </div>
  );
}
