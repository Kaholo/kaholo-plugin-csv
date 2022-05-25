const os = require("os");
const _ = require("lodash");
const { readFile } = require("fs/promises");

const SEPARATOR = ",";

function assertHeadersCompatibility(fileHeaders, userHeaders) {
  if (fileHeaders.length !== userHeaders.length) {
    throw new Error("Passed headers must be the same length as headers in the file.");
  }

  fileHeaders.forEach((correctHeader, index) => {
    if (correctHeader !== userHeaders[index]) {
      throw new Error(`Header ${JSON.stringify(correctHeader)} in CSV file does not match passed header ${JSON.stringify(userHeaders[index])}. CSV file headers: ${fileHeaders.join(SEPARATOR)}.`);
    }
  });
}

async function getCsvFileHeaders(filePath) {
  const csvFileContent = await readFile(filePath);
  return csvFileContent
    .toString()
    .split(os.EOL)
    .shift()
    .split(SEPARATOR);
}

function buildCsv(rowsData, headers = [], includeHeaders = true) {
  const csvOutputRows = [];

  if (headers.length > 0 && includeHeaders) {
    csvOutputRows.push(headers.join(SEPARATOR));
  }

  const rowsArray = parseRowsData(rowsData);

  rowsArray.forEach((row) => {
    let rowText = "";

    if (headers.length > 0) {
      rowText = headers.map((headerName) => row[headerName] ?? "").join(SEPARATOR);
    } else {
      rowText = Object.values(row).join(SEPARATOR);
    }

    csvOutputRows.push(rowText);
  });

  return csvOutputRows.join(os.EOL) + os.EOL;
}

function parseRowsData(rowsData) {
  const parsedRows = [];

  if (!_.isString(rowsData) && !_.isArray(rowsData) && !_.isPlainObject(rowsData)) {
    throw new Error("Values format is invalid. Supported formats: string, array, object.");
  }

  if (_.isString(rowsData)) {
    let parsedRowsData;

    try {
      parsedRowsData = JSON.parse(rowsData);
      // eslint-disable-next-line no-empty
    } catch {}

    if (_.isPlainObject(parsedRowsData)) {
      parsedRows.push(parsedRowsData);
    } else if (_.isArray(parsedRowsData)) {
      parsedRows.push(...parsedRowsData);
    }
  }

  if (_.isPlainObject(rowsData)) {
    parsedRows.push(rowsData);
  }

  if (_.isArray(rowsData)) {
    parsedRows.push(...rowsData);
  }

  parsedRows.forEach((row) => {
    if (!_.isPlainObject(row)) {
      throw new Error(`Row ${JSON.stringify(row)} is not a valid JSON object.`);
    }
  });

  return parsedRows;
}

module.exports = {
  buildCsv,
  assertHeadersCompatibility,
  getCsvFileHeaders,
};
