import { getFormData, addLetter, getLetter } from '../models/database';
import { makePdf } from '../models/makePdf';
import { responseCodes } from '../utils/response_codes';

const addLetterController = async ( req, res) =>{
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
}


const getPdfController = async (req,res)=>{
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
    
}

module.exports.addLetterController = addLetterController;
module.exports.getPdfController = getPdfController;