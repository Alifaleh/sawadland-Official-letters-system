import "reflect-metadata";
import {AdvancedConsoleLogger, createConnection} from "typeorm";
import express = require('express');
import cookieParser = require('cookie-parser');
import md5 = require('md5');
import { getAllForms, getFormData, addLetter, getLetter } from './database'
import { makePdf } from './makePdf';
import { Letter } from "./entity/Letter";
import fs = require('fs');
import { setInterval } from "timers";
import { body, validationResult } from 'express-validator';


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
    pageNotFound:'2005'
}

createConnection().then(async connection => {

    // // authentication middlewear:
    // app.use(['/allforms','/formdata/:id'],(req, res, next) =>{
    //     console.log('hi everyone');
    //     next(responseCodes.pageNotFound);
    // })


    app.get('/', ( req, res ) => {
        res.send('welcome to sawadland official letters system');
    });

    app.get('/allforms', async ( req, res ) => {
        const allForms = await getAllForms();
        res.json(allForms);
    });

    app.get('/formdata/:id', async ( req, res ) => {
        try{
            const formData = await getFormData(req.params.id);
            res.json(formData);
        }catch(e){
            res.send(responseCodes.pageNotFound)
        }

    });

    app.get('/addletter/:id', async ( req, res) =>{
        try{
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
    
                res.send({status:responseCodes.success, letterId:addedLetter});
            }else{
                res.send(responseCodes.invalidFormData);
            }
        }catch(e){
            res.send(responseCodes.pageNotFound);
        }

    });

    app.get('/getpdf/:letterId', async (req,res)=>{
        try{
            const letter:any = await getLetter(req.params.letterId);
            if(letter != null){
                let dateToPrint =(`${letter.Date.getFullYear()}/${letter.Date.getMonth()+1}/${letter.Date.getDate()}`);
                let letterNumberToPrint = (letter.serial);
                let paragraphToPrint = letter.form.paragraph;
                const formData = letter.form.formData;
                const letterData = letter.letterData;
        
                formData.forEach(formData => {
                    paragraphToPrint=paragraphToPrint.replace("{{"+formData.dataName+"}}",letterData.find(letterData => letterData.dataName == formData.dataName).dataValue);
                })
                
                const pdf = makePdf(letterNumberToPrint, dateToPrint, letter.form.subject, letter.form.greeting, paragraphToPrint, letter.form.footer, letter.id)
                setTimeout(()=>{
                    res.download(pdf);
                },500)
                
            }else{
                res.send(responseCodes.pageNotFound)
            }
        }catch(e){
            res.send(responseCodes.pageNotFound);
        }
        
    })

    // loggin 

    app.use('/login', (req, res, next) => {

    })

    app.get('/login', async (req, res) => {

    })

    app.listen(port, ()=>{
        console.log('listening on port: ',port );
    });

}).catch(error => console.log(error));
