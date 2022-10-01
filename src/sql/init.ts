import base from "@/sql/db.config";
import { EventEmitter } from "events";

type EventMap = {
  callback: () => void;
  ping: () => void;
  checkDB: (db: string) => void;
  createDB: (db: string) => void;
  useDB: (db: string) => void;
  checkTBs: () => void;
  createTB: (tb: string) => void;
};

/**
 * Use event emitter to avoid callback hell\
 * Test mysql connection, check database existence and create it if not, use the database
 */
class InitDB extends EventEmitter {
  head = "initDB";
  constructor(callback: () => void) {
    super();
    this.once("callback", callback);
    this.autoBindOnce();
    this.emit("ping");
  }

  private autoBindOnce() {
    const head = this.head;
    this.once("ping", () => {
      base.ping((err) => {
        if (err) throw err.message;
        console.debug(`${head}->Mysql connection success`);
        this.emit("checkDB", "shared_server");
      });
    });
    this.once("checkDB", (db: string) => {
      base.query("SHOW DATABASES", (err, res: { Database: string }[]) => {
        if (err) throw err.sqlMessage;
        let dbs = res.map((v) => v.Database);
        if (dbs.includes(db)) return this.emit("useDB", db);
        console.debug(`${head}->Database ${db} not exists`);
        this.emit("createDB", db);
      });
    });
    this.once("createDB", (db: string) => {
      base.query(`CREATE DATABASE ${db}`, (err) => {
        if (err) throw err.sqlMessage;
        console.debug(`${head}->Database ${db} created`);
        this.emit("useDB", db);
      });
    });
    this.once("useDB", (db: string) => {
      base.query(`USE ${db}`, (err) => {
        if (err) throw err.sqlMessage;
        console.debug(`${head}->Use ${db}`);
        this.emit("checkTBs");
      });
    });
    this.once("checkTBs", () => {
      base.query(`SHOW TABLES`, (err, res: {}[]) => {
        if (err) throw err.sqlMessage;
        const tbs = res.map((v) => Object.values(v)[0]);
        console.debug(tbs);
        this.emit("callback");
      });
    });
  }

  emit<T extends keyof EventMap>(
    eventName: T,
    ...args: Parameters<EventMap[T]>
  ): boolean {
    return super.emit(eventName, ...args);
  }

  on<T extends keyof EventMap>(eventName: T, listener: EventMap[T]): this {
    return super.on(eventName, listener);
  }

  once<T extends keyof EventMap>(eventName: T, listener: EventMap[T]): this {
    return super.on(eventName, listener);
  }
}

export default InitDB;
