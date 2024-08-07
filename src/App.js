import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Navbar from "./components/Navbar/Navbar";
import Signup from "./pages/Signup/Signup";
import Index from "./pages/Index/Index";
import AllNotifications from "./pages/AllNotifications/AllNotifications";
import { useState } from "react";
import SinglePost from "./pages/SinglePost/SinglePost";
import SingleUser from "./pages/SingleUser/SingleUser";
import VerifyAccount from "./pages/VerifyAccount/VerifyAccount";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import EditProfile from "./pages/EditProfile/EditProfile";
import ChangePassword from "./pages/ChangePassword/ChangePassword";

function App() {
  const [subsection, setSubsection] = useState("Home");

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route
          exact
          path="/"
          element={
            <Index subsection={subsection} setSubsection={setSubsection} />
          }
        />
        {/* <Route path={`/user/:userid/chat`} element={<Index />} /> */}
        {/* <Route path={`/user/:userid/chat/:friendid`} element={<Index />} /> */}

        <Route
          path={`/user/:userid/allnotifications`}
          element={
            <AllNotifications
              setSubsection={setSubsection}
              subsection={subsection}
            />
          }
        />

        <Route
          path={`/post/:postid`}
          element={
            <SinglePost subsection={subsection} setSubsection={setSubsection} />
          }
        />

        {/* <Route path={`/user/:userid/editprofile`} element={<Index />} /> */}

        <Route
          path={`/user/:userid/profile`}
          element={
            <SingleUser subsection={subsection} setSubsection={setSubsection} />
          }
        />

        <Route path={`/user/:userid/editProfile`} element={<EditProfile />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verifyAccount" element={<VerifyAccount />} />
        <Route path="/resetpassword" element={<ResetPassword />} />

        <Route
          path={`/user/:userid/changePassword`}
          element={<ChangePassword />}
        />
        <Route path="*" element={<h2>Page Not Found</h2>} />
      </Routes>
    </div>
  );
}

export default App;
