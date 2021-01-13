import { getConnection, getRepository } from "typeorm";
import {Admin} from "./entity/Admin";
import {Form} from "./entity/Form";
import { FormData } from "./entity/FormData";
import {Letter} from "./entity/Letter";
import {LetterData} from "./entity/LetterData";


export const getAllForms = async () => {
    const allForms = await getConnection()
    .createQueryBuilder()
    .select(['form.id', 'form.subject'])
    .from(Form,'form')
    .getMany();
    return allForms;
}


export const getFormData = async (formId) => {
    const formData = await getConnection()
    .createQueryBuilder()
    .select(['form_data.DataName'])
    .from(FormData, 'form_data')
    .where(`form_data.formId = '${formId}'`)
    .getMany();
    return formData;
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
    console.log(data)
    // data.array.forEach(element => {
    //     console.log(element);
    // });
    return addedLetterId;
}

