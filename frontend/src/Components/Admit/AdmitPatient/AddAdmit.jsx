import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

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
    medications: "", // Added new fields
    past: "",
    symptoms: "",
    prescription: "",
  });
  const [hospitals, setHospitals] = useState([]);
  const [admitCount, setAdmitCount] = useState(0);
  const maxAdmits = 20; // Maximum allowed admits per hospital per day

  const generateAdmitID = () => {
    const prefix = "AD";
    const randomNumber = Math.floor(100000000 + Math.random() * 900000000);
    return `${prefix}${randomNumber}`;
  };

  useEffect(() => {
    // Fetch hospitals on component mount
    const fetchHospitals = async () => {
      // Mock data
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
      alert("Admit Added successfully!");
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
      medications: inputs.medications, // Added new fields
      past: inputs.past,
      symptoms: inputs.symptoms,
      prescription: inputs.prescription,
    });
  };

  return (
    <div>
      <div className="admit_form_background">
        <div className="form_full_admit">
          <div className="admit_form_full">
            {section === 1 && (
              <>
                <h1 className="form_head_admit">Check Hospital Availability</h1>
                <form onSubmit={(e) => e.preventDefault()}>
                  <div className="input_group">
                    <div className="form-group">
                      <label htmlFor="hospital">Select Hospital:</label>
                      <select
                        id="hospital"
                        name="hospital"
                        className="form-input"
                        value={inputs.hospital}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Hospital</option>
                        {hospitals.map((hospital) => (
                          <option key={hospital._id} value={hospital.hospitalname}>
                            {hospital.hospitalname}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="date">Select Date:</label>
                      <input
                        type="date"
                        id="date"
                        name="date"
                        className="form-input"
                        value={inputs.date}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <button type="button" className="submit_btn" onClick={checkAvailability}>
                    Check Availability
                  </button>
                </form>
              </>
            )}

            {section === 2 && (
              <>
                <h1 className="form_head_admit">Enter Patient Details</h1>
                <form onSubmit={(e) => e.preventDefault()}>
                  <div className="input_group">
                    <div className="form-group">
                      <label htmlFor="fullname">Full Name:</label>
                      <input
                        type="text"
                        id="fullname"
                        name="fullname"
                        className="form-input"
                        value={inputs.fullname}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="dob">Date of Birth:</label>
                      <input
                        type="date"
                        id="dob"
                        name="dob"
                        className="form-input"
                        value={inputs.dob}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="input_group">
                    <div className="form-group">
                      <label htmlFor="gender">Gender:</label>
                      <select
                        id="gender"
                        name="gender"
                        className="form-input"
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
                      <input
                        type="text"
                        id="phone"
                        pattern="[0-9]{10}"
                        name="phone"
                        className="form-input"
                        value={inputs.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="address">Address:</label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      className="form-input"
                      value={inputs.address}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="input_group">
                    <div className="form-group">
                      <label htmlFor="guardian">Guardian Name:</label>
                      <input
                        type="text"
                        id="guardian"
                        name="guardian"
                        className="form-input"
                        value={inputs.guardian}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="relationship">Relationship:</label>
                      <input
                        type="text"
                        id="relationship"
                        name="relationship"
                        className="form-input"
                        value={inputs.relationship}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="contact">Emergency Contact:</label>
                    <input
                      type="text"
                      id="contact"
                      pattern="[0-9]{10}"
                      name="contact"
                      className="form-input"
                      value={inputs.contact}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <button type="button" className="submit_btn" onClick={() => setSection(3)}>
                    Next: Medical Information
                  </button>
                </form>
              </>
            )}

            {section === 3 && (
              <>
                <h1 className="form_head_admit">Enter Medical Information</h1>
                <form onSubmit={handleSubmit}>
                  <div className="input_group">
                    <div className="form-group">
                      <label htmlFor="medications">Medications:</label>
                      <input
                        type="text"
                        id="medications"
                        name="medications"
                        className="form-input"
                        value={inputs.medications}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="past">Past Medical History:</label>
                      <textarea
                        id="past"
                        name="past"
                        className="form-input"
                        value={inputs.past}
                        onChange={handleChange}
                        required
                      ></textarea>
                    </div>
                  </div>
                  <div className="input_group">
                    <div className="form-group">
                      <label htmlFor="symptoms">Symptoms:</label>
                      <textarea
                        id="symptoms"
                        name="symptoms"
                        className="form-input"
                        value={inputs.symptoms}
                        onChange={handleChange}
                        required
                      ></textarea>
                    </div>
                    <div className="form-group">
                      <label htmlFor="prescription">Prescription:</label>
                      <textarea
                        id="prescription"
                        name="prescription"
                        className="form-input"
                        value={inputs.prescription}
                        onChange={handleChange}
                        required
                      ></textarea>
                    </div>
                  </div>
                  <button type="submit" className="submit_btn">
                    Submit Admit Details
                  </button>
                </form>
              </>
            )}

            {section === 4 && (
              <div className="submit_section">
                <h1>Admit Successfully Submitted!</h1>
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
