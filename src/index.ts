import "reflect-metadata";
import "dotenv/config";
import { createConnection } from "typeorm";
import express = require('express');
import cookieParser = require('cookie-parser');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const pg = require('pg');

const routes = require('../routes/routes');

const app = express();


const conObject = {
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host:  process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME
};

 
app.use(session({
  store: new pgSession({
    pool : new pg.Pool(conObject),           
    tableName : 'session'
  }),
  secret: 'test scrit',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 } // 30 days
}));

app.use(cookieParser());
const port = 3000;


createConnection().then(async connection => {

    app.use('/',routes);

    app.listen(port, ()=>{console.log('listening on port: ',port );});

}).catch(error => console.log(error));

