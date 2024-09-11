/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import axios from 'axios';

function FetchAdmitData() {
  const [nic, setNIC] = useState('');
  const [admitID, setAdmitID] = useState('');
  const [admitData, setAdmitData] = useState(null);
  const [error, setError] = useState('');
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [updateForm, setUpdateForm] = useState({
    hospital: '',
    date: '',
    fullname: '',
    dob: '',
    gender: '',
    phone: '',
    address: '',
    guardian: '',
    relationship: '',
    contact: '',
    nic: '',
    medications: '',
    past: '',
    symptoms: '',
    prescription: ''
  });

  const fetchByNIC = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/admit/byNIC/${nic}`);
      setAdmitData(response.data.admit);
      setError('');
      setUpdateForm(response.data.admit); // Pre-fill update form with fetched data
      setShowUpdateForm(false); // Hide update form initially
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
      setUpdateForm(response.data.admit); // Pre-fill update form with fetched data
      setShowUpdateForm(false); // Hide update form initially
    } catch (err) {
      setError('No data found for the provided AdmitID.');
      setAdmitData(null);
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:8081/admit/${admitData._id}`, updateForm);
      setError('');
      alert('Record updated successfully');
      setShowUpdateForm(false); // Hide update form after updating
    } catch (err) {
      setError('Failed to update the record.');
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8081/admit/${admitData._id}`);
      setAdmitData(null);
      setError('');
      alert('Record deleted successfully');
      setShowUpdateForm(false); // Hide update form after deleting
    } catch (err) {
      setError('Failed to delete the record.');
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

          <button onClick={() => setShowUpdateForm(!showUpdateForm)}>
            {showUpdateForm ? 'Hide Update Form' : 'Show Update Form'}
          </button>

          {showUpdateForm && (
            <div>
              <h3>Update Record</h3>
              <input
                type="text"
                placeholder="Hospital"
                value={updateForm.hospital}
                onChange={(e) => setUpdateForm({ ...updateForm, hospital: e.target.value })}
              />
              <input
                type="text"
                placeholder="Date"
                value={updateForm.date}
                onChange={(e) => setUpdateForm({ ...updateForm, date: e.target.value })}
              />
              <input
                type="text"
                placeholder="Full Name"
                value={updateForm.fullname}
                onChange={(e) => setUpdateForm({ ...updateForm, fullname: e.target.value })}
              />
              <input
                type="text"
                placeholder="Date of Birth"
                value={updateForm.dob}
                onChange={(e) => setUpdateForm({ ...updateForm, dob: e.target.value })}
              />
              <input
                type="text"
                placeholder="Gender"
                value={updateForm.gender}
                onChange={(e) => setUpdateForm({ ...updateForm, gender: e.target.value })}
              />
              <input
                type="text"
                placeholder="Phone"
                value={updateForm.phone}
                onChange={(e) => setUpdateForm({ ...updateForm, phone: e.target.value })}
              />
              <input
                type="text"
                placeholder="Address"
                value={updateForm.address}
                onChange={(e) => setUpdateForm({ ...updateForm, address: e.target.value })}
              />
              <input
                type="text"
                placeholder="Guardian"
                value={updateForm.guardian}
                onChange={(e) => setUpdateForm({ ...updateForm, guardian: e.target.value })}
              />
              <input
                type="text"
                placeholder="Relationship"
                value={updateForm.relationship}
                onChange={(e) => setUpdateForm({ ...updateForm, relationship: e.target.value })}
              />
              <input
                type="text"
                placeholder="Contact"
                value={updateForm.contact}
                onChange={(e) => setUpdateForm({ ...updateForm, contact: e.target.value })}
              />
              <input
                type="text"
                placeholder="NIC"
                value={updateForm.nic}
                onChange={(e) => setUpdateForm({ ...updateForm, nic: e.target.value })}
              />
              <input
                type="text"
                placeholder="Medications"
                value={updateForm.medications}
                onChange={(e) => setUpdateForm({ ...updateForm, medications: e.target.value })}
              />
              <input
                type="text"
                placeholder="Past Medical History"
                value={updateForm.past}
                onChange={(e) => setUpdateForm({ ...updateForm, past: e.target.value })}
              />
              <input
                type="text"
                placeholder="Symptoms"
                value={updateForm.symptoms}
                onChange={(e) => setUpdateForm({ ...updateForm, symptoms: e.target.value })}
              />
              <input
                type="text"
                placeholder="Prescription"
                value={updateForm.prescription}
                onChange={(e) => setUpdateForm({ ...updateForm, prescription: e.target.value })}
              />
              <button onClick={handleUpdate}>Update Record</button>
            </div>
          )}
          <button onClick={handleDelete}>Delete Record</button>
        </div>
      )}
    </div>
  );
}

export default FetchAdmitData;
