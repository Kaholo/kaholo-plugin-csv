const os = require('os');
const { _buildOutput, _writeToAFile } = require('./helpers');

module.exports = class CSV {

    static async createFile({ filePath, headers, rowsData }) {
        let output = [];

        output.push(headers.join());

        _buildOutput(output, rowsData, headers);

        try {
            let result = await _writeToAFile(filePath, output.join(os.EOL) + os.EOL);
            return result
        } catch (error) {
            throw error
        }
    }

    static async insertRows({ filePath, headers, rowsData }) {
        let output = [];

        _buildOutput(output, rowsData, headers);

        try {
            let result = await _writeToAFile(filePath, output.join(os.EOL) + os.EOL, true);
            return result
        } catch (error) {
            throw error
        }
    }

}