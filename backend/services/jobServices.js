import { Job } from "../models/job.js";
import { createNewAnalytics } from "./analyticsServices.js";

export async function fetchJobs(user) {
  try {
    const jobs = await Job.find({
      course: user.course,
      branch: user.branch,
      semester: user.semester,
    });
    return Promise.resolve(jobs);
  } catch (error) {
    return Promise.reject(error.message);
  }
}

export async function fetchAllJobs() {
  try {
    const jobs = await Job.find({});
    return Promise.resolve(jobs);
  } catch (error) {
    return Promise.reject(error.message);
  }
}

export async function fetchJobById(id) {
  try {
    const job = await Job.findById(id);
    return Promise.resolve(job);
  } catch (error) {
    return Promise.reject(error.message);
  }
}

export async function fetchExpiredJobs() {
  try {
    const jobs = await Job.find({
      deadline: { $lt: new Date() },
    });

    return Promise.resolve(jobs);
  } catch (error) {
    return Promise.reject(error.message);
  }
}

export async function createNewJob(details) {
  try {
    const job = await Job.create(details);
    await createNewAnalytics(job._id);

    return Promise.resolve(job);
  } catch (error) {
    return Promise.reject(error.message);
  }
}

export async function updateJobById(id, details) {
  try {
    const job = await Job.findByIdAndUpdate(
      id,
      {
        $set: details,
      },
      {
        new: true,
      }
    );
    return Promise.resolve(job);
  } catch (error) {
    return Promise.reject(error.message);
  }
}

export async function deleteJobById(id) {
  try {
    const job = await Job.findByIdAndDelete(id);
    return Promise.resolve(job);
  } catch (error) {
    return Promise.reject(error.message);
  }
}
