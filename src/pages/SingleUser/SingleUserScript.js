import axios from "axios";
import toast from "react-hot-toast";
const url = process.env.REACT_APP_BACKEND_URL;

export async function sendRequestClickHandler(
  userid,
  navigate,
  setFriendshipStatus
) {
  await axios
    .get(`${url}/friend/${userid}/send-request`, { withCredentials: true })
    .then((res) => {
      if (res?.data?.msg === "OK") {
        toast.success("Request Sent!!");
        setFriendshipStatus("Requested");
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

export function checkFriendship(userData, setFriendshipStatus) {
  let currUserid = localStorage.getItem("userid");
  let flag = 0;
  userData?.friends?.forEach((friend) => {
    if (friend?._id === currUserid) {
      flag = 1;
      return setFriendshipStatus("Friend");
    }
  });

  userData?.friend_requests?.forEach((fr) => {
    if (fr?.sent_by === currUserid) {
      flag = 1;
      return setFriendshipStatus("Requested");
    }
  });
  if (flag === 0) {
    setFriendshipStatus("Not Friend");
  }
}

export async function fetchUserData(
  setUserData,
  setPosts,
  setLoading,
  userid,
  navigate,
  setFriendshipStatus
) {
  await axios
    .get(`${url}/user/${userid}/profile`, { withCredentials: true })
    .then((res) => {
      if (res?.data?.msg === "OK") {
        setUserData(res?.data?.user);
        setPosts(res?.data?.user?.posts);
        setLoading(false);
        checkFriendship(res?.data?.user, setFriendshipStatus);
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

export async function unfriendClickHandler(
  userid,
  navigate,
  setFriendshipStatus
) {
  await axios
    .get(`${url}/friend/${userid}/unfriend`, { withCredentials: true })
    .then((res) => {
      if (res?.data?.msg === "OK") {
        toast.success("Removed from friend list!!");
        setFriendshipStatus("Not Friend");
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
