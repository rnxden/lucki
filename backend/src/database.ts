import sqlite3, { type Statement, type Database } from "better-sqlite3";

interface User {
  id: number;
  uuid: string;
  name: string;
}

interface Roll {
  id: number;
  value: number;
  timestamp: number;
  user_id: number;
}

let db: Database;
let findUserByUUIDStmt: Statement;
let createUserWithUUIDStmt: Statement;
let createRollForUserStmt: Statement;
let getRollsByUserStmt: Statement;

export function initDatabase() {
  db = sqlite3(process.env.DB_FILE);

  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY,
      uuid TEXT NOT NULL UNIQUE,
      name TEXT NOT NULL
    );

    CREATE UNIQUE INDEX IF NOT EXISTS idx_users_uuid
    ON users(uuid);
  `);

  db.exec(`
    CREATE TABLE IF NOT EXISTS rolls (
      id INTEGER PRIMARY KEY,
      value INTEGER NOT NULL,
      timestamp INTEGER NOT NULL,
      user_id INTEGER NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id)
    );
  `);

  findUserByUUIDStmt = db.prepare("SELECT * FROM users WHERE uuid = ?");
  createUserWithUUIDStmt = db.prepare("INSERT INTO users(uuid, name) VALUES (?, ?) RETURNING *");
  createRollForUserStmt = db.prepare("INSERT INTO rolls(value, timestamp, user_id) VALUES (?, ?, ?) RETURNING *");
  getRollsByUserStmt = db.prepare("SELECT * FROM rolls WHERE user_id = ?");

  process.on("exit", () => db.close());
}

export function findUserByUUID(uuid: string): User {
  return findUserByUUIDStmt.get(uuid) as User;
}

export function createUserWithUUID(uuid: string): User {
  return createUserWithUUIDStmt.get(uuid, "test") as User;
}

export function createRollForUser(id: number): Roll {
  return createRollForUserStmt.get(500, new Date().getTime(), id) as Roll;
}

export function getRollsByUser(id: number): Roll[] {
  return getRollsByUserStmt.all(id) as Roll[];
}
