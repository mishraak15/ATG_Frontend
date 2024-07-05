import React, { useEffect, useState } from "react";
import "./SingleComment.css";
import { NavLink } from "react-router-dom";
import { convertPostTime } from "../HomePost/HomePostScript";
import { GoHeartFill } from "react-icons/go";
import { GoHeart } from "react-icons/go";
import {
  commentAddLikeHandler,
  commentRemoveLikeHandler,
  deleteCommentHandler,
} from "./SingleCommentScript";

export default function SingleComment({
  comment,
  setPost,
  setLikedPost,
  setLoading,
  navigate,
  postid,
  setNoOfLikes,
}) {
  const [commentLiked, setCommentLiked] = useState(false);
  const [commentCount, setCommentCount] = useState(0);
  const [showDelOpt, setShowDelOpt] = useState(false);
  const userid = localStorage.getItem("userid");

  function checkLikes() {
    let userid = localStorage.getItem("userid");
    comment?.likes?.forEach((l) => {
      if (l === userid) {
        setCommentLiked(true);
      }
    });
    setCommentCount(comment?.likes?.length);
  }

  useEffect(() => {
    checkLikes();
  }, []);

  return (
    <div className="SinglePost-single-comment">
      <div className="SinglePost-img-name-time-container">
        <NavLink
          to={`/user/${comment?.creator_id}/profile`}
          className="SinglePost-img-name-container"
        >
          <img
            className="SinglePost-commentor-photo"
            src={comment?.creator_profile_photo?.url}
            alt=""
          />
          <div className="SingleComment-name-time-container">
            <div className="SinglePost-commentor-name">
              {comment?.creator_name}
            </div>

            <div className="SinglePost-comment-time">
              {convertPostTime(comment?.created_at)}
            </div>
          </div>
        </NavLink>
        {comment?.creator_id === userid && (
          <div
            className="SingleComment-dot-container"
            onClick={() => setShowDelOpt(!showDelOpt)}
          >
            <div className="SinglePost-comment-dot"></div>
            <div className="SinglePost-comment-dot"></div>
            <div className="SinglePost-comment-dot"></div>
          </div>
        )}
        {showDelOpt && (
          <div className="SingleComment-del-opt">
            <div
              onClick={() => {
                deleteCommentHandler(
                  comment?._id,
                  setPost,
                  setLikedPost,
                  setLoading,
                  navigate,
                  postid,
                  setNoOfLikes
                );
                setShowDelOpt(false);
              }}
            >
              Delete
            </div>
          </div>
        )}
      </div>
      <div className="SinglePost-comment_text">{comment?.comment_text}</div>
      {comment?.comment_img?.url && (
        <img
          className="SinglePost-comment-img"
          src={comment?.comment_img?.url}
          alt=""
        />
      )}
      <div className="SinglePost-comment-like-container">
        {commentLiked ? (
          <GoHeartFill
            className="SinglePost-comment-like-icon"
            color="var(--dark-red)"
            onClick={() => {
              commentRemoveLikeHandler(comment?._id);
              setCommentLiked(false);
              setCommentCount(commentCount - 1);
            }}
          />
        ) : (
          <GoHeart
            className="SinglePost-comment-like-icon"
            onClick={() => {
              commentAddLikeHandler(comment?._id);
              setCommentLiked(true);
              setCommentCount(commentCount + 1);
            }}
          />
        )}
        <span className="comment-like-count">{commentCount} Likes</span>
      </div>
    </div>
  );
}
