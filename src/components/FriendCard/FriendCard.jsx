import React, { useEffect, useState } from "react";
import "./FriendCard.css";
import profilePhoto from "../../assets/ouah28.jpg";
import { convertPostTime } from "../HomePost/HomePostScript";
import { NavLink } from "react-router-dom";

export default function FriendCard({ friend, title }) {
  const [btnTitle, setBtnTitle] = useState("");

  useEffect(() => {
    title === "Friends" ? setBtnTitle("Remove") : setBtnTitle("Accept");
  }, [title]);

  return (
    <div className="FriendCard">
      <div className="FriendCard-top">
        <NavLink to={`/user/${friend?.id}/profile`} className="FriendCard-img-name">
          <img src={profilePhoto} alt="" />
          <div>
            <span>{friend?.name}</span>
            <div className="FriendCard-mutual">
              {friend?.mutual} mutual friends
            </div>
          </div>
        </NavLink>
        {title === "Request" && (
          <div className="FriendCard-req-time">
            {convertPostTime(friend?.requeted_time)}
          </div>
        )}
      </div>

      <div className="FriendCard-btn-container">
        {title === "Request" && btnTitle === "Accept" && (
          <div
            className="FriendCard-remove-btn"
            onClick={() => setBtnTitle("Accepted")}
            style={{ backgroundColor: "seagreen" }}
          >
            Accept
          </div>
        )}

        {title === "Request" && btnTitle === "Accepted" && (
          <div
            className="FriendCard-remove-btn"
            style={{ backgroundColor: "var(--light-grey)", color: "black" }}
          >
            Accepted
          </div>
        )}

        {title === "Friends" && btnTitle === "Remove" && (
          <div
            className="FriendCard-remove-btn"
            onClick={() => setBtnTitle("Add")}
          >
            Remove
          </div>
        )}

        {title === "Friends" && btnTitle === "Add" && (
          <div
            className="FriendCard-remove-btn"
            onClick={(e) => setBtnTitle("Requested")}
            style={{ backgroundColor: "var(--dark-grey)" }}
          >
            Send Request
          </div>
        )}

        {title === "Friends" && btnTitle === "Requested" && (
          <div
            className="FriendCard-remove-btn"
            style={{ backgroundColor: "var(--light-grey)", color: "black" }}
          >
            Requested
          </div>
        )}

        {title === "Friends" && (
          <div className="FriendCard-msg-btn">Message</div>
        )}

        {title === "Request" && (
          <div
            className="FriendCard-msg-btn"
            style={{ backgroundColor: "var(--dark-red)" }}
          >
            Reject
          </div>
        )}
      </div>
    </div>
  );
}
