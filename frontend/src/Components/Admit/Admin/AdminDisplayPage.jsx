/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import HomeNav from "../Home/HomeNav";

function DisplayAllAdmits() {
  const [admitData, setAdmitData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAdmitData = async () => {
      try {
        const response = await axios.get("http://localhost:8081/admit");
        setAdmitData(response.data.admit);
        setFilteredData(response.data.admit);
        setError("");
      } catch (err) {
        setError("Failed to fetch data");
        setAdmitData([]);
        setFilteredData([]);
      }
    };

    fetchAdmitData();
  }, []);

  // Search functionality
  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = admitData.filter((admit) =>
      Object.values(admit).some((val) =>
        val.toString().toLowerCase().includes(value)
      )
    );
    setFilteredData(filtered);
  };

  // Generate and download report
  const generateReport = () => {
    const doc = new jsPDF();
    doc.text("Admit Records Report", 14, 16);
    doc.autoTable({
      head: [
        [
          "Hospital",
          "Date",
          "Full Name",
          "Date of Birth",
          "Gender",
          "Phone",
          "Address",
          "Guardian",
          "Relationship",
          "Contact",
          "Admit ID",
          "NIC",
          "Medications",
          "Past Medical History",
          "Symptoms",
          "Prescription",
        ],
      ],
      body: filteredData.map((admit) => [
        admit.hospital,
        admit.date,
        admit.fullname,
        admit.dob,
        admit.gender,
        admit.phone,
        admit.address,
        admit.guardian,
        admit.relationship,
        admit.contact,
        admit.admitID,
        admit.nic,
        admit.medications,
        admit.past,
        admit.symptoms,
        admit.prescription,
      ]),
    });
    doc.save("admit_records_report.pdf");
  };

  return (
    <div>
      <HomeNav />
      <div className="">
        <div className="main_admit_staf">
          <h2 className="topic_admin_admit">All Admit Records</h2>
          {error && <p>{error}</p>}

          <div className="action_set_staf">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              className="search_input"
              onChange={handleSearch}
            />
            <button className="search_btn" onClick={generateReport}>
              Generate Report
            </button>
          </div>
          <br />
          <div className="table_container">
            <table className="admit_table">
              <thead>
                <tr className="admin_tbl_tr">
                  <th className="admit_table_th">Hospital</th>
                  <th className="admit_table_th">Date</th>
                  <th className="admit_table_th">Full Name</th>
                  <th className="admit_table_th">Date of Birth</th>
                  <th className="admit_table_th">Gender</th>
                  <th className="admit_table_th">Phone</th>
                  <th className="admit_table_th">Address</th>
                  <th className="admit_table_th">Guardian</th>
                  <th className="admit_table_th">Relationship</th>
                  <th className="admit_table_th">Contact</th>
                  <th className="admit_table_th">Admit ID</th>
                  <th className="admit_table_th">NIC</th>
                  <th className="admit_table_th">Medications</th>
                  <th className="admit_table_th">Past Medical History</th>
                  <th className="admit_table_th">Symptoms</th>
                  <th className="admit_table_th">Prescription</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((admit) => (
                    <tr key={admit._id}>
                      <td className="admit_table_td">{admit.hospital}</td>
                      <td className="admit_table_td">{admit.date}</td>
                      <td className="admit_table_td">{admit.fullname}</td>
                      <td className="admit_table_td">{admit.dob}</td>
                      <td className="admit_table_td">{admit.gender}</td>
                      <td className="admit_table_td">{admit.phone}</td>
                      <td className="admit_table_td">{admit.address}</td>
                      <td className="admit_table_td">{admit.guardian}</td>
                      <td className="admit_table_td">{admit.relationship}</td>
                      <td className="admit_table_td">{admit.contact}</td>
                      <td className="admit_table_td">{admit.admitID}</td>
                      <td className="admit_table_td">{admit.nic}</td>
                      <td className="admit_table_td">{admit.medications}</td>
                      <td className="admit_table_td">{admit.past}</td>
                      <td className="admit_table_td">{admit.symptoms}</td>
                      <td className="admit_table_td">{admit.prescription}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="16">No records found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DisplayAllAdmits;
