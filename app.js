const path = require("path");
const kaholoPluginLibrary = require("@kaholo/plugin-library");
const {
  buildCsvFromJson,
  getCsvHeadersFromFile,
  buildCsvFromRawCsv,
} = require("./csv-service");
const { assertPathExistence, writeToFile } = require("./helpers");

async function createCsvFromJson({
  headers,
  data: rows,
  filePath,
}) {
  const directoryPath = path.dirname(filePath);
  await assertPathExistence(directoryPath);

  const csvContent = buildCsvFromJson(rows, headers);

  return writeToFile(filePath, csvContent);
}

async function insertRowsFromJson({
  data: rows,
  filePath,
  createFile,
}) {
  if (createFile) {
    try {
      await assertPathExistence(filePath);
    } catch {
      const createResult = await createCsvFromJson({
        data: rows,
        filePath,
      });
      return createResult;
    }
  }
  await assertPathExistence(filePath);

  const csvFileHeaders = await getCsvHeadersFromFile(filePath);
  const csvContent = buildCsvFromJson(rows, csvFileHeaders, false);

  return writeToFile(filePath, csvContent, true);
}

async function createCsvFromRawCsv({
  filePath,
  headers,
  rowValues,
}) {
  const directoryPath = path.dirname(filePath);
  await assertPathExistence(directoryPath);

  const csvContent = buildCsvFromRawCsv(rowValues, headers);

  return writeToFile(filePath, csvContent);
}

async function insertRowsFromRawCsv({
  filePath,
  rowValues,
}) {
  await assertPathExistence(filePath);

  const csvFileHeaders = await getCsvHeadersFromFile(filePath, false);
  const csvContent = buildCsvFromRawCsv(rowValues, csvFileHeaders, false);

  return writeToFile(filePath, csvContent, true);
}

module.exports = kaholoPluginLibrary.bootstrap({
  createCSV: createCsvFromJson,
  insertRows: insertRowsFromJson,
  createCsvFromCsvRow: createCsvFromRawCsv,
  insertCsvRow: insertRowsFromRawCsv,
});
