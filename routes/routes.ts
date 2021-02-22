import express = require('express');
import path = require('path');

const router = express.Router();

const viewsControllers   = require('../controllers/views');
const formsControllers   = require('../controllers/forms');
const lettersControllers = require('../controllers/letters');
const adminControllers   = require('../controllers/admin')
const authenticationMW   = require('../controllers/middleware/authentication');
const authorizationMw    = require('../controllers/middleware/authorization');
const validationMW       = require('../controllers/middleware/validation');

router.get('/', viewsControllers.homeControler);

router.post('/allforms', authenticationMW.isAuthentecated, authorizationMw.level2, formsControllers.getAllFormsController);

router.post('/formdata/:id', authenticationMW.isAuthentecated, authorizationMw.level2, formsControllers.getFormDataController);

router.post('/formpaths/:id', authenticationMW.isAuthentecated, authorizationMw.level2, formsControllers.getFormPathsController);

router.post('/addletter/:id', authenticationMW.isAuthentecated, authorizationMw.level2, lettersControllers.addLetterController);

router.get('/dashboard',authenticationMW.isAuthentecated, authorizationMw.level2, viewsControllers.dashboardController)

router.get('/getpdf/:letterId', authenticationMW.isAuthentecated, authorizationMw.level2, lettersControllers.getPdfController);
router.get('/download/:letterId',authenticationMW.isAuthentecated, authorizationMw.level2, viewsControllers.downloadControler)

router.get('/accountmanagement',authenticationMW.isAuthentecated, authorizationMw.level1, viewsControllers.accountManagementController)
router.post('/accountmanagement',authenticationMW.isAuthentecated, authorizationMw.level1, adminControllers.accountManagementController)

router.get('/pathmanagement',authenticationMW.isAuthentecated, authorizationMw.level1, viewsControllers.pathManagementControler)
router.post('/pathmanagement',authenticationMW.isAuthentecated, authorizationMw.level1, adminControllers.pathManagementControler)



router.post('/login',authenticationMW.isNotAuthentecated , adminControllers.loginController)
router.get('/login',authenticationMW.isNotAuthentecated , viewsControllers.loginController)

router.post('/signup',authenticationMW.isNotAuthentecated , adminControllers.signupController)
router.get('/signup',authenticationMW.isNotAuthentecated , viewsControllers.signupController)

router.post('/logout', authenticationMW.isAuthentecated, adminControllers.logoutController)

router.use(express.static(path.join(__dirname, '../global')));

module.exports = router;