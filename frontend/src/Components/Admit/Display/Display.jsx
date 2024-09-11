import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

function ViewAdmit() {
  const [admit, setAdmit] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const admitID = localStorage.getItem("admitID"); // Get admitID from local storage
    if (!admitID) {
      alert("Admit ID not found in local storage.");
      navigate("/");
      return;
    }

    const fetchAdmitDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/admit/${admitID}`);
        setAdmit(response.data.admit);
      } catch (error) {
        console.error("Error fetching admit details", error);
        alert("Failed to fetch admit details.");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    fetchAdmitDetails();
  }, [navigate]);

  if (loading) return <div>Loading...</div>;

  if (!admit) return <div>No admit details found.</div>;

  return (
    <div className="admit_details">
      <h1>Admit Details</h1>
      <p><strong>Hospital:</strong> {admit.hospital}</p>
      <p><strong>Date:</strong> {admit.date}</p>
      <p><strong>Full Name:</strong> {admit.fullname}</p>
      <p><strong>Date of Birth:</strong> {admit.dob}</p>
      <p><strong>Gender:</strong> {admit.gender}</p>
      <p><strong>Phone:</strong> {admit.phone}</p>
      <p><strong>Address:</strong> {admit.address}</p>
      <p><strong>Guardian:</strong> {admit.guardian}</p>
      <p><strong>Relationship:</strong> {admit.relationship}</p>
      <p><strong>Emergency Contact:</strong> {admit.contact}</p>
      <p><strong>Medications:</strong> {admit.medications}</p>
      <p><strong>Past Medical History:</strong> {admit.past}</p>
      <p><strong>Symptoms:</strong> {admit.symptoms}</p>
      <p><strong>Prescription:</strong> {admit.prescription}</p>
      <button onClick={() => navigate("/")}>Return Home</button>
    </div>
  );
}

export default ViewAdmit;
