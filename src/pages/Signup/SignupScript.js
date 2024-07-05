import toast from "react-hot-toast";
import axios from "axios";

export function googleSignInBtnHandler() {
  // signInWithPopup(auth, provider1)
  //   .then((result) => {
  //     const user = result.user;
  //     console.log(user);
  //     toast.success("Signup Successful!");
  //   })
  //   .catch((error) => {
  //     const errorCode = error.code;
  //     const errorMessage = error.message;
  //     console.log(errorCode, errorMessage);
  //     toast.error(errorMessage);
  //   });
}

export function githubSignInBtnHandler() {}

const url = process.env.REACT_APP_BACKEND_URL;

export function emailSignInBtnHandler(
  e,
  username,
  email,
  password,
  confirmPassword,
  navigate
) {
  e.preventDefault();

  if (password !== confirmPassword) {
    return toast.error("Password and Confirm Password should be same!!");
  }

  toast.loading("Loading...");
  axios
    .post(`${url}/signup`, { username, email, password, confirmPassword })
    .then((res) => {
      if (res?.data?.msg === "OK") {
        toast.remove();
        if (res?.data?.active) {
          toast.success("Signup Successful!");
          navigate("/");
        } else {
          localStorage.setItem("currUser", res?.data?.userid);
          navigate("/verifyAccount");
        }
      } else {
        toast.remove();
        toast.error("Try Again!!");
      }
    })
    .catch((err) => {
      console.log(err);
      toast.remove();
      if (err?.response?.data?.error.code === 11000) {
        return toast.error(
          `${
            err?.response?.data?.error?.keyValue?.email ||
            err?.response?.data?.error?.keyValue?.username
          } already exists!!`
        );
      }
      toast.error("Something went wrong!!");
    });
}

export function linkedinSignInBtnHandler() {
  console.log("LinkedIn ");
}

export function instagramSignInBtnHandler() {
  console.log("Instagram");
}
