import { getConnection } from "typeorm";
import {Admin} from "../src/entity/Admin";
import {Form} from "../src/entity/Form";
import { FormData } from "../src/entity/FormData";
import {Letter} from "../src/entity/Letter";
import {LetterData} from "../src/entity/LetterData";
import {Path} from "../src/entity/Path";
import md5 = require('md5');
import "dotenv/config";


type connectionOptions = {
    type:any,
    host:any,
    username: any,
    database: any,
    password: any,
    port: any,
}

export const connection : connectionOptions = {
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT),
}



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

export const getFormPaths = async (formId) => {
    try{
        const formPathsType = await getConnection()
        .createQueryBuilder()
        .select('form.type')
        .from(Form, 'form')
        .where(`form.id = '${formId}'`)
        .getOne();

        const formPaths = await getConnection()
        .createQueryBuilder()
        .select('path')
        .from(Path, 'path')
        .where(`path.type = '${formPathsType['type']}'`)
        .getMany();
        return formPaths;
    }catch(e){
        return [];
    }
}


export const addLetter = async (data,date,formId,adminId, pathId) => {
    const addedLetter = await getConnection()
    .createQueryBuilder()
    .insert()
    .into(Letter)
    .values([{Date:date, signature:'', admin:adminId, form:formId}])
    .returning("id")
    .execute();

    let newValue = 0;

    if(data['afterDecrement']){
        let tempNewValue;
        tempNewValue = data['afterDecrement'].split('Mb');
        if(tempNewValue.length==2){
            newValue = parseInt(tempNewValue[0]);
        }else{
            tempNewValue = data['afterDecrement'].split('ST');
            newValue = parseInt(tempNewValue[0]);
        }
    }else if(data['afterIncrement']){
        let tempNewValue;
        tempNewValue = data['afterIncrement'].split('Mb');
        if(tempNewValue.length==2){
            newValue = parseInt(tempNewValue[0]);
        }else{
            tempNewValue = data['afterIncrement'].split('ST');
            newValue = parseInt(tempNewValue[0]);
        }
    }

    if (newValue>0){
        await getConnection()
        .createQueryBuilder()
        .update(Path)
        .set({lastBandwidth:newValue})
        .where(`path.id = ${pathId}`)
        .execute();
    }

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
    .select(['admin.id', 'admin.username', 'admin.level', 'admin.verifyed'])
    .from(Admin,'admin')
    .where(`admin.username = '${username}' and admin.password = '${md5(password)}'`)
    .getOne();
    return admin;
}


export const signup = async (username, password) => {
    await getConnection()
    .createQueryBuilder()
    .insert()
    .into(Admin)
    .values({
        username:username,
        password:md5(password),
        level:2,
        verifyed:false,
    })
    .execute();
}

export const getAllUsers = async () => {
    const allUsers = await getConnection()
    .createQueryBuilder()
    .select(['id', 'username'])
    .from(Admin,'admin')
    .where('admin.level > 0')
    .getRawMany()
    return allUsers;
}


export const getUserInfo = async (userId) => {
    const userInfo = await getConnection()
    .createQueryBuilder()
    .select(["id", "username", "level", "verifyed"])
    .from(Admin, "admin")
    .where(`admin.id = '${userId}'`)
    .getRawOne()

    return userInfo;
}

export const setUserInfo = async (userInfo) => {
    const validator = await getConnection()
    .createQueryBuilder()
    .select()
    .from(Admin, 'admin')
    .where(`admin.id != '${userInfo.selectedId}' and admin.username = '${userInfo.username}'`)
    .getRawMany();
    if(validator.length == 0){
        await getConnection()
        .createQueryBuilder()
        .update(Admin)
        .set({username:userInfo.username, level:userInfo.level, verifyed:userInfo.isverified})
        .where(`admin.id = '${userInfo.selectedId}'`)
        .execute()
        return 0
    }else{
        return 1
    }
}