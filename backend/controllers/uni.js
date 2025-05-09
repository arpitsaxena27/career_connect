import {
  createNewJob,
  fetchAllJobs,
  fetchJobById,
  updateJobById,
  deleteJobById,
} from "../services/jobServices.js";

export async function landing(req, res) {
  return res.end("Uni Landing!");
}

export async function getJobs(req, res) {
  const allJobs = await fetchAllJobs();
  if (!allJobs) {
    return res.status(404).json({ message: "No jobs found!" });
  }
  return res.status(200).json(allJobs);
}

export async function getJobByID(req, res) {
  const job = await fetchJobById(req.params.id);
  if (!job) {
    return res.status(404).json({ message: "Job not found!" });
  }
  return res.status(200).json(job);
}

export async function setNewJob(req, res) {
  try {
    const {
      title,
      company,
      skills,
      jobType,
      description,
      responsibilities,
      eligibility,
      salary,
      location,
      deadline,
      applyLink,
      course,
      branch,
      semester,
    } = req.body;

    if (
      !title ||
      !company ||
      !skills ||
      !jobType ||
      !salary ||
      !location ||
      !deadline ||
      !applyLink ||
      !course ||
      !branch ||
      !semester
    ) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const job = await createNewJob({
      title,
      company,
      skills,
      jobType,
      description,
      responsibilities,
      eligibility,
      salary,
      location,
      deadline,
      applyLink,
      course,
      branch,
      semester,
    });

    return res.status(201).json(job);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
}

export async function setJobByID(req, res) {
  try {
    if (!req.params.id) {
      return res.status(400).json({ message: "Job ID is required!" });
    }

    const {
      title,
      company,
      skills,
      jobType,
      description,
      responsibilities,
      eligibility,
      salary,
      location,
      deadline,
      applyLink,
      course,
      branch,
      semester,
    } = req.body;

    if (
      !title ||
      !company ||
      !skills ||
      !jobType ||
      !salary ||
      !location ||
      !deadline ||
      !applyLink ||
      !course ||
      !branch ||
      !semester
    ) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const job = await updateJobById(req.params.id, {
      title,
      company,
      skills,
      jobType,
      description,
      responsibilities,
      eligibility,
      salary,
      location,
      deadline,
      applyLink,
      course,
      branch,
      semester,
    });

    return res.status(201).json(job);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

export async function deleteJob(req, res) {
  try {
    if (!req.params.id) {
      return res.status(400).json({ message: "Job ID is required!" });
    }

    const job = await deleteJobById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: "Job not found!" });
    }

    return res.status(200).json({ message: "Job deleted successfully!" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}
