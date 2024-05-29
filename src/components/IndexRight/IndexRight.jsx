import React, { useEffect, useState } from "react";
import "./IndexRight.css";
import { BsCake2Fill } from "react-icons/bs";
import { MdCancel } from "react-icons/md";
import { NavLink } from "react-router-dom";
import profilephoto from "../../assets/ouah28.jpg";
import { convertPostTime } from "../HomePost/HomePostScript";
import { birthdayCancelClickHandler } from "./IndexRightScript";

export default function IndexRight({ setSubsection }) {
  const [connectionsBirthday, setConnectionsBirthday] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [showAllNotification, setShowAllNotification] = useState(false);
  const [friendRequest, setFriendRequest] = useState([]);
  const [showAllFriendRequest, setShowAllFriendRequest] = useState(false);
  let userid = "sd2hjb2b34k45bw";

  useEffect(() => {
    setConnectionsBirthday([{ name: "Akash" }, { name: "Swapnil" }]); //Just To test
    setNotifications([
      {
        category: "Liked",
        sent_by: {
          name: "Swapnil Tiwari",
        },
        sent_at: "Sun May 26 2024 11:37:18",
        url: "/",
      },

      {
        category: "Posted",
        sent_by: {
          name: "Lakshya Srivastav",
        },
        sent_at: "Tue May 21 2024 15:37:18",
        url: "/post/v2be2h3h3h",
      },
      {
        category: "Friend Request",
        sent_by: {
          name: "Rahul Gupta",
        },
        sent_at: "Sat May 25 2024 15:37:18",
        url: "/",
      },
    ]); //Just To test

    setFriendRequest([
      { name: "Rahul", mutual: 14 },
      { name: "Lakshya", mutual: 10 },
      { name: "Kartik", mutual: 4 },
      { name: "Abhishek", mutual: 0 },
    ]);
    setShowAllFriendRequest(true);
    setShowAllNotification(true);
  }, []);

  return (
    <div className="IndexRight">
      {/*Special Notification (BirthDay, Suggestion) Section  with cancel option*/}
      {connectionsBirthday?.length > 0 && !localStorage.getItem("birthday") && (
        <div className="birthdayNotification-container">
          <div className="IndexRight-birthday-notification">
            <div>
              {" "}
              BirthDays <BsCake2Fill className="IndexRight-cake-icon" />{" "}
            </div>
            <MdCancel
              className="IndexRight-birthday-notification-cancel"
              onClick={(e) => {
                setConnectionsBirthday([]);
                birthdayCancelClickHandler(e);
              }}
            />
          </div>

          {connectionsBirthday?.length === 1 &&
            `${connectionsBirthday[0].name} has its Birthday today. Wish him Now!!`}
          {connectionsBirthday?.length > 1 &&
            `${connectionsBirthday[0].name} and ${
              connectionsBirthday?.length - 1
            } others have Birthday today. Wish him Now!!`}
        </div>
      )}

      {/* Notifications (That actually happened)*/}
      {notifications?.length > 0 && (
        <div className="notification-container">
          <div className="IndexLeft-head">Latest Activity</div>
          {notifications?.map((e, index) => (
            <NavLink
              key={index}
              to={e?.url}
              className="IndexRight-notification"
              onClick={() =>
                e?.category === "Friend Request" ? setSubsection("Requests") : ""
              }
            >
              <img src={profilephoto} alt="" />

              <div>
                <div>
                  <span>{e?.sent_by?.name} </span>
                  {e?.category === "Posted"
                    ? " posted something."
                    : e?.category === "Liked"
                    ? " liked your post."
                    : e?.category === "Commented"
                    ? " commented on your post."
                    : e?.category === "Friend Request"
                    ? " sent you a friend request."
                    : ""}
                </div>
                <div className="IndexRight-notification-time">
                  {convertPostTime(e?.sent_at)}
                </div>
              </div>
            </NavLink>
          ))}
          {showAllNotification && (
            <NavLink
              to={`/user/${userid}/allnotifications`}
              className="IndexRight-show-all-activity"
            >
              Show All Activity
            </NavLink>
          )}
        </div>
      )}

      <hr />
      {/* Request yo connect OR Friend Request */}
      <div>
        {friendRequest?.length > 0 && (
          <div>
            <div className="IndexLeft-head">Friend Request</div>
            {friendRequest?.map((e, index) => (
              <div key={index} className="IndexRight-friend-req">
                <NavLink to={`/user/${e?.id}/profile`} className="IndexRight-friend-req-item">
                  <img src={profilephoto} alt="" />
                  <div>
                    <div className="IndexRight-friend-req-name">{e?.name}</div>
                    <div className="IndexRight-friend-req-mutual">
                      {e?.mutual} mutual friends
                    </div>
                  </div>
                </NavLink>
                <div className="IndexRight-friend-req-item">
                  <div
                    className="IndexRight-friend-req-btn"
                    style={{ backgroundColor: "var(--light-blue)" }}
                  >
                    Accept
                  </div>
                  <div
                    className="IndexRight-friend-req-btn"
                    style={{ backgroundColor: "var(--light-grey)" }}
                  >
                    Decline
                  </div>
                </div>
              </div>
            ))}
            {showAllFriendRequest && (
              <div
                onClick={() => setSubsection("Requests")}
                className="IndexRight-show-all-request"
              >
                Show All Friend Request
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
