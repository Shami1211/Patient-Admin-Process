const express = require("express");
const router = express.Router();
const AdmitController = require("../Controllers/AdmitController");

router.get("/", AdmitController.getAllAdmitDetails);
router.post("/", AdmitController.addData);
router.get("/:id", AdmitController.getById);
router.put("/:id", AdmitController.updateAdmitData);
router.delete("/:id", AdmitController.deleteAdmitData);

module.exports = router;
