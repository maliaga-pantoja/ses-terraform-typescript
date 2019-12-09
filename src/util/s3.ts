import * as AWS from 'aws-sdk'

const S3 = new AWS.S3({
  accessKeyId: '',
  secretAccessKey: ''
})

async function GetObject (options: {bucket: string, key: string}) : Promise<AWS.S3.GetObjectOutput> {
  try {
    const q = {
      Bucket: options.bucket,
      Key: options.key,
    }
    return new Promise((resolve, reject) => {
      S3.getObject(q, (s3Error, s3Ok: AWS.S3.GetObjectOutput) => {
        if(s3Error) {
          reject(s3Error)
        } else {
          resolve(s3Ok)
        }
      })
    })
  } catch (e) {
    throw e;
  }
}

export default GetObject