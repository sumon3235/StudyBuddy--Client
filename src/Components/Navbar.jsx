import { Link } from "react-router";
import useAuth from "../Providers/useAuth";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user, logOut, setUser } = useAuth();

  const handleLogOut = () => {
    logOut()
      .then(() => {
        setUser(null);
        toast.success("Logout Successful");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>

            {/* Larger Devive */}
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/all-assignments">Assignments</Link>
              </li>
              <li>
                <a>Item 3</a>
              </li>
            </ul>
          </div>
          <Link to="/" className="text-xl">
            StudyBuddy
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          {/* Small Device */}
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to="/all-assignments">Assignments</Link>
            </li>
            <li>
              {user && (<Link to="/pending-assignments">Pending Assignments</Link>)}
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          {!user ? (
            <Link className="btn" to="/login">
              Login
            </Link>
          ) : (
            <>
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  title={user?.displayName}
                  className="cursor-pointer avatar"
                >
                  <div className="w-10 h-10 rounded-full border border-primary overflow-hidden">
                    <img
                      className="w-full h-full object-cover"
                      alt={user?.displayName}
                      src={user?.photoURL}
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
                >
                  <li>
                    <Link to="/create-assignment">Create Assignment</Link>
                  </li>
                  <li>
                    <Link to="/my-assignments">My Assignments</Link>
                  </li>
                  <li>
                    <button onClick={handleLogOut}>Logout</button>
                  </li>
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
