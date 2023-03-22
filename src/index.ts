import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import ArgParser from './arg-parser';

dotenv.config();

const argp = new ArgParser();
const evt = argp.handleEvent.bind(argp)

const app = express();
const port = process.env.port ?? 9000;


const main = (req: Request, res: Response) => {
  res.send('Visit <a href="https://github.com/jxmked">Jovan\'s Github Account</a>');
};

app.get('/', main);
app.get('/api/:username', evt);
app.get('/api/:username/:styles', evt);

app.get('*', main); // Response to the rest with default homepage

app.listen(port, () => {
  console.log(`Mode: ${process.env.NODE_ENV}`);
  console.log(`Serving ${process.env.MODE === 'offline' ? 'sample' : 'live'} data`);
  console.log(`Running on http://localhost:${port}`);
});
