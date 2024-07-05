import React, { useEffect, useState } from "react";
import "./Friends.css";
import Loader from "../Loader/Loader";
import FriendCard from "../FriendCard/FriendCard";
import axios from "axios";
import toast from "react-hot-toast";

export default function Friends() {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const url = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const userid = localStorage.getItem("userid");
    axios
      .get(`${url}/user/${userid}/fetchFriends`, { withCredentials: true })
      .then((res) => {
        if (res?.data?.msg === "OK") {
          setFriends(res?.data?.friends);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        let errMsg = err?.response?.data?.message || "Something went wrong!!";
        toast.remove();
        toast.error(errMsg);
      });
  }, [url]);

  return (
    <div className="Friends">
      {friends?.length > 0 && <h2>All your Friends</h2>}
      {loading ? (
        <Loader />
      ) : (
        <div className="Request-container">
          {friends.map((friend, index) => (
            <FriendCard
              key={index}
              friend={friend}
              index={index}
              title={"Friends"}
            />
          ))}
        </div>
      )}
      {loading === false && friends?.length === 0 && (
        <div className="Request-none">No Friends yet!!</div>
      )}
    </div>
  );
}
