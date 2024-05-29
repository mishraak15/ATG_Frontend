import { initializeApp } from "firebase/app";
import {
  getAuth,
  signOut,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
} from "firebase/auth";

import firebaseConfig from "../../utils/firebaseConfig";
import toast from "react-hot-toast";
import axios from "axios";

const provider1 = new GoogleAuthProvider();
const provider2 = new GithubAuthProvider();

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.languageCode = "en";

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

export function githubSignInBtnHandler() {
  signInWithPopup(auth, provider2)
    .then((result) => {
      const user = result.user;
      console.log(user);
      toast.success("Signup Successful!");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
      toast.error(errorMessage);
    });
}

export function emailSignInBtnHandler(e, username, email, password, navigate) {
  e.preventDefault();
  toast.loading("Loading...");
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);

      axios
        .post("http://localhost:8000/signup ", { username, email, password })
        .then((res) => {
          toast.remove();
          if (res?.data?.msg === "OK") {
            toast.success("Signup Successful!");
            navigate("/");
          } else {
            toast.error("Try Again!!");
          }
        })
        .catch((err) => {
          console.log(err);
          toast.remove();
          toast.error("Something went wrong!!");
        });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
      toast.remove();
      if (errorCode === "auth/email-already-in-use")
        toast.error("Email already registered. Try with another email!!");
      else if (errorCode === "auth/weak-password")
        toast.error("Password should be atleast 6 characters long!!");
      else toast.error("Something went wrong!!");
    });
}

export function checkHandler() {
  const user = auth?.currentUser;
  console.log(user?.email);
}

export function logout() {
  signOut(auth)
    .then(() => {
      console.log("Logout Successfully");
      toast.success("Logout Successfully");
    })
    .catch((error) => {
      console.log(error);
      toast.error("Something went wrong!");
    });
}

export function linkedinSignInBtnHandler() {
  console.log("LinkedIn ");
}

export function instagramSignInBtnHandler() {
  console.log("Instagram");
}
