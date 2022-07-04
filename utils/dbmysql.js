// db.js
import mysql from 'serverless-mysql';
const db = mysql({
  config: {
    //host: process.env.MYSQL_HOST,
    host: 'localhost',
    port: 3306,
    database: 'tradegroup',
    user: 'root',
    password: 'pass',
  },
});
export default async function excuteQuery({ query, values }) {
  try {
    const results = await db.query(query, values);
    await db.end();
    return results;
  } catch (error) {
    return { error };
  }
}
