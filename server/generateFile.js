const fs = require("fs");
const path = require("path");
const { v4: uuid } = require("uuid");

const dirAllCodes = path.join(__dirname, "codes");

if (!fs.existsSync(dirAllCodes)) {
  fs.mkdirSync(dirAllCodes, { recursive: true });
}

const generateFiles = async (format, content, input, jobId) => {
  
  
  const dirJobIdPath = path.join(dirAllCodes,jobId.toString())
  
  const filename = `Main.${format}`;
  
  const codePath = path.join(dirJobIdPath, filename);
  const outputPath = path.join(dirJobIdPath, "output.txt");
  const runtimePath = path.join(dirJobIdPath, "run_status.txt");
  const compileStatusPath = path.join(dirJobIdPath, "compile_status.txt");
  const inputPath = path.join(dirJobIdPath, "input.txt");

  fs.mkdirSync(dirJobIdPath)
  fs.writeFileSync(codePath, content);
  fs.writeFileSync(runtimePath, "");
  fs.writeFileSync(outputPath, "");
  fs.writeFileSync(compileStatusPath, "");
  fs.writeFileSync(inputPath, input);

  // return jobId;
};

module.exports = {
  generateFiles,
};
