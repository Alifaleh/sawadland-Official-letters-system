import { getAdmin, signup, getAllUsers, getUserInfo, setUserInfo, getAllPaths, getPathInfo, updatePath, addPath, deletePath } from '../models/database';
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
    if(req.query.type == 1){
        const allUsers = await getAllUsers();
        res.send(allUsers);
    }else if(req.query.type == 2){
        const userInfo = await getUserInfo(req.query.userId);
        res.send(userInfo);
    }else if(req.query.type == 3){
        const JsonUserInfo = req.query.userInfo;
        const userInfo = JSON.parse(JsonUserInfo);
        if (userInfo.isverified == "true"){
            userInfo.isverified = true;
        }else{
            userInfo.isverified = false;
        }
        userInfo.level = parseInt(userInfo.level)
        const validator = await setUserInfo(userInfo);
        if(validator == 0){
            res.send(responseCodes.success)
        }else if (validator == 1){
            res.send(responseCodes.userAlreadyExistes)
        }
    }
}

const pathManagementControler = async (req, res) => {
    if(req.query.type == 1){
        const allPaths = await getAllPaths();
        res.send(allPaths);
    }else if (req.query.type == 2){
        const pathInfo = await getPathInfo(req.query.pathId)
        res.send(pathInfo)
    }else if (req.query.type == 3){
        const pathInfo = JSON.parse(req.query.pathInfo)
        await updatePath(pathInfo)
        res.send(responseCodes.success)
    }else if (req.query.type == 4){
        const pathInfo = JSON.parse(req.query.pathInfo)
        await addPath(pathInfo);
        res.send(responseCodes.success);
    }else if (req.query.type == 5){
        await deletePath(req.query.pathId);
        res.send(responseCodes.success)
    }
}


module.exports.loginController = loginController;
module.exports.logoutController = logoutController;
module.exports.signupController = signupController;
module.exports.accountManagementController = accountManagementController;
module.exports.pathManagementControler = pathManagementControler;