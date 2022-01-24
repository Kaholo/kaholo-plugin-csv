const CSV = require('./csv-service');
const parsers = require('./parsers');

async function createCSV(action, settings) {
    if (!action.params.filePath || !action.params.filePath.length)
        throw "File path was not specified"
    if (!action.params.headers || !action.params.headers.length)
        throw "Headers were not specified";

    let headers = parsers.array(action.params.headers);
    let rows = parsers.array(action.params.data);
    let filePath = parsers.string(action.params.filePath);

    let result = await CSV.createFile({
        filePath,
        headers,
        rowsData: rows
    })

    return result;
}


async function insertRows(action) {
    if (!action.params.filePath || !action.params.filePath.length)
        throw "File path was not specified"
    if (!action.params.headers || !action.params.headers.length)
        throw "No headers specified";
    if (!action.params.data || !action.params.data.length)
        throw "No data specified";

    let headers = parsers.array(action.params.headers);
    let rows = parsers.array(action.params.data);
    let filePath = parsers.string(action.params.filePath);

    let result = await CSV.insertRows({
        filePath,
        headers,
        rowsData: rows
    })

    return result;
}

module.exports = {
    createCSV,
    insertRows
};