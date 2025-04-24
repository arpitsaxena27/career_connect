import { useState, useEffect } from "react";
import { CameraAlt, ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

const ProfilePage = () => {
      const navigate = useNavigate();
      const userRole = useSelector((state) => state.jobs.userRole);
      const [userData, setUserData] = useState(null);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);

      // Load stored profile picture from Local Storage (if available)
      const storedProfilePic =
            localStorage.getItem("profilePic") ||
            "https://via.placeholder.com/150";

      const [profilePic, setProfilePic] = useState(storedProfilePic);

      // Save updated profile picture in Local Storage
      useEffect(() => {
            localStorage.setItem("profilePic", profilePic);
      }, [profilePic]);

      // Handle Profile Picture Upload
      const handleImageUpload = (event) => {
            const file = event.target.files[0];
            if (file) {
                  const reader = new FileReader();
                  reader.onload = () => {
                        setProfilePic(reader.result);
                        localStorage.setItem("profilePic", reader.result);
                  };
                  reader.readAsDataURL(file);
            }
      };

      useEffect(() => {
            const fetchUserData = async () => {
                  try {
                        const BACKEND_URL = import.meta.env.VITE_SERVER_URL;
                        const endpoint =
                              userRole === "student"
                                    ? `${BACKEND_URL}/account/student/profile`
                                    : `${BACKEND_URL}/account/uni/profile`;

                        const response = await axios.get(endpoint, {
                              withCredentials: true,
                        });
                        setUserData(response.data);
                  } catch (err) {
                        setError("Failed to load profile data");
                        console.error(err);
                  } finally {
                        setLoading(false);
                  }
            };

            fetchUserData();
      }, [userRole]);

      if (loading) {
            return (
                  <div className="min-h-screen bg-[#051923] text-white flex items-center justify-center">
                        Loading...
                  </div>
            );
      }

      if (error) {
            return (
                  <div className="min-h-screen bg-[#051923] text-white flex items-center justify-center">
                        {error}
                  </div>
            );
      }

      return (
            <>
                  {/* Back Button */}
                  {userRole === "student" ? (
                        <button
                              onClick={() => navigate("/student-dashboard")}
                              className="absolute top-4 left-4 bg-[#00A6FB] text-white p-2 rounded-full hover:bg-[#0582CA] transition"
                        >
                              <ArrowBack />
                        </button>
                  ) : (
                        <button
                              onClick={() => navigate("/admin-dashboard")}
                              className="absolute top-4 left-4 bg-[#00A6FB] text-white p-2 rounded-full hover:bg-[#0582CA] transition"
                        >
                              <ArrowBack />
                        </button>
                  )}

                  <div className="flex flex-col items-center justify-center min-h-screen bg-[#051923] text-white p-6">
                        <div className="bg-[rgb(0,53,84)] shadow-lg p-8 rounded-xl w-full max-w-md text-center border border-[#00A6FB]/30">
                              {/* Profile Picture with Upload Option */}
                              <div className="relative inline-block">
                                    <img
                                          src={profilePic}
                                          alt="Profile"
                                          className="w-32 h-32 rounded-full border-4 border-[#00A6FB] object-cover"
                                    />
                                    <label className="absolute bottom-2 right-2 bg-[#00A6FB] p-2 rounded-full cursor-pointer hover:bg-[#0582CA] transition">
                                          <CameraAlt className="text-white" />
                                          <input
                                                type="file"
                                                className="hidden"
                                                accept="image/*"
                                                onChange={handleImageUpload}
                                          />
                                    </label>
                              </div>

                              {/* Dynamic User Information */}
                              <div className="mt-4">
                                    <h2 className="text-2xl font-semibold">
                                          {userData?.name}
                                    </h2>
                                    <p className="text-gray-300">
                                          {userData?.email}
                                    </p>
                                    <p className="text-gray-400 font-semibold">
                                          {userData?.role}
                                    </p>
                              </div>

                              {userRole === "student" ? (
                                    <div className="mt-4 text-left space-y-3">
                                          <p className="text-gray-300">
                                                <span className="font-semibold text-white">
                                                      University Roll No:{" "}
                                                </span>
                                                {userData?.uniRollNo}
                                          </p>
                                          <p className="text-gray-300">
                                                <span className="font-semibold text-white">
                                                      Course:{" "}
                                                </span>
                                                {userData?.course}
                                          </p>
                                          <p className="text-gray-300">
                                                <span className="font-semibold text-white">
                                                      Branch:{" "}
                                                </span>
                                                {userData?.branch}
                                          </p>
                                          <p className="text-gray-300">
                                                <span className="font-semibold text-white">
                                                      Semester:{" "}
                                                </span>
                                                {userData?.semester}
                                          </p>
                                    </div>
                              ) : (
                                    <p className="text-gray-300">
                                          <span className="font-semibold text-white">
                                                Employee ID:{" "}
                                          </span>
                                          {userData?.employeeId}
                                    </p>
                              )}
                        </div>
                  </div>
            </>
      );
};

export default ProfilePage;
