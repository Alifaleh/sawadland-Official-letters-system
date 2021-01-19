import express = require('express');
import { body, validationResult } from 'express-validator';


const router = express.Router();

const viewsControllers = require('../controllers/views');
const formsControllers = require('../controllers/forms');
const lettersControllers = require('../controllers/letters');

router.get('/', viewsControllers.homeControler);

router.post('/allforms', formsControllers.getAllFormsController);

router.post('/formdata/:id', formsControllers.getFormDataController);

router.post('/addletter/:id', lettersControllers.addLetterController);

router.get('/getpdf/:letterId', lettersControllers.getPdfController);

module.exports = router;