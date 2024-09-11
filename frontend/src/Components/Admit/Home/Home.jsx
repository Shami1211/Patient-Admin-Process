import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  const handleAddNewClick = () => {
    navigate('/addadmit'); // Navigate to the Add Admit page
  };

  const handleViewDetailsClick = () => {
    const admitID = localStorage.getItem('admitID');
    if (admitID) {
      navigate(`/admitdetails/${admitID}`); // Use admitID for navigation
    } else {
      alert("No admit ID found in local storage.");
    }
  };

  return (
    <div className="home-container">
      <h1>Hospital Admission System</h1>
      
      <div className="button-group">
        <button className="home-button" onClick={handleAddNewClick}>
          Add New Admit
        </button>
        <button className="home-button" onClick={handleViewDetailsClick}>
          View Admit Details
        </button>
      </div>
    </div>
  );
}

export default Home;
