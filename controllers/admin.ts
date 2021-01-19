import { getAdmin } from '../models/database';
import { responseCodes } from '../utils/response_codes';



const loginController = async (req, res) => {
    const admin = await getAdmin(req.query.username.toString(), req.query.password.toString())
    if(admin){
        req.session.adminId=admin.id;
        req.session.username=admin.username;
        req.session.level=admin.level
        res.send(responseCodes.success);
    }else{
        res.send(responseCodes.invalidCredentials);
    }
}


const logoutController = async (req, res) => {
    req.session.destroy(function(err) {
        res.send(responseCodes.success)
    })
}


module.exports.loginController = loginController;
module.exports.logoutController = logoutController;