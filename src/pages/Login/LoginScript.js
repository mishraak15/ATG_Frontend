import axios from "axios";
import toast from "react-hot-toast";

export function emailLoginBtnHandler(e, username, password, navigate) {
  const url = process.env.REACT_APP_BACKEND_URL;
  e.preventDefault();
  toast.loading("Loading...");
  axios
    .post(`${url}/login`, { username, password }, { withCredentials: true })
    .then((res) => {
      if (res?.data?.msg === "OK") {
        let userid = res?.data?.userid;
        toast.remove();
        localStorage.setItem("currUser", "");
        localStorage.setItem("userid", userid);
        return navigate("/");
      } else {
        toast.remove();
        toast.error("Something unusual happened!!");
      }
    })
    .catch((err) => {
      toast.remove();
      console.log(err?.response?.data);
      let errMsg = err?.response?.data?.message || "Something went Wrong!!";
      toast.error(errMsg);
    });
}

export function forgetPasswordClickHandler(navigate, username) {
  const url = process.env.REACT_APP_BACKEND_URL;
  if (!username || username === "") {
    document.getElementById("login-username").style.border =
      "2px solid var(--dark-red)";
    return toast.error("Email or Username is Required!!");
  }
  toast.loading("Loading...");
  axios
    .post(`${url}/forgetpassword`, { username }, { withCredentials: true })
    .then((res) => {
      if (res?.data?.msg === "OK") {
        toast.remove();
        toast.success("E-mail sent successfully!!");
        return navigate("/resetpassword");
      } else {
        toast.remove();
        toast.error("Something unusual happened!!");
      }
    })
    .catch((err) => {
      toast.remove();
      console.log(err?.response?.data);
      let errMsg = err?.response?.data?.message || "Something went Wrong!!";
      toast.error(errMsg);
    });
}
