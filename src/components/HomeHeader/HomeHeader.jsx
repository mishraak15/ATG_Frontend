import axios from "axios";
import "./HomeHeader.css";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import {
  addEmoji,
  createNewPostHandler,
  previewImage,
} from "../Home/HomeScript";
import { useNavigate } from "react-router-dom";
import { PiVideoCameraFill } from "react-icons/pi";
import { MdPhoto } from "react-icons/md";
import { FaYoutube } from "react-icons/fa";
import { FaSmileWink } from "react-icons/fa";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

export default function HomeHeader({
  setShowEmojis,
  showEmojis,
  newPostText,
  setNewPostText,
  setPosts,
  setLoading,
  postCategory = "Simple Post",
}) {
  const url = process.env.REACT_APP_BACKEND_URL;
  const navigate = useNavigate();
  const [profilePhoto, setProfilePhoto] = useState("");
  const textareaRef = useRef(null);
  const [imagePreview, setImagePreview] = useState("");
  const [newPostImg, setNewPostImg] = useState(null);
  const [postBtn, setPostBtn] = useState(false);

  useEffect(() => {
    const userid = localStorage.getItem("userid");
    axios
      .get(`${url}/user/${userid}/profile`, { withCredentials: true })
      .then((res) => {
        if (res?.data?.msg === "OK") {
          setProfilePhoto(res?.data?.user?.profile_photo?.url);
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
  }, []);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${
        textareaRef.current.scrollHeight - 15
      }px`;
    }
  }, [newPostText]);

  return (
    <>
      <form encType="multipart/form-data" className="home-top">
        <div className="home-top1">
          <img src={profilePhoto} alt="" />
          <textarea
            ref={textareaRef}
            rows="1"
            type="text"
            name="post-content"
            placeholder="What's in your mind?"
            onChange={(e) => {
              e.target.value.length > 0 ? setPostBtn(true) : setPostBtn(false);
              setNewPostText(e.target.value);
            }}
            value={newPostText}
          />
        </div>
        {postBtn && (
          <div
            className="home-post-btn"
            onClick={() =>
              createNewPostHandler(
                newPostText,
                newPostImg,
                setPostBtn,
                setNewPostText,
                setNewPostImg,
                setImagePreview,
                setLoading,
                setPosts,
                navigate,
                postCategory
              )
            }
          >
            Post
          </div>
        )}

        {imagePreview !== "" && (
          <div className="Home-new-post-img-preview-container">
            <img
              className="Home-new-post-img-preview"
              src={imagePreview}
              alt=""
            />
            <button
              onClick={() => {
                setImagePreview("");
                setNewPostImg(null);
              }}
            >
              Remove
            </button>
          </div>
        )}

        <hr />

        <div className="home-top2">
          <div>
            <PiVideoCameraFill className="home-top2-icon" color="#ff7600" /> Go
            Live
          </div>

          <div style={{ position: "relative" }}>
            <MdPhoto className="home-top2-icon" color="seagreen" />{" "}
            <span>Photo</span>
            <input
              type="file"
              accept="image/png, image/jpeg, image/jpg"
              className="Home-input-post"
              onInput={(e) =>
                previewImage(e, setImagePreview, setPostBtn, setNewPostImg)
              }
            />
          </div>

          <div>
            <FaYoutube className="home-top2-icon" color="var(--dark-red)" />{" "}
            Video
          </div>

          <div
            style={showEmojis === true ? { background: "#d3d3d3" } : {}}
            onClick={() => setShowEmojis(!showEmojis)}
          >
            <FaSmileWink className="home-top2-icon" color="deepskyblue" />{" "}
            <span>Feeling</span>
          </div>
        </div>
      </form>
      {showEmojis && (
        <div className="Home-emoji-input-container">
          <Picker
            data={data}
            onEmojiSelect={(e) => addEmoji(e, setNewPostText, newPostText)}
          />
        </div>
      )}
    </>
  );
}
