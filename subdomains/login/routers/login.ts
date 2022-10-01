import base from "@/sql/db.config";
import { Router } from "express";
import { Record } from "./shared";

const TB = "$1_users";

export const login = Router();

type Form = {
  username: string;
  password: string;
};

login.post("/login", (req, resp) => {
  const { username, password } = req.body as Form;
  req.app.emit("log", "<Body> " + JSON.stringify(req.body));
  base.query(
    `SELECT * FROM ${TB} WHERE username=? AND password=?`,
    [username, password],
    (err, res: Record[]) => {
      if (err) throw err.sqlMessage;
      if (res.length === 0)
        return resp.send({
          msg: "用户名或密码错误",
        });
      resp.send({
        msg: "登录成功",
        username,
      });
    }
  );
});
