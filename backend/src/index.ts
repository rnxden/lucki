import "dotenv/config";
import express, { type Request, type Response } from "express";
import cookieParser from "cookie-parser";
import { randomUUID } from "crypto";
import { createRollForUser, createUserWithUUID, findUserByUUID, getRollsByUser, initDatabase } from "./database.js";

initDatabase();

const app = express();
const port = process.env.PORT ?? "3000";

app.use(cookieParser());

app.get("/api/auth", async (req: Request, res: Response) => {
  const uuid = req.cookies.uuid;
  const user = findUserByUUID(uuid);

  if (!user) {
    res.sendStatus(401);
  } else {
    res.status(200).send(user);
  }
});

app.post("/api/auth", async (req: Request, res: Response) => {
  let uuid = req.cookies.uuid;
  let user = findUserByUUID(uuid);
  if (user) {
    res.status(200).send(user);
    return;
  }

  uuid = randomUUID();
  user = createUserWithUUID(uuid);
  res.status(201).send(user);
});

app.get("/api/roll", async (req: Request, res: Response) => {
  const uuid = req.cookies.uuid;
  const user = findUserByUUID(uuid);
  if (!user) {
    res.sendStatus(401);
    return;
  }

  const rolls = getRollsByUser(user.id);
  res.status(200).send(rolls);
});

app.post("/api/roll", async (req: Request, res: Response) => {
  const uuid = req.cookies.uuid;
  const user = findUserByUUID(uuid);
  if (!user) {
    res.sendStatus(401);
    return;
  }

  const roll = createRollForUser(user.id);
  res.status(200).send(roll);
});

app.listen(port, () => console.log(`Server started on port ${port}`));
