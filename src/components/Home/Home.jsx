import React, { useEffect, useRef, useState } from "react";
import "./Home.css";
import profilephoto from "../../assets/ouah28.jpg";
import { PiVideoCameraFill } from "react-icons/pi";
import { MdPhoto } from "react-icons/md";
import { FaYoutube } from "react-icons/fa";
import { FaSmileWink } from "react-icons/fa";
import HomePost from "../HomePost/HomePost";

import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import Loader from "../Loader/Loader";
import {
  addEmoji,
  previewImage,
  createNewPostHandler,
  fetchPosts,
} from "./HomeScript";

export default function Home() {
  const [postBtn, setPostBtn] = useState(false);
  const [posts, setPosts] = useState([]);
  const [newPostText, setNewPostText] = useState("");
  const [newPostImg, setNewPostImg] = useState(null);
  const [showEmojis, setShowEmojis] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(true);
  const textareaRef = useRef(null);

  useEffect(() => {
    fetchPosts(setPosts, setLoading);
  }, []);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight - 15}px`;
    }
  }, [newPostText]);

  return (
    <div className="Home">
      <form encType="multipart/form-data" className="home-top">
        <div className="home-top1">
          <img src={profilephoto} alt="" />
          <textarea
            ref={textareaRef}
            rows="1"
            type="text"
            name="post-content"
            id=""
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
                setPosts
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

      {loading === false && (
        <div className="home-post-container">
          {posts.map((post, index) => (
            <HomePost post={post} key={index} />
          ))}
        </div>
      )}

      {loading && <Loader />}

      {showEmojis && (
        <div className="Home-emoji-input-container">
          <Picker
            data={data}
            onEmojiSelect={(e) => addEmoji(e, setNewPostText, newPostText)}
          />
        </div>
      )}
    </div>
  );
}
