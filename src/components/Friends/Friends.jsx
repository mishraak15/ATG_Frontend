import React, { useEffect, useState } from "react";
import "./Friends.css";
import Loader from "../Loader/Loader";
import FriendCard from "../FriendCard/FriendCard";

export default function Friends() {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setFriends([
      {
        name: "Akash Mishra",
        mutual: 12,
      },
      {
        name: "Rahul Gupta",
        mutual: 8,
      },
      {
        name: "Akash Kumar",
        mutual: 14,
      },
      {
        name: "Lakshya Srivastava",
        mutual: 12,
      },
      {
        name: "Abhishek Khuswaha",
        mutual: 3,
      },
      {
        name: "Utkarsh Mishra",
        mutual: 0,
      },
    ]);
    setLoading(false);
  }, []);

  return (
    <div className="Friends">
      <h2>All your Friends</h2>
      {loading && <Loader />}
      {loading === false &&
        friends.map((friend, index) => (
          <FriendCard key={index} friend={friend} title={"Friends"} />
        ))}
    </div>
  );
}
