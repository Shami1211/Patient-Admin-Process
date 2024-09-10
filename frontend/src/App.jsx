import React from "react";
import { Route, Routes } from "react-router";
import AddAdmit from "./Components/Admit/AdmitPatient/AddAdmit";
import AdmitHome from "./Components/Admit/Home/Home";
import ViewDetails from "./Components/Admit/DisplayDetails/ViewDetails";


function App() {
  return (
    <div>
    
      <React.Fragment>
        <Routes>
         
          {/*Admit Patient */}
         
          <Route path="/" element={<AdmitHome />} />
          <Route path="/addadmit" element={<AddAdmit />} />
          <Route path="/admitdetails" element={<ViewDetails />} />
          
         
        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;
