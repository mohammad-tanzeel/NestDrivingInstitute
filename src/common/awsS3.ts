import * as AWS from 'aws-sdk';
import fileUpload from 'express-fileupload';


// s3 config
const s3 = new AWS.S3({
  region: 'ap-south-1',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID, // your AWS access id
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY // your AWS access key
});

export async function uploadFile(
  file: fileUpload.UploadedFile,
  destFolder = 'csvfiles',
) {

   const params: AWS.S3.PutObjectRequest = {
    Bucket: process.env.AWS_BUCKET,
    Key: `${destFolder}/${Date.now()}_${file[0].originalname}`,
    Body: file[0].buffer
  };
  
  const options: AWS.S3.ManagedUpload.ManagedUploadOptions = {
    partSize: 10 * 1024 * 1024,
    // how many concurrent uploads
    queueSize: 5
  };
  
  const data = await s3.upload(params, options).promise();
  return data.Location; // returns the url location
}

/**
 * @expireIn in second
 */
export async function getFile(fileLocation: string, option : {isPrivate: boolean, expireIn: number } ): Promise<string> {
  if (!fileLocation) return '';
  if (!option.isPrivate) return fileLocation;
  const indexVariable = 'amazonaws.com'
  const pathIndex = fileLocation.indexOf(indexVariable);
  fileLocation = fileLocation.slice(pathIndex+indexVariable.length)
  const s3Params = {
    Bucket: process.env.AWS_PRIVATE_BUCKET,
    Key: fileLocation,
    Expires: option.expireIn
  };
  return  s3.getSignedUrlPromise('getObject', s3Params);
}
