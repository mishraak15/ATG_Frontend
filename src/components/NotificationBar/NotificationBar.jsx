import React from "react";
import "./NotificationBar.css";
import { convertPostTime } from "../HomePost/HomePostScript";
import { useNavigate } from "react-router-dom";

export default function NotificationBar({ notification, setSubsection }) {
  const navigate = useNavigate();
  function callFunction(){
    setSubsection("Requests");
    navigate("/");
  }
  
  return (
    <div className="NotificationBar">
      <div
        onClick={() => {
          notification?.url === "/"
            ? callFunction()
            : navigate(notification?.url);
        }}
      >
        <div className="NotificationBar-info-container">
          <img src={notification?.sent_by?.profile_photo?.url} alt="" />
          <div className="NotificationBar-info">
            <span>{notification?.sent_by?.username} </span>
            {notification?.category === "Posted" &&
              "posted something. Have a look!!"}
            {notification?.category === "Liked" && "liked your post."}
            {notification?.category === "Commented" &&
              "commented on your post."}
            {notification?.category === "Friend Request" &&
              "sent you a friend request."}
          </div>
        </div>
        <div className="NotificationBar-time">
          {convertPostTime(notification?.sent_at)}
        </div>
      </div>
    </div>
  );
}
