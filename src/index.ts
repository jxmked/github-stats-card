import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import { partial } from './routes';
import __sourceMapSupport__ from 'source-map-support';

__sourceMapSupport__.install();

dotenv.config();

const app = express();
const port = process.env.port ?? 9000;

const bottom = new partial.bottom();

const main = (req: Request, res: Response) => {
  console.log(req);
  res.send('Visit <a href="https://github.com/jxmked">Jovan\'s Github Account</a>');
};

app.get('/', main);
app.get('/api', main);
app.get('/api/:username', bottom.handle.bind(bottom));

app.listen(port, () => {
  console.log(`Running on http://localhost:${port}`);
});
