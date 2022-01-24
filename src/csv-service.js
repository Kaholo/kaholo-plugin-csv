const fs = require('fs').promises;
const os = require('os');
const { _normalizeValue } = require('./helpers');

module.exports = class CSV {

    static async createFile({ filePath, headers, rowsData }) {
        let columnCount = headers.length;
        let output = [];

        output.push(headers.join());

        // if one row passed, make it a nested array
        if (!Array.isArray(rowsData[0])) rowsData = [rowsData]

        rowsData.forEach(data => {
            let row = []
            for (let i = 0; i < columnCount; i++) {
                row.push(_normalizeValue(data[i]));
            }
            output.push(row.join());
        })

        try {
            await fs.writeFile(filePath, output.join(os.EOL));
            return { success: true, path: filePath };
        } catch (error) {
            throw error
        }
    }

}