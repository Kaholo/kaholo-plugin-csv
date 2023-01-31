const os = require("os");
const _ = require("lodash");
const { readFile } = require("fs/promises");
const { logToActivityLog } = require("./helpers");

const SEPARATOR = ",";

function buildCsvFromRawCsv(rawRowValues, rawHeaders = "", includeHeaders = true) {
  const outputCsvRows = [];
  const parsedCsvRows = parseCsvInput(rawRowValues, true);
  const parsedCsvHeaders = rawHeaders ? parseCsvInput(rawHeaders) : [];

  if (rawHeaders && includeHeaders) {
    outputCsvRows.push(parsedCsvHeaders.join(SEPARATOR));
  }
  parsedCsvRows.forEach((csvRow, index) => {
    const lineNumber = index + 1;
    const isRowEmpty = _.isEqual(csvRow, [""]);

    const settledCsvRow = (
      isRowEmpty ? new Array(parsedCsvHeaders.length) : csvRow
    );
    if (isRowEmpty) {
      logToActivityLog(`INFO: Detected empty line (#${lineNumber}), interpreting it as an empty row.`);
    }

    if (parsedCsvHeaders.length && settledCsvRow.length !== parsedCsvHeaders.length) {
      throw new Error(`Invalid length of row values at line #${lineNumber}.\nCSV headers: ${parsedCsvHeaders.join(SEPARATOR)}\nLine #${lineNumber}: ${csvRow.join(SEPARATOR)}`);
    }

    outputCsvRows.push(settledCsvRow.join(SEPARATOR));
  });

  return outputCsvRows.join(os.EOL);
}

function buildCsvFromJson(rowsData, headers = [], includeHeaders = true) {
  const csvOutputRows = [];
  const rowsArray = parseJsonCsvRows(rowsData);

  if (includeHeaders) {
    if (headers.length > 0) {
      csvOutputRows.push(headers.join(SEPARATOR));
    } else {
      csvOutputRows.push(Object.keys(rowsArray[0]).join(SEPARATOR));
    }
  }

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

function parseCsvInput(rawInput, multiline = false) {
  const splitCsvInput = rawInput
    .split(multiline ? "\n" : new RegExp(`(?:${SEPARATOR}?\\s*\n|${SEPARATOR})`))
    .map((csvValue) => csvValue.trim());

  const separatorRegex = new RegExp(`${SEPARATOR} ?`);
  return multiline ? splitCsvInput.map((line) => line.split(separatorRegex)) : splitCsvInput;
}

function parseJsonCsvRows(rowsData) {
  const parsedRows = [];

  if (!_.isArray(rowsData) && !_.isPlainObject(rowsData)) {
    throw new Error("Values format is invalid. Supported formats: array, object.");
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

async function getCsvHeadersFromFile(filePath, split = true) {
  const csvFileContent = await readFile(filePath);
  const headersRow = csvFileContent
    .toString()
    .split(os.EOL)
    .shift();
  return split ? headersRow.split(SEPARATOR) : headersRow;
}

module.exports = {
  buildCsvFromJson,
  buildCsvFromRawCsv,
  getCsvHeadersFromFile,
};
