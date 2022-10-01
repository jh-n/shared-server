type EventEmitter<T> = import("./libs/events").EventEmitter<T>;

type EventMap = import("./globals/index").EventMap;

declare var __EVENT__: EventEmitter<EventMap>;

declare module "@/server.config.json" {
  interface Table {
    name: string;
    body: string[];
    comment: string | undefined;
  }
  const config: {
    port: number;
    debug: boolean;
    database: string;
    tables: Table[];
    subdomains: {
      baseURL: string;
      prefix: string;
      tables: Table[];
    }[];
  };
  export default config;
}
declare var __SC__: typeof import("@/server.config.json").default;
