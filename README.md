# kaholo-plugin-csv
Kaholo Plugin for creating CSV files.

## Method: Create CSV
This method will create a new CSV file based on your input.

**NOTE: When Headers are not provided, the values are still written but without the headers.**

### Parameters:
1) File path (String) **Required** - The file path where you want to create the CSV file. All directories should be present.
2) Headers (Text) - Headers for the CSV file. When adding the headers, separate them with a new line or pass an array of strings (could be JSON). The number of headings dictates the number of columns to be created in the CSV file.
3) Values (Text) **Required** - Values of the CSV file. Expects array of objects in format `{ propertyName: value }`, where `propertyName` is column name (one of the headings which were provided in the previous parameter).

## Method: Insert Rows into CSV
This method will insert data rows into a CSV file.

**NOTE: When Headers are not provided, the values are still written but without the headers.**

### Parameters:
1) File path (String) **Required** - The file path of the CSV file to insert rows into. All directories should be present.
2) Headers (Text) - Headers for the CSV file. When adding the headers, separate them with a new line or pass an array of strings (could be JSON). Should repeat the initial columns (left to right) which are present in the appending CSV file.
3) Values (Text) **Required**- Values of the CSV file. Expects array of objects in format `{ propertyName: value }`, where `propertyName` is column name (one of the header strings which were provided in the previous parameter).
