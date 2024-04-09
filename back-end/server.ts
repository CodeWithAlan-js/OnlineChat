import express, { Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose, { connect } from 'mongoose';

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

app.get('/', (_, res: Response) => {
  res.send('Hello World!');
});

const MONGO_URI = process.env.MONGO_URI || '';

const PORT = process.env.PORT || 5000;

mongoose.connect(MONGO_URI);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

