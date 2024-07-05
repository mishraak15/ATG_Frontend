import React, { useState } from "react";
import "./ResetPassword.css";
import { FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [url, setUrl] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  function ResetPassClickHandler(e) {
    e.preventDefault();
    document.getElementById("ResetPassword-inp1").style.border =
      "none";
    document.getElementById("ResetPassword-inp2").style.border =
      "none";

    if (password !== confirmPassword) {
      document.getElementById("ResetPassword-inp1").style.border =
        "2px solid var(--dark-red)";
      document.getElementById("ResetPassword-inp2").style.border =
        "2px solid var(--dark-red)";
      return toast.error("Password and Confirm Password should be same!!");
    }

    toast.loading("Loading..."); 
    axios
      .patch(`${url}`, { password, confirmPassword }, { withCredentials: true })
      .then((res) => {
        if (res?.data?.msg === "OK") {
            let userid = res?.data?.userid;
            toast.remove();
            localStorage.setItem("currUser", "");
            localStorage.setItem("userid", userid);
            return navigate("/");
        }
      })
      .catch((err) => {
        toast.remove();
        console.log(err);
        const errMsg = err?.response?.data?.message || "Something went wrong!!";
        if (errMsg === "You are not logged in") {
          navigate("/login");
        }
        toast.error(errMsg);
      });
  }

  return (
    <div className="ResetPassword">
      <input
        type="text"
        className="ResetPassword-url-input"
        placeholder="Paste the url received via E-Mail"
        onChange={(e) => setUrl(e.target.value)}
        required
      />
      <form
        className="ResetPassword-pass-container"
        onSubmit={(e) => ResetPassClickHandler(e)}
      >
        <h3>Reset Password</h3>

        <div className="Signup-form-inputElement" id="ResetPassword-inp1">
          <FaLock className="Signup-form-inputElement-icon" />
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password*"
            required
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

        <div className="Signup-form-inputElement" id="ResetPassword-inp2">
          <FaLock className="Signup-form-inputElement-icon" />
          <input
            id="confirm-password"
            type={showConfirmPassword ? "text" : "password"}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password*"
            required
          />
          {showConfirmPassword ? (
            <FaEyeSlash
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="Signup-form-inputElement-icon"
            />
          ) : (
            <FaEye
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="Signup-form-inputElement-icon"
            />
          )}
        </div>

        <button className="ResetPassword-btn">Change Password</button>
      </form>
    </div>
  );
}
