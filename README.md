# Kaholo CSV File Plugin #
This plugin provides basic comma-separated variable (CSV) file capability to Kaholo pipelines. Both CSV and JSON inputs are supported.

For example the CSV methods work with inputs like this:

Headers:

    Date,Location,Temperature,Humidity

Rows Values: 

    20220525,Bald Mountain,16.2,65.1
    20220527,Bald Mountain,12.9,
    ,Cougar Hollow,,

And the equivalent Rows using the JSON methods might be:

Headers:

    ["Date","Location","Temperature","Humidity"]

Rows Values:

    [{"Date":"20220526","Location":"Bald Mountain","Temperature":16.2,"Humidity":65.1},{"Temperature":12.9, "Date":"20220527","Location":"Bald Mountain"},{"Location":"Cougar Hollow","Temp":33.1,"Pressure":758}]

The benefit of this JSON format is that all data is matched precisely with the correct field, fields can be omitted or in the wrong order, yet integrity is ensured - they are included only if and where they match the header.

Also, if the header is excluded the JSON method can extract the headers from the first object in the array passed.

If using the normal CSV methods (not JSON), then the headers are not optional and the data must match the headers in order to be correctly inserted as rows in the CSV.

## Method: Create CSV (JSON) ##
This method creates a new CSV file from a JSON object.

### Parameter: File Path ###
The path to a file on the Kaholo Agent. If a file already exists at this path, it will be overwritten.

### Parameter: Headers ###
Headers are a list of optional one-per-line of the fields in the CSV file. If omitted the headers will be taken from the first JSON object in the Values parameter.

With JSON, headers act to filter, validate, and reorder data. For example if the data contains many fields but only "name" and "job" are needed in the CSV file, the headers parameter could be like so:

    name
    job

The resulting csv will then contain only those two fields...

    name,job
    Joe,pilot
    Mary,welder
    Barry,nurse

If using the code layer the header should be an array of strings, for example

    ["name", "job"]

### Parameter: Values ###

Values must be provided in JSON format, for example:

    [{"name": "Joe", "age": 25, "job": "pilot"}, {"name": "Mary", "birthyear": 1995, "job": "welder"}, {"name": "Barry", "age": 54, "job": "nurse"}]

The values don't have to be in any particular order but will be validated with the headers. If no headers are provided then the first object will be used to create headers. In this example the headers would be:

    ["name", "age", "job"]

## Method: Insert Rows (JSON) ##
This works very similarly to Create CSV (JSON), with a few important differences:
* Create File is available but by default it will only add to an existing file
* The existing file must have a headers row
* You cannot specify headers other than those already in the first line of the CSV
* If using the "Create File" feature, the headers are taken from the first object of the Values parameter

## Method: Create CSV (CSV) ##
This method creates a CSV file from CSV input. 

### Parameter: File Path ###
The path to a file on the Kaholo Agent. If a file already exists at this path, it will be overwritten.

### Parameter: Headers ###
The header rows may be provided as CSV or one per line. The headers are required and determine how many fields the CSV may have. Data rows with more data than fits in the fields described by the headers will result in error.

### Parameter: Row Values ###
Here enter one-per-line CSV data rows. For example,

    Alex, 65, plumber, green
    Sally, 24, dentist, blue

In this case there are four values per row so the header of the CSV file must include at least four fields as well to accommodate this data.

## Method: Insert Rows (CSV) ##
This method adds rows to a CSV file using CSV input.

### Parameter: File Path ###
The path to a file on the Kaholo Agent. This file must already exist.

### Parameter: Row Values ###
Here enter one-per-line CSV data rows. For example,

    Alex, 65, plumber, green
    Sally, 24, dentist, blue

In this case there are four values per row so the header of the CSV file must include at least four fields as well to accommodate this data.