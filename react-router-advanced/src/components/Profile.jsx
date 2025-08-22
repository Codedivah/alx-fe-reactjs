import {Link, Outlet} from "react-router-dom";


function Profile() {
  return (
    <div>
      <h1>Profile Page</h1>
      <nav>
        <ul>
          <li><Link to="ProfileDetails">Details</Link></li>
          <li><Link to="ProfileSettings">Settings</Link></li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}
export default Profile;