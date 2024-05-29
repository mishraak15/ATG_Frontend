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
  let userid = "6653001e262fa63382979cfa";

  async function fetchFavoritePosts() {
    axios
      .get(`${url}/user/${userid}/fetchfavorites`)
      .then((res) => {
        if (res?.data?.msg === "OK") {
          setPosts(res?.data?.favorites);
          console.log(res?.data?.favorites);
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


  return (
    <div className="Favorites">
      <h2>Your Favorites</h2>
      {loading === false &&
        posts?.map((post, index) => <HomePost post={post} key={index} />)}
      {loading && <Loader />}
    </div>
  );
}
