import { Link } from "react-router-dom";

/***
 * the "BusinessDashboard" component 
 * the component will return a seceded dashboard with the a button to go create a new business card.
 */
const BusinessDashboard = () => {
  return (
    <div className="container-fluid bg-2 p-0 m-0">
      <Link className="btn btn-dark btn-sm m-0" to="/new-card">
        כרטיס עסקים חדש
      </Link>
    </div>
  );
};

export default BusinessDashboard;
