const path = require("path");
const kaholoPluginLibrary = require("@kaholo/plugin-library");
const {
  buildCsv,
  assertHeadersCompatibility,
  getCsvFileHeaders,
  buildCsvFromRawCsvRow,
} = require("./csv-service");
const { assertPathExistence, writeToFile } = require("./helpers");

async function createCSV({
  headers,
  data: rows,
  filePath,
}) {
  const directoryPath = path.dirname(filePath);
  await assertPathExistence(directoryPath);

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

async function createCsvFromCsvRow({
  filePath,
  headers,
  rowValues,
}) {
  const directoryPath = path.dirname(filePath);
  await assertPathExistence(directoryPath);

  const csvContent = buildCsvFromRawCsvRow(rowValues, headers);

  return writeToFile(filePath, csvContent);
}

async function insertCsvRow({
  filePath,
  rowValues,
}) {
  await assertPathExistence(filePath);

  const csvFileHeaders = await getCsvFileHeaders(filePath, false);

  const csvContent = buildCsvFromRawCsvRow(rowValues, csvFileHeaders, false);

  return writeToFile(filePath, csvContent, true);
}

module.exports = kaholoPluginLibrary.bootstrap({
  createCSV,
  createCsvFromCsvRow,
  insertRows,
  insertCsvRow,
});
