import "reflect-metadata";
import { createConnection } from "typeorm";
import express = require('express');
import cookieParser = require('cookie-parser');

const lettersRoutes = require('../routes/letters');


const app = express();
app.use(cookieParser());
const port = 3000;


createConnection().then(async connection => {

    app.use('/',lettersRoutes);

    app.listen(port, ()=>{console.log('listening on port: ',port );});

}).catch(error => console.log(error));

