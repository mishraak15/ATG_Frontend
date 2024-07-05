import axios from "axios";
import toast from "react-hot-toast";
import { fetchJobs } from "../Jobs/JobsScript";

export const addEmoji = (e, setNewPostText, newPostText) => {
  setNewPostText(newPostText + e?.native);
};

export function previewImage(
  event,
  setImagePreview,
  setPostBtn,
  setNewPostImg
) {
  const file = event.target.files[0];
  if (file) {
    setNewPostImg(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
      setPostBtn(true);
    };
    reader.readAsDataURL(file);
  } else {
    setNewPostImg(null);
    setImagePreview("");
  }
}

const url = process.env.REACT_APP_BACKEND_URL;

export async function createNewPostHandler(
  newPostText,
  newPostImg,
  setPostBtn,
  setNewPostText,
  setNewPostImg,
  setImagePreview,
  setLoading,
  setPosts,
  navigate,
  postCategory = "Simple Post"
) {
  let userid = localStorage.getItem("userid");
  setLoading(true);
  toast.loading("Loading...");
  axios
    .post(
      `${url}/user/${userid}/newpost`,
      { newPostText, newPostImg, postCategory },
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
        toast.success("Posted Successfully");
        setNewPostText("");
        setNewPostImg(null);
        setImagePreview("");
        setPostBtn(false);
        if (postCategory === "Simple Post") {
          fetchPosts(setPosts, setLoading, navigate);
        } else {
          fetchJobs(setPosts, setLoading);
        }
      } else {
        toast.remove();
        toast.error("Something unusual happened!!");
      }
      setLoading(false);
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

export async function fetchPosts(setPosts, setLoading, navigate) {
  let userid = localStorage.getItem("userid");
  axios
    .get(`${url}/user/${userid}/posts`, { withCredentials: true })
    .then((res) => {
      if (res?.data?.msg === "OK") {
        setPosts(res?.data?.posts);
        setLoading(false);
      } else {
        toast.error("Something unusual happened!!");
      }
    })
    .catch((err) => {
      console.log(err?.response?.data);
      if (err?.response?.data?.message === "You are not logged in") {
        let currUser = localStorage.getItem("currUser");

        if (currUser && currUser !== "") {
          return navigate("/verifyAccount");
        } else {
          toast.error("You are not logged in!!");
          return navigate("/login");
        }
      } else if (
        err?.response?.data?.message ===
        "The user belonging to this token does no longer exist."
      ) {
        toast.error(err?.response?.data?.message);
        navigate("/signup");
      } else {
        toast.error("Something went wrong!!");
      }
    });
}
