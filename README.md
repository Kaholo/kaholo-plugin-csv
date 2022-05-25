# Kaholo CSV File Plugin
This plugin provides basic comma-separated variable (CSV) file capability to Kaholo pipelines.

Values are expected to be in well-formed JSON format in order to check against column headings in the file and ensure data integrity. For example, consider this CSV file:

    Date,Location,Temperature,Humidity
    20220525,Bald Mountain,15.5,74.2

To add three new rows to this CSV, the JSON might look something like this:

    [{"Date":"20220526","Location":"Bald Mountain","Temperature":16.2,"Humidity":65.1},{"Temperature":12.9, "Date":"20220527","Location":"Bald Mountain"},{"Location":"Cougar Hollow","Temp":33.1,"Pressure":758}]

The benefit of this JSON format is that all data is matched precisely with the correct field, fields can be omitted or in the wrong order, yet integrity is ensured. The result from this example:

    Date,Location,Temperature,Humidity
    20220525,Bald Mountain,15.5,74.2
    20220526,Bald Mountain,16.2,65.1
    20220527,Bald Mountain,12.9,
    ,Cougar Hollow,,

## Method: Create CSV
This method creates a new CSV file. If there is an existing CSV file at that path, it gets overwritten.

### Parameters:
1) File path (String) **Required** - The file path where you want to create the CSV file. The path must exist even if the file does not.
2) Headers (Text) - Headers for the CSV file. When adding the headers, separate them with a new line or pass an array of strings (could be JSON). The number of headings dictates the number of columns to be created in the CSV file.
3) Values (Text) **Required** - Values of the CSV file. Expects array of objects in format `{ propertyName: value }`, where `propertyName` is column name (one of the headings which were provided in the previous parameter).

## Method: Insert Rows into CSV
This method will insert data rows into a CSV file.

### Parameters:
1) File path (String) **Required** - The file path of the CSV file to insert rows into. The file must already exist.
2) Headers (Text) - Headers for the CSV file. When adding the headers, separate them with a new line or pass an array of strings (could be JSON). Should repeat the initial columns (left to right) which are present in the appending CSV file.
3) Values (Text) **Required**- Values of the CSV file. Expects array of objects in format `{ propertyName: value }`, where `propertyName` is column name (one of the header strings which were provided in the previous parameter).
