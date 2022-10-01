import mysql, { MysqlError } from "mysql";

const base = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "njh",
});

export default base;
