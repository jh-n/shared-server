import { EventEmitter } from "../libs/events";

export type EventMap = {
  _init: () => void;
  sub_cfg: (cfg: typeof __SC__.subdomains[0]) => void;
};

export const __EVENT__ = new EventEmitter<EventMap>();

// From subdomains emit its config
__EVENT__.on("sub_cfg", (cfg) => {
  __SC__.subdomains.push(cfg);
});
