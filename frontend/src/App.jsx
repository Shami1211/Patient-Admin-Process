import React from "react";
import { Route, Routes } from "react-router";
import AddAppointment from "./Components/Dental/User/AddAppointment";
import MyAppointment from "./Components/Dental/User/MyAppointment";
import RescheduleaAppointments from "./Components/Dental/User/RescheduleaAppointments";
import AppointmentSummary from "./Components/Dental/User/AppointmentSummary";
import Stafhome from "./Components/Dental/Staff/Appointment/Stafhome";
import RescheduleaAppointmentsStaff from "./Components/Dental/Staff/Appointment/RescheduleaAppointmentsStaff";
import AddAppointmentStatus from "./Components/Dental/Staff/Appointment/AddAppointmentStatus";
import AddClinic from "./Components/Dental/Staff/Clinic/AddClinic";
import ClinicDash from "./Components/Dental/Staff/Clinic/ClinicDash";
import UpdateClinic from "./Components/Dental/Staff/Clinic/UpdateClinic";
import AddDoctor from "./Components/Dental/Staff/Doctor/AddDoctor";
import DoctorDash from "./Components/Dental/Staff/Doctor/DoctorDash";
import MyAppointmentDoctor from "./Components/Dental/Staff/Doctor/MyAppointmentDoctor";
import Home from "./Components/Dental/Home/Home";
import FAQ from "./Components/Dental/Home/FAQ.JSX";
function App() {
  return (
    <div>
      {/* <DentalNav /> */}
      <React.Fragment>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/faq" element={<FAQ />} />
          {/*Appointment */}
          {/*User */}
          <Route path="/addAppointment" element={<AddAppointment />} />
          <Route path="/myAppointment" element={<MyAppointment />} />
          <Route path="/appointmentsummary" element={<AppointmentSummary />} />
          <Route
            path="/rescheduleaAppointments/:id"
            element={<RescheduleaAppointments />}
          />
          {/*Staff */}
          <Route path="/stafhome" element={<Stafhome />} />
          <Route
            path="/modifyAppointmentsSatff/:id"
            element={<RescheduleaAppointmentsStaff />}
          />
          <Route
            path="/addAppointmentStatus/:id"
            element={<AddAppointmentStatus />}
          />
          {/*Clinic */}
          <Route path="/clinic" element={<ClinicDash />} />
          <Route path="/addCliinic" element={<AddClinic />} />
          <Route path="/updateclinic/:id" element={<UpdateClinic />} />
          {/*Doctor */}
          <Route path="/addDoctor" element={<AddDoctor />} />
          <Route path="/dochome" element={<DoctorDash />} />
          <Route
            path="/myAppointmentDoctor"
            element={<MyAppointmentDoctor />}
          />
        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;
