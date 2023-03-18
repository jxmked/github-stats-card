import dotenv from 'dotenv';
import Fetcher from './data-fetcher/fetcher';
import express, { Request, Response } from 'express';
import { partial } from './routes';

dotenv.config();

const app = express();
const port = process.env.port ?? 9000;

const bottom = new partial.bottom();

const main = (req: Request, res: Response) => {
  console.log(req);
  res.send('hey');
};

app.get('/', main);
app.get('/api/:username', bottom.handle.bind(bottom));

app.listen(port, () => {
  console.log(`Running on http://localhost:${port}`);
});
