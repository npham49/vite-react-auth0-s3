import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { checkJwt } from "./middleware/auth";
import bodyParser from 'body-parser';
import AWS from "aws-sdk";
import multer from 'multer';
import multerS3 from 'multer-s3';
import { ListObjectsCommand, S3Client } from '@aws-sdk/client-s3';

dotenv.config();

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.S3_BUCKET_REGION,
});



const s3 = new S3Client({
  region: process.env.S3_BUCKET_REGION,
  credentials:{
     accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
     secretAccessKey: process.env.AWS_SECRET_KEY || ''
 }
})



const app = express();
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
const port = process.env.PORT || 3000;

app.get('/files', checkJwt, async (req:any, res) => {
  console.log(req.auth[`${process.env.APP_URL}/roles`]);
  if (req.auth[`${process.env.APP_URL}/roles`].includes('member') || req.auth[`${process.env.APP_URL}/roles`].includes('admin')) {
    const bucketParams = {
      Bucket: process.env.S3_BUCKET_NAME || '',
      Delimiter: "",
      Prefix: `${req.query['folder']}/`,
    };
    try {
      const data = await s3.send(new ListObjectsCommand(bucketParams));
      // console.log("Success", data);
      res.status(200).json(data);
      return // For unit tests.
    } catch (err) {
      // console.log("Error", err);
      res.status(500).json({ error: err });
    }
    return
  }
  res.status(401).json({ error: "Not Authorized" })
});

app.post('/files', checkJwt, (req:any, res) => {
  console.log(req.auth[`${process.env.APP_URL}/roles`]);
  if (req.auth[`${process.env.APP_URL}/roles`].includes('member') || req.auth[`${process.env.APP_URL}/roles`].includes('admin')) {
    // res.status(200).json({ message: "File uploaded successfully!" });
    const path = req.query['folder'];
    const upload = multer({
      storage: multerS3({
        s3: s3,
        bucket: process.env.S3_BUCKET_NAME || '',
        metadata: function (req, file, cb) {
          cb(null, {fieldName: file.fieldname});
        },
        key: function (req, file, cb) {
          let newFileName = file.originalname;
          console.log(file.originalname)
          let fullPath = `${path}/`+ newFileName;
          cb(null, fullPath);
        }
      })
    })
    upload.single('file')(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        console.log(err)
        res.status(500).json({ error: err });
      }
    })
    res.status(200).json({ message: "File uploaded successfully!" });
    return
  }
  res.status(401).json({ error: "Not Authorized" })
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));