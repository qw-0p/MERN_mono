import express from 'express';
import * as process from 'process';
import cors from 'cors';
import { authRoute, postsRoute } from './routes';
import logger from 'morgan';
import connectDB from './database/config';
import multer from 'multer';
import * as path from 'path';
import * as fs from 'fs';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();

connectDB(process.env.MONGODB_URI);

app.use(cors());
app.use(logger('dev'));
app.use(express.json());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, 'src/static');
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

app.use('/static', express.static(path.join(__dirname, 'src/static')));

app.post('/upload', upload.single('image'), (req, res) => {
  try {
    return res.status(200).json({
      imageURL: `/static/${req.file.filename}`,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send(err);
  }
});
app.use('/posts', postsRoute);
app.use('/auth', authRoute);

app.get('/', (req, res) => {
  res.send({ message: 'Hello API' });
});

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
