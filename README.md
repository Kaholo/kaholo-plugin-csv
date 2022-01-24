# kaholo-plugin-csv
Kaholo Plugin for creating CSV files.

## Method: Create CSV
This method will create a new CSV file based on your input.

### Parameters:
1) File path (String) **Required** - The file path where you want to create the CSV file.
2) Headers (Text) **Required** - Headers for the CSV file. When adding the headers, separate them with a new line or pass an array of strings in JSON format. The number of headings dictates the number of columns to be created in the CSV file.
3) Values (Text) - Values of the CSV file. When entering the data, separate the values with a new line (only one row), or pass a nested array of strings in JSON format, where each array represents a row in the CSV file.

## Method: Insert Rows into CSV
This method will insert data rows into a CSV file

### Parameters:
1) File path (String) **Required** - The file path where you want to create the CSV file.
2) Headers (Text) **Required** - Headers for the CSV file. When adding the headers, separate them with a new line or pass an array of strings in JSON format. The number of headings dictates the number of columns to be created in the CSV file.
3) Values (Text) **Required**- Values of the CSV file. When entering the data, separate the values with a new line (only one row), or pass a nested array of strings in JSON format, where each array represents a row in the CSV file.
