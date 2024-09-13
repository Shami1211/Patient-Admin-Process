const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./Config/db.js");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const app = express();
app.use(cors({ origin: "http://localhost:5173" }));

//Link Routs
const admitRoutes = require("./Routes/AdmitRoutes.js");

dotenv.config();
connectDB();
app.use(cors());
app.use(express.json());

//Routes 
app.use("/admit", admitRoutes);
app.use(
  "/uploadsIMG",
  express.static(path.join(__dirname, "uploadsIMG"))
);
const PORT = process.env.PORT || 8081;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
