// Customed colored console text
console.error = (...data: any[]) => console.log("\x1b[41m", ...data, "\x1b[0m");
console.warn = (...data: any[]) => console.log("\x1b[43m", ...data, "\x1b[0m");
console.info = (...data: any[]) => console.log("\x1b[7m", ...data, "\x1b[0m");
console.debug = (...data: any[]) =>
  __SC__.debug && console.log("\x1b[45m", ...data, "\x1b[0m");
