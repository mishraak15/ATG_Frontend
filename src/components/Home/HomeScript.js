import axios from "axios";
import toast from "react-hot-toast";

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
let userid = "asj3e2j3j23j"; //as user login store the id in localStorage;

export async function createNewPostHandler(
  newPostText,
  newPostImg,
  setPostBtn,
  setNewPostText,
  setNewPostImg,
  setImagePreview,
  setLoading,
  setPosts
) {
  setLoading(true);
  toast.loading("Loading...");
  axios
    .post(
      `${url}/user/${userid}/newpost`,
      { newPostText, newPostImg },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
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
        fetchPosts(setPosts, setLoading);
      } else {
        toast.remove();
        toast.error("Something went wrong!!");
      }
      setLoading(false);
    })
    .catch((err) => {
      console.log(err);
      toast.remove();
      toast.error("Something unusual happened!!");
    });
}

export async function fetchPosts(setPosts, setLoading) {
  axios
    .get(`${url}/user/${userid}/posts`)
    .then((res) => {
      if (res?.data?.msg === "OK") {
        setPosts(res?.data?.posts);
        setLoading(false);
      } else {
        toast.error("Something unusual happened!!");
      }
    })
    .catch((err) => {
      console.log(err);
      toast.error("Something went wrong!!");
    });
}
