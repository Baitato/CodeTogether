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
    try{  
      execSync(`docker run --rm -v "${jobPath}:/usr/src/app" --cpus="1" --memory="100m" cppexec`) 
    }catch(err)
    {

    }
  }else if(language == "java")
  {
    try{  
    execSync(`docker run --rm -v "${jobPath}:/usr/src/app" --cpus="1" --memory="100m" javaexec`) 
    }
    catch(err)
    {

    }
  }
  else if(language == "py")
  {
    try{
      execSync(`docker run --rm -v "${jobPath}:/usr/src/app" --cpus="1" --memory="100m" pyexec`) 
    }
    catch(err)
    {
    }
  }

  console.log("Docker executed")

  const runTimeError = fs.readFileSync(path.join(jobPath,"run_status.txt"), "utf8");
  const compileTimeError = fs.readFileSync(path.join(jobPath,"compile_status.txt"), "utf8");
  const codeOutput = fs.readFileSync(path.join(jobPath,"output.txt"), "utf8");

  let status = "success"
  let output = ""
  


  if(compileTimeError !== "")
  {
    output = compileTimeError
    status = "error"
  }
  else if(runTimeError == "Timeout")
  {
    output = runTimeError
    status = "error"
  }
  else if(runTimeError != "")
  {
    output = runTimeError
    status = "error"
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
