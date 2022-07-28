const AWS = require("aws-sdk");
AWS.config.update({
  region: "ap-south-1",
  accessKeyId: "AKIAVSUNSSF5JQYLNLMO",
  secretAccessKey: "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",
});

let s3 = new AWS.S3();
module.exports = s3;
