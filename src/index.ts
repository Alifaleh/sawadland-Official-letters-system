import "reflect-metadata";
import {AdvancedConsoleLogger, createConnection} from "typeorm";
import express = require('express');
import cookieParser = require('cookie-parser');
import md5 = require('md5');
import { getAllForms, getFormData, addLetter } from './database'
import fs = require('fs');
import path = require('path');

var conversion = require("phantom-html-to-pdf")();
conversion({ html: "<h1>Hello World</h1>" }, function(err, pdf) {
  var output = fs.createWriteStream('outpufffft.pdf')
  console.log(pdf.logs);
  console.log(pdf.numberOfPages);
    // since pdf.stream is a node.js stream you can use it
    // to save the pdf to a file (like in this example) or to
    // respond an http request.
  pdf.stream.pipe(output);
});

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

    app.post('/addletter/:id', async ( req, res) =>{

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
            const temp = fs.readFileSync(path.join(__dirname,'../assets/fonts/Dubai-Regular.ttf'),{encoding:'utf8'});
            
            console.log('\n\n')
            let ff = path.join(__dirname,'../assets/fonts/Dubai-Regular.ttf');
            let buff = new Buffer(ff);
            let base64data = buff.toString('base64');
            console.log(base64data)
            const str = temp.toString().replace("{fontlink}",__dirname);
            const addedLetter = await addLetter(newData, date,req.params.id);
            let dateToPrint =(`${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()}`);
            let letterNumberToPrint = (addedLetter[1]);
            let paragraphToPrint = addedLetter[2].paragraph;
            formData.forEach(item => {
                paragraphToPrint=paragraphToPrint.replace("${"+item.dataName+"}",newData[item.dataName]);
            })
            var html = fs.readFileSync('template.html', 'utf8');
            
            var options = {
                format: "A4",
                orientation: "portrait",
                border: "10mm",
            };
            var users = [
                {
                    letterNumber:"letterNumberToPrint",
                    date:"dateToPrint",
                },
                {
                    letterNumber:"letterNumberToPrint",
                    date:"dateToPrint",
                },
            ]
            var document = {
                html: html,
                data: {
                    users: users
                },
                path: "./letters/letter_"+addedLetter[0]+".pdf"
            };
            pdf.create(document, options)
            .then(res => {
                console.log(res)
            })
            .catch(error => {
                console.error(error)
            });
            // //creating pdf:

            // let pdfDoc = new PDFDocument({ autoFirstPage: false, margins: { top: 0, left: 50, right: 50, bottom: 0 } });
            // pdfDoc.addPage();

            // pdfDoc.pipe(fs.createWriteStream(`letters/letter_${addedLetter[0]}.pdf`));
            // pdfDoc.image('assets/images/logo.png',30,20,{width:160}).moveDown(10);

            // pdfDoc.font('assets/fonts/Dubai-Bold.ttf').fillColor('#333').fontSize(12).text(`${letterNumberToPrint} : العدد`, { align: 'right'});
            // pdfDoc.font('assets/fonts/Dubai-Bold.ttf').fillColor('#333').fontSize(12).text(`${dateToPrint} : التاريخ`, { align: 'right'}).moveDown(3);

            // pdfDoc.font('assets/fonts/Dubai-Bold.ttf').fillColor('#333').fontSize(14).text(" إلى/الشركة العامة للاتصالات و المعلوماتية_قسم التراسل".split(" ").reverse().join(" "), { align: 'center'}).moveDown(0.5);

            // pdfDoc.font('assets/fonts/Dubai-Bold.ttf').fillColor('#333').fontSize(15).text(`${(" "+addedLetter[2].subject+" ").split(" ").reverse().join(" ")}م/`, { align: 'center'}).moveDown(0.5);

            // pdfDoc.font('assets/fonts/Dubai-Regular.ttf').fillColor('#333').fontSize(12).text((" "+addedLetter[2].greeting+" ").split(" ").reverse().join(" "), { align: 'right'});
            // pdfDoc.font('assets/fonts/Dubai-Regular.ttf').fillColor('#333').fontSize(12).text(paragraphToPrint, { align: 'right'}).moveDown(0.5);
            // pdfDoc.font('assets/fonts/Dubai-Bold.ttf').fillColor('#333').fontSize(14).text((" "+addedLetter[2].footer+" ").split(" ").reverse().join(" "), { align: 'center'});

            // pdfDoc.end();

            res.send(responseCodes.success);
        }else{
            res.send(responseCodes.invalidFormData);
        }

    });

    app.listen(port, ()=>{
        console.log('listening on port: ',port );
    });

}).catch(error => console.log(error));
