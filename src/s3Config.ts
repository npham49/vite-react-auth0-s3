export const s3Config = {
  bucketName:  import.meta.env.VITE_S3_BUCKET_NAME,
  region: import.meta.env.VITE_S3_BUCKET_REGION,
  accessKeyId:import.meta.env.VITE_AWS_ACCESS_KEY_ID,
  secretAccessKey: import.meta.env.VITE_AWS_SECRET_KEY,
}