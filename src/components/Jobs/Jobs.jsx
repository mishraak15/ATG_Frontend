import React, { useEffect, useState } from "react";
import "./Jobs.css";
import HomeHeader from "../HomeHeader/HomeHeader";
import HomePost from "../HomePost/HomePost";
import Loader from "../Loader/Loader";
import { fetchJobs } from "./JobsScript";

export default function Jobs() {
  const [newPostText, setNewPostText] = useState("");
  const [postCategory, setPostCategory] = useState("");
  const [posts, setPosts] = useState(false);
  const [showEmojis, setShowEmojis] = useState(false);
  const [loading, setLoading] = useState(true);
  const [filterCategory, setFilterCategory] = useState("All");

  useEffect(() => {
    fetchJobs(setPosts, setLoading);
  }, []);

  useEffect(() => {
    setFilterCategory("All");
  }, [loading]);

  return (
    <div className="Jobs">
      <div className="post-categories">
        <select
          name="post_category"
          required
          onChange={(e) => setPostCategory(e.target.value)}
        >
          <option value="" disabled selected>
            Choose Job Category for creating a Job related post*
          </option>
          <option value="Web Development">Web Development</option>
          <option value="Content Writing">Content Writing</option>
          <option value="Full Stack Development">Full Stack Development</option>
          <option value="Marketing">Marketing</option>
          <option value="Designing">Designing</option>
          <option value="SEO Optimization">SEO Optimization</option>
          <option value="Data Entry">Data Entry</option>
        </select>
      </div>
      <HomeHeader
        showEmojis={showEmojis}
        setShowEmojis={setShowEmojis}
        setPosts={setPosts}
        newPostText={newPostText}
        setNewPostText={setNewPostText}
        setLoading={setLoading}
        postCategory={postCategory}
      />
      <div className="job-search-options">
        <div
          className="job-search-option"
          style={
            filterCategory === "All"
              ? { backgroundColor: "#b8b8b8" }
              : { backgroundColor: "var(--light-grey)" }
          }
          onClick={() => {
            fetchJobs(setPosts, setLoading, "all");
            setFilterCategory("All");
          }}
        >
          All
        </div>
        <div
          className="job-search-option"
          style={
            filterCategory === "Web Development"
              ? { backgroundColor: "#b8b8b8" }
              : { backgroundColor: "var(--light-grey)" }
          }
          onClick={() => {
            fetchJobs(setPosts, setLoading, "Web Development");
            setFilterCategory("Web Development");
          }}
        >
          Web Development
        </div>
        <div
          className="job-search-option"
          style={
            filterCategory === "Content Writing"
              ? { backgroundColor: "#b8b8b8" }
              : { backgroundColor: "var(--light-grey)" }
          }
          onClick={() => {
            fetchJobs(setPosts, setLoading, "Content Writing");
            setFilterCategory("Content Writing");
          }}
        >
          Content Writing
        </div>
        <div
          className="job-search-option"
          style={
            filterCategory === "Full Stack Development"
              ? { backgroundColor: "#b8b8b8" }
              : { backgroundColor: "var(--light-grey)" }
          }
          onClick={() => {
            fetchJobs(setPosts, setLoading, "Full Stack Development");
            setFilterCategory("Full Stack Development");
          }}
        >
          Full Stack Development
        </div>
        <div
          className="job-search-option"
          style={
            filterCategory === "Marketing"
              ? { backgroundColor: "#b8b8b8" }
              : { backgroundColor: "var(--light-grey)" }
          }
          onClick={() => {
            fetchJobs(setPosts, setLoading, "Marketing");
            setFilterCategory("Marketing");
          }}
        >
          Marketing
        </div>
        <div
          className="job-search-option"
          style={
            filterCategory === "Designing"
              ? { backgroundColor: "#b8b8b8" }
              : { backgroundColor: "var(--light-grey)" }
          }
          onClick={() => {
            fetchJobs(setPosts, setLoading, "Designing");
            setFilterCategory("Designing");
          }}
        >
          Designing
        </div>
        <div
          className="job-search-option"
          style={
            filterCategory === "SEO Optimization"
              ? { backgroundColor: "#b8b8b8" }
              : { backgroundColor: "var(--light-grey)" }
          }
          onClick={() => {
            fetchJobs(setPosts, setLoading, "SEO Optimization");
            setFilterCategory("SEO Optimization");
          }}
        >
          SEO Optimization
        </div>
        <div
          className="job-search-option"
          style={
            filterCategory === "Data Entry"
              ? { backgroundColor: "#b8b8b8" }
              : { backgroundColor: "var(--light-grey)" }
          }
          onClick={() => {
            fetchJobs(setPosts, setLoading, "Data Entry");
            setFilterCategory("Data Entry");
          }}
        >
          Data Entry
        </div>
      </div>
      <div className="Job-container">
        {loading && <Loader />}
        {!loading &&
          posts?.map((p, index) => (
            <HomePost
              key={index}
              post={p}
              setPosts={setPosts}
              setLoading={setLoading}
              mode="Jobs"
            />
          ))}
        {!loading && posts?.length === 0 && (
          <h2 style={{ textAlign: "center" }}>No Jobs Found!!</h2>
        )}
      </div>
    </div>
  );
}
