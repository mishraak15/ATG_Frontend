import React, { useEffect, useState } from "react";
import HomePost from "../HomePost/HomePost";
import Loader from "../Loader/Loader";
import {fetchPosts } from "./HomeScript";
import { useNavigate } from "react-router-dom";
import HomeHeader from "../HomeHeader/HomeHeader";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [showEmojis, setShowEmojis] = useState(false);
  const [loading, setLoading] = useState(true);
  const [newPostText, setNewPostText] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts(setPosts, setLoading, navigate);
  }, []);

  return (
    <div className="Home">
      <HomeHeader
        showEmojis={showEmojis}
        setShowEmojis={setShowEmojis}
        setPosts={setPosts}
        newPostText={newPostText}
        setNewPostText={setNewPostText}
        setLoading={setLoading}
      />

      {loading === false && (
        <div className="home-post-container">
          {posts.map((post, index) => (
            <HomePost
              setPosts={setPosts}
              setLoading={setLoading}
              fetchPosts={fetchPosts}
              post={post}
              key={index}
            />
          ))}
        </div>
      )}

      {loading && <Loader />}
    </div>
  );
}
