import axios from "axios";
import toast from "react-hot-toast";
const url = process.env.REACT_APP_BACKEND_URL;

export async function unfriendClickHandler(friendId, navigate) {
  axios
    .get(`${url}/friend/${friendId}/unfriend`, { withCredentials: true })
    .then((res) => {
      if (res?.data?.msg === "OK") {
        console.log("unfriend");
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

export async function sendRequestClickHandler(friendId, navigate) {
  await axios
    .get(`${url}/friend/${friendId}/send-request`, { withCredentials: true })
    .then((res) => {
      if (res?.data?.msg === "OK") {
        toast.success("Request Sent!!");
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

export async function rejectRequestClickHandler(friendId, navigate, index, ex) {
  axios
    .get(`${url}/friend/${friendId}/decline-request`, { withCredentials: true })
    .then((res) => {
      if (res?.data?.msg === "OK") {
        toast.error("Friend Request Rejected!!");
        if (index < 3) {
          document.querySelectorAll(".IndexRight-reject-btn")[index].innerHTML =
            "Rejected";
          document.querySelectorAll(".IndexRight-accept-btn")[
            index
          ].style.display = "none";
        }
        ex.target.innerHTML = "Rejected";
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

export async function acceptRequestClickHandler(friendId, navigate, index) {
  axios
    .get(`${url}/friend/${friendId}/accept-request`, { withCredentials: true })
    .then((res) => {
      if (res?.data?.msg === "OK") {
        toast.success("Accepted Friend Request!!");
        if (index < 3) {
          document.querySelectorAll(".IndexRight-accept-btn")[index].innerHTML =
            "Accepted";
          document.querySelectorAll(".IndexRight-reject-btn")[
            index
          ].style.display = "none";
        }
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
