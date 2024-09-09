const express = require("express");
const router = express.Router();
const DoctorController = require("../Controllers/DoctorController");

router.get("/", DoctorController.getAllDetails);
router.post("/", DoctorController.addData);
router.get("/:id", DoctorController.getById);
router.put("/:id", DoctorController.updateData);
router.delete("/:id", DoctorController.deleteData);

//export
module.exports = router;
