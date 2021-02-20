import { getAdmin, signup } from '../models/database';
import { responseCodes } from '../utils/response_codes';



const loginController = async (req, res) => {
    if(req.query.username && req.query.password){
        const admin = await getAdmin(req.query.username.toString(), req.query.password.toString())
        if(admin && admin.verifyed){
            req.session.adminId=admin.id;
            req.session.username=admin.username;
            req.session.level=admin.level
            res.send(responseCodes.success);
        }else if (!admin.verifyed){
            res.send(responseCodes.unverifyedAccount);
        }else{
            res.send(responseCodes.invalidCredentials);
        }
    }else{
        res.send(responseCodes.invalidCredentials);
    }
}


const signupController = async (req, res) => {
    if(req.query.username && req.query.password){
        const admin = await getAdmin(req.query.username.toString(), req.query.password.toString())
        if(!admin){
            await signup(req.query.username.toString(), req.query.password.toString())
            res.send(responseCodes.success);
        }else{
            res.send(responseCodes.userAlreadyExistes);
        }
    }else{
        res.send(responseCodes.invalidCredentials);
    }
}


const logoutController = async (req, res) => {
    req.session.destroy(function(err) {
        res.send(responseCodes.success)
    })
}


const accountManagementController = async (req, res) => {
    res.send('accountManagement')
}


module.exports.loginController = loginController;
module.exports.logoutController = logoutController;
module.exports.signupController = signupController;
module.exports.accountManagementController = accountManagementController;