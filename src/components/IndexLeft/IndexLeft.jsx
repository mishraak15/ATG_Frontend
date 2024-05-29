import React, { useState } from "react";
import "./IndexLeft.css";
import { AiFillHome } from "react-icons/ai";
import { FaUserFriends } from "react-icons/fa";
import { BsPersonWorkspace } from "react-icons/bs";
import { FaBookmark } from "react-icons/fa";
import { IoFlagSharp } from "react-icons/io5";
import { PiListStarFill } from "react-icons/pi";
import { FaChevronDown } from "react-icons/fa";
import { FaChevronUp } from "react-icons/fa";
import { MdGroups } from "react-icons/md";
import { FaCodePullRequest } from "react-icons/fa6";
import activeProfilePhoto from "../../assets/ouah28.jpg";
import { useNavigate } from "react-router-dom";

export default function IndexLeft({ setSubsection, subsection }) {
  const [showFullOptions, setShowFullOptions] = useState(false);
  const navigate=useNavigate();

  return (
    <div className="IndexLeft">
      <div
        className="IndexLeft-options"
        style={subsection === "Home" ? { backgroundColor: "#d3d3d3" } : {}}
        onClick={() => {
          setSubsection("Home");
          navigate("/");
        }}
      >
        <div
          className="IndexLeft-icon-container"
          style={{ backgroundColor: "skyblue" }}
        >
          <AiFillHome className="IndexLeft-icons" style={{ color: "blue" }} />
        </div>
        <span>Home</span>
      </div>

      <div
        className="IndexLeft-options"
        style={subsection === "Friends" ? { backgroundColor: "#d3d3d3" } : {}}
        onClick={() => {
          setSubsection("Friends");
          navigate("/");
        }}
      >
        <div
          className="IndexLeft-icon-container"
          style={{ backgroundColor: "lightgreen" }}
        >
          <FaUserFriends
            className="IndexLeft-icons"
            style={{ color: "green" }}
          />
        </div>
        <span>Friends</span>
      </div>

      <div
        className="IndexLeft-options"
        style={subsection === "Jobs" ? { backgroundColor: "#d3d3d3" } : {}}
        onClick={() => {
          setSubsection("Jobs");
          navigate("/");
        }}
      >
        <div
          className="IndexLeft-icon-container"
          style={{ backgroundColor: "#ffc57c" }}
        >
          <BsPersonWorkspace
            className="IndexLeft-icons"
            style={{ color: "#ff7600" }}
          />
        </div>
        <span>Jobs & Internships</span>
      </div>

      <div
        className="IndexLeft-options"
        style={subsection === "Saved" ? { backgroundColor: "#d3d3d3" } : {}}
        onClick={() => {
          setSubsection("Saved");
          navigate("/");
        }}
      >
        <div
          className="IndexLeft-icon-container"
          style={{ backgroundColor: "lightcoral" }}
        >
          <FaBookmark
            className="IndexLeft-icons"
            style={{ color: "#df4006" }}
          />
        </div>
        <span>Saved</span>
      </div>

      <div
        className="IndexLeft-options"
        style={subsection === "Requests" ? { backgroundColor: "#d3d3d3" } : {}}
        onClick={() => {
          setSubsection("Requests");
          navigate("/");
        }}
      >
        <div
          className="IndexLeft-icon-container"
          style={{ backgroundColor: "pink" }}
        >
          <FaCodePullRequest
            className="IndexLeft-icons"
            style={{ color: "#f75f97" }}
          />
        </div>
        <span>Requests</span>
      </div>

      <div
        className="IndexLeft-options"
        style={subsection === "Favorites" ? { backgroundColor: "#d3d3d3" } : {}}
        onClick={() => {
          setSubsection("Favorites");
          navigate("/");
        }}
      >
        <div
          className="IndexLeft-icon-container"
          style={{ backgroundColor: "darkgrey" }}
        >
          <PiListStarFill
            className="IndexLeft-icons"
            style={{ color: "#626262" }}
          />
        </div>
        <span>Favorites</span>
      </div>

      {showFullOptions && (
        <div>
          <div
            className="IndexLeft-options"
            style={
              subsection === "Groups" ? { backgroundColor: "#d3d3d3" } : {}
            }
            onClick={() => {
              setSubsection("Groups");
              navigate("/");
            }}
          >
            <div
              className="IndexLeft-icon-container"
              style={{ backgroundColor: "#ac7de9" }}
            >
              <MdGroups
                className="IndexLeft-icons"
                style={{ color: "#7034d1" }}
              />
            </div>
            <span>Groups</span>
          </div>

          <div
            className="IndexLeft-options"
            style={subsection === "Pages" ? { backgroundColor: "#d3d3d3" } : {}}
            onClick={() => {
              setSubsection("Pages");
              navigate("/");
            }}
          >
            <div
              className="IndexLeft-icon-container"
              style={{ backgroundColor: "#fb90d5" }}
            >
              <IoFlagSharp
                className="IndexLeft-icons"
                style={{ color: "#f53f5f" }}
              />
            </div>
            <span>Pages</span>
          </div>
        </div>
      )}

      <div
        className="IndexLeft-SeeMoreOption"
        onClick={() => setShowFullOptions(!showFullOptions)}
      >
        {showFullOptions ? (
          <>
            <FaChevronUp /> <span>See Less </span>
          </>
        ) : (
          <>
            <FaChevronDown />
            <span>See More </span>
          </>
        )}
      </div>
      <hr />
      <span className="IndexLeft-head">Active Friends</span>

      <div className="IndexLeft-active-container">
        <div className="IndexLeft-active">
          <div style={{ position: "relative" }}>
            <img src={activeProfilePhoto} alt="" />
            <div className="IndexLeft-active-dot"></div>
          </div>
          <span>John Doe</span>
        </div>

        <div className="IndexLeft-active">
          <div style={{ position: "relative" }}>
            <img src={activeProfilePhoto} alt="" />
            <div className="IndexLeft-active-dot"></div>
          </div>
          <span>John Doe</span>
        </div>

        {/* <div className="IndexLeft-active">
          <div style={{ position: "relative" }}>
            <img src={activeProfilePhoto} alt="" />
            <div className="IndexLeft-active-dot"></div>
          </div>
          <span>John Doe</span>
        </div> */}

        {/* <div className="IndexLeft-active">
          <div style={{ position: "relative" }}>
            <img src={activeProfilePhoto} alt="" />
            <div className="IndexLeft-active-dot"></div>
          </div>
          <span>John Doe</span>
        </div> */}
      </div>
    </div>
  );
}
