# kaholo-plugin-csv
Kaholo Plugin for creating CSV files.

## Method: Create CSV
This method will create a new CSV file based on your input.
NOTE: When Headers are not provided, the values are still written but without the headers.

### Parameters:
1) File path (String) **Required** - The file path where you want to create the CSV file.
2) Headers (Text) - Headers for the CSV file. When adding the headers, separate them with a new line or pass an array of strings(could be JSON). The number of headings dictates the number of columns to be created in the CSV file.
3) Values (Text) **Required** - Values of the CSV file. Expects array of objects in format `{ propertyName: value }`, where `propertyName` is column name(one of headngs which were provided in the previous param).

## Method: Insert Rows into CSV
This method will insert data rows into a CSV file. NOTE: When Headers are not provided, the values are still written but without the headers.

### Parameters:
1) File path (String) **Required** - The file path where you want to create the CSV file.
2) Headers (Text) - Headers for the CSV file. Separate the headers with new line, or pass an array of strings(could be JSON). Should repeat the initial columns(left to right) which are present in the appending CSV file.
3) Values (Text) **Required**- Values of the CSV file. Expects array of objects in format `{ propertyName: value }`, where `propertyName` is column name(one of header strings which were provided in the previous param).
