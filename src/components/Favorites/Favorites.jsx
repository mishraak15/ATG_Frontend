import React, { useEffect, useState } from "react";
import "./Favorites.css";
import HomePost from "../HomePost/HomePost";
import Loader from "../Loader/Loader";
import axios from "axios";
import toast from "react-hot-toast";

export default function Favorites() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFavoritePosts();
  }, []);

  const url = process.env.REACT_APP_BACKEND_URL;

  async function fetchFavoritePosts() {
    let userid = localStorage.getItem("userid");
    setLoading(true);
    axios
      .get(`${url}/user/${userid}/fetchfavorites`, { withCredentials: true })
      .then((res) => {
        if (res?.data?.msg === "OK") {
          setPosts(res?.data?.favorites);
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
    <div className="Favorites">
      {posts.length > 0 && <h2>Your Favorites</h2>}
      {!loading &&
        posts?.map((post, index) => (
          <HomePost post={post} key={index} mode="Favorites" fetchFavoritePosts={fetchFavoritePosts} />
        ))}
      {loading && <Loader />}
      {!loading && posts.length === 0 && (
        <div className="Request-none">No Favorites Yet!!</div>
      )}
    </div>
  );
}
