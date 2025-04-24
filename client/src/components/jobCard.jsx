import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const JobCard = ({ job, missed, applied, admin }) => {
      const navigate = useNavigate();

      const formatDate = (dateString) => {
            const options = {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
            };
            return new Date(dateString).toLocaleDateString("en-US", options);
      };

      return (
            <motion.div
                  key={applied || missed ? job.id : job._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  whileHover={{ scale: 1.05 }}
                  className="relative bg-gradient-to-b from-[#003554] to-[#051923] shadow-lg border border-gray-700 p-5 rounded-xl overflow-hidden"
            >
                  {/* Top Indicator */}
                  <div
                        className={`absolute top-0 left-0 w-full h-1 ${
                              missed === true ? "bg-red" : "bg-primary"
                        }`}
                  ></div>

                  {/* Job Details */}
                  <h2 className="text-xl font-semibold text-primary">
                        {job.title}
                  </h2>
                  <p className="text-gray-300 text-lg">{job.company}</p>
                  {applied || missed ? (
                        <></>
                  ) : (
                        <>
                              {" "}
                              <p className="text-sm text-brightBlue font-medium">
                                    {job.jobType}
                              </p>
                              <p className="text-xs text-gray-400">
                                    Last Date: {formatDate(job.deadline)}
                              </p>
                              <p className="text-sm mt-2 text-gray-200">
                                    {job.description}
                              </p>
                        </>
                  )}

                  {/* Button */}
                  {applied === true || admin ? (
                        <motion.button
                              whileHover={{
                                    scale: 1.1,
                                    boxShadow: "0px 0px 10px #00A6FB",
                              }}
                              transition={{ type: "spring", stiffness: 300 }}
                              className={`btn btn-primary w-full mt-3`}
                              onClick={() =>
                                    navigate(
                                          `/job/${
                                                applied || missed
                                                      ? job.id
                                                      : job._id
                                          }`
                                    )
                              }
                        >
                              View Details
                        </motion.button>
                  ) : (
                        <motion.button
                              whileHover={{
                                    scale: 1.1,
                                    boxShadow: "0px 0px 10px #00A6FB",
                              }}
                              transition={{ type: "spring", stiffness: 300 }}
                              className={`btn btn-primary w-full mt-3`}
                              onClick={() => navigate(`/job/${job._id}`)}
                              disabled={missed === true}
                        >
                              Apply Now
                        </motion.button>
                  )}
            </motion.div>
      );
};

export default JobCard;
