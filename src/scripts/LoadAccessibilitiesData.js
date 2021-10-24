var AWS = require("aws-sdk");
var fs = require('fs');

AWS.config.update({
  region: "us-east-1"
});

console.log("Writing entries to Accessibilities table.");

var dynamodb = new AWS.DynamoDB.DocumentClient();
var accessibilitiesData = 
  JSON.parse(fs.readFileSync('../components/data/accessibility.json', 'utf8'));

accessibilitiesData.forEach(function(accessibility) {
  var params = {
    TableName: "AccessibilityTable",
    Item: {
      "access": accessibility.access
    }
  };

  dynamodb.put(params, function(err, data) {
    if (err)
      console.error("Unable to load data into table for accessibility",
                    accessibility.access, ". Error: ", JSON.stringify(err, null, 2))
    else
      console.log("Added", accessibility.access, "to table.")
  })
});