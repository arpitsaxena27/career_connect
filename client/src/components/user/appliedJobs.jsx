import JobCard from "../jobCard";
import Navbar from "./userNavbar";
import { useState, useEffect } from "react";
import axios from "axios";

const AppliedJobs = () => {
      const [jobs, setJobs] = useState([]);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);

      useEffect(() => {
            const fetchAppliedJobs = async () => {
                  try {
                        const SERVER_URL = import.meta.env.VITE_SERVER_URL;
                        const response = await axios.get(
                              `${SERVER_URL}/student/applied`,
                              {
                                    withCredentials: true,
                                    headers: {
                                          "Content-Type": "application/json",
                                    },
                              }
                        );
                        setJobs(response.data.appliedJobs);
                  } catch (err) {
                        setError("Failed to fetch applied jobs");
                        console.error(err);
                  } finally {
                        setLoading(false);
                  }
            };

            fetchAppliedJobs();
      }, []);
      console.log(jobs)

      if (loading)
            return (
                  <div className="min-h-screen bg-[#051923] text-white flex items-center justify-center">
                        Loading...
                  </div>
            );
      if (error)
            return (
                  <div className="min-h-screen bg-[#051923] text-white flex items-center justify-center">
                        {error}
                  </div>
            );

      return (
            <>
                  <Navbar header={"Applied Jobs"}></Navbar>
                  <div className="flex justify-center bg-[#051923] p-10 h-screen">
                        <div className="w-full max-w-2xl space-y-10">
                              {jobs.map((job) => (
                                    <JobCard
                                          key={job.id}
                                          job={job}
                                          user={0}
                                          applied={true}
                                          missed={false}
                                    />
                              ))}
                        </div>
                  </div>
            </>
      );
};

export default AppliedJobs;
