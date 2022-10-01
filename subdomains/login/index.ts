import cfg from "./config.json";
__EVENT__.emit("sub_cfg", cfg);

import { Router } from "express";
import { login, register } from "./routers";

export const root = Router();
root.use("/login", login, register);
