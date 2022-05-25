const fs = require("fs");
const { access, appendFile, writeFile } = require("fs/promises");

async function writeToFile(filePath, data, append = false) {
  return (
    append ? appendFile(filePath, data) : writeFile(filePath, data)
  );
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

module.exports = {
  writeToFile,
  assertPathExistence,
};
