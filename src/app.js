var fs = require('fs');
var os = require('os');

function _normalizeValue(value){
    return `"${value.replace(new RegExp('"', 'g'), '""')}"`
}

function createCsv(action) {
    return new Promise((resolve, reject) => {
        if (!action.params.headers || !action.params.headers.length)
            return reject("No headers specified");
        if (!action.params.data || !action.params.data.length)
            return reject("No data specified");

        var output = [];
        var headersRow = action.params.headers.map(header=>header.label);
        output.push(headersRow.join());

        action.params.data.forEach(dataRow => {
            let row = [];
            action.params.headers.forEach(header=>{
                row.push(_normalizeValue(dataRow[header.field]));
            })
            output.push(row.join());
        });

        fs.writeFile(action.params.filePath, output.join(os.EOL),function(err){
            if(err) return reject(err);
            
            resolve({success : true, path : action.params.filePath});
        });
    })
}

module.exports = {
    createCsv: createCsv
};