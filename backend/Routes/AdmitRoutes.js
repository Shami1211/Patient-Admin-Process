const express = require('express');
const router = express.Router();
const AdmitController = require('../Controllers/AdmitController');

// Define routes
router.get('/admitCount', AdmitController.admitCount);
router.get('/:id', AdmitController.getAllAdmitDetails);
router.post('/', AdmitController.addData);
router.get('/m/:id', AdmitController.getById);
router.put('/:id', AdmitController.updateAdmitData);
router.delete('/:id', AdmitController.deleteAdmitData);

module.exports = router;
