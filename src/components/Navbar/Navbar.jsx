import React, { useState } from "react";
import "./Navbar.css";
import logo from "../../assets/ouah28.jpg";
import { IoSearchSharp } from "react-icons/io5";
import { RiMessage2Fill } from "react-icons/ri";
import { IoNotifications } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  let userid = "xcv35ns4dfk78sdfa";
  const [unseenMessage, setUnseenMessage] = useState(true);
  const [unseenNotification, setUnseenNotification] = useState(false);

  return (
    <div className="Navbar">
      <NavLink to="#" className="nav-left">
        <img src={logo} alt="" />
        <span>AcrossTheGlobe</span>
      </NavLink>

      <div className="nav-mid">
        <IoSearchSharp className="nav-mid-search-icon" />
        <input
          type="text"
          name="searchParams"
          id="nav-search-field"
          placeholder="Search for friends, groups or pages"
        />
      </div>

      <div className="nav-right">
        <NavLink to="#" className="nav-icon-container">
          <RiMessage2Fill className="nav-right-icons" />
          <div
            className="nav-alert-dot"
            style={unseenMessage ? { display: "block" } : { display: "none" }}
          ></div>
        </NavLink>

        <NavLink 
          to={`/user/${userid}/allnotifications`}
          className="nav-icon-container"
        >
          <IoNotifications className="nav-right-icons" />
          <div
            className="nav-alert-dot"
            style={
              unseenNotification ? { display: "block" } : { display: "none" }
            }
          ></div>
        </NavLink>

        <NavLink to="#" className="nav-icon-container">
          <FaUser className="nav-right-icons" />
        </NavLink>
      </div>
    </div>
  );
}
