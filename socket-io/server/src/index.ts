import express, { Express, Request, Response, NextFunction } from "express";
import { router } from "./routes/router";
import cors from 'cors'
import morgan from 'morgan'
import bodyParser from "body-parser";

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors())
app.use(morgan('short'))
app.use(bodyParser.json())

app.use(router)


app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});