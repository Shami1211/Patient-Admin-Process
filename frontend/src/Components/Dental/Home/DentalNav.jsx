import { useLocation } from "react-router-dom";
import "./Home.css";

function DentalNav() {
  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path ? "nav_active_dental" : "";

  return (
    <div>
      <div className="Dental_nav_bar_full">
        <div className="Dental_nav_left">
          <h1 className="logo_word">
            Health
            <span className="logo_sub_word">Hugs</span>
          </h1>
        </div>
        <div className="Dental_nav_right">
          <h3
            className={`nav_item_dental ${isActive("/")}`}
            onClick={() => (window.location.href = "/")}
          >
            Home
          </h3>
          <h3 className={`nav_item_dental ${isActive("/services")}`}>
            Services
          </h3>
          <h3 className={`nav_item_dental ${isActive("/about")}`}>About Us</h3>
          <h3 className={`nav_item_dental ${isActive("/contact")}`}>Contact</h3>
          <h3
            className={`nav_item_dental ${isActive("/myAppointment")}`}
            onClick={() => (window.location.href = "/myAppointment")}
          >
            Dental
          </h3>
          <h3
            className={`nav_item_dental ${isActive("/stafhome")}`}
            onClick={() => (window.location.href = "/stafhome")}
          >
            Staff
          </h3>
          <h3
            className={`nav_item_dental ${isActive("/myAppointmentDoctor")}`}
            onClick={() => (window.location.href = "/myAppointmentDoctor")}
          >
            Doctor
          </h3>
          <h3
            className={`nav_item_dental ${isActive("/faq")}`}
            onClick={() => (window.location.href = "/faq")}
          >
            FAQ
          </h3>
        </div>
      </div>
    </div>
  );
}

export default DentalNav;
