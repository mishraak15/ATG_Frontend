import axios from "axios";
import toast from "react-hot-toast";
const url = process.env.REACT_APP_BACKEND_URL;

export function fetchPostData(
  setPost,
  setLikedPost,
  setLoading,
  navigate,
  postid,
  setNoOfLikes
) {
  const userid = localStorage.getItem("userid");
  setLoading(true);
  axios
    .get(`${url}/post/${postid}`, { withCredentials: true })
    .then((res) => {
      if (res?.data?.msg === "OK") {
        setPost(res?.data?.post);
        res?.data?.post?.likes?.forEach((l) => {
          if (l?._id === userid) {
            setLikedPost(true);
          }
        });
        setNoOfLikes(res?.data?.post?.likes.length);
        setLoading(false);
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

export function addNewComment(
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
) {
  const userid = localStorage.getItem("userid");
  toast.loading("Loading...");
  axios
    .post(
      `${url}/post/${postid}/addcomment`,
      { userid, newCommentText, newCommentImg },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    )
    .then((res) => {
      if (res?.data?.msg === "OK") {
        toast.remove();
        setNewCommentText("");
        setNewCommentImg(null);
        setImagePreview("");
        toast.remove();
        toast.success("Added Comment!!");
        fetchPostData(
          setPost,
          setLikedPost,
          setLoading,
          navigate,
          postid,
          setNoOfLikes
        );
        setLoading(false);
      } else {
        toast.remove();
        toast.error("Something unusual happened!!");
      }
    })
    .catch((err) => {
      console.log(err);
      let errMsg = err?.response?.data?.message || "Something went wrong!!";
      toast.remove();
      toast.error(errMsg);
    });
}

export function deleteSinglePostClickHandler(postid, navigate) {
  toast.loading("Loading...");
  axios
    .delete(`${url}/post/${postid}`, { withCredentials: true })
    .then((res) => {
      if (res?.data?.msg === "OK") {
        toast.remove();
        toast.success("Post Deleted Successfully!!");
        navigate("/");
      } else {
        toast.remove();
        toast.error("Something unusual happened!!");
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
