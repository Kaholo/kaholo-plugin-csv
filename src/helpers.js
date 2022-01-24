function _normalizeValue(value) {
    return `"${value.replace(new RegExp('"', 'g'), '""')}"`
}

function _buildOutput(output, rowsData, columnCount) {

    // if one row passed, make it a nested array
    if (!Array.isArray(rowsData[0])) rowsData = [rowsData]

    rowsData.forEach(data => {
        let row = []
        for (let i = 0; i < columnCount; i++) {
            row.push(_normalizeValue(data[i]));
        }
        output.push(row.join());
    });
    return output;
}

module.exports = {
    _buildOutput
}