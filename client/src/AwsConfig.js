import AWS from "aws-sdk";
const accessKeyId = "AKIAVSUNSSF5EAQ2LUQW";
const secretAccessKey = "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";
const BUCKETNAME = "test-krayo";
const REGION = "ap-south-1";

AWS.config.update({
  accessKeyId: accessKeyId,
  secretAccessKey: secretAccessKey,
});

export const myBucket = new AWS.S3({
  params: BUCKETNAME,
  region: REGION,
});
