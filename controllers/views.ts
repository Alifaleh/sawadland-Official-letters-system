
const homeControler = ( req, res ) => {
    res.render('home.pug',{isAuthenticated: req.session.adminId != null, accoutnLevel:req.session.level});
}

const loginController = ( req, res ) => {
    res.render('login.pug',{isAuthenticated: req.session.adminId != null, accoutnLevel:req.session.level});
}

const signupController = ( req, res ) => {
    res.render('signup.pug',{isAuthenticated: req.session.adminId != null, accoutnLevel:req.session.level});
}

const dashboardController = ( req, res ) => {
    res.render('dashboard.pug',{isAuthenticated: req.session.adminId != null, accoutnLevel:req.session.level});
}

const downloadControler = ( req, res ) => {
    if(req.params.letterId)
        res.render('download.pug',{isAuthenticated: req.session.adminId != null, accoutnLevel:req.session.level, downloadLink: "/getpdf/"+req.params.letterId});
}

const accountManagementController = async (req, res) => {
    res.render('account_management.pug',{isAuthenticated: req.session.adminId != null, accoutnLevel:req.session.level});
}

module.exports.homeControler               = homeControler;
module.exports.loginController             = loginController;
module.exports.dashboardController         = dashboardController;
module.exports.downloadControler           = downloadControler;
module.exports.signupController            = signupController;
module.exports.accountManagementController = accountManagementController;