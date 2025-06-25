import Sqlite3 from "better-sqlite3";
import type { Statement, Database as Sqlite3Database } from "better-sqlite3";

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

export default class Database {
  private db: Sqlite3Database;

  private findUserByIDStmt: Statement;
  private findUserByUUIDStmt: Statement;
  private findRollsStmt: Statement;
  private createUserStmt: Statement;
  private createRollStmt: Statement;

  constructor(path: string) {
    this.db = new Sqlite3(path);
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY,
        uuid TEXT NOT NULL UNIQUE,
        name TEXT NOT NULL
      );

      CREATE UNIQUE INDEX IF NOT EXISTS idx_users_uuid ON users (uuid);

      CREATE TABLE IF NOT EXISTS rolls (
        id INTEGER PRIMARY KEY,
        value INTEGER NOT NULL,
        timestamp INTEGER NOT NULL,
        user_id INTEGER NOT NULL REFERENCES users (id)
      );
    `);

    this.findUserByIDStmt = this.db.prepare("SELECT * FROM users WHERE id = ?");
    this.findUserByUUIDStmt = this.db.prepare("SELECT * FROM users WHERE uuid = ?");
    this.findRollsStmt = this.db.prepare("SELECT * FROM rolls WHERE user_id = ?");
    this.createUserStmt = this.db.prepare("INSERT INTO users (uuid, name) VALUES (?, ?) RETURNING *");
    this.createRollStmt = this.db.prepare("INSERT INTO rolls (value, timestamp, user_id) VALUES (?, ?, ?) RETURNING *");
  }

  close() {
    this.db.close();
  }

  findUserByID(id: number): User | null {
    return this.findUserByIDStmt.get(id) as User | null;
  }

  findUserByUUID(uuid: string): User | null {
    return this.findUserByUUIDStmt.get(uuid) as User | null;
  }

  findRolls(userId: number): Roll[] {
    return (this.findRollsStmt.all(userId) ?? []) as Roll[];
  }

  createUser(uuid: string, name: string): User {
    return this.createUserStmt.get(uuid, name) as User;
  }

  createRoll(value: number, timestamp: number, userId: number): Roll {
    return this.createRollStmt.get(value, timestamp, userId) as Roll;
  }
}
