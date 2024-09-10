const express = require('express');
const router = express.Router();
const AdmitController = require('../Controllers/AdmitController');

// Define routes
router.get('/admitCount', AdmitController.admitCount);
router.get('/admitDetails', AdmitController.getAllAdmitDetails);
router.post('/admit', AdmitController.addData);
router.get('/admit/:id', AdmitController.getById);
router.put('/admit/:id', AdmitController.updateAdmitData);
router.delete('/admit/:id', AdmitController.deleteAdmitData);

module.exports = router;
