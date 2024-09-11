/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import axios from "axios";
import HomeNav from "../Home/HomeNav";
import "./admitdata.css";
function FetchAdmitData() {
  const [nic, setNIC] = useState("");
  const [admitID, setAdmitID] = useState("");
  const [admitData, setAdmitData] = useState(null);
  const [error, setError] = useState("");
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [showAdmitID, setShowAdmitID] = useState(true);
  const [updateForm, setUpdateForm] = useState({
    hospital: "",
    date: "",
    fullname: "",
    dob: "",
    gender: "",
    phone: "",
    address: "",
    guardian: "",
    relationship: "",
    contact: "",
    nic: "",
    medications: "",
    past: "",
    symptoms: "",
    prescription: "",
  });

  const fetchByNIC = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8081/admit/byNIC/${nic}`
      );
      setAdmitData(response.data.admit);
      setError("");
      setUpdateForm(response.data.admit); // Pre-fill update form with fetched data
      setShowUpdateForm(false); // Hide update form initially
    } catch (err) {
      setError("No data found for the provided NIC.");
      setAdmitData(null);
    }
  };

  const fetchByAdmitID = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8081/admit/byAdmitID/${admitID}`
      );
      setAdmitData(response.data.admit);
      setError("");
      setUpdateForm(response.data.admit); // Pre-fill update form with fetched data
      setShowUpdateForm(false); // Hide update form initially
    } catch (err) {
      setError("No data found for the provided AdmitID.");
      setAdmitData(null);
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(
        `http://localhost:8081/admit/${admitData._id}`,
        updateForm
      );
      setError("");
      alert("Record updated successfully");
      setShowUpdateForm(false); // Hide update form after updating
    } catch (err) {
      setError("Failed to update the record.");
    }
  };

  const handleDelete = async () => {
    // Show confirmation dialog
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this record?"
    );

    // If the user confirms, proceed with deletion
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:8081/admit/${admitData._id}`);
        setAdmitData(null);
        setError("");
        alert("Record deleted successfully");
        setShowUpdateForm(false);
      } catch (err) {
        setError("Failed to delete the record.");
      }
    }
  };

  // Function to toggle to NIC field
  const showNICField = () => {
    setShowAdmitID(false);
  };

  // Function to toggle to Admit ID field
  const showAdmitIDField = () => {
    setShowAdmitID(true);
  };

  return (
    <div>
      <HomeNav />
      <div className="check_gmail_box_admit">
        {showAdmitID ? (
          <div className="admit_gmail_box">
            <label className="form_label_gmail" htmlFor="admitID">
              Admit ID
            </label>{" "}
            <br />
            <input
              type="text"
              placeholder="Enter Admit ID"
              className="gmail_insert"
              value={admitID}
              onChange={(e) => setAdmitID(e.target.value)}
            />
            <button onClick={fetchByAdmitID} className="search_btn_admit">
              View
            </button>
            <p className="foget_check_fecht" onClick={showNICField}>
              Try by NIC
            </p>
          </div>
        ) : (
          <div className="admit_gmail_box">
            <label className="form_label_gmail" htmlFor="nic">
              NIC
            </label>

            <br />
            <input
              type="text"
              placeholder="Enter NIC"
              className="gmail_insert"
              value={nic}
              onChange={(e) => setNIC(e.target.value)}
            />
            <button className="search_btn_admit" onClick={fetchByNIC}>
              View
            </button>
            <p className="foget_check_fecht" onClick={showAdmitIDField}>
              Try by Admit ID
            </p>
          </div>
        )}
      </div>
      {error && <p>{error}</p>}
      {admitData && (
        <div className="data_card_admit">
          <div className="data_from_admit">
            <h3 className="main_topic_admit">Your Admit Details</h3>
            <div className="data_card_details_set">
              <div>
                {" "}
                <p className="admit_data_from_details">
                  <strong>Hospital:</strong> {admitData.hospital}
                </p>
                <p className="admit_data_from_details">
                  <strong>Date:</strong> {admitData.date}
                </p>
                <p className="admit_data_from_details">
                  <strong>Full Name:</strong> {admitData.fullname}
                </p>
                <p className="admit_data_from_details">
                  <strong>Date of Birth:</strong> {admitData.dob}
                </p>
                <p className="admit_data_from_details">
                  <strong>Gender:</strong> {admitData.gender}
                </p>
                <p className="admit_data_from_details">
                  <strong>Phone:</strong> {admitData.phone}
                </p>
                <p className="admit_data_from_details">
                  <strong>Address:</strong> {admitData.address}
                </p>
                <p className="admit_data_from_details">
                  <strong>Guardian:</strong> {admitData.guardian}
                </p>
              </div>
              <div>
                {" "}
                <p className="admit_data_from_details">
                  <strong>Relationship:</strong> {admitData.relationship}
                </p>
                <p className="admit_data_from_details">
                  <strong>Contact:</strong> {admitData.contact}
                </p>
                <p className="admit_data_from_details">
                  <strong>Admit ID:</strong> {admitData.admitID}
                </p>
                <p className="admit_data_from_details">
                  <strong>NIC:</strong> {admitData.nic}
                </p>
                <p className="admit_data_from_details">
                  <strong>Medications:</strong> {admitData.medications}
                </p>
                <p className="admit_data_from_details">
                  <strong>Past Medical History:</strong> {admitData.past}
                </p>
                <p className="admit_data_from_details">
                  <strong>Symptoms:</strong> {admitData.symptoms}
                </p>
                <p className="admit_data_from_details">
                  <strong>Prescription:</strong> {admitData.prescription}
                </p>
              </div>
            </div>
            <div className="data_action_card">
              <button
                className="admit_update"
                onClick={() => setShowUpdateForm(!showUpdateForm)}
              >
                {showUpdateForm ? "Hide Update Form" : "Show Update Form"}
              </button>
              <button className="admit_deletbtn2" onClick={handleDelete}>
                Delete Record
              </button>
            </div>

            {showUpdateForm && (
              <div>
                <h3 className="main_topic_admit">Update Record</h3>
                <div className="from_data_sectn">
                  <div>
                    {" "}
                    <label className="admit_card_label">Hospital:</label>
                    <br />
                    <input
                      type="text"
                      placeholder="Hospital"
                      className="form_input_colum_update"
                      value={updateForm.hospital}
                      readOnly
                      onChange={(e) =>
                        setUpdateForm({
                          ...updateForm,
                          hospital: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    {" "}
                    <label className="admit_card_label">Date:</label>
                    <br />
                    <input
                      type="date"
                      placeholder="Date"
                      className="form_input_colum_update"
                      value={updateForm.date}
                      readOnly
                      onChange={(e) =>
                        setUpdateForm({ ...updateForm, date: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="from_data_sectn">
                  <div>
                    {" "}
                    <label className="admit_card_label">Full Name:</label>
                    <br />
                    <input
                      type="text"
                      placeholder="Full Name"
                      className="form_input_colum_update"
                      value={updateForm.fullname}
                      onChange={(e) =>
                        setUpdateForm({
                          ...updateForm,
                          fullname: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    {" "}
                    <label className="admit_card_label">date of birth:</label>
                    <br />
                    <input
                      type="date"
                      placeholder="Date of Birth"
                      value={updateForm.dob}
                      className="form_input_colum_update"
                      onChange={(e) =>
                        setUpdateForm({ ...updateForm, dob: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="from_data_sectn">
                  <div>
                    {" "}
                    <label className="admit_card_label">gender:</label>
                    <br />
                    <select
                      type="text"
                      placeholder="Gender"
                      className="form_input_colum_update"
                      value={updateForm.gender}
                      onChange={(e) =>
                        setUpdateForm({ ...updateForm, gender: e.target.value })
                      }
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    {" "}
                    <label className="admit_card_label">phone:</label>
                    <br />
                    <input
                      type="text"
                      placeholder="Phone"
                      className="form_input_colum_update"
                      value={updateForm.phone}
                      onChange={(e) =>
                        setUpdateForm({ ...updateForm, phone: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="from_data_sectn">
                  <div>
                    {" "}
                    <label className="admit_card_label">address:</label>
                    <br />
                    <input
                      type="text"
                      placeholder="Address"
                      className="form_input_colum_update"
                      value={updateForm.address}
                      onChange={(e) =>
                        setUpdateForm({
                          ...updateForm,
                          address: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    {" "}
                    <label className="admit_card_label">gurdian:</label>
                    <br />
                    <input
                      type="text"
                      placeholder="Guardian"
                      className="form_input_colum_update"
                      value={updateForm.guardian}
                      onChange={(e) =>
                        setUpdateForm({
                          ...updateForm,
                          guardian: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="from_data_sectn">
                  <div>
                    {" "}
                    <label className="admit_card_label">Relationship:</label>
                    <br />
                    <input
                      type="text"
                      placeholder="Relationship"
                      className="form_input_colum_update"
                      value={updateForm.relationship}
                      onChange={(e) =>
                        setUpdateForm({
                          ...updateForm,
                          relationship: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className="admit_card_label">contact:</label>
                    <br />
                    <input
                      type="text"
                      placeholder="Contact"
                      value={updateForm.contact}
                      className="form_input_colum_update"
                      onChange={(e) =>
                        setUpdateForm({
                          ...updateForm,
                          contact: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="from_data_sectn">
                  <div>
                    {" "}
                    <label className="admit_card_label">NIC:</label>
                    <br />
                    <input
                      type="text"
                      placeholder="NIC"
                      value={updateForm.nic}
                      className="form_input_colum_update"
                      onChange={(e) =>
                        setUpdateForm({ ...updateForm, nic: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    {" "}
                    <label className="admit_card_label">medications:</label>
                    <br />
                    <input
                      type="text"
                      placeholder="Medications"
                      className="form_input_colum_update"
                      value={updateForm.medications}
                      onChange={(e) =>
                        setUpdateForm({
                          ...updateForm,
                          medications: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="from_data_sectn">
                  <div>
                    {" "}
                    <label className="admit_card_label">medical history:</label>
                    <br />
                    <input
                      type="text"
                      className="form_input_colum_update"
                      placeholder="Past Medical History"
                      value={updateForm.past}
                      onChange={(e) =>
                        setUpdateForm({ ...updateForm, past: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    {" "}
                    <label className="admit_card_label">symptoms:</label>
                    <br />
                    <input
                      type="text"
                      placeholder="Symptoms"
                      className="form_input_colum_update"
                      value={updateForm.symptoms}
                      onChange={(e) =>
                        setUpdateForm({
                          ...updateForm,
                          symptoms: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="">
                  <div>
                    {" "}
                    <label className="admit_card_label">prescription:</label>
                    <br />
                    <input
                      type="text"
                      className="form_input_columal"
                      placeholder="Prescription"
                      value={updateForm.prescription}
                      onChange={(e) =>
                        setUpdateForm({
                          ...updateForm,
                          prescription: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div></div>
                </div>

                <button className="search_btn_admit" onClick={handleUpdate}>
                  Update Record
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      <br /> <br /> <br />
      <br />
    </div>
  );
}

export default FetchAdmitData;
