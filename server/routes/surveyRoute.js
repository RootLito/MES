const express = require('express');
const router = express.Router();
const { getSurveys, getSurveyById, createSurvey, updateSurvey, deleteSurvey } = require('../controllers/surveyController');

router.get('/', getSurveys);
router.get('/:id', getSurveyById)
router.post('/add', createSurvey);
router.put('/update/:id', updateSurvey);
router.delete('/delete/:id', deleteSurvey);

module.exports = router;
