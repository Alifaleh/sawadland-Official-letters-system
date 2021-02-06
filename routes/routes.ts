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

router.post('/allforms', authenticationMW.isAuthentecated, formsControllers.getAllFormsController);

router.post('/formdata/:id', authenticationMW.isAuthentecated, formsControllers.getFormDataController);

router.post('/formpaths/:id', authenticationMW.isAuthentecated, formsControllers.getFormPathsController);

router.post('/addletter/:id', authenticationMW.isAuthentecated, lettersControllers.addLetterController);

router.get('/dashboard',authenticationMW.isAuthentecated , viewsControllers.dashboardController)

router.get('/getpdf/:letterId', authenticationMW.isAuthentecated, lettersControllers.getPdfController);
router.get('/download/:letterId',authenticationMW.isAuthentecated , viewsControllers.downloadControler)

router.post('/login',authenticationMW.isNotAuthentecated , adminControllers.loginController)
router.get('/login',authenticationMW.isNotAuthentecated , viewsControllers.loginController)


router.post('/logout', authenticationMW.isAuthentecated, adminControllers.logoutController)

router.use(express.static(path.join(__dirname, '../global')));

module.exports = router;