const fs = require('fs');

function _normalizeValue(value) {
    let valueStr = value.toString();
    return `"${valueStr.replace(new RegExp('"', 'g'), '""')}"`
}

/**
* Build output array where each element represents `,` delimeted row, which are ready to write to a file.
* @param {[]} output Output array where all joined rows would be stored.
* @param {[object]} rowsData Rows object/array to be appended.
* @param {[string]} headers Headers array.
*/
function _buildOutput(output, rowsData, headers) {
    if (typeof rowsData === "object" && !Array.isArray(rowsData)) rowsData = [rowsData]

    rowsData.forEach(data => {
        let row = [];
        if (headers && headers.length) {
            headers.forEach(header => {
                row.push(_normalizeValue(data[header]));
            })
        } else {
            for (let item in data) {
                row.push(_normalizeValue(data[item]));
            }
        }

        output.push(row.join());
    });

    return output;
}

/**
* Asynchronous function which writes/appends to a file using Writable Stream.
* @param {string} filePath Absolute path of the file which needs to be written/updated. Created if does not exist.
* @param {string} data Actual data to write/append to a file.
* @param {boolean} append If true, appends the `data` to `filePath`. If false, creates/rewrites the file. Default is `false`.
*/
async function _writeToAFile(filePath, data, append = false) {
    const flag = append ? 'a' : 'w';

    let writableStream = fs.createWriteStream(filePath, { flags: flag });

    let end = new Promise(function (resolve, reject) {
        writableStream.on('error', function (err) { reject(err) });
        writableStream.write(data, () => resolve({ success: true, path: filePath }))
        writableStream.end();
    })

    return await end;
}

module.exports = {
    _buildOutput,
    _writeToAFile
}