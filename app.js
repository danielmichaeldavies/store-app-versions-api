import express from 'express';
import * as dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send(`Hello my jubblies! ${process.env.API_KEY}`);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
