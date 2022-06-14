const fs = require("fs");
const os = require("os");
const {
  access,
  appendFile,
  writeFile,
  readFile,
} = require("fs/promises");

async function writeToFile(filePath, data, append = false) {
  let settledData = data;
  if (append) {
    const fileContent = await readFile(filePath);
    const stringFileContent = fileContent.toString();
    settledData = stringFileContent[stringFileContent.length - 1] === os.EOL ? data : `\n${data}`;
  }

  return append
    ? appendFile(filePath, settledData)
    : writeFile(filePath, settledData);
}

async function assertPathExistence(path) {
  if (!await pathExists(path)) {
    throw new Error(`Path ${path} does not exist on agent!`);
  }
}

async function pathExists(path) {
  try {
    await access(path, fs.constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

function logToActivityLog(message) {
  // TODO: Change console.error to console.info
  // Right now (Kaholo v4.1.2.1) console.info
  // does not print messages to Activity Log
  // Jira ticket: https://kaholo.atlassian.net/browse/KAH-3636
  console.error(message);
}

module.exports = {
  writeToFile,
  assertPathExistence,
  logToActivityLog,
};
