import "reflect-metadata";
import { createConnection } from "typeorm";
import { connection } from "../models/database";
import express = require('express');
import cookieParser = require('cookie-parser');
const { sessionHolder, conObject } = require('../models/sessionManager');
const routes = require('../routes/routes');

const app = express();

app.use(sessionHolder);
app.use(cookieParser());

const port = process.env.HTTP_PORT;

createConnection().then(async connection => {

    app.use('/',routes);

    app.listen(port, ()=>{console.log('listening on port: ',port );});

}).catch(error => console.log(error));

