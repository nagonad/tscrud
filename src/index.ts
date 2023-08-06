import express from "express";
const app = express();
import cors from "cors";
import { Request, Response, NextFunction } from "express";
import { pool } from "./db";
import routes from "./routes/variants";

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("Hello");
});

app.get("/now", async (req: Request, res: Response) => {
  const response = await pool.query("select now()");
  res.send(response);
});

app.use("/variants", routes);

app.listen(5000, () => {
  console.log("Server is running at port 5000");
});
