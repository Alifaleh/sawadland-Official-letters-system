import { responseCodes } from '../../utils/response_codes';

const isAuthentecated = (req, res, next) =>{
    if(req.session.adminId){
        next()
    }else{
        res.send(responseCodes.notAuthenticated);
    }
}

const isNotAuthentecated = (req, res, next) =>{
    if(req.session.adminId){
        res.redirect('/')
    }else{
        next();
    }
}

module.exports.isAuthentecated = isAuthentecated;
module.exports.isNotAuthentecated = isNotAuthentecated;