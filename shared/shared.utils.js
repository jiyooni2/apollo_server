import AWS from "aws-sdk";

AWS.config.update({
  credentials: {
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET,
  },
});

export const uploadToS3 = async (file, userId, folderName) => {
  const { filename, createReadStream } = await file;
  const readStream = createReadStream();
  const objectName = `${folderName}/${userId}-${Date.now}-${filename}`;
  const { Location } = await new AWS.S3()
    .upload({
      Bucket: "instaclone--upload",
      Key: objectName,
      ACL: "public-read",
      //file (stream), can be blob, stream, binary....
      Body: readStream,
    })
    .promise();

  return Location;
};
