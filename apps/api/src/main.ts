import express from 'express';
import mongoose from 'mongoose';
import * as process from "process";
import cors from 'cors'
import postsRoute from "./routes/postsRoute";

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('DB OK')
  })
  .catch((err) => console.log('DB error', err))

const app = express();

app.use(cors())
app.use(express.json())

app.use('/posts', postsRoute)

app.get('/', (req, res) => {
  res.send({ message: 'Hello API' });
});

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
