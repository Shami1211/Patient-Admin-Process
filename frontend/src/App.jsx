import React from "react";
import { Route, Routes } from "react-router";
import AddAdmit from "./Components/Admit/AdmitPatient/AddAdmit";

function App() {
  return (
    <div>
    
      <React.Fragment>
        <Routes>
         
          {/*Admit Patient */}
         
          <Route path="/" element={<AddAdmit />} />
          
         
        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;
