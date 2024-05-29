import axios from "axios";
import toast from "react-hot-toast";

export async function downloadImage(url, filename) {
  fetch(url)
    .then((response) => response.blob())
    .then((blob) => {
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = filename || "ATG";

      document.body.appendChild(a);
      a.click();

      // Clean up
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    });
}

export function convertPostTime(time) {
  return String(time).substring(0, 22) === String(new Date()).substring(0, 22)
    ? "Just Now"
    : String(time).substring(0, 19) === String(new Date()).substring(0, 19)
    ? parseInt(String(new Date()).substring(19, 21)) -
      parseInt(String(time).substring(19, 21)) +
      " minutes ago"
    : String(time).substring(0, 16) === String(new Date()).substring(0, 16)
    ? parseInt(String(new Date()).substring(16, 18)) -
      parseInt(String(time).substring(16, 18)) +
      " hours ago"
    : String(time).substring(4, 7) === String(new Date()).substring(4, 7) &&
      String(time).substring(11, 15) === String(new Date()).substring(11, 15) &&
      String(new Date()).substring(8, 10) - String(time).substring(8, 10) === 1
    ? "Yesterday"
    : String(time).substring(4, 15);
}

export function addEmoji(e, setNewCommentText, newCommentText) {
  setNewCommentText(newCommentText + e?.native);
}

export function previewImage(event, setImagePreview, setNewCommentImg) {
  const file = event.target.files[0];
  if (file) {
    setNewCommentImg(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  } else {
    setImagePreview("");
    setNewCommentImg(null);
  }
}

export const handleShare = async (id) => {
  if (navigator.share) {
    try {
      await navigator.share({
        title: `http://localhost:3000/post/${id}`,

        text: `Hello Connection!!,
         I have found an interesting post on ATG. Go Check out- `,

        url: `http://localhost:3000/post/${id}`,
      });

      // console.log("Link Shared Successfully");
    } catch (error) {
      console.error("Error sharing the link:", error);
      toast.error("Something went Wrong!!");
    }
  } else {
    // console.error("Web Share API is not supported in your browser.");
    toast("Share option is not supported in this Browser!", {
      icon: "⚠️",
    });
  }
};

export const handleCopy = async (id) => {
  let url;
  if (!id) {
    url = `http://localhost:3000`;
  } else {
    url = `http://localhost:3000/post/${id}`;
  }
  try {
    await navigator.clipboard.writeText(url);
    toast.success("Link copied to Clipboard!");
  } catch (err) {
    console.error("Error copying link:", err);
    toast.error("Something went Wrong!!");
  }
};

const url = process.env.REACT_APP_BACKEND_URL;
let userid = "6653001e262fa63382979cfa";

export function likeClickHandler(postid) {
  axios
    .post(`${url}/post/${postid}/addlike`, { userid })
    .then((res) => {
      if (res?.data?.msg === "OK") {
        console.log("Liked");
      } else {
        toast.error("Something unusual happened!!");
      }
    })
    .catch((err) => {
      console.log(err);
      toast.error("Something went wrong!!");
    });
}

export function removeLikeClickHandler(postid) {
  axios
    .post(`${url}/post/${postid}/removelike`, { userid })
    .then((res) => {
      if (res?.data?.msg === "OK") {
        console.log("Removed Like");
      } else {
        toast.error("Something unusual happened!!");
      }
    })
    .catch((err) => {
      console.log(err);
      toast.error("Something went wrong!!");
    });
}

export async function newCommentClickHandler(
  postid,
  newCommentText,
  newCommentImg,
  setNewCommentText,
  setNewCommentImg,
  setImagePreview,
  setTopComment,
  setCommentLength,
  commentLength
) {
  toast.loading("Loading...");
  axios
    .post(
      `${url}/post/${postid}/addcomment`,
      { userid, newCommentText, newCommentImg },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    )
    .then((res) => {
      if (res?.data?.msg === "OK") {
        toast.remove();
        setNewCommentText("");
        setNewCommentImg(null);
        setImagePreview("");
        setTopComment(res?.data?.comment);
        setCommentLength(commentLength + 1);
        toast.remove();
        toast.success("Added Comment!!");
      } else {
        toast.remove();
        toast.error("Something unusual happened!!");
      }
    })
    .catch((err) => {
      console.log(err);
      toast.remove();
      toast.error("Something went wrong!!");
    });
}

export function savePostClickHandler(postid) {
  toast.loading("Loading...");
  axios
    .post(`${url}/user/${userid}/savepost`, { postid })
    .then((res) => {
      if (res?.data?.msg === "OK") {
        console.log("Saved");
        toast.remove();
        toast.success("Post Saved Successfully");
      } else if (res?.data?.msg === "Already Saved") {
        toast.remove();
        toast.error("Already Saved!!");
      } else {
        toast.remove();
        toast.error("Something unusual happened!!");
      }
    })
    .catch((err) => {
      console.log(err);
      toast.remove();
      toast.error("Something went wrong!!");
    });
}

export function addtoFavoriteClickHandler(postid) {
  toast.loading("Loading...");
  axios
    .post(`${url}/user/${userid}/addtofavorite`, { postid })
    .then((res) => {
      if (res?.data?.msg === "OK") {
        console.log("Added to Favorites");
        toast.remove();
        toast.success("Added to Favorites");
      } else if (res?.data?.msg === "Already in Favorites") {
        toast.remove();
        toast.error("Already in Favorites");
      } else {
        toast.remove();
        toast.error("Something unusual happened!!");
      }
    })
    .catch((err) => {
      console.log(err);
      toast.remove();
      toast.error("Something went wrong!!");
    });
}
