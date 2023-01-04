import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { checkJwt } from "./middleware/auth";
import bodyParser from 'body-parser';


dotenv.config();
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
    res.status(200).json({ files: ["file1", "file2"] });
    return
  }
  res.status(401).json({ error: "Not Authorized" })
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));