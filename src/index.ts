import "reflect-metadata";
import "dotenv/config";
import { createConnection } from "typeorm";
import express = require('express');
import cookieParser = require('cookie-parser');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);

const routes = require('../routes/routes');

const app = express();


const conObject = {
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host:  process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME
};

// console.log(conObject);


// const pgStoreConfig = {
//     pgPromise: require('pg-promise')({ promiseLib: require('bluebird') })({ conObject }), 
//     tableName : 'session' 
// }

// // new pgSession({
// //     pool : conObject,                // Connection pool
// //     tableName : 'user_sessions'   // Use another table-name than the default "session" one
// //   })

// app.use(session({
//         store: 'postgres://sawadland:sladmin@localhost:5432/sawadland_ols_db',
//         secret: 'jW8aor76jpPX', 
//         resave: true,
//         saveUninitialized: true,
//         cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 } // 30 days 
//     })
// );

var pg = require('pg')
 
var pgPool = new pg.Pool(conObject);
 
app.use(session({
  store: new pgSession({
    pool : pgPool,                // Connection pool
    tableName : 'session'   // Use another table-name than the default "session" one
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

