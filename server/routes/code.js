const Job = require("../models/Job");
const router = require("express").Router();
const { addJobToQueue, addSubmitToQueue } = require("../jobQueue");
const { generateFiles } = require("../generateFile");
const verify = require("../middleware/verify");
const fs = require("fs");
const http = require("http");
const path = require("path");
const { v4: uuid } = require("uuid");
// Code Related Route

router.post("/run", async (req, res) => {
  let { language = "cpp", code, userInput } = req.body;
  if(userInput === undefined || !userInput)
    userInput = ""
  if (code === undefined || !code) {
    return res.status(400).json({ success: false, error: "Empty code body!" });
  }

    // console.log(userInput);
    // console.log(language)
    // console.log(code);
    // res.status(200).send("run endpoint")
  let job;
  try {
    // need to generate a c++ file,compile_status,runtime status files
    job = await Job({ language, userInput }).save();
    const jobId = job._id;
    console.log("Run Endpoint")
    console.log(job)
    generateFiles(language, code, userInput, jobId)
    addJobToQueue(jobId);

    res.status(201).json({ sueccess: true, jobId });
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.post("/submit", verify, async (req, res) => {
  let { language = "cpp", code, userInput, problemId, userId } = req.body;
  console.log("submit endpoint")
  if (code === undefined || !code) {
    return res.status(400).json({ success: false, error: "Empty code body!" });
  }

  let job;
  try {
    // need to generate a c++ file with content from the request
    job = await Job({ language }).save();
    const jobId = job["_id"];
    
    generateFiles(language, code, "", jobId)

    addSubmitToQueue(jobId, problemId, userId);

    res.status(201).json({ sueccess: true, jobId });
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.get("/status/:id", async (req, res) => {
  if (!req.params.id) {
    return res.status(400).json("Missing required fields");
  }

  try {
    const job = await Job.findById(req.params.id);

    res.status(200).json({ job, success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error, success: false });
  }
});

// Get All Submission
router.get("/submission/:id", verify, async (req, res) => {
  const userId = req.user._id;
  const problemId = req.params.id;
  if (!userId) return res.status(400).json("Missing required fields.");

  try {
    const submissions = await Job.find({
      userId,
      problemId,
      verdict: { $exists: true },
    }).sort({ submittedAt: -1 });
    res.status(200).json(submissions);
  } catch (error) {
    return res.status(500).json(error);
  }
});

// Download Submission

router.get("/download/:id", async (req, res) => {
  const id = req.params.id;

  if (!id) return res.status(400).json("Missing required fields");

  try {
    const job = await Job.findById(id);
    if (!job) {
      return res.status(400).json("File not found");
    }
    res.download(job.filepath);
  } catch (error) {
    return res.status(500).json(error);
  }
});

module.exports = router;
