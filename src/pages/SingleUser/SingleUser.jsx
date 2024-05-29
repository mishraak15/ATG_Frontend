import React, { useEffect, useState } from "react";
import "./SingleUser.css";
import { useParams } from "react-router-dom";
import IndexLeft from "../../components/IndexLeft/IndexLeft";
import Loader from "../../components/Loader/Loader";
import HomePost from "../../components/HomePost/HomePost";

export default function SingleUser({ setSubsection, subsection }) {
  const { userid } = useParams();
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);

  const currUsername = "Akash";

  function checkFriendship() {
    userData?.friends?.forEach((friend) => {
      if (friend.username === currUsername) {
        return true;
      }
    });
    return false;
  }

  useEffect(() => {
    setSubsection("");
    console.log(userid);

    setUserData({
      username: "Akash Mishra",
      profile_photo: {
        url: "https://akm-img-a-in.tosshub.com/indiatoday/images/photo_gallery/202403/msdhoniipl2024csk.jpg?VersionId=L777652GITlP31pBxZJtrhSDOIA3XwW1&size=686:*",
      },
      background_photo: {
        url: "https://images.pexels.com/photos/302769/pexels-photo-302769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      },
      bio: "My Life My Rules!!",
      dob: "15 July 2004",
      friends: [
        {
          username: "Abhishek",
        },
        {
          username: "Rahul",
        },
        {
          username: "Lakshya",
        },
      ],
      posts: [
        {
          post_text: "Enjoying my Life",
          post_img: {
            filename: "",
            url: "https://images.unsplash.com/photo-1416169607655-0c2b3ce2e1cc?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          },
          created_at: "Mon May 25 2024 20:53:18",
          created_by: "Akash Mishra",
          likes: [
            { liked_by: "Abhishek" },
            { liked_by: "Lakshya" },
            { liked_by: "Akash Mishra" },
          ],
          comments: [
            {
              commented_by: "Akash Mishra",
              comment_text: "Mast Jindgi hai be!",
            },
            { commented_by: "Abhishek", comment_text: "Best DP!!" },
          ],
        },
        {
          created_at: "Mon May 20 2024 07:53:18",
          created_by: "Akash Mishra",
          post_text: "You you want to make peace, then  be ready for war!!",
          likes: [{ liked_by: "Akash" }, { liked_by: "Swapnil" }],
          comments: [
            { commented_by: "Rahul", comment_text: "Ye to mera quote tha" },
            { commented_by: "Abhishek", comment_text: "Best DP!!" },
          ],
        },
      ],
    });

    setLoading(false);
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
            <div className="SingleUser-data">{userData?.bio}</div>
            <div className="SingleUser-dob-friends-container">
              <div className="SingleUser-data">
                {userData?.friends?.length} Friends
              </div>
              <div className="SingleUser-data">DOB: {userData?.dob}</div>
            </div>
            <div className="SingleUser-btn-container">
              {checkFriendship() ? (
                <div className="SingleUser-btn SingleUser-req-btn">
                  Send Request
                </div>
              ) : (
                <div className="SingleUser-btn SingleUser-friend-btn">
                  Friend
                </div>
              )}
              <div className="SingleUser-btn SingleUser-msg-btn">Message</div>
            </div>
          </div>
          <hr />
          <div className="SingleUser-allPosts">
            <h2>All Posts</h2>
            {userData?.posts?.map((post, index) => (
              <HomePost key={index} post={post} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
