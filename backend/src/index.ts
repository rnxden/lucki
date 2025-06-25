import "dotenv/config";
import express from "express";
import type { Request, Response } from "express";
import cookieParser from "cookie-parser";
import { randomUUID } from "crypto";
import Database from "./database.js";

const app = express();
const port = process.env.PORT ?? "3000";
const db = new Database(process.env.DB_FILE);

app.use(cookieParser());

app.get("/api/auth", async (req: Request, res: Response) => {
  const uuid = req.cookies.uuid;
  const user = db.findUserByUUID(uuid);

  if (!user) {
    res.sendStatus(401);
  } else {
    res.status(200).send(user);
  }
});

app.post("/api/auth", async (req: Request, res: Response) => {
  let uuid = req.cookies.uuid;
  let user = db.findUserByUUID(uuid);
  if (user) {
    res.status(200).send(user);
    return;
  }

  uuid = randomUUID();
  user = db.createUser(uuid, "test");
  res.status(201).send(user);
});

app.get("/api/roll", async (req: Request, res: Response) => {
  const uuid = req.cookies.uuid;
  const user = db.findUserByUUID(uuid);
  if (!user) {
    res.sendStatus(401);
    return;
  }

  const rolls = db.findRolls(user.id);
  res.status(200).send(rolls);
});

app.post("/api/roll", async (req: Request, res: Response) => {
  const uuid = req.cookies.uuid;
  const user = db.findUserByUUID(uuid);
  if (!user) {
    res.sendStatus(401);
    return;
  }

  const roll = db.createRoll(500, new Date().getTime(), user.id);
  res.status(200).send(roll);
});

app.listen(port, () => console.log(`Server started on port ${port}`));
