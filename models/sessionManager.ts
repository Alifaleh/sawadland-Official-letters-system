import "dotenv/config";
import session = require('express-session');
import pg = require('pg');
const pgSession = require('connect-pg-simple')(session);

const conObject = {
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host:  process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    database: process.env.DB_NAME
};

 
export const sessionHolder = session({
  store: new pgSession({
    pool : new pg.Pool(conObject),           
    tableName : 'session'
  }),
  secret: 'test scrit',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 } // 30 days
});