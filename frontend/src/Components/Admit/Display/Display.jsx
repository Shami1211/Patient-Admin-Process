import React, { useState } from 'react';
import axios from 'axios';

function FetchAdmitData() {
  const [nic, setNIC] = useState('');
  const [admitID, setAdmitID] = useState('');
  const [admitData, setAdmitData] = useState(null);
  const [error, setError] = useState('');

  const fetchByNIC = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/admit/byNIC/${nic}`);
      setAdmitData(response.data.admit);
      setError('');
    } catch (err) {
      setError('No data found for the provided NIC.');
      setAdmitData(null);
    }
  };

  const fetchByAdmitID = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/admit/byAdmitID/${admitID}`);
      setAdmitData(response.data.admit);
      setError('');
    } catch (err) {
      setError('No data found for the provided AdmitID.');
      setAdmitData(null);
    }
  };

  return (
    <div>
      <div>
        <h2>Fetch Data by NIC</h2>
        <input
          type="text"
          placeholder="Enter NIC"
          value={nic}
          onChange={(e) => setNIC(e.target.value)}
        />
        <button onClick={fetchByNIC}>Fetch Data</button>
      </div>
      <h2>OR</h2>
      <div>
        <h2>Fetch Data by AdmitID</h2>
        <input
          type="text"
          placeholder="Enter AdmitID"
          value={admitID}
          onChange={(e) => setAdmitID(e.target.value)}
        />
        <button onClick={fetchByAdmitID}>Fetch Data</button>
      </div>

      {error && <p>{error}</p>}

      {admitData && (
        <div>
          <h3>Admit Details:</h3>
          <p><strong>Hospital:</strong> {admitData.hospital}</p>
          <p><strong>Date:</strong> {admitData.date}</p>
          <p><strong>Full Name:</strong> {admitData.fullname}</p>
          <p><strong>Date of Birth:</strong> {admitData.dob}</p>
          <p><strong>Gender:</strong> {admitData.gender}</p>
          <p><strong>Phone:</strong> {admitData.phone}</p>
          <p><strong>Address:</strong> {admitData.address}</p>
          <p><strong>Guardian:</strong> {admitData.guardian}</p>
          <p><strong>Relationship:</strong> {admitData.relationship}</p>
          <p><strong>Contact:</strong> {admitData.contact}</p>
          <p><strong>Admit ID:</strong> {admitData.admitID}</p>
          <p><strong>NIC:</strong> {admitData.nic}</p>
          <p><strong>Medications:</strong> {admitData.medications}</p>
          <p><strong>Past Medical History:</strong> {admitData.past}</p>
          <p><strong>Symptoms:</strong> {admitData.symptoms}</p>
          <p><strong>Prescription:</strong> {admitData.prescription}</p>
        </div>
      )}
    </div>
  );
}

export default FetchAdmitData;
