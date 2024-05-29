import React from "react";
import "./NotificationBar.css";
import { NavLink } from "react-router-dom";
import profilePhoto from "../../assets/ouah28.jpg";
import { convertPostTime } from "../HomePost/HomePostScript";

export default function NotificationBar({ notification }) {
  return (
    <div className="NotificationBar">
      <NavLink to={notification?.url}>
        <div className="NotificationBar-info-container">
          <img src={profilePhoto} alt="" />
          <div className="NotificationBar-info">
            <span>{notification?.sent_by?.name} </span>
            {
                notification?.category==="Posted" &&
                "posted something. Have a look!!"
            }
            {
                notification?.category==="Liked" &&
                "liked your post."
            }
            {
                notification?.category==="Commented" &&
                "commented on your post."
            }
            {
                notification?.category==="Friend Request" &&
                "sent you a friend request."
            }
          </div>
        </div>
        <div className="NotificationBar-time">
            {convertPostTime(notification?.sent_at)}
        </div>
      </NavLink>
    </div>
  );
}
