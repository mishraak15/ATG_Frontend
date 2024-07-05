import React, { useEffect, useState } from "react";
import "./SinglePost.css";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import IndexLeft from "../../components/IndexLeft/IndexLeft";

import {
  downloadImage,
  convertPostTime,
  handleShare,
  handleCopy,
  previewImage,
  addEmoji,
  likeClickHandler,
  removeLikeClickHandler,
  addtoFavoriteClickHandler,
  savePostClickHandler,
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
import {
  addNewComment,
  deleteSinglePostClickHandler,
  fetchPostData,
} from "./SinglePostScript";

import SingleComment from "../../components/SingleComment/SingleComment";

export default function SinglePost({ setSubsection, subsection }) {
  const { postid } = useParams();
  const [post, setPost] = useState({});
  const [likedPost, setLikedPost] = useState(false);
  const [showEmojis, setShowEmojis] = useState(false);
  const [newCommentText, setNewCommentText] = useState("");
  const [newCommentImg, setNewCommentImg] = useState("");
  const [imgFit, setImgFit] = useState("contain");
  const [imagePreview, setImagePreview] = useState("");
  const [showPostOptions, setShowPostOptions] = useState(false);
  const [loading, setLoading] = useState(true);
  const [noOfLikes, setNoOfLikes] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    setSubsection("");
    fetchPostData(
      setPost,
      setLikedPost,
      setLoading,
      navigate,
      postid,
      setNoOfLikes
    );
  }, [postid]);

  return (
    <div className="SinglePost">
      <div className="index-left">
        <IndexLeft subsection={subsection} setSubsection={setSubsection} />
      </div>

      {loading && (
        <div style={{ width: "75%" }}>
          <Loader />
        </div>
      )}

      {loading === false && (
        <div className="SinglePost-right">
          <div className="SinglePost-header">
            <NavLink
              to={`/user/${post?.created_by?._id}/profile`}
              className="SinglePost-name-img-container"
            >
              <img src={post?.created_by?.profile_photo?.url} alt="" />
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
          {post?.post_text && (
            <div className="SinglePost-text">{post?.post_text}</div>
          )}
          {post?.post_img?.url && (
            <div className="SinglePost-img-container">
              <img
                className="SinglePost-img"
                src={post?.post_img?.url}
                alt="singlepost"
                id="SinglePost-post-img"
                style={{ objectFit: imgFit }}
              />
              <div
                className="Singlepost-img-extended-opt"
                onClick={() => {
                  imgFit === "contain"
                    ? setImgFit("cover")
                    : setImgFit("contain");
                }}
              >
                {imgFit.charAt(0).toUpperCase() + imgFit.substring(1)} Image
              </div>
            </div>
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
                      setNoOfLikes(noOfLikes - 1);
                    }}
                    style={{ color: "var(--dark-red)" }}
                  />
                ) : (
                  <GoHeart
                    className="HomePost-icon"
                    onClick={() => {
                      likeClickHandler(post?._id);
                      setLikedPost(true);
                      setNoOfLikes(noOfLikes + 1);
                    }}
                  />
                )}
                <span>{noOfLikes}</span>
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
                  setLoading(true);
                  addNewComment(
                    newCommentText,
                    newCommentImg,
                    setNewCommentText,
                    setNewCommentImg,
                    setImagePreview,
                    postid,
                    setPost,
                    setLikedPost,
                    setLoading,
                    navigate,
                    setNoOfLikes
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

          <div className="SinglePost-allComments">
            {post?.comments?.length > 0 && <h3>All Comments</h3>}
            {post?.comments?.length === 0 && <h3>No Comments yet!!</h3>}
            {post?.comments?.map((comment, index) => (
              <SingleComment
                key={index}
                comment={comment}
                setPost={setPost}
                setLikedPost={setLikedPost}
                setLoading={setLoading}
                navigate={navigate}
                postid={postid}
                setNoOfLikes={setNoOfLikes}
              />
            ))}
          </div>

          {showPostOptions && (
            <div className="HomePost-show-options">
              <div onClick={() => savePostClickHandler(post?._id)}>
                Save Post
              </div>
              <div onClick={() => addtoFavoriteClickHandler(post?._id)}>
                Add to Favorites
              </div>
              {post?.post_img?.url && (
                <div
                  onClick={() => {
                    downloadImage(
                      post?.post_img?.url,
                      post?.post_img?.filename
                    );
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

              {localStorage.getItem("userid") === post?.created_by?._id && (
                <div
                  onClick={() => {
                    deleteSinglePostClickHandler(post?._id, navigate);
                    setShowPostOptions(false);
                  }}
                >
                  Delete Post
                </div>
              )}

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
      )}
    </div>
  );
}
