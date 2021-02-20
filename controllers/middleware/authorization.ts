import { responseCodes } from '../../utils/response_codes';

const level0 = (req, res, next) =>{
    if(req.session.level==0){
        next()
    }else{
        res.send(responseCodes.notAuthorized);
    }
}

const level1 = (req, res, next) =>{
    if(req.session.level<=1){
        next()
    }else{
        res.send(responseCodes.notAuthorized);
    }
}

const level2 = (req, res, next) =>{
    if(req.session.level<=2){
        next()
    }else{
        res.send(responseCodes.notAuthorized);
    }
}

module.exports.level0 = level0;
module.exports.level1 = level1;
module.exports.level2 = level2;