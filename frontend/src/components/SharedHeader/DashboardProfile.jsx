import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { getFilePreview, uploadFile } from "@/lib/appwrite/uploadImage";

import {
  updateStart,
  updateSuccess,
  updateFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOutStart,
  signOutSuccess,
  signOutFailure,
} from "@/redux/userSlice.js";
const backendUrl = import.meta.env.REACT_APP_BACKEND_URL;
const DashboardProfile = () => {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const profilePicRef = useRef();
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);

  const [username, setUsername] = useState(currentUser.user.username);
  const [email] = useState(currentUser.user.email); // email is read-only
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // setting image handel change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    if (file) {
      setImageFile(file);
      const fileurl = URL.createObjectURL(file);
      console.log("image url is ", fileurl);
      setImageFileUrl(fileurl);
      console.log(fileurl.toString());
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     dispatch(updateStart());

  //     const formData = new FormData();
  //     formData.append("username", username);
  //     formData.append("email", email);
  //     formData.append("password", password);
  //     formData.append("newPassword", newPassword);

  //     if (imageFile) {
  //       formData.append("profilePic", imageFile); // key must match your backend field
  //     }

  //     const response = await axios.put(
  //       "http://localhost:5000/api/user/update",
  //       formData,
  //       {
  //         withCredentials: true,
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //       }
  //     );

  //     dispatch(updateSuccess(response.data));
  //     toast.success("Profile updated successfully!");
  //     navigate("/dashboard");
  //   } catch (error) {
  //     dispatch(updateFailure(error.response?.data?.message || "Update failed"));
  //     toast.error(error.response?.data?.message || "Profile update failed.");
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(updateStart());
      let imageUrl = currentUser.user.profilePic;

      if (imageFile) {
        // ✅ Upload to Appwrite
        const uploaded = await uploadFile(imageFile);
        imageUrl = getFilePreview(uploaded.$id);
      }

      const response = await axios.put(
        `${backendUrl}/api/user/update`,
        {
          username,
          email,
          password,
          newPassword,
          profilePic: imageUrl,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      dispatch(updateSuccess(response.data));
      toast.success("Profile updated successfully!");
      navigate("/DashboardProfile");
    } catch (error) {
      dispatch(updateFailure(error.response?.data?.message || "Update failed"));
      toast.error(error.response?.data?.message || "Profile update failed.");
    }
  };

  const deleteAccount = async () => {
    try {
      dispatch(deleteUserStart());

      await axios.delete(`${backendUrl}/api/user/deleteAccount`, {
        withCredentials: true,
      });

      dispatch(deleteUserSuccess());
      toast.success("Account deleted");
      setTimeout(() => {
        navigate("/sign-up");
      }, 3000);
    } catch (error) {
      dispatch(
        deleteUserFailure(error.response?.data?.message || "Delete failed")
      );
      toast.error("Failed to delete account");
    }
  };

  const handleSignout = async () => {
    try {
      dispatch(signOutStart());

      await axios.post(
        `${backendUrl}/api/auth/logout`,
        {},
        { withCredentials: true }
      );

      dispatch(signOutSuccess());
      toast.success("Logged out successfully");
      navigate("/");
    } catch (error) {
      dispatch(signOutFailure());
      toast.error("Failed to log out");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-400 p-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
          Update Your Profile
        </h1>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="file"
            accept="image/*"
            ref={profilePicRef}
            onChange={handleImageChange}
            className="hidden"
          />

          <div className="w-32 h-32 self-center cursor-pointer">
            <img
              src={imageFileUrl || currentUser.user.profilePic}
              alt="Profile"
              className="w-full h-full  object-fit rounded-full transform transition-transform duration-300 ease-in-out hover:scale-150"
              onClick={() => profilePicRef.current.click()}
            />
          </div>
          <Input
            type="text"
            name="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            disabled
            className="bg-gray-100 cursor-not-allowed"
          />

          <Input
            type="password"
            name="password"
            placeholder="Current Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Input
            type="password"
            name="newPassword"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <Button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
            disbaled={loading}
          >
            {loading ? "updating..." : "Save Changes"}
          </Button>
        </form>

        <div className="mt-8 flex flex-col sm:flex-row justify-between gap-3">
          <Button
            className="bg-gray-200 text-gray-800 hover:bg-gray-300 font-semibold py-2 rounded-lg transition"
            onClick={handleSignout}
          >
            Logout
          </Button>
          <Button
            onClick={deleteAccount}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-lg transition"
          >
            Delete Account
          </Button>
        </div>
      </div>
    </div>
  );
};
export default DashboardProfile;
