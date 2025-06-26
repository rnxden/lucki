import "dotenv/config";
import express from "express";
import type { Request, Response } from "express";
import cors from "cors";
import { randomUUID, hash } from "node:crypto";
import Database from "./database.js";

const app = express();
const port = process.env.PORT ?? "3000";
const db = new Database(process.env.DB_FILE);

app.use(cors({ origin: "*" }));

app.get("/api/auth", async (req: Request, res: Response) => {
  const uuid = req.get("Authorization") ?? "";
  const user = db.findUserByUUID(uuid);

  if (!user) {
    res.sendStatus(401);
  } else {
    res.status(200).send(user);
  }
});

app.post("/api/auth", async (req: Request, res: Response) => {
  let uuid = req.get("Authorization") ?? "";
  let user = db.findUserByUUID(uuid);
  if (user) {
    res.status(200).send(user);
    return;
  }

  uuid = randomUUID();
  user = db.createUser(uuid, hash("SHA256", uuid).substring(0, 7));
  res.status(201).send(user);
});

app.get("/api/roll", async (req: Request, res: Response) => {
  const uuid = req.get("Authorization") ?? "";
  const user = db.findUserByUUID(uuid);
  if (!user) {
    res.sendStatus(401);
    return;
  }

  const rolls = db.findRolls(user.id);
  res.status(200).send(rolls);
});

app.post("/api/roll", async (req: Request, res: Response) => {
  const uuid = req.get("Authorization") ?? "";
  const user = db.findUserByUUID(uuid);
  if (!user) {
    res.sendStatus(401);
    return;
  }

  let value = 0;
  for (let i = 0; i < 1000; i++) if (Math.random() >= 0.5) value++;

  const roll = db.createRoll(value, new Date().getTime(), user.id);
  res.status(200).send(roll);
});

app.listen(port, () => console.log(`Server started on port ${port}`));

process.on("exit", () => db.close());
