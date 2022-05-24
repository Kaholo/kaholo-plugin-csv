const { readFile } = require("fs/promises");
const path = require("path");
const os = require("os");
const kaholoPluginLibrary = require("kaholo-plugin-library");
const { buildCsv, SEPARATOR, assertHeadersCompatibility } = require("./csv-service");
const { assertPathExistence, writeToFile } = require("./helpers");

async function createCSV({
  headers,
  data: rows,
  filePath,
}) {
  const directoryName = path.dirname(filePath);
  await assertPathExistence(directoryName);

  const csvContent = buildCsv(rows, headers);

  return writeToFile(filePath, csvContent);
}

async function insertRows({
  headers,
  data: rows,
  filePath,
}) {
  await assertPathExistence(filePath);

  const csvFileContent = await readFile(filePath);
  const csvFileHeaders = csvFileContent
    .toString()
    .split(os.EOL)
    .shift()
    .split(SEPARATOR);
  assertHeadersCompatibility(csvFileHeaders, headers);

  const csvContent = buildCsv(rows, headers, false);

  return writeToFile(filePath, csvContent, true);
}

module.exports = kaholoPluginLibrary.bootstrap({
  createCSV,
  insertRows,
});
