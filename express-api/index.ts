import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { checkJwt } from "./middleware/auth";
import bodyParser from 'body-parser';
import AWS from "aws-sdk";

dotenv.config();

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.S3_BUCKET_REGION,
});

const s3 = new AWS.S3();

const params = {
  Bucket: process.env.S3_BUCKET_NAME || '',
  Delimiter: "",
  Prefix: "sharedspace/",
};

const app = express();
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
const port = process.env.PORT || 3000;

app.get('/', (req:any, res) => res.send('Hello World!'));

app.get('/getfiles', checkJwt, (req:any, res) => {
  console.log(req.auth[`${process.env.APP_URL}/roles`]);
  if (req.auth[`${process.env.APP_URL}/roles`].includes('member') || req.auth[`${process.env.APP_URL}/roles`].includes('admin')) {
    s3.listObjectsV2(params, (err, data) => {
      if (err) {
        res.status(400).json(err);
      } else {
        // console.log(data.Contents);
        res.status(200).json(data);
      }
    });
    return
  }
  res.status(401).json({ error: "Not Authorized" })
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));