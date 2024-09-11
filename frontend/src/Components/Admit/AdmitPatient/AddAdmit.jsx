/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import HomeNav from "../Home/HomeNav";
import "./admin.css";
function AddAdmit() {
  const navigate = useNavigate();
  const [section, setSection] = useState(1); // Controls the form sections
  const [inputs, setInputs] = useState({
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
    admitID: "",
    medications: "",
    past: "",
    symptoms: "",
    prescription: "",
    nic: "", // Added NIC field
  });
  const [hospitals, setHospitals] = useState([]);
  const [admitCount, setAdmitCount] = useState(0);
  const maxAdmits = 1; // Maximum allowed admits per hospital per day

  const generateAdmitID = () => {
    const prefix = "AD";
    const randomNumber = Math.floor(100000000 + Math.random() * 900000000);
    return `${prefix}${randomNumber}`;
  };

  useEffect(() => {
    const fetchHospitals = async () => {
      const mockHospitals = [
        { _id: "1", hospitalname: "City Hospital" },
        { _id: "2", hospitalname: "Medical Center" },
        { _id: "3", hospitalname: "Health Clinic" },
        { _id: "4", hospitalname: "Community Hospital" },
        { _id: "5", hospitalname: "Central Hospital" },
      ];
      setHospitals(mockHospitals);
      setInputs((prevInputs) => ({
        ...prevInputs,
        admitID: generateAdmitID(),
      }));
    };

    fetchHospitals();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  const checkAvailability = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8081/admit/admitCount?hospital=${inputs.hospital}&date=${inputs.date}`
      );
      const count = response.data.count;
      setAdmitCount(count);

      if (count >= maxAdmits) {
        alert("Hospital has reached the maximum admit capacity for the day.");
      } else {
        setSection(2); // Proceed to the next section if availability is confirmed
      }
    } catch (error) {
      console.error("Error checking availability", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendRequest();
      localStorage.setItem("admitID", inputs.admitID); // Save admit ID to local storage
      alert("Admit added successfully!");
      setSection(4); // Proceed to the final section
    } catch (error) {
      console.error("Error adding admit", error);
    }
  };

  const sendRequest = async () => {
    await axios.post("http://localhost:8081/admit", {
      hospital: inputs.hospital,
      date: inputs.date,
      fullname: inputs.fullname,
      dob: inputs.dob,
      gender: inputs.gender,
      phone: inputs.phone,
      address: inputs.address,
      guardian: inputs.guardian,
      relationship: inputs.relationship,
      contact: inputs.contact,
      admitID: inputs.admitID,
      medications: inputs.medications,
      past: inputs.past,
      symptoms: inputs.symptoms,
      prescription: inputs.prescription,
      nic: inputs.nic, // Send NIC field
    });
  };

  return (
    <div>
      <HomeNav />
      <div className="admit_home_bk">
        <div className="form_full_admit">
          <div>
            {section === 1 && (
              <div className="from_one">
                <div className="admit_form_full">
                  <h1 className="form_head_admit">
                    Check Hospital Availability
                  </h1>
                  <form onSubmit={(e) => e.preventDefault()}>
                    <div className="input_group">
                      <div className="form_group_admit">
                        <div>
                          <label htmlFor="hospital">Select Hospital:</label>
                          <br />
                          <select
                            id="hospital"
                            name="hospital"
                            className="form_input_colum"
                            value={inputs.hospital}
                            onChange={handleChange}
                            required
                          >
                            <option value="">Select Hospital</option>
                            {hospitals.map((hospital) => (
                              <option
                                key={hospital._id}
                                value={hospital.hospitalname}
                              >
                                {hospital.hospitalname}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <div className="form-group">
                            <label htmlFor="date">Select Date:</label>
                            <br />
                            <input
                              type="date"
                              id="date"
                              name="date"
                              className="form_input_colum"
                              value={inputs.date}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="submit_btn_checkbtn"
                      onClick={checkAvailability}
                    >
                      Check Availability
                    </button>
                  </form>
                </div>
              </div>
            )}

            {section === 2 && (
              <div className="from_one">
                <div className="admit_form_full">
                  <h1 className="form_head_admit">Enter Patient Details</h1>
                  <form onSubmit={(e) => e.preventDefault()}>
                    <div className="input_group">
                      <div className="form_group_admit">
                        <div className="form-group">
                          <label htmlFor="fullname">Full Name:</label>
                          <br />
                          <input
                            type="text"
                            id="fullname"
                            name="fullname"
                            className="form_input_colum"
                            value={inputs.fullname}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="dob">Date of Birth:</label>
                          <br />
                          <input
                            type="date"
                            id="dob"
                            name="dob"
                            className="form_input_colum"
                            value={inputs.dob}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div className="form_group_admit">
                      <div className="form_group_admit">
                        <div className="form-group">
                          <label htmlFor="gender">Gender:</label>
                          <br />
                          <select
                            id="gender"
                            name="gender"
                            className="form_input_colum"
                            value={inputs.gender}
                            onChange={handleChange}
                            required
                          >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label htmlFor="phone">Phone:</label>
                          <br />
                          <input
                            type="text"
                            id="phone"
                            pattern="[0-9]{10}"
                            name="phone"
                            className="form_input_colum"
                            value={inputs.phone}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="address">Address:</label>
                      <br />
                      <input
                        type="text"
                        id="address"
                        name="address"
                        className="form_input_colum_full"
                        value={inputs.address}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="input_group">
                      <div className="form_group_admit">
                        <div className="form-group">
                          <label htmlFor="guardian">Guardian Name:</label>
                          <br />
                          <input
                            type="text"
                            id="guardian"
                            name="guardian"
                            className="form_input_colum"
                            value={inputs.guardian}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="relationship">Relationship:</label>
                          <br />
                          <input
                            type="text"
                            id="relationship"
                            name="relationship"
                            className="form_input_colum"
                            value={inputs.relationship}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div className="form_group_admit">
                      <div className="form-group">
                        <label htmlFor="contact">Emergency Contact:</label>
                        <br />
                        <input
                          type="number"
                          id="contact"
                          pattern="[0-9]{10}"
                          name="contact"
                          className="form_input_colum"
                          value={inputs.contact}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="nic">NIC:</label>
                        <br />
                        <input
                          type="text"
                          id="nic"
                          name="nic"
                          className="form_input_colum"
                          value={inputs.nic}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <button
                      type="button"
                      className="submit_btn_checkbtn"
                      onClick={() => setSection(3)}
                    >
                      Next
                    </button>
                  </form>
                </div>
              </div>
            )}

            {section === 3 && (
              <div className="from_one">
                <div className="admit_form_full with_set">
                  <h1 className="form_head_admit">Enter Medical Information</h1>
                  <form onSubmit={handleSubmit}>
                    <div className="">
                      <div className="form-group">
                        <label htmlFor="medications">Medications:</label>
                        <br />
                        <textarea
                          id="medications"
                          name="medications"
                          className="form_input_colum_full"
                          value={inputs.medications}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="past">Past Medical History:</label>
                      <br />
                      <textarea
                        id="past"
                        name="past"
                        className="form_input_colum_full"
                        value={inputs.past}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="symptoms">Symptoms:</label>
                      <br />
                      <textarea
                        id="symptoms"
                        name="symptoms"
                        className="form_input_colum_full"
                        value={inputs.symptoms}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="prescription">Prescription:</label>
                      <br />
                      <textarea
                        id="prescription"
                        name="prescription"
                        className="form_input_colum_full"
                        value={inputs.prescription}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <button type="submit" className="submit_btn_checkbtn">
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            )}

            {section === 4 && (
              <div className="success_message">
                <h1>Admit Added Successfully!</h1>
                <p>Your admit ID is: {inputs.admitID}</p>
                <button onClick={() => navigate("/")}>Return Home</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddAdmit;
