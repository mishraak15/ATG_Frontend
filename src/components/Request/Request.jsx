import React, { useEffect, useState } from "react";
import "./Request.css";
import Loader from "../Loader/Loader";
import FriendCard from "../FriendCard/FriendCard";

export default function Request() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setRequests([
      {
        name: "Akash Mishra",
        mutual: 12,
        requeted_time:"Thu May 23 2024 15:07:18"
      },
      {
        name: "Rahul Gupta",
        mutual: 8,
        requeted_time:"Mon May 20 2024 07:07:18"
      },
      {
        name: "Akash Kumar",
        mutual: 14,
        requeted_time:"Tue May 21 2024 20:07:18"
      },
      {
        name: "Lakshya Srivastava",
        mutual: 12,
        requeted_time:"Wed May 22 2024 20:07:18"
      },
      {
        name: "Abhishek Khuswaha",
        mutual: 3,
        requeted_time:"Wed May 22 2024 20:07:18"
      },
      {
        name: "Utkarsh Mishra",
        mutual: 0,
        requeted_time:"Thu May 23 2024 15:36:18"
      },
    ]);
    setLoading(false);
  }, []);
  return (
    <div className="Request">
      <h2>Friend Requests</h2>
      {loading && <Loader />}
      {loading === false &&
        requests.map((friend, index) => (
          <FriendCard friend={friend} key={index} title={"Request"} />
        ))}
    </div>
  );
}
