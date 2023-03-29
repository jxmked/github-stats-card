import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import ArgParser from './arg-parser';

import sourcemapSupport from 'source-map-support';
sourcemapSupport.install();

dotenv.config();

process.env.NODE_ENV = (process.argv.indexOf('--dev') !== -1 ? 'development' : 'production');
process.env.MODE = (process.argv.indexOf('--offline') !== -1 ? 'offline' : 'live');

const argp = new ArgParser();

const app = express();
const port = process.env.port ?? 9000;

const main = (req: Request, res: Response) => {
  res.send('Visit <a href="https://github.com/jxmked">Jovan\'s Github Account</a>');
};

app.get('/', main);
app.get('/api/:username', argp.handleQueryRequest.bind(argp));
app.get('/api/:username/:design', argp.handleParamRequest.bind(argp));

app.get('*', main); // Response to the rest with default homepage

app.listen(port, () => {
  console.log(`Mode: ${process.env.NODE_ENV}`);
  console.log(`Serving ${process.env.MODE === 'offline' ? 'sample' : 'live'} data`);
  console.log(`Running on http://localhost:${port}`);
});
