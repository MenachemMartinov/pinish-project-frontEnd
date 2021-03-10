import { Link } from "react-router-dom";

const ManagerDashboard = () => {
  return (
    <div className="container-fluid bg-success p-0 m-0">
      <Link className="btn btn-dark btn-sm m-0" to="/new-card">
        כרטיס עסקים חדש
      </Link>{" "}
      <Link className="btn btn-dark btn-sm m-0" to="/new-category">
        קטגוריה חדשה
      </Link>
    </div>
  );
};

export default ManagerDashboard;
