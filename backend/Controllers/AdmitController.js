const AdmitModel = require("../Model/AdmitModel");

// Display Data
const getAllAdmitDetails = async (req, res, next) => {
  let admit;
  try {
    admit = await AdmitModel.find();
  } catch (err) {
    console.log(err); 
  }
  if (!admit) {
    return res.status(404).json({ message: "Data not found" });
  }
  return res.status(200).json({ admit });
};

// Insert Data
const addData = async (req, res, next) => {
  const {
    hospital,
    date,
    rooms,
    fullname,
    dob,
    gender,
    phone,
    address,
    guardian,
    relationship,
    contact,
    medications,
    past,
    symptoms,
    prescription,
  } = req.body;

  let admit;

  try {
    admit = new AdmitModel({
      hospital,
      date,
      rooms,
      fullname,
      dob,
      gender,
      phone,
      address,
      guardian,
      relationship,
      contact,
      medications,
      past,
      symptoms,
      prescription,
    });
    await admit.save();
  } catch (err) {
    console.log(err);
  }
  if (!admit) {
    return res.status(404).json({ message: "Unable to add data" });
  }
  return res.status(200).json({ admit });
};

// Get by Id
const getById = async (req, res, next) => {
  const id = req.params.id;
  let admit;
  try {
    admit = await AdmitModel.findById(id);
  } catch (err) {
    console.log(err);
  }
  if (!admit) {
    return res.status(404).json({ message: "Data not found" });
  }
  return res.status(200).json({ admit });
};

// Update Details
const updateAdmitData = async (req, res, next) => {
  const id = req.params.id;
  const {
    hospital,
    date,
    rooms,
    fullname,
    dob,
    gender,
    phone,
    address,
    guardian,
    relationship,
    contact,
    medications,
    past,
    symptoms,
    prescription,
  } = req.body;

  let admit;

  try {
    admit = await AdmitModel.findByIdAndUpdate(id, {
      hospital,
      date,
      rooms,
      fullname,
      dob,
      gender,
      phone,
      address,
      guardian,
      relationship,
      contact,
      medications,
      past,
      symptoms,
      prescription,
    });
    admit = await admit.save();
  } catch (err) {
    console.log(err);
  }
  if (!admit) {
    return res.status(404).json({ message: "Unable to update data" });
  }
  return res.status(200).json({ admit });
};

// Delete Data
const deleteAdmitData = async (req, res, next) => {
  const id = req.params.id;

  let admit;

  try {
    admit = await AdmitModel.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
  }
  if (!admit) {
    return res.status(404).json({ message: "Unable to delete details" });
  }
  return res.status(200).json({ admit });
};

exports.getAllAdmitDetails = getAllAdmitDetails;
exports.addData = addData;
exports.getById = getById;
exports.updateAdmitData = updateAdmitData;
exports.deleteAdmitData = deleteAdmitData;
   