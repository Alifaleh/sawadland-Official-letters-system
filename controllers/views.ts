import { IsNull } from "typeorm";

const homeControler = ( req, res ) => {
    res.render('home.pug',{isAuthenticated: req.session.adminId != null});
}

const loginController = ( req, res ) => {
    res.render('login.pug',{isAuthenticated: req.session.adminId != null});
}

const dashboardController = ( req, res ) => {
    res.render('dashboard.pug',{isAuthenticated: req.session.adminId != null});
}

module.exports.homeControler = homeControler;
module.exports.loginController = loginController;
module.exports.dashboardController = dashboardController;