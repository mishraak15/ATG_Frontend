import React, { useEffect, useState } from "react";
import "./Saved.css";
import HomePost from "../HomePost/HomePost";
import Loader from "../Loader/Loader";
import axios from "axios";
import toast from "react-hot-toast";

export default function Saved() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSavedPosts();
  }, []);

  const url = process.env.REACT_APP_BACKEND_URL;

  async function fetchSavedPosts() {
    let userid = localStorage.getItem("userid");
    setLoading(true);
    axios
      .get(`${url}/user/${userid}/fetchsaved`, { withCredentials: true })
      .then((res) => {
        if (res?.data?.msg === "OK") {
          setPosts(res?.data?.saved);
          setLoading(false);
        } else {
          toast.error("Something unusual happened!!");
        }
      })
      .catch((err) => {
        console.log(err);
        let errMsg = err?.response?.data?.message || "Something went wrong!!";
        toast.remove();
        toast.error(errMsg);
      });
  }

  return (
    <div className="Saved">
      {posts.length > 0 && <h2>All Saved Pages</h2>}
      {!loading &&
        posts?.map((post, index) => (
          <HomePost
            post={post}
            key={index}
            mode="Saved"
            fetchSavedPosts={fetchSavedPosts}
          />
        ))}
      {loading && <Loader />}
      {!loading && posts.length === 0 && (
        <div className="Request-none">No Saved Post Yet!!</div>
      )}
    </div>
  );
}
