import "reflect-metadata";
import {createConnection} from "typeorm";
import express = require('express');
import cookieParser = require('cookie-parser');
import md5 = require('md5');
import {} from './database'

const app = express();
app.use(cookieParser());
const port = 3000;

const responseCodes={
    //positive:
    success:'1000',

    //negative:
    confirmPasswordError:'2000',
    invalidCredentials:'2001',
    permitionDenaied:'2002',
    unrecognizedEntry :'2003',
}

createConnection().then(async connection => {

    app.get('/', ( req, res ) => {
        res.send('welcome to sawadland official letters system');
    })

    app.post('/', ( req, res ) => {
        res.send('welcome to sawadland official letters system');
    })

    app.listen(port, ()=>{
        console.log('listening on port: ',port );
    })
    

}).catch(error => console.log(error));
