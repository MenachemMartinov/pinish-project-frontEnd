import { Link } from "react-router-dom";


/***
 * the "ManagerDashboard" component 
 * the component will return a seceded dashboard with the 2 button 
 * 1 to go create a new business card.
 * 2 to create a new category
 */
const ManagerDashboard = () => {
  return (
    <div className="container-fluid bg-2 p-0 m-0">
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
