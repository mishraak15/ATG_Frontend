import React, { useEffect, useState } from "react";
import "./Request.css";
import Loader from "../Loader/Loader";
import FriendCard from "../FriendCard/FriendCard";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Request() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const url = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    let userid = localStorage.getItem("userid");
    axios
      .get(`${url}/user/${userid}/fetchFriendRequests`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res?.data?.msg === "OK") {
          setRequests(res?.data?.friendRequests);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        const errMsg = err?.response?.data?.message || "Something went wrong!!";
        if (errMsg === "You are not logged in") {
          navigate("/login");
        }
        toast.error(errMsg);
      });
  }, [navigate, url]);

  return (
    <div className="Request">
      {loading && <Loader />}
      {requests?.length > 0 && <h2>Friend Requests</h2>}
      {loading === false && (
        <div className="Request-container">
          {requests?.map((friend, index) => (
            <FriendCard friend={friend} key={index} index={index} title={"Request"} />
          ))}
        </div>
      )}
      {loading === false && requests?.length === 0 && (
        <div className="Request-none">No Friend Request found!!</div>
      )}
    </div>
  );
}
