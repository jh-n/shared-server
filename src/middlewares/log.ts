import { Router, Express } from "express";
import { existsSync, statSync, writeFileSync } from "fs";
import dayjs from "dayjs";
import { resolve } from "path";
type Options = {
  save?: boolean;
  path?: string;
  dateTemplate?: string;
};

/**
 * @params
 * When save=true, path must be set, exist and be directory\
 * Date template can be referenced to dayjs format
 * @addListener
 * eventName: "log"\
 * listener: (msg: string)=>void
 */
export function log$(app: Express, options?: Options) {
  const opt = options || {};
  if (opt.save && !opt.path)
    throw "Middlewares->log$->options->path: undefined";
  if (!statSync(opt.path).isDirectory())
    throw "Middlewares->log$->options->path: not directory";

  app.addListener("log", (msg: string) => {
    if (opt.dateTemplate) msg = `[${dayjs().format(opt.dateTemplate)}] ` + msg;
    saveLog(resolve(opt.path, ".log"), msg);
    console.log(msg);
  });

  return Router().use((req, res, next) => {
    const { ip, path, method } = req;
    let lg = `${ip} ${method} ${path}`;
    // if (opt.dateTemplate) lg = `[${dayjs().format(opt.dateTemplate)}] ` + lg;
    // saveLog(resolve(opt.path, ".log"), lg);
    // console.log(lg);
    req.app.emit("log", lg);
    next();
  });
}

function saveLog(path: string, log: string) {
  writeFileSync(path, log + "\n", { flag: "a" });
}
