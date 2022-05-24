const path = require("path");
const kaholoPluginLibrary = require("kaholo-plugin-library");
const { buildCsv, assertHeadersCompatibility, getCsvFileHeaders } = require("./csv-service");
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

  const csvFileHeaders = await getCsvFileHeaders(filePath);
  assertHeadersCompatibility(csvFileHeaders, headers);

  const csvContent = buildCsv(rows, headers, false);

  return writeToFile(filePath, csvContent, true);
}

module.exports = kaholoPluginLibrary.bootstrap({
  createCSV,
  insertRows,
});
