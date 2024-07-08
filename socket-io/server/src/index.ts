import express, { Express, Request, Response, NextFunction } from 'express';
import { router } from './routes/router';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';

const appid = process.env.APPID || 3000;
// const redisUrl = 'redis://redis:6379';

const app: Express = express();

app.use(cors());
app.use(morgan('short'));
app.use(bodyParser.json());

app.use(router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(appid, () => {
  console.log(`${appid}: Server is running at http://localhost:${appid}`);
});
