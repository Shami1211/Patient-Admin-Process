const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./Config/db.js");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express(); 

//Link Routs
const AppointmentRoute = require("./Routes/AppointmentRoutes.js");
const ClinicRoute = require("./Routes/ClinicRoutes.js");
const DoctorRoute = require("./Routes/DoctorRoutes.js");

dotenv.config();
connectDB();
app.use(cors());
app.use(express.json());

//Routes
app.use("/appointment", AppointmentRoute);
app.use("/clinic", ClinicRoute);
app.use("/doctor", DoctorRoute);

const PORT = process.env.PORT || 8081;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
