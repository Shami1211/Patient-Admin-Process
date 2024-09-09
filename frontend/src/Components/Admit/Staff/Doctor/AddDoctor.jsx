import { useState, useEffect } from "react";
import axios from "axios";
import StafNav from "../StafNav";

function AddDoctor() {
  const [inputs, setInputs] = useState({
    doctorName: "",
    doctorID: "",
    gender: "",
    gmail: "",
    clinic: "",
    timeSlotStart: "",
    timeSlotEnd: "",
    date: "",
  });

  // eslint-disable-next-line no-unused-vars
  const [clinic, setClinics] = useState([]);
  const [clinicOptions, setClinicOptions] = useState([]);
  const [noClinicMessage, setNoClinicMessage] = useState("");

  const generateDoctorID = () => {
    const prefix = "DOC";
    const randomNumber = Math.floor(100000000 + Math.random() * 900000000);
    return `${prefix}${randomNumber}`;
  };

  useEffect(() => {
    // Fetch clinic data on component mount
    const fetchClinics = async () => {
      try {
        const response = await axios.get("http://localhost:8081/clinic");
        const clinicData = response.data.clinic;

        if (clinicData.length > 0) {
          setClinics(clinicData);
          setClinicOptions(
            clinicData.map((clinic) => ({
              id: clinic._id, // Use _id or clinicID depending on your model
              name: clinic.clinicname,
            }))
          );
          setNoClinicMessage("");
        } else {
          setNoClinicMessage("No clinic yet available.");
          setClinicOptions([]);
        }
      } catch (error) {
        console.error("Error fetching clinic data:", error);
        setNoClinicMessage("Error fetching clinic data.");
      }
    };

    fetchClinics();
    setInputs((prevInputs) => ({
      ...prevInputs,
      doctorID: generateDoctorID(),
    }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs);
    await sendRequest();
    window.alert("Doctor Added successfully!");
    window.location.href = "/dochome";
  };

  const sendRequest = async () => {
    await axios.post("http://localhost:8081/doctor", {
      doctorName: inputs.doctorName,
      doctorID: inputs.doctorID,
      gender: inputs.gender,
      gmail: inputs.gmail,
      clinic: inputs.clinic,
      timeSlotStart: inputs.timeSlotStart,
      timeSlotEnd: inputs.timeSlotEnd,
      date: inputs.date,
    });
  };

  return (
    <div>
      <div className="dental_from_background">
        <StafNav />
        <div className="form_full_dental">
          <div className="appointment_from_full">
            <h1 className="form_head_dental">Add New Doctor </h1>
            <form className="appointment-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label className="form-label" htmlFor="doctorID">
                  Doctor ID:
                </label>
                <br />
                <input
                  type="text"
                  id="doctorID"
                  name="doctorID"
                  className="form_input_service"
                  value={inputs.doctorID}
                  readOnly
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="doctorName">
                  Doctor Name:
                </label>
                <br />
                <input
                  type="text"
                  id="doctorName"
                  name="doctorName"
                  className="form_input_service"
                  value={inputs.doctorName}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="form-label" htmlFor="gender">
                  Gender:
                </label>
                <br />
                <select
                  id="gender"
                  name="gender"
                  className="form_input_service"
                  value={inputs.gender}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="gmail">
                  Gmail:
                </label>
                <br />
                <input
                  type="email"
                  id="gmail"
                  name="gmail"
                  className="form_input_service"
                  value={inputs.gmail}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="clinic">
                  Clinic:
                </label>
                <br />
                {noClinicMessage ? (
                  <p>{noClinicMessage}</p>
                ) : (
                  <select
                    id="clinic"
                    name="clinic"
                    className="form_input_service"
                    value={inputs.clinic}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Clinic</option>
                    {clinicOptions.map((clinic) => (
                      <option key={clinic.id} value={clinic.clinicname}>
                        {clinic.name}
                      </option>
                    ))}
                  </select>
                )}
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="timeSlot">
                  Add Time Slot:
                </label>
                <br />
                <input
                  type="time"
                  id="timeSlotStart"
                  name="timeSlotStart"
                  className="form-input"
                  value={inputs.timeSlotStart}
                  onChange={handleChange}
                  required
                />
                <label className="form-label" htmlFor="timeSlot">
                  - 
                </label>
                <input
                  type="time"
                  id="timeSlotEnd"
                  name="timeSlotEnd"
                  className="form-input"
                  value={inputs.timeSlotEnd}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="date">
                  Date:
                </label>
                <br />
                <input
                  type="date"
                  id="date"
                  name="date"
                  className="form_input_service"
                  value={inputs.date}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" className="submit_btn">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddDoctor;
