import React, { useEffect, useState } from "react";
import "./AllNotifications.css";
import IndexLeft from "../../components/IndexLeft/IndexLeft";
import IndexRight from "../../components/IndexRight/IndexRight";
import NotificationBar from "../../components/NotificationBar/NotificationBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Loader from "../../components/Loader/Loader";

export default function AllNotifications({ setSubsection, subsection }) {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const url = process.env.REACT_APP_BACKEND_URL;
  const navigate = useNavigate();

  useEffect(() => {
    const userid = localStorage.getItem("userid");
    axios
      .get(`${url}/user/${userid}/fetchNotifications`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res?.data?.msg === "OK") {
          setNotifications(res?.data?.notifications);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        const errMsg = err?.response?.data?.message || "Something went wrong!!";
        if (errMsg === "You are not logged in") {
          navigate("/login");
        }
        toast.error(errMsg);
      });

    setSubsection("");
  }, []);

  return (
    <div className="AllNotifications">
      <div className="index-left">
        <IndexLeft subsection={subsection} setSubsection={setSubsection} />
      </div>
      {loading ? (
        <div style={{width:"50%"}}>
          <Loader />
        </div>
      ) : (
        <div className="AllNotifications-mid">
          <h2>All Notifications</h2>
          {notifications.map((notification, index) => (
            <NotificationBar
              key={index}
              notification={notification}
              setSubsection={setSubsection}
            />
          ))}
        </div>
      )}
      <div className="index-right">
        <IndexRight setSubsection={setSubsection} />
      </div>
    </div>
  );
}
