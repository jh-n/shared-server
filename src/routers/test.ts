import { Router } from "express";

/**
 * "/test"  用于测试
 */
export const test = Router();

test.use("/test", (req, res) => {
  const { query, body, method, path, params } = req;
  res.send({
    method,
    path,
    query,
    body,
    params,
  });
});
