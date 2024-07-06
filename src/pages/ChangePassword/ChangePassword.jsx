import React, { useState } from "react";
import "./ChangePassword.css";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const url = process.env.REACT_APP_BACKEND_URL;

export default function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  function changePassClickHandler(e) {
    let userid = localStorage.getItem("userid");
    e.preventDefault();
    let confirmNewPass = document.getElementById("confirmNewPass").value;
    if (confirmNewPass !== newPassword) {
      return toast.error("Password and Confirm Password is not same!!");
    }
    toast.loading("Loading...");
    axios
      .post(
        `${url}/user/${userid}/changePassword`,
        {
          newPassword,
          oldPassword,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res?.data?.msg === "OK") {
          toast.remove();
          toast.success("Password changed successfully!!");
          navigate("/");
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
    <div className="ChangePassword">
      <form
        className="ChangePassword-box"
        onSubmit={(e) => changePassClickHandler(e)}
      >
        <div>Change Password</div>
        <input
          type="password"
          name="oldPass"
          id="oldPass"
          placeholder="Enter your old password"
          required
          onChange={(e) => setOldPassword(e.target.value)}
        />
        <input
          type="password"
          name="newPass"
          id="newPass"
          placeholder="Enter your new password"
          required
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <input
          type="password"
          name="confirmNewPass"
          id="confirmNewPass"
          placeholder="Confirm new password"
          required
        />
        <button type="submit">Change</button>
      </form>
    </div>
  );
}
