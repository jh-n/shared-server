import express from "express";
import "./globals";
// internally merge config to global one __SC__, required ahead
import subdomainRouters from "@subdomains";

import { unmatch, test } from "./routers";
import { log$, json, urlencoded } from "./middlewares";

function launch() {
  const app = express();
  app.listen(__SC__.port, () => {
    console.time("server");
    console.info(`Server running at localhost:${__SC__.port}`);
  });

  // global middlewares
  app.use(
    json(),
    urlencoded({ extended: false }),
    log$(app, {
      save: true,
      path: ".",
      dateTemplate: "YYYY-MM-DD HH:mm:ss",
    })
  );

  // Use all routers
  app.use("/subdomain", ...subdomainRouters);
  app.use(test, unmatch);
}

import { init } from "./services/init";
__EVENT__.once("_init", () =>
  init()
    .catch((r) => {
      if (r) throw r.sqlMessage;
    })
    .then(launch)
);

__EVENT__.emit("_init");
