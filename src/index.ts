import "reflect-metadata";
import {createConnection} from "typeorm";
import express = require('express');
import cookieParser = require('cookie-parser');
import md5 = require('md5');
import { getAllForms, getFormData, addLetter } from './database'

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
    invalidFormData:'2004'
}

createConnection().then(async connection => {

    app.get('/', ( req, res ) => {
        res.send('welcome to sawadland official letters system');
    });

    app.get('/allforms', async ( req, res ) => {
        const allForms = await getAllForms();
        res.json(allForms);
    });

    app.get('/formdata/:id', async ( req, res ) => {
        const formData = await getFormData(req.params.id);
        res.json(formData);
    });

    app.post('/addletter/:id', async ( req, res) =>{
        let validData = true;
        // let date = req.query.date
        // to be removed:
        let date = new Date(Date.now())
        const formData = await getFormData(req.params.id);
        const data = JSON.parse(req.query.data.toString());
        let newData:object={};
        formData.forEach(item => {
            if(data[item.DataName] == null){
                validData=false;
            }else{
                newData[item.DataName]=data[item.DataName];
            }
        })
        if(validData){
            const addedLetter = await addLetter(newData, date,req.params.id);
            res.send(responseCodes.success);
        }else{
            res.send(responseCodes.invalidFormData);
        }

    });

    app.listen(port, ()=>{
        console.log('listening on port: ',port );
    });

}).catch(error => console.log(error));
