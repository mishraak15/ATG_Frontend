import axios from "axios";
import toast from "react-hot-toast";
import { fetchPostData } from "../../pages/SinglePost/SinglePostScript";
const url = process.env.REACT_APP_BACKEND_URL;

export function commentAddLikeHandler(commentId) {
  const userid = localStorage.getItem("userid");
  axios
    .post(
      `${url}/comment/${commentId}/addCommentLike`,
      { userid },
      { withCredentials: true }
    )
    .then((res) => {
      if (res?.data?.msg === "OK") {
        console.log("Liked Comment");
      }
    })
    .catch((err) => {
      console.log(err);
      const errMsg = err?.response?.data?.message || "Something went wrong!!";
      toast.error(errMsg);
    });
}

export function commentRemoveLikeHandler(commentId) {
  const userid = localStorage.getItem("userid");
  axios
    .post(
      `${url}/comment/${commentId}/removeCommentLike`,
      { userid },
      { withCredentials: true }
    )
    .then((res) => {
      if (res?.data?.msg === "OK") {
        console.log("Unlike Comment");
      }
    })
    .catch((err) => {
      console.log(err);
      const errMsg = err?.response?.data?.message || "Something went wrong!!";
      toast.error(errMsg);
    });
}

export function deleteCommentHandler(
  commentId,
  setPost,
  setLikedPost,
  setLoading,
  navigate,
  postid,
  setNoOfLikes
) {
  toast.loading("Loading...");
  axios
    .delete(`${url}/comment/${commentId}/deleteComment`, {
      withCredentials: true,
    })
    .then((res) => {
      if (res?.data?.msg === "OK") {
        toast.remove();
        console.log("Deleted Comment");
        toast.success("Comment deleted successfully!!");
        fetchPostData(
          setPost,
          setLikedPost,
          setLoading,
          navigate,
          postid,
          setNoOfLikes
        );
      }
    })
    .catch((err) => {
      toast.remove();
      console.log(err);
      const errMsg = err?.response?.data?.message || "Something went wrong!!";
      toast.error(errMsg);
    });
}
