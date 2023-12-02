import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from './schema'

const connection = await mysql.createConnection({
  user: "malara",
  password: "161215mm",
  database: "pnp_cms",
});

/** @type {import('drizzle-orm/mysql2').MySql2Database<typeof schema>} */
export const database = drizzle(connection, { schema, mode: 'default' });
