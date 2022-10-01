import base from "@/sql/db.config";

const db = __SC__.database;

function query(sql: string) {
  return new Promise((resolve, reject) => {
    base.query(sql, (err, res) => {
      if (err) return reject(err);
      resolve(res);
    });
  });
}

async function checkDB() {
  let res = (await query("SHOW DATABASES")) as { Database: string }[];
  let dbs = res.map((v) => v.Database);
  if (dbs.includes(db)) return true;
  console.debug(`Database ${db} not exists`);
  return false;
}
async function createDB() {
  await query(`CREATE DATABASE ${db}`);
  console.debug(`Database ${db} created`);
}
async function useDB() {
  await query(`USE ${db}`);
  console.debug(`Use ${db}`);
}

namespace subdomains {
  async function createTB(tb: string, sql: string) {
    await query(sql);
    console.debug(`Table ${tb} created`);
  }

  async function checkTB(tb: string, sql: string) {
    let res = (await query("SHOW TABLES")) as {}[];
    let tbs = res.map((v) => Object.values(v)[0]);
    if (tbs.includes(tb)) return console.debug(`Table ${tb} exists`);
    console.debug(`Table ${tb} not exists`);
    await createTB(tb, sql);
    // console.log(res);
  }

  export function init() {
    return __SC__.subdomains.map(async ({ prefix, tables }) => {
      const _ = tables.map(async ({ name, body, comment }) => {
        const tn = prefix + "_" + name;
        const sql = `CREATE TABLE ${tn} (\n  ${body.join(
          ",\n  "
        )}) COMMENT="${comment}"`;
        //   console.log(create);
        await checkTB(tn, sql);
      });
      return Promise.all(_);
    });
  }
}

/**
 * 初始化数据库：读取配置检查库和表是否存在，不存在则新建
 */
export async function init() {
  if (!(await checkDB())) await createDB();
  await useDB();
  await Promise.all(subdomains.init());
}
