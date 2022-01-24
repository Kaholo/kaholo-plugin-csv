const fs = require('fs').promises;
const os = require('os');
const { _buildOutput } = require('./helpers');

module.exports = class CSV {

    static async createFile({ filePath, headers, rowsData }) {
        let output = [];

        output.push(headers.join());

        _buildOutput(output, rowsData, headers.length);

        try {
            await fs.writeFile(filePath, output.join(os.EOL));
            return { success: true, path: filePath, headers };
        } catch (error) {
            throw error
        }
    }

    static async insertRows({ filePath, headers, rowsData }) {
        let output = [];

        _buildOutput(output, rowsData, headers.length);

        try {
            const writer = fs.createWriteStream(filePath, {
                flags: 'a'
            });

            writer.write(output.join(os.EOL));

            writer.close();

            return { success: true, path: filePath, headers };
        } catch (error) {
            throw error
        }
    }

}