import React, { useEffect, useRef, useState } from "react";
import "./Navbar.css";
import logo from "../../assets/ouah28.jpg";
import { IoSearchSharp } from "react-icons/io5";
import { RiMessage2Fill } from "react-icons/ri";
import { IoNotifications } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { FaUserEdit } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdLogout } from "react-icons/md";
import { MdLogin } from "react-icons/md";

export default function Navbar() {
  const [unseenMessage, setUnseenMessage] = useState(true);
  const [unseenNotification, setUnseenNotification] = useState(false);
  const [userData, setUserData] = useState({});
  const [showUserOptions, setShowUserOptions] = useState(false);
  const userid = localStorage.getItem("userid");
  const url = process.env.REACT_APP_BACKEND_URL;
  const navigate = useNavigate();
  const boxRef = useRef();

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (boxRef.current && !boxRef.current.contains(event.target)) {
      setShowUserOptions(false);
    }
  };

  function fetchUserData() {
    const userid = localStorage.getItem("userid");
    if(!userid){
      navigate("/login");
    }
    axios
      .get(`${url}/user/${userid}/profile`, { withCredentials: true })
      .then((res) => {
        if (res?.data?.msg === "OK") {
          let username = res?.data?.user?.username;
          let name = res?.data?.user?.name;
          let profile_photo = res?.data?.user?.profile_photo;
          setUserData({ username, name, profile_photo });
        }
      })
      .catch((err) => {
        console.log(err);
        const errMsg = err?.response?.data?.message || "Something went wrong!!";
        if (errMsg === "You are not logged in") {
          navigate("/login");
        }
        toast.error(errMsg);
      });
  }

  function logoutClickHandler() {
    axios
      .get(`${url}/logout`, { withCredentials: true })
      .then((res) => {
        if (res?.data?.msg === "OK") {
          localStorage.setItem("userid", "");
          localStorage.setItem("currUser", "");
          console.log("userid-->", localStorage.getItem("userid"));
          return navigate("/signup");
        }
      })
      .catch((err) => {
        console.log(err);
        let errMsg = err?.response?.data?.message || "Something went wrong!!";
        toast.error(errMsg);
      });
  }

  return (
    <div className="Navbar">
      <NavLink to="/" className="nav-left">
        <img src={logo} alt="" />
        <span>AcrossTheGlobe</span>
      </NavLink>

      {localStorage.getItem("userid") &&
        localStorage.getItem("userid") !== "" && (
          <div className="nav-mid">
            <IoSearchSharp className="nav-mid-search-icon" />
            <input
              type="text"
              name="searchParams"
              id="nav-search-field"
              placeholder="Search for friends, groups or pages"
            />
          </div>
        )}

      {localStorage.getItem("userid") &&
        localStorage.getItem("userid") !== "" && (
          <div className="nav-right">
            <NavLink to="#" className="nav-icon-container">
              <abbr title="Chats">
                <RiMessage2Fill className="nav-right-icons" />
              </abbr>
              <div
                className="nav-alert-dot"
                style={
                  unseenMessage ? { display: "block" } : { display: "none" }
                }
              ></div>
            </NavLink>

            <NavLink
              to={`/user/${userid}/allnotifications`}
              className="nav-icon-container"
            >
              <abbr title="Notifications">
                <IoNotifications className="nav-right-icons" />
              </abbr>
              <div
                className="nav-alert-dot"
                style={
                  unseenNotification
                    ? { display: "block" }
                    : { display: "none" }
                }
              ></div>
            </NavLink>

            <div
              className="nav-icon-container"
              onClick={() => {
                setShowUserOptions(true);
                fetchUserData();
              }}
            >
              <FaUser className="nav-right-icons" />
            </div>
            <div className="nav-icon-container" onClick={logoutClickHandler}>
              <abbr title="Logout">
                <MdLogout className="nav-right-icons" />
              </abbr>
            </div>
          </div>
        )}
      <div
        className="nav-userOptions"
        ref={boxRef}
        style={showUserOptions ? { display: "flex" } : { display: "none" }}
      >
        <img src={userData?.profile_photo?.url} alt="profile" loading="lazy" />
        <div className="nav-userOptions-username">{userData?.username}</div>
        {userData?.name && (
          <div className="nav-userOptions-name">{userData?.name}</div>
        )}
        <NavLink
          to={`/user/${userid}/editProfile`}
          className="nav-userOptions-item"
          onClick={() => setShowUserOptions(false)}
        >
          Edit Profile <FaUserEdit fontSize="1.2em" />
        </NavLink>
        <NavLink
          to={`/user/${userid}/changePassword`}
          className="nav-userOptions-item"
          onClick={() => setShowUserOptions(false)}
        >
          Change Password <RiLockPasswordFill fontSize="1.2em" />
        </NavLink>
        <div
          className="nav-userOptions-item"
          onClick={() => {
            navigate("/signup");
            setShowUserOptions(false);
          }}
        >
          Login with another account <MdLogin fontSize="1.2em" />
        </div>
        <div
          className="nav-userOptions-item"
          onClick={() => {
            navigate("/signup");
            setShowUserOptions(false);
          }}
        >
          Create new account
          <FaUser fontSize="1.2em" />
        </div>
        <div
          className="nav-userOptions-item"
          onClick={() => {
            logoutClickHandler();
            setShowUserOptions(false);
          }}
        >
          Logout <MdLogout fontSize="1.2em" />
        </div>
      </div>
    </div>
  );
}
