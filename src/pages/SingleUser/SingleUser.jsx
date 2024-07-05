import React, { useEffect, useState } from "react";
import "./SingleUser.css";
import { useNavigate, useParams } from "react-router-dom";
import IndexLeft from "../../components/IndexLeft/IndexLeft";
import Loader from "../../components/Loader/Loader";
import HomePost from "../../components/HomePost/HomePost";
import {
  sendRequestClickHandler,
  fetchUserData,
  unfriendClickHandler,
} from "./SingleUserScript";

export default function SingleUser({ setSubsection, subsection }) {
  const { userid } = useParams();
  let currUserid = localStorage.getItem("userid");
  const [userData, setUserData] = useState({});
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [friendshipStatus, setFriendshipStatus] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setSubsection("");
    fetchUserData(
      setUserData,
      setPosts,
      setLoading,
      userid,
      navigate,
      setFriendshipStatus
    );
  }, [userid]);

  return (
    <div className="SingleUser">
      <div className="index-left">
        <IndexLeft setSubsection={setSubsection} subsection={subsection} />
      </div>

      {loading && (
        <div style={{ width: "75%" }}>
          <Loader />
        </div>
      )}

      {loading === false && (
        <div className="SingleUser-right">
          <div className="SingleUser-img-container">
            <img
              className="SingleUser-background-photo"
              src={userData?.background_photo?.url}
              alt=""
              loading="lazy"
            />

            <img
              className="SingleUser-profile-photo"
              src={userData?.profile_photo?.url}
              alt=""
              loading="lazy"
            />
          </div>

          <div className="SingleUser-user-details">
            <div className="SingleUser-name">{userData?.username}</div>
            {userData?.name && (
              <div className="SingleUser-data">{userData?.name}</div>
            )}
            <div className="SingleUser-bio">"{userData?.bio}"</div>
            <div className="SingleUser-dob-friends-container">
              <div className="SingleUser-data">
                {userData?.friends?.length} Friends
              </div>
              <div className="SingleUser-data">
                DOB: {userData?.dob || "Not Mentioned"}
              </div>
            </div>

            {userid !== currUserid && (
              <div className="SingleUser-btn-container">
                {friendshipStatus === "Friend" ? (
                  <div
                    onClick={() => {
                      unfriendClickHandler(
                        userid,
                        navigate,
                        setFriendshipStatus
                      );
                    }}
                    className="SingleUser-btn SingleUser-req-btn"
                  >
                    Unfriend
                  </div>
                ) : friendshipStatus === "Not Friend" ? (
                  <div
                    onClick={() => {
                      sendRequestClickHandler(
                        userid,
                        navigate,
                        setFriendshipStatus
                      );
                    }}
                    className="SingleUser-btn SingleUser-friend-btn"
                  >
                    Send Request
                  </div>
                ) : (
                  <div className="SingleUser-btn SingleUser-friend-btn">
                    Requested
                  </div>
                )}
                <div className="SingleUser-btn SingleUser-msg-btn">Message</div>
              </div>
            )}
          </div>
          <hr />
          <div className="SingleUser-allPosts">
            <h2>All Posts</h2>
            {posts?.map((post, index) => (
              <HomePost
                key={index}
                post={post}
                setPosts={setPosts}
                setLoading={setLoading}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
