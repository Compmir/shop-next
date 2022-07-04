// db.js
import { Pool } from 'pg';
let conn;

if (!conn) {
  conn = new Pool({
    user: 'root',
    host: 'localhost',
    database: 'tradegroup',
    password: 'pass',
    port: 3306,
  });
}

export default conn;
