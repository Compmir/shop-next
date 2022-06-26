// db.js
import { Pool } from "pg";
let conn;

if (!conn) {
  conn = new Pool({
	  user: 'root',
	  host: 'localhost',
	  database: 'main',
	  password: '',
	  port: 5432,
  });
}

export default conn ;