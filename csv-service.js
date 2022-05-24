const os = require("os");
const _ = require("lodash");

const SEPARATOR = ",";

function assertHeadersCompatibility(correctHeaders, userHeaders) {
  if (correctHeaders.length !== userHeaders.length) {
    throw new Error("Passed headers must be the same length as headers in the file.");
  }

  correctHeaders.forEach((correctHeader, index) => {
    if (correctHeader !== userHeaders[index]) {
      throw new Error(`Header ${JSON.stringify(correctHeader)} in CSV file does not match passed header ${JSON.stringify(userHeaders[index])}. CSV file headers: ${correctHeaders.join(SEPARATOR)}.`);
    }
  });
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
    try {
      const parsedRowsData = JSON.parse(rowsData);
      if (_.isPlainObject(parsedRowsData)) {
        parsedRows.push(parsedRowsData);
      } else if (_.isArray(parsedRowsData)) {
        parsedRows.push(...parsedRowsData);
      }
      // eslint-disable-next-line no-empty
    } catch {}
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
  SEPARATOR,
};
