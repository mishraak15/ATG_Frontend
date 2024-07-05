import React, { useEffect, useState } from "react";
import "./IndexRight.css";
import { BsCake2Fill } from "react-icons/bs";
import { MdCancel } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";
import { convertPostTime } from "../HomePost/HomePostScript";
import {
  birthdayCancelClickHandler,
  fetchNotifications,
  fetchFriendRequests,
  acceptRequestClickHandler,
  rejectRequestClickHandler,
} from "./IndexRightScript";

export default function IndexRight({ setSubsection }) {
  const [connectionsBirthday, setConnectionsBirthday] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [showAllNotification, setShowAllNotification] = useState(false);
  const [friendRequest, setFriendRequest] = useState([]);
  const [showAllFriendRequest, setShowAllFriendRequest] = useState(false);
  const navigate = useNavigate();
  const userid = localStorage.getItem("userid");

  useEffect(() => {
    setConnectionsBirthday([{ name: "Akash" }, { name: "Swapnil" }]);
    fetchNotifications(setNotifications, setShowAllNotification, navigate);
    fetchFriendRequests(setFriendRequest, setShowAllFriendRequest, navigate);
  }, []);

  function callFunction(){
    setSubsection("Requests");
    navigate("/");
  }

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
      {notifications?.length > 0 ? (
        <div className="notification-container">
          <div className="IndexLeft-head">Latest Activity</div>
          {notifications?.map((e, index) => (
            <div
              key={index}
              className="IndexRight-notification"
              onClick={() =>
                e?.category === "Friend Request"
                  ? callFunction()
                  : navigate(`${e?.url}`)
              }
            >
              <img src={e?.sent_by?.profile_photo?.url} alt="" />

              <div>
                <div>
                  <span>{e?.sent_by?.username} </span>
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
            </div>
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
      ) : (
        <div className="IndexLeft-head">No New Notification</div>
      )}

      <hr />
      {/* Request yo connect OR Friend Request */}
      <div>
        {friendRequest?.length > 0 ? (
          <div>
            <div className="IndexLeft-head">Friend Requests</div>
            {friendRequest?.map((e, index) => (
              <div key={index} className="IndexRight-friend-req">
                <div className="IndexRight-friend-req-item">
                  <img src={e?.sent_by?.profile_photo?.url} alt="profile..." />
                  <NavLink to={`/user/${e?.sent_by?._id}/profile`}>
                    <div className="IndexRight-friend-req-name">
                      {e?.sent_by?.username}
                    </div>
                    <div className="IndexRight-friend-req-mutual">
                      {e?.sent_by?.friends.length} friends
                    </div>
                  </NavLink>
                </div>
                <div className="IndexRight-friend-req-item">
                  <div
                    className="IndexRight-friend-req-btn IndexRight-accept-btn"
                    style={{ backgroundColor: "var(--light-blue)" }}
                    onClick={(event) => {
                      if (event.target.innerHTML === "Accept")
                        acceptRequestClickHandler(
                          e?.sent_by?._id,
                          navigate,
                          setFriendRequest,
                          setShowAllFriendRequest
                        );
                    }}
                  >
                    Accept
                  </div>
                  <div
                    className="IndexRight-friend-req-btn IndexRight-reject-btn"
                    style={{ backgroundColor: "var(--light-grey)" }}
                    onClick={(event) => {
                      if (event.target.innerHTML === "Reject")
                        rejectRequestClickHandler(
                          e?.sent_by?._id,
                          navigate,
                          setFriendRequest,
                          setShowAllFriendRequest
                        );
                    }}
                  >
                    Reject
                  </div>

                  <div className="IndexRight-friend-req-time">
                    {convertPostTime(e?.sent_at)}
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
        ) : (
          <div className="IndexLeft-head">No Friend Requests</div>
        )}
      </div>
    </div>
  );
}
