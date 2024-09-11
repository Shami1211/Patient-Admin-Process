const AdmitModel = require("../Model/Admit");

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
const addData = async (req, res) => {
  try {
    const {
      hospital,
      date,
      fullname,
      dob,
      gender,
      phone,
      address,
      guardian,
      relationship,
      contact,
      admitID,
      nic, // Capture NIC
      medications,
      past,
      symptoms,
      prescription,
    } = req.body;

    const newAdmit = new AdmitModel({
      hospital,
      date,
      fullname,
      dob,
      gender,
      phone,
      address,
      guardian,
      relationship,
      contact,
      admitID,
      nic, // Save NIC
      medications,
      past,
      symptoms,
      prescription,
    });

    await newAdmit.save();

    res.status(200).json({ message: "Admit record added successfully" });
  } catch (error) {
    console.error("Error adding admit record", error);
    res.status(500).json({ message: "Failed to add admit record" });
  }
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
    fullname,
    dob,
    gender,
    phone,
    address,
    guardian,
    relationship,
    contact,
    nic, // Capture NIC for updates
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
      fullname,
      dob,
      gender,
      phone,
      address,
      guardian,
      relationship,
      contact,
      nic, // Update NIC
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

// Count Admits
const admitCount = async (req, res) => {
  const { hospital, date } = req.query;

  try {
    // Implement logic to count admits based on hospital and date
    const count = await AdmitModel.countDocuments({ hospital, date });
    res.status(200).json({ count });
  } catch (error) {
    console.error("Error fetching admit count", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get Admit by NIC
const getByNIC = async (req, res) => {
  const { nic } = req.params;

  let admit;
  try {
    admit = await AdmitModel.findOne({ nic: nic });
  } catch (err) {
    console.log(err);
  }

  if (!admit) {
    return res.status(404).json({ message: "Data not found" });
  }

  return res.status(200).json({ admit });
};

// Get Admit by AdmitID
const getByAdmitID = async (req, res) => {
  const { admitID } = req.params;

  let admit;
  try {
    admit = await AdmitModel.findOne({ admitID: admitID });
  } catch (err) {
    console.log(err);
  }

  if (!admit) {
    return res.status(404).json({ message: "Data not found" });
  }

  return res.status(200).json({ admit });
};

exports.getAllAdmitDetails = getAllAdmitDetails;
exports.addData = addData;
exports.getById = getById;
exports.updateAdmitData = updateAdmitData;
exports.deleteAdmitData = deleteAdmitData;
exports.admitCount = admitCount;
exports.getByNIC = getByNIC;
exports.getByAdmitID = getByAdmitID;
