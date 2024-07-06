import React, { useEffect, useState } from "react";
import "./EditProfile.css";
import axios from "axios";
import Loader from "../../components/Loader/Loader";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
const url = process.env.REACT_APP_BACKEND_URL;

export default function EditProfile() {
  let userid = localStorage.getItem("userid");
  let [focusOn, setFocusOn] = useState(0);
  let [profilePhotoUrl, setProfilePhotoUrl] = useState("");
  let [backgroundPhotoUrl, setBackgroundPhotoUrl] = useState("");
  let [editedData, setEditedData] = useState({
    username: "",
    fullname: "",
    dob: "",
    mobile_no: "",
    gender: "",
    bio: "",
    profile_photo: {},
    background_photo: {},
  });
  let [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  function previewImage(event, x) {
    const file = event.target.files[0];
    if (file) {
      if (x === "profile_photo") {
        setEditedData({ ...editedData, profile_photo: file });
      }
      if (x === "background_photo") {
        setEditedData({ ...editedData, background_photo: file });
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        if (x === "profile_photo") {
          setProfilePhotoUrl(reader.result);
        }
        if (x === "background_photo") {
          setBackgroundPhotoUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);
    } else {
      if (x === "profile_photo") {
        setProfilePhotoUrl("");
      }
      if (x === "background_photo") {
        setBackgroundPhotoUrl("");
      }
    }
  }

  function fetchUserData() {
    axios
      .get(`${url}/user/${userid}/profile`, { withCredentials: true })
      .then((res) => {
        if (res?.data?.msg === "OK") {
          setEditedData({
            username: res?.data?.user?.username,
            fullname: res?.data?.user?.name,
            dob: res?.data?.user?.dob,
            mobile_no: res?.data?.user?.mobile_no,
            gender: res?.data?.user?.gender,
            bio: res?.data?.user?.bio,
          });
          setProfilePhotoUrl(res?.data?.user?.profile_photo?.url);
          setBackgroundPhotoUrl(res?.data?.user?.background_photo?.url);
          selectGender(res?.data?.user?.gender);
        }
      })
      .catch((err) => {
        toast.remove();
        console.log(err);
        const errMsg = err?.response?.data?.message || "Something went wrong!!";
        if (errMsg === "You are not logged in") {
          navigate("/login");
        }
        toast.error(errMsg);
      });
  }

  function selectGender(g) {
    let selectedOption = document.querySelector(`.gender-opt[value="${g}"]`);
    if (selectedOption) {
      selectedOption.selected = "selected";
    }
  }

  useEffect(() => {
    fetchUserData();
    setLoading(false);
  }, []);

  function inpChangeHandler(e) {
    setEditedData({ ...editedData, [e.target.name]: e.target.value });
  }

  function submitEditedUser(e) {
    e.preventDefault();

    if (
      editedData?.mobile_no?.length < 10 ||
      editedData?.mobile_no?.length > 15
    ) {
      setFocusOn(2);
      return toast.error("Invalid Mobile Number");
    }

    let userid = localStorage.getItem("userid");
    setLoading(true);
    setFocusOn(0);
    axios
      .post(
        `${url}/user/${userid}/editUser`,
        { editedData },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res?.data?.msg === "OK") {
          toast.success("User Data Updated!!");
        } else {
          toast.remove();
          toast.error("Something unusual happened!!");
        }
        fetchUserData();
        setLoading(false);
      })
      .catch((err) => {
        toast.remove();
        console.log(err);
        const errMsg = err?.response?.data?.message || "Something went wrong!!";
        if (errMsg === "You are not logged in") {
          navigate("/login");
        }
        if (err?.response?.data?.error?.codeName === "DuplicateKey") {
          setLoading(false);
          toast.error("Username is already present");
          return setFocusOn(1);
        }
        toast.error(errMsg);
      });
  }

  return loading ? (
    <Loader />
  ) : (
    <form
      encType="multipart/form-data"
      className="EditProfile"
      onSubmit={(e) => {
        submitEditedUser(e);
      }}
    >
      <div style={{ width: "100%" }}>
        <img
          className="EditProfile-backgroundPhoto"
          src={backgroundPhotoUrl}
          alt="background"
          loading="lazy"
        />
        <div className="EditProfile-backgroundPhoto-inp-container">
          <FaEdit />
          <input
            type="file"
            name="background_photo"
            id=""
            onChange={(e) => previewImage(e, "background_photo")}
          />
        </div>
      </div>

      <div>
        <img
          className="EditProfile-profilePhoto"
          src={profilePhotoUrl}
          alt="profile"
          loading="lazy"
        />
        <div className="EditProfile-profilePhoto-inp-container">
          <FaEdit />
          <input
            type="file"
            name="profile_photo"
            id=""
            onChange={(e) => previewImage(e, "profile_photo")}
          />
        </div>
      </div>

      <div className="EditProfile-item">
        <label htmlFor="EditProfile-username">Username</label>
        <input
          type="text"
          name="username"
          id="EditProfile-username"
          value={editedData?.username}
          required
          onChange={(e) => inpChangeHandler(e)}
          style={
            focusOn === 1 ? { border: "2px solid red" } : { border: "none" }
          }
        />
      </div>

      <div className="EditProfile-item">
        <label htmlFor="fullname">Name</label>
        <input
          type="text"
          name="fullname"
          id="fullname"
          value={editedData?.fullname}
          placeholder="Enter your fullname"
          required
          onChange={(e) => inpChangeHandler(e)}
        />
      </div>

      <div className="EditProfile-item">
        <label htmlFor="bio">Bio</label>
        <textarea
          type="text"
          name="bio"
          id="bio"
          value={editedData?.bio}
          onChange={(e) => inpChangeHandler(e)}
        ></textarea>
      </div>

      <div className="EditProfile-item">
        <label htmlFor="gender">Gender</label>
        <select
          name="gender"
          id="gender"
          required
          onChange={(e) => {
            inpChangeHandler(e);
          }}
        >
          <option value="" disabled>
            Choose your gender
          </option>
          <option value="Male" className="gender-opt">
            Male
          </option>
          <option value="Female" className="gender-opt">
            Female
          </option>
          <option value="Other" className="gender-opt">
            Other
          </option>
        </select>
      </div>

      <div className="EditProfile-item">
        <label htmlFor="dob">DOB</label>
        <input
          type="date"
          name="dob"
          id="dob"
          value={editedData?.dob}
          required
          onChange={(e) => inpChangeHandler(e)}
        />
      </div>

      <div className="EditProfile-item">
        <label htmlFor="mobile_no">Mobile No.</label>
        <input
          type="number"
          name="mobile_no"
          id="mobile_no"
          value={editedData?.mobile_no}
          placeholder="Enter Mobile no."
          onChange={(e) => inpChangeHandler(e)}
          style={
            focusOn === 2 ? { border: "2px solid red" } : { border: "none" }
          }
        />
      </div>

      <button type="submit">Apply Changes</button>
    </form>
  );
}
