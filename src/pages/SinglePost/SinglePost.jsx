import React, { useEffect, useState } from "react";
import "./SinglePost.css";
import { NavLink, useParams } from "react-router-dom";
import IndexLeft from "../../components/IndexLeft/IndexLeft";
import profilePhoto from "../../assets/signup_img.jpg";

import {
  downloadImage,
  convertPostTime,
  handleShare,
  handleCopy,
  previewImage,
  addEmoji,
} from "../../components/HomePost/HomePostScript";

import { GoHeartFill } from "react-icons/go";
import { GoHeart } from "react-icons/go";
import { FaCommentDots } from "react-icons/fa";
import { IoMdShare } from "react-icons/io";
import { FaCamera } from "react-icons/fa";
import { FaSmileWink } from "react-icons/fa";

import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import Loader from "../../components/Loader/Loader";

export default function SinglePost({ setSubsection, subsection }) {
  const { postid } = useParams();
  let username = "Akash";
  const [post, setPost] = useState({});
  const [likedPost, setLikedPost] = useState(false);
  const [showEmojis, setShowEmojis] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [showPostOptions, setShowPostOptions] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setSubsection("");

    setPost({
      created_by: {
        id: "37gg232hjg3nb4jg3j4",
        username: "Rahul Baniya",
        profilephoto: profilePhoto,
      },
      created_at: "Fri May 17 2024 07:53:18",
      text: "Maja Kat Raha hoon!!",
      img: {
        filename: "",
        url: "https://images.unsplash.com/photo-1416169607655-0c2b3ce2e1cc?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      likes: [
        { liked_by: "Abhishek" },
        { liked_by: "Lakshya" },
        { liked_by: "Akash Mishra" },
      ],
      comments: [
        {
          commented_by: "Akash Mishra",
          comment_text: "Mast Jindgi hai be!",
          commented_at: "Fri May 17 2024 07:53:18",
          likes: [{ name: "Akash" }, { name: "Rahul" }, { name: "Lakshya" }],
        },
        {
          commented_by: "Abhishek",
          comment_text: "Best DP!!",
          commented_at: "Fri May 25 2024 07:53:18",
          likes: [{ name: "Swapnil" }, { name: "Rahul" }],
        },
      ],
    });
    setLoading(false);
  }, []);

  function checkCommentLike(username, index) {
    for (let i = 0; i < post?.comments[index]?.likes?.length; i++) {
      const like = post?.comments[index]?.likes[i];
      if (like?.name === username) {
        return true;
      }
    }
    return false;
  }

  return (
    <div className="SinglePost">
      <div className="index-left">
        <IndexLeft subsection={subsection} setSubsection={setSubsection} />
      </div>

      {loading && (
        <div style={{width:"75%"}}>
          <Loader />
        </div>
      )}

      {loading === false && (
        <div className="SinglePost-right">
          <div className="SinglePost-header">
            <NavLink
              to={`/user/${post?.created_by?.id}/profile`}
              className="SinglePost-name-img-container"
            >
              <img src={profilePhoto} alt="" />
              <div>
                <div className="SinglePost-name">
                  {post?.created_by?.username}
                </div>
                <div className="SinglePost-time">
                  {convertPostTime(post?.created_at)}
                </div>
              </div>
            </NavLink>

            <div
              className="three-dots-option-container"
              onClick={() => setShowPostOptions(!showPostOptions)}
            >
              <div className="three-dots-option"></div>
              <div className="three-dots-option"></div>
              <div className="three-dots-option"></div>
            </div>
          </div>
          <hr />
          <div className="SinglePost-text">{post?.text}</div>
          <img className="SinglePost-img" src={post?.img?.url} alt="" />

          <div className="HomePost-like-comment">
            <div className="HomePost-icons">
              <div className="HomePost-icon-container">
                {likedPost ? (
                  <GoHeartFill
                    className="HomePost-icon"
                    onClick={() => setLikedPost(false)}
                    style={{ color: "var(--dark-red)" }}
                  />
                ) : (
                  <GoHeart
                    className="HomePost-icon"
                    onClick={() => setLikedPost(true)}
                  />
                )}
                <span>{post?.likes?.length}</span>
              </div>

              <div className="HomePost-icon-container">
                <FaCommentDots
                  className="HomePost-icon"
                  style={{ color: "deepskyblue" }}
                />
                <span>{post?.comments?.length}</span>
              </div>

              <div className="HomePost-icon-container">
                <IoMdShare
                  className="HomePost-icon"
                  style={{ color: "#ff7600" }}
                  onClick={() => handleShare(post?.id)}
                />
              </div>
            </div>

            <div className="HomePost-write-comment">
              <div className="HomePost-comment-inp">
                <input
                  type="text"
                  name="post-comment"
                  placeholder="Write your comment"
                  onChange={(e) => {
                    setNewComment(e.target.value);
                  }}
                  value={newComment}
                />
                <div className="HomePost-comment-img-upload">
                  <input
                    type="file"
                    accept="image/png, image/jpeg, image/jpg"
                    className="Home-input-post"
                    onInput={(e) => {
                      previewImage(e, setImagePreview);
                    }}
                    style={{ width: "100%" }}
                  />

                  <FaCamera style={{ color: "limegreen" }} />
                </div>
                <FaSmileWink
                  className="HomePost-comment-inp-icon"
                  style={
                    showEmojis === true
                      ? { color: "var(--dark-red)", right: "10px" }
                      : { color: "#ffa32e", right: "10px" }
                  }
                  onClick={() => setShowEmojis(!showEmojis)}
                />
              </div>

              <div className="HomePost-comment-btn">Comment</div>
            </div>
          </div>
          <hr />

          <div className="SinglePost-allComments">
            <h3>All Comments</h3>
            {post?.comments?.map((comment, index) => (
              <div key={index} className="SinglePost-single-comment">
                <div className="SinglePost-img-name-time-container">
                  <div className="SinglePost-img-name-container">
                    <img
                      className="SinglePost-commentor-photo"
                      src={profilePhoto}
                      alt=""
                    />
                    <div className="SinglePost-commentor-name">
                      {comment?.commented_by}
                    </div>
                  </div>
                  <div className="SinglePost-comment-time">
                    {convertPostTime(comment?.commented_at)}
                  </div>
                </div>
                <div className="SinglePost-comment_text">
                  {comment?.comment_text}
                </div>
                {
                  <img
                    className="SinglePost-comment-img"
                    src={profilePhoto}
                    alt=""
                  />
                }
                <div className="SinglePost-comment-like-container">
                  {checkCommentLike(username, index) ? (
                    <GoHeartFill
                      className="SinglePost-comment-like-icon"
                      color="var(--dark-red)"
                    />
                  ) : (
                    <GoHeart className="SinglePost-comment-like-icon" />
                  )}
                  <span>{comment?.likes?.length} Likes</span>
                </div>
              </div>
            ))}
          </div>

          {imagePreview !== "" && (
            <img
              className="Home-new-post-img-preview"
              src={imagePreview}
              alt="Comment_Image"
            />
          )}

          {showPostOptions && (
            <div className="HomePost-show-options">
              <div>Save Post</div>
              <div>Add to Favorites</div>
              {post?.img && (
                <div
                  onClick={() => {
                    downloadImage(post?.img?.url, post?.img.filename);
                    setShowPostOptions(false);
                  }}
                >
                  Download Image
                </div>
              )}
              <div
                onClick={() => {
                  handleCopy(post?.id);
                  setShowPostOptions(false);
                }}
              >
                Copy Link
              </div>
              <div>Report Inappropriate</div>
            </div>
          )}

          {showEmojis && (
            <div className="HomePost-emoji-input-container">
              <Picker
                data={data}
                onEmojiSelect={(e) => addEmoji(e, setNewComment, newComment)}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
