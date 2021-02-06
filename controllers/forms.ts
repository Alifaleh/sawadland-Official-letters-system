import { getAllForms, getFormData, getFormPaths } from '../models/database';
import { responseCodes } from '../utils/response_codes'

const getAllFormsController = async ( req, res ) => {
    const allForms = await getAllForms();
    res.send(allForms);
}


const getFormDataController = async ( req, res ) => {
    const formData = await getFormData(req.params.id);
    res.send(formData.length==0?responseCodes.invalidFormId:formData);
}

const getFormPathsController = async ( req, res ) => {
    const paths = await getFormPaths(req.params.id);
    res.send(paths.length==0?responseCodes.invalidFormId:paths);
}

module.exports.getAllFormsController = getAllFormsController;
module.exports.getFormDataController = getFormDataController;
module.exports.getFormPathsController = getFormPathsController;