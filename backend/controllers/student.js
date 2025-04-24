import {
  fetchJobs,
  fetchJobById,
  fetchExpiredJobs,
} from "../services/jobServices.js";

import { fetchAnalyticsByJobID } from "../services/analyticsServices.js";

export async function getJobs(req, res) {
  try {
    const jobs = await fetchJobs(req.user);

    return res.status(200).json(jobs);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
}

export async function getJobById(req, res) {
  try {
    const job = await fetchJobById(req.params.id);

    return res.status(200).json(job);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
}

export async function getExpiredJobs(req, res) {
  try {
    const jobs = await fetchExpiredJobs();

    return res.status(200).json(jobs);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
}

export async function getAppliedJobs(req, res) {
  try {
    const appliedJobs = [];
    const studentId = req.user._id.toString();

    const jobs = await fetchExpiredJobs();
    if (!jobs) {
      return res.status(200).json({ appliedJobs: appliedJobs });
    }

    for (let i = 0; i < jobs.length; i++) {
      const job = jobs[i];
      const analytics = await fetchAnalyticsByJobID("" + job._id);

      if (!analytics) {
        appliedJobs.add({
          id: "" + job._id,
          title: job.title,
          company: job.company,
        });
        continue;
      } else {
        const applied_students = analytics[0].applied_students;
        const studentsList = [];

        for (let j = 0; j < applied_students.length; j++) {
          studentsList.push("" + applied_students[j]);
        }

        let isFound = false;
        for (let student of studentsList) {
          if (student === studentId) {
            isFound = true;
            break;
          }
        }

        if (isFound) {
          appliedJobs.push({
            id: "" + job._id,
            title: job.title,
            company: job.company,
          });
        }
      }
    }

    return res.status(200).json({ appliedJobs: appliedJobs });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
}

export async function getUnappliedJobs(req, res) {
  try {
    const missedJobs = [];
    const studentId = req.user._id.toString();

    const jobs = await fetchExpiredJobs();
    if (!jobs) {
      return res.status(200).json({ missedJobs: missedJobs });
    }

    for (let i = 0; i < jobs.length; i++) {
      const job = jobs[i];
      const analytics = await fetchAnalyticsByJobID("" + job._id);

      if (!analytics) {
        missedJobs.add({
          id: "" + job._id,
          title: job.title,
          company: job.company,
        });
        continue;
      } else {
        const applied_students = analytics[0].applied_students;
        const studentsList = [];

        for (let j = 0; j < applied_students.length; j++) {
          studentsList.push("" + applied_students[j]);
        }

        let isFound = false;
        for (let student of studentsList) {
          if (student === studentId) {
            isFound = true;
            break;
          }
        }

        if (!isFound) {
          missedJobs.push({
            id: "" + job._id,
            title: job.title,
            company: job.company,
          });
        }
      }
    }

    return res.status(200).json({ missedJobs: missedJobs });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
}
