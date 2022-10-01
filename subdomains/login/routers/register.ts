import base from "@/sql/db.config";
import { Router } from "express";
import { Record } from "./shared";

export const register = Router();

const TB = "$1_users";
type Form = {
  username: string;
  password: string;
  email: string;
};

register.post("/register", (req, resp) => {
  const { username, password, email } = req.body as Form;
  req.app.emit("log", "<Body> " + JSON.stringify(req.body));
  if (!(username && password && email))
    return resp.send({
      msg: "表单未填写完整",
    });
  base.query(
    `INSERT INTO ${TB} (username,password,email) VALUES (?,?,?)`,
    [username, password, email],
    (err, res) => {
      if (err) {
        if (err.sqlMessage.startsWith("Duplicate"))
          return resp.send({
            msg: "账号已存在",
          });
        throw err.sqlMessage;
      }
      resp.send({
        msg: "注册成功",
      });
    }
  );
});

register.get("/register", (req, resp) => {
  const username = req.query.username as string;
  base.query(
    `SELECT * FROM ${TB} WHERE username=?`,
    username,
    (err, res: Record[]) => {
      if (err) throw err.sqlMessage;
      if (res.length > 0)
        return resp.send({
          msg: "账号已存在",
          data: false,
        });
      resp.send({
        msg: "账号未使用",
        data: true,
      });
    }
  );
});
