import axios from "axios";
import toast from "react-hot-toast";

export function birthdayCancelClickHandler(e) {
  e.preventDefault();
  localStorage.setItem("birthday", null);

  const now = new Date();
  const target = new Date();

  target.setDate(now.getDate() + 1);
  target.setHours(0, 0, 0, 0);

  const delay = target - now;

  setTimeout(() => {
    localStorage.removeItem("birthday");
  }, delay);
}

const url = process.env.REACT_APP_BACKEND_URL;

export async function fetchFriendRequests(
  setFriendRequest,
  setShowAllFriendRequest,
  navigate
) {
  let userid = localStorage.getItem("userid");
  axios
    .get(`${url}/user/${userid}/fetchFriendRequests`, { withCredentials: true })
    .then((res) => {
      if (res?.data?.msg === "OK") {
        if (res?.data?.friendRequests?.length > 3) {
          let clipedData = [];

          for (let i = 0; i < 3; i++) {
            clipedData.push(res?.data?.friendRequests[i]);
          }
          setFriendRequest(clipedData);
          setShowAllFriendRequest(true);
        } else {
          setFriendRequest(res?.data?.friendRequests);
          setShowAllFriendRequest(false);
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

export async function fetchNotifications(
  setNotifications,
  setShowAllNotification,
  navigate
) {
  let userid = localStorage.getItem("userid");
  axios
    .get(`${url}/user/${userid}/fetchNotifications`, { withCredentials: true })
    .then((res) => {
      if (res?.data?.msg === "OK") {
        if (res?.data?.notifications?.length > 3) {
          let clipedData = [];

          for (let i = 0; i < 3; i++) {
            clipedData.push(res?.data?.notifications[i]);
          }
          setNotifications(clipedData);
          setShowAllNotification(true);
        } else {
          setNotifications(res?.data?.notifications);
          setShowAllNotification(false);
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

export async function acceptRequestClickHandler(
  friendId,
  navigate,
  setFriendRequest,
  setShowAllFriendRequest
) {
  axios
    .get(`${url}/friend/${friendId}/accept-request`, { withCredentials: true })
    .then((res) => {
      if (res?.data?.msg === "OK") {
        toast.success("Accepted Friend Request!!");
        fetchFriendRequests(
          setFriendRequest,
          setShowAllFriendRequest,
          navigate
        );
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

export async function rejectRequestClickHandler(
  friendId,
  navigate,
  setFriendRequest,
  setShowAllFriendRequest
) {
  axios
    .get(`${url}/friend/${friendId}/decline-request`, { withCredentials: true })
    .then((res) => {
      if (res?.data?.msg === "OK") {
        toast.error("Friend Request Rejected!!");
        fetchFriendRequests(
          setFriendRequest,
          setShowAllFriendRequest,
          navigate
        );
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
