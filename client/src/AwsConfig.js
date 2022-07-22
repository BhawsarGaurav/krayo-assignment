import AWS from "aws-sdk";
const ACCESSKEYID = "AKIAVSUNSSF5HCT25RUS";
const SECRETACCESSKEY = "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";
const BUCKETNAME = "test-krayo";
const REGION = "ap-south-1";

AWS.config.update({
  accessKeyId: ACCESSKEYID,
  secretAccessKey: SECRETACCESSKEY,
});

export const myBucket = new AWS.S3({
  params: BUCKETNAME,
  region: REGION,
});
