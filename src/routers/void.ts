import { Router } from "express";

/**
 * 访问空路径时返回
 */
export const unmatch = Router();

unmatch.use((req, res) => {
  if (Reflect.has(req.query, "json"))
    return res.send({
      msg: "Nothing but void",
    });
  res.send("<h1>Void webpage</h1>");
});
