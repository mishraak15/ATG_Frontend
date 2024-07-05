import React, { useEffect, useState } from "react";
import "./FriendCard.css";
import { convertPostTime } from "../HomePost/HomePostScript";
import { NavLink, useNavigate } from "react-router-dom";
import {
  sendRequestClickHandler,
  unfriendClickHandler,
  rejectRequestClickHandler,
  acceptRequestClickHandler,
} from "./FriendCardScript";

export default function FriendCard({ index = 0, friend, title }) {
  const [btnTitle, setBtnTitle] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    title === "Friends" ? setBtnTitle("Remove") : setBtnTitle("Accept");
  }, [title]);

  return (
    <div className="FriendCard">
      <div className="FriendCard-top">
        <div className="FriendCard-img-container">
          {title === "Request" && (
            <img src={friend?.sent_by?.background_photo?.url} alt="" />
          )}
          {title === "Request" && (
            <img src={friend?.sent_by?.profile_photo?.url} alt="" />
          )}
          {title === "Friends" && (
            <img src={friend?.background_photo?.url} alt="" />
          )}
          {title === "Friends" && (
            <img src={friend?.profile_photo?.url} alt="" />
          )}
        </div>
        <div className="FriendCard-name-time">
          {title === "Request" && (
            <NavLink to={`/user/${friend?.sent_by?._id}/profile`}>
              {friend?.sent_by?.username}
            </NavLink>
          )}
          {title === "Request" && (
            <div className="FriendCard-req-time">
              {convertPostTime(friend?.sent_at)}
            </div>
          )}
          {title === "Friends" && (
            <NavLink to={`/user/${friend?._id}/profile`}>
              {friend?.username}
            </NavLink>
          )}
        </div>
        {title === "Request" && friend?.sent_by?.name && (
          <div
            className="FriendCard-mutual"
            style={{ color: "#363636", fontSize: "16px" }}
          >
            {friend?.sent_by?.name}
          </div>
        )}
        {title === "Friends" && friend?.name && (
          <div
            className="FriendCard-mutual"
            style={{ color: "#363636", fontSize: "16px" }}
          >
            {friend?.name}
          </div>
        )}

        {title === "Request" && (
          <div className="FriendCard-mutual">
            {friend?.sent_by?.friends?.length} friends
          </div>
        )}

        {title === "Friends" && (
          <div className="FriendCard-mutual">
            {friend?.friends?.length} friends
          </div>
        )}
      </div>

      <div className="FriendCard-btn-container">
        {title === "Request" && btnTitle === "Accept" && (
          <div
            className="FriendCard-remove-btn"
            onClick={() => {
              acceptRequestClickHandler(friend?.sent_by?._id, navigate, index);
              setBtnTitle("Accepted");
            }}
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
            onClick={() => {
              unfriendClickHandler(friend?._id, navigate);
              setBtnTitle("Add");
            }}
          >
            Remove
          </div>
        )}

        {title === "Friends" && btnTitle === "Add" && (
          <div
            className="FriendCard-remove-btn"
            onClick={() => {
              sendRequestClickHandler(friend?._id, navigate);
              setBtnTitle("Requested");
            }}
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
            onClick={(ex) => {
              if (ex.target.innerHTML === "Reject") {
                rejectRequestClickHandler(
                  friend?.sent_by?._id,
                  navigate,
                  index,
                  ex
                );
              }
            }}
          >
            Reject
          </div>
        )}
      </div>
    </div>
  );
}
