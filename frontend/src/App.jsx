import React from "react";
import { Route, Routes } from "react-router";
import AddAdmit from "./Components/Admit/AdmitPatient/AddAdmit";
import AdmitHome from "./Components/Admit/Home/Home";
import ViewAdmit from "./Components/Admit/Display/Display";
import AdminDisplayPage from "./Components/Admit/Admin/AdminDisplayPage";
import UpdateData from "./Components/Admit/Display/UpdateData";

function App() {
  return (
    <div>
      <React.Fragment>
        <Routes>
          {/*Admit Patient */}
          <Route path="/" element={<AdmitHome />} />
          <Route path="/addadmit" element={<AddAdmit />} />
          <Route path="/admitdetails" element={<ViewAdmit />} />
          <Route path="/adminAdmit" element={<AdminDisplayPage />} />
          <Route path="/admitUpdate/:id" element={<UpdateData />} />
        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;
