import { getAllForms, getFormData } from '../models/database';
import { responseCodes } from '../utils/response_codes'

const getAllFormsController = async ( req, res ) => {
    const allForms = await getAllForms();
    res.json(allForms);
}


const getFormDataController = async ( req, res ) => {
    const formData = await getFormData(req.params.id);
    res.json(formData);
}

module.exports.getAllFormsController = getAllFormsController;
module.exports.getFormDataController = getFormDataController;
