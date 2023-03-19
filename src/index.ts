import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import BottomPanel from './routes/bottom';


dotenv.config();

const app = express();
const port = process.env.port ?? 9000;

const bottom = new BottomPanel();

const main = (req: Request, res: Response) => {
  res.send('Visit <a href="https://github.com/jxmked">Jovan\'s Github Account</a>');
};

app.get('/', main);
app.get('/api', main);
app.get('/api/:username', bottom.handle.bind(bottom));
app.get('*', main); // Respond to 404 with the same page

app.listen(port, () => {
  console.log(`Mode: ${process.env.NODE_ENV}`);
  console.log(`Running on http://localhost:${port}`);
});
