const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const dirAllCodes = path.join(__dirname, "codes");

if (!fs.existsSync(dirAllCodes)) {
  fs.mkdirSync(dirAllCodes, { recursive: true });
}

const dockerExec = (jobId, language) => {
  
  
  const jobPath = path.join(dirAllCodes, `${jobId}`);
//   const jobId = path.basename(filepath).split(".")[0];

  

  
    // child = execSync(
    //   `g++ ${filepath} -o ${outPath} && cd ${outputPath} && ./${jobId}.out`,
    //   { input: userInput, timeout: 7000 }
  console.log("Docker Command running now " + jobPath)
  if(language == "cpp" || language == "c")
  {
    execSync(`docker run --rm -v "${jobPath}:/usr/src/app" --cpus="1" --memory="100m" cppexec`) 
  }else if(language == "java")
  {
    execSync(`docker run --rm -v "${jobPath}:/usr/src/app" --cpus="1" --memory="100m" javaexec`) 
  }
  else if(language == "py")
  {
    execSync(`docker run --rm -v "${jobPath}:/usr/src/app" --cpus="1" --memory="100m" pyexec`) 
  }


  const runTimeError = fs.readFileSync(path.join(jobPath,"runtime_status.txt"), "utf8");
  const compileTimeError = fs.readFileSync(path.join(jobPath,"compile_status.txt"), "utf8");
  const codeOutput = fs.readFileSync(path.join(jobPath,"output.txt"), "utf8");

  let status = "success"
  let output = ""
  


  if(compileTimeError !== "")
  {
    output = compileTimeError
    status = "compileTimeError"
  }
  else if(runTimeError == "Timeout")
  {
    output = runTimeError
    status = "tle"
  }
  else if(runTimeError != "")
  {
    status = "runtimeError"
    output = runTimeError
  } else {
    output = codeOutput
  }
  
  return {
    status: status,
    output: output,
  };
};

module.exports = {
  dockerExec,
};
