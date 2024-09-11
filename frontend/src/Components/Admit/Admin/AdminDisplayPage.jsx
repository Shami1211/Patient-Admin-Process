import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

function DisplayAllAdmits() {
  const [admitData, setAdmitData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAdmitData = async () => {
      try {
        const response = await axios.get('http://localhost:8081/admit');
        setAdmitData(response.data.admit);
        setFilteredData(response.data.admit);
        setError('');
      } catch (err) {
        setError('Failed to fetch data');
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
    const filtered = admitData.filter(admit =>
      Object.values(admit).some(val =>
        val.toString().toLowerCase().includes(value)
      )
    );
    setFilteredData(filtered);
  };

  // Generate and download report
  const generateReport = () => {
    const doc = new jsPDF();
    doc.text('Admit Records Report', 14, 16);
    doc.autoTable({
      head: [['Hospital', 'Date', 'Full Name', 'Date of Birth', 'Gender', 'Phone', 'Address', 'Guardian', 'Relationship', 'Contact', 'Admit ID', 'NIC', 'Medications', 'Past Medical History', 'Symptoms', 'Prescription']],
      body: filteredData.map(admit => [
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
        admit.prescription
      ]),
    });
    doc.save('admit_records_report.pdf');
  };

  return (
    <div>
      <h2>All Admit Records</h2>
      {error && <p>{error}</p>}
      
      <div>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <button onClick={generateReport}>Generate Report</button>
      </div>
      
      <table>
        <thead>
          <tr>
            <th>Hospital</th>
            <th>Date</th>
            <th>Full Name</th>
            <th>Date of Birth</th>
            <th>Gender</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Guardian</th>
            <th>Relationship</th>
            <th>Contact</th>
            <th>Admit ID</th>
            <th>NIC</th>
            <th>Medications</th>
            <th>Past Medical History</th>
            <th>Symptoms</th>
            <th>Prescription</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length > 0 ? (
            filteredData.map((admit) => (
              <tr key={admit._id}>
                <td>{admit.hospital}</td>
                <td>{admit.date}</td>
                <td>{admit.fullname}</td>
                <td>{admit.dob}</td>
                <td>{admit.gender}</td>
                <td>{admit.phone}</td>
                <td>{admit.address}</td>
                <td>{admit.guardian}</td>
                <td>{admit.relationship}</td>
                <td>{admit.contact}</td>
                <td>{admit.admitID}</td>
                <td>{admit.nic}</td>
                <td>{admit.medications}</td>
                <td>{admit.past}</td>
                <td>{admit.symptoms}</td>
                <td>{admit.prescription}</td>
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
  );
}

export default DisplayAllAdmits;
