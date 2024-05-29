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
  let userid = "6653001e262fa63382979cfa";

  async function fetchSavedPosts() {
    axios
      .get(`${url}/user/${userid}/fetchsaved`)
      .then((res) => {
        if (res?.data?.msg === "OK") {
          setPosts(res?.data?.saved);
          console.log(res?.data?.saved);
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
    <div className="Saved">
      <h2>All Saved Pages</h2>
      {loading === false &&
        posts?.map((post, index) => <HomePost post={post} key={index} />)}

      {loading && <Loader />}
    </div>
  );
}
