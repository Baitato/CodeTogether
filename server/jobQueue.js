const Queue = require("bull");
const moment = require("moment");
const Job = require("./models/Job");
const path = require("path")
const { dockerExec } = require("./dockerCpp");
const Problem = require("./models/Problem");
const dirAllCodes = path.join(__dirname, "codes");
const fs = require("fs")

function getPathToJobDir(jobId)
{
  const filePath = path.join(dirAllCodes, jobId)
  return filePath
}
function writeTestCasetoInputFile(jobId, text)
{
  const filePath = path.join(dirAllCodes,jobId,"input.txt")
  fs.writeFileSync(filePath,text)
}

const jobQueue = new Queue("job-runner-queue", {
  redis: { host: "127.0.0.1", port: 6380 },
});

jobQueue.process(async function ({data}, done) {
  
  console.log(data)
  console.log("helloo")
  
  const jobId = data.id;
  
  const job = await Job.findById(jobId);

  if (job === undefined) {
    throw Error(`Cannot find job with id ${jobId}`);
  }

  job["startedAt"] = new Date();
  // we need to run the file and send the response
  // if (job.language === "cpp" || job.language === "c")
  //   output = executeCpp(job.filepath, job.userInput);
  // else output = await executePy(job.filepath, job.userInput);

  const result = dockerExec(jobId,job.language);
  
  console.log(result)
  job["completedAt"] = new Date();
  job["status"] = result.status;
  job["output"] = result.output;

  await job.save();

  done()
});

jobQueue.on("failed", (error) => {
  console.error(error.data.id, error.failedReason);
});

const addJobToQueue = async (jobId) => {
  console.log("Adding to queue " + jobId)
  
  await jobQueue.add({  
    id: jobId
  },{
    jobId: Date.now()
  });

};

// For submitting code and check testcase

const submitQueue = new Queue("job-submit-queue", {
  redis: { host: "127.0.0.1", port: 6380 },
});

submitQueue.process(async ({ data },done) => {
  console.log("Inside Submit Queue")
  const jobId = data.id;
  const problemId = data.problemId;
  const job = await Job.findById(jobId);
  const problem = await Problem.findById(problemId);
  
  if (job === undefined || problem === undefined) {
    throw Error(`Invalid job/problem id`);
  }

  const testcases = problem.testcase;

  let output;
  job["startedAt"] = new Date();
  job["userId"] = data.userId;
  job["problemId"] = problemId;

  let passed = true;

  let status = "success"
  for (let i = 0; i < testcases.length; i++) {

    writeTestCasetoInputFile(jobId, testcases[i].input)

    console.log(testcases[i].input)


    const result = dockerExec(jobId, job.language);
    
    const outputActual = result.output
    const outputExpected = testcases[i].output

    console.log(outputActual)
    console.log(outputExpected)
    if (result.status !== "success" || outputActual !== outputExpected) {
  
      if(result.status == "success")
      {
        job.verdict = `WA for testcase ${i + 1}`; 
      }
      else if (result.status == "error")
      {
        job.verdict = `Time limit exceeded in testcase ${i + 1}`;

        const compileStatusFilePath = path.join(getPathToJobDir(jobId),"compile_status.txt")
        const compileError = fs.readFileSync(compileStatusFilePath)
        // const runtimeErrorFilePath = path.join(getPathToJobDir(jobId),"run_status.txt")
        // const runtimeError = fs.readFileSync(runtimeErrorFilePath)
        if(compileError.length != 0)
        {
          job.verdict = "Compilation Error";
        }
        else
        {
          job.verdict = "Runtime Error";
        }
      }
      output = result.output
      status = "error"
      passed = false
      break;
    }
  }
  
  passed && (job["verdict"] = "Accepted");
  
  if (passed) {
    const distinct_user = new Set(problem.whoSolved);
    distinct_user.add(data.userId);
    problem.whoSolved = [...distinct_user];
    await problem.save();
  }

  console.log("Submit Queue Job Finished")
  
  job["completedAt"] = new Date();
  job["status"] = status;
  if(!passed)
  {
    job["output"] = output;
  }
  await job.save();
  done()
});

submitQueue.on("failed", (error) => {
  console.error(error.data.id, error.failedReason);
});

const addSubmitToQueue = async (jobId, problemId, userId) => {
  submitQueue.add({
    id: jobId,
    problemId,
    userId,
  },{
    jobId: Date.now()
  });
};

module.exports = {
  addJobToQueue,
  addSubmitToQueue,
};
