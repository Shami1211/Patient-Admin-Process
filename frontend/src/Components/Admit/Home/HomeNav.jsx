import { useLocation } from "react-router-dom";
import "./Home.css";

function HomeNav() {
  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path ? "nav_active_admit" : "";

  return (
    <div>
      <div className="admit_nav_bar_full">
        <div className="admit_nav_left">
          <h1 className="logo_word">
            Health
            <span className="logo_sub_word">Hugs</span>
          </h1>
        </div>
        <div className="admit_nav_right">
          <h3
            className={`nav_item_admit ${isActive("/")}`}
            onClick={() => (window.location.href = "/")}
          >
            Home
          </h3>
          <h3 className={`nav_item_admit ${isActive("/services")}`}>
            Services
          </h3>
          <h3 className={`nav_item_admit ${isActive("/about")}`}>
            About Us
          </h3>
          <h3 className={`nav_item_admit ${isActive("/contact")}`}>
            Contact
          </h3>
          <h3 className={`nav_item_admit ${isActive("/myorders")}`}>
            My Order
          </h3>
          <h3
            className={`nav_item_admit ${isActive("/adminAdmit")}`}
            onClick={() => (window.location.href = "/adminAdmit")}
          >
            Staff
          </h3>
        </div>
      </div>
    </div>
  );
}

export default HomeNav;
