import { getConnection, getRepository } from "typeorm";
import {Admin} from "../src/entity/Admin";
import {Form} from "../src/entity/Form";
import { FormData } from "../src/entity/FormData";
import {Letter} from "../src/entity/Letter";
import {LetterData} from "../src/entity/LetterData";
import md5 = require('md5');


export const getAllForms = async () => {
    const allForms = await getConnection()
    .createQueryBuilder()
    .select(['form.id', 'form.subject'])
    .from(Form,'form')
    .getMany();
    return allForms;
}


export const getFormData = async (formId) => {
    try{
        const formData = await getConnection()
        .createQueryBuilder()
        .select(['form_data.dataName'])
        .from(FormData, 'form_data')
        .where(`form_data.formId = '${formId}'`)
        .getMany();
        return formData;
    }catch(e){
        return []
    }
}


export const addLetter = async (data,date,formId) => {
    const addedLetter = await getConnection()
    .createQueryBuilder()
    .insert()
    .into(Letter)
    .values([{Date:date, signature:'', form:formId}])
    .returning("id")
    .execute();
    const addedLetterId = addedLetter.identifiers[0].id;

    const formData = await getFormData(formId);
    
    let dataToInsert = [];
    formData.forEach(item => {
        dataToInsert.push({dataName:item.dataName,dataValue:data[item.dataName],letter:addedLetterId});
    })

    await getConnection()
    .createQueryBuilder()
    .insert()
    .into(LetterData)
    .values(dataToInsert)
    .execute()
    return addedLetterId;
}


export const getLetter = async letterId => {
    const letter = await getConnection()
    .createQueryBuilder(Letter,'letter')
    .innerJoinAndSelect("letter.letterData", 'letter_data', `letter.id = '${letterId}'`)
    .innerJoinAndSelect("letter.form", "letter_form")
    .innerJoinAndSelect('letter_form.formData',"form_data")
    .getOne();
    return letter
}

export const getAdmin = async (username, password) => {
    const admin = await getConnection()
    .createQueryBuilder()
    .select(['admin.id', 'admin.username', 'admin.level'])
    .from(Admin,'admin')
    .where(`admin.username = '${username}' and admin.password = '${md5(password)}'`)
    .getOne();
    return admin;
}
