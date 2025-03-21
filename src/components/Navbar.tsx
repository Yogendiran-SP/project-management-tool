import { FaBell, FaUserCircle } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Clears authentication
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="bg-gray-900 text-white p-4 flex justify-between items-center">
      <h2 className="text-lg font-semibold">Dashboard</h2>

      <div className="flex items-center gap-6">
        <FaBell className="text-xl cursor-pointer hover:text-gray-400" />

        <div className="flex items-center gap-2">
          <FaUserCircle className="text-2xl cursor-pointer hover:text-gray-400" />
          <span className="text-sm">{user ? user : "Guest"}</span>
        </div>

        <button
          onClick={handleLogout}
          className="bg-red-500 px-3 py-1 rounded text-sm hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
// In the Navbar component, we're using the useAuth hook to access the user and logout function. We're also using the useNavigate hook to redirect the user to the login page after logging out.
