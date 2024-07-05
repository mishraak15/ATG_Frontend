import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "./VerifyAccount.css";
import Loader from "../../components/Loader/Loader";

export default function VerifyAccount() {
  const navigate = useNavigate();
  const url = process.env.REACT_APP_BACKEND_URL;
  const [loading, setLoading] = useState(true);

  function checkStatus() {
    let userid = localStorage.getItem("currUser");
    axios
      .get(`${url}/user/${userid}/checkStatus`, { withCredentials: true })
      .then((res) => {
        if (res?.data?.msg === "OK") {
          setLoading(false);
          localStorage.setItem("currUser", "");
          localStorage.setItem("userid", userid);
          navigate("/");
        } else if (res?.data?.msg === "Not Active") {
          toast.error("Account Not Verified!!");
        }
      })
      .catch((err) => {
        console.log(err?.response?.data);
      });
  }

  useEffect(() => {
    toast.loading("Loading...");
    let userid = localStorage.getItem("userid");
    if (userid === "") {
      clearInterval(checkInterval);
      return navigate("/signup");
    }
    checkStatus();
  }, []);

  const checkInterval = setInterval(() => {
    checkStatus();
  }, 3000);

  return (
    <div className="VerifyAccount">
      <h2>Verify Email to login!</h2>
      <li>Open you Gmail through which you have signed-in.</li>
      <li>Click on the the link to verify your email.</li>
      <li>Refresh This page.</li>
      {loading && <Loader />}
    </div>
  );
}
