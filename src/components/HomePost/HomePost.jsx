import React, { useEffect, useState } from "react";
import "./HomePost.css";
import {
  downloadImage,
  convertPostTime,
  handleShare,
  handleCopy,
  previewImage,
  addEmoji,
  likeClickHandler,
  removeLikeClickHandler,
  newCommentClickHandler,
  savePostClickHandler,
  addtoFavoriteClickHandler,
} from "./HomePostScript";

import { GoHeartFill } from "react-icons/go";
import { GoHeart } from "react-icons/go";
import { FaCommentDots } from "react-icons/fa";
import { IoMdShare } from "react-icons/io";
import { FaCamera } from "react-icons/fa";
import { FaSmileWink } from "react-icons/fa";
import { NavLink } from "react-router-dom";

import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

export default function HomePost({ post }) {
  // const postId = "dfsdjf234b12jk12";
  const [likedPost, setLikedPost] = useState(false);
  const [like, setLike] = useState(0);
  const [showEmojis, setShowEmojis] = useState(false);
  const [newCommentText, setNewCommentText] = useState("");
  const [newCommentImg, setNewCommentImg] = useState(null);
  const [showPostOptions, setShowPostOptions] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const [topComment, setTopComment] = useState({});
  const [commentLength, setCommentLength] = useState(0);

  useEffect(() => {
    let userid = "6653001e262fa63382979cfa";
    setLike(post?.likes?.length);
    setLikedPost(false);
    post?.likes?.forEach((l) => {
      console.log(l);
      if (l === userid) {
        setLikedPost(true);
      }
    });

    let commentSize = post?.comments?.length;

    if (commentSize > 0) {
      setCommentLength(commentSize);
      setTopComment(post?.comments[commentSize - 1]);
    } else {
      setCommentLength(0);
      setTopComment({});
    }
  }, [post]);

  return (
    <div className="HomePost">
      <div className="HomePost-name-time">
        <NavLink
          to={`/user/${post?.created_by?._id}/profile`}
          className="HomePost-name-img-container"
        >
          <img src={post?.created_by?.profile_photo?.url} alt="" />
          <div>
            <div className="HomePost-creator-name">
              {post?.created_by?.username}
            </div>
            <div className="HomePost-creation-time">
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

      <div className="HomePost-text">{`${post?.post_text}`}</div>

      {post?.post_img && (
        <NavLink to={`/post/${post?._id}`}>
          <img src={post?.post_img?.url} alt="" className="HomePost-img" />
        </NavLink>
      )}

      <div className="HomePost-like-comment">
        <div className="HomePost-icons">
          <div className="HomePost-icon-container">
            {likedPost ? (
              <GoHeartFill
                className="HomePost-icon"
                onClick={() => {
                  removeLikeClickHandler(post?._id);
                  setLikedPost(false);
                  setLike(like - 1);
                }}
                style={{ color: "var(--dark-red)" }}
              />
            ) : (
              <GoHeart
                className="HomePost-icon"
                onClick={() => {
                  likeClickHandler(post?._id);
                  setLikedPost(true);
                  setLike(like + 1);
                }}
              />
            )}
            <span>{like}</span>
          </div>

          <NavLink
            to={`/post/${post?._id}`}
            className="HomePost-icon-container"
          >
            <FaCommentDots
              className="HomePost-icon"
              style={{ color: "deepskyblue" }}
            />
            <span>{commentLength}</span>
          </NavLink>

          <div className="HomePost-icon-container">
            <IoMdShare
              className="HomePost-icon"
              style={{ color: "#ff7600" }}
              onClick={() => handleShare(post?._id)}
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
                setNewCommentText(e.target.value);
              }}
              value={newCommentText}
            />
            <div className="HomePost-comment-img-upload">
              <input
                type="file"
                accept="image/png, image/jpeg, image/jpg"
                className="Home-input-post"
                onInput={(e) => {
                  previewImage(e, setImagePreview, setNewCommentImg);
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

          <div
            className="HomePost-comment-btn"
            onClick={() => {
              newCommentClickHandler(
                post?._id,
                newCommentText,
                newCommentImg,
                setNewCommentText,
                setNewCommentImg,
                setImagePreview,
                setTopComment,
                setCommentLength,
                commentLength
              );
            }}
          >
            Comment
          </div>
        </div>
      </div>

      {imagePreview !== "" && (
        <img
          className="Home-new-post-img-preview"
          src={imagePreview}
          alt="Comment_Image"
        />
      )}

      <hr />

      {topComment?.creator_id && (
        <div className="HomePost-top-comment">
          <img
            className="HomePost-top-comment-profilephoto"
            src={topComment?.creator_profile_photo?.url}
            alt=""
          />
          <div className="HomePost-top-comment-container">
            <NavLink
              to={`/user/${topComment?.creator_id}/profile`}
              className="HomePost-top-comment-name"
            >
              {topComment?.creator_name}
            </NavLink>
            {topComment?.comment_img?.url && (
              <img
                className="HomePost-top-comment-img"
                src={topComment?.comment_img?.url}
                alt=""
                loading="lazy"
              />
            )}
            <div>{topComment?.comment_text}</div>
          </div>
        </div>
      )}

      {post?.comments?.length > 1 && (
        <NavLink
          to={`/post/${post?._id}`}
          className="HomePost-see-all-comments"
        >
          See all comments
        </NavLink>
      )}

      {showPostOptions && (
        <div className="HomePost-show-options">
          <div
            onClick={() => {
              savePostClickHandler(post?._id);
              setShowPostOptions(false);
            }}
          >
            Save Post
          </div>
          <div
            onClick={() => {
              addtoFavoriteClickHandler(post?._id);
              setShowPostOptions(false);
            }}
          >
            Add to Favorites
          </div>
          {post?.post_img && (
            <div
              onClick={() => {
                downloadImage(post?.post_img?.url, post?.post_img?.url);
                setShowPostOptions(false);
              }}
            >
              Download Image
            </div>
          )}
          <div
            onClick={() => {
              handleCopy(post?._id);
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
            onEmojiSelect={(e) =>
              addEmoji(e, setNewCommentText, newCommentText)
            }
          />
        </div>
      )}
    </div>
  );
}
