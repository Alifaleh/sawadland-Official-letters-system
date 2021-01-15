import "reflect-metadata";
import {AdvancedConsoleLogger, createConnection} from "typeorm";
import express = require('express');
import cookieParser = require('cookie-parser');
import md5 = require('md5');
import { getAllForms, getFormData, addLetter } from './database'
import { makePdf } from './makePdf';


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
    invalidFormData:'2004',
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

    app.get('/addletter/:id', async ( req, res) =>{

        let validData = true;
        let date = new Date(+req.query.date);

        const formData = await getFormData(req.params.id);
        const data = JSON.parse(req.query.data.toString());
        let newData:object={};
        formData.forEach(item => {
            if(data[item.dataName] == null){
                validData=false;
            }else{
                newData[item.dataName]=data[item.dataName];
            }
        })
        if(validData){
            const addedLetter = await addLetter(newData, date,req.params.id);
            let dateToPrint =(`${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()}`);
            let letterNumberToPrint = (addedLetter[1]);
            let paragraphToPrint = addedLetter[2].paragraph;
            formData.forEach(item => {
                paragraphToPrint=paragraphToPrint.replace("{{"+item.dataName+"}}",newData[item.dataName]);
            })
            makePdf(letterNumberToPrint, dateToPrint, addedLetter[2].subject, addedLetter[2].greeting, paragraphToPrint, addedLetter[2].footer, addedLetter[0])
            res.send(responseCodes.success);
        }else{
            res.send(responseCodes.invalidFormData);
        }

    });

    app.listen(port, ()=>{
        console.log('listening on port: ',port );
    });

}).catch(error => console.log(error));
