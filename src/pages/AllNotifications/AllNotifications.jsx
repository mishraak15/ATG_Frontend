import React, { useEffect, useState } from "react";
import "./AllNotifications.css";
import IndexLeft from "../../components/IndexLeft/IndexLeft";
import IndexRight from "../../components/IndexRight/IndexRight";
import { NavLink } from "react-router-dom";
import NotificationBar from "../../components/NotificationBar/NotificationBar";

export default function AllNotifications({ setSubsection, subsection }) {
  const [notifications, setNotifications] = useState([]);
  useEffect(() => {
    setNotifications([
      {
        category: "Posted",
        sent_by: {
          name: "Akash Mishra",
        },
        sent_at: new Date(),
        url: "/",
      },
      {
        category: "Liked",
        sent_by: {
          name: "Rahul Gupta",
        },
        sent_at: new Date(),
        url: "/",
      },
      {
        category: "Friend Request",
        sent_by: {
          name: "Lakshya Srivastav",
        },
        sent_at: "Tue May 21 2024 15:37:18",
        url: "/",
      },
    ]);
    setSubsection("");
  }, []);
  return (
    <div className="AllNotifications">
      <div className="index-left">
        <IndexLeft subsection={subsection} setSubsection={setSubsection} />
      </div>
      <div className="AllNotifications-mid">
        {notifications.map((notification, index) => (
          <NotificationBar key={index} notification={notification} />
        ))}
      </div>
      <div className="index-right">
        <IndexRight setSubsection={setSubsection} />
      </div>
    </div>
  );
}
