import { FaTasks, FaProjectDiagram, FaHome, FaCog } from "react-icons/fa";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="h-screen w-64 bg-gray-800 text-white p-5">
      <h2 className="text-xl font-bold mb-6">Project Manager</h2>
      <nav>
        <ul className="space-y-4">
          <li>
            <Link to="/dashboard" className="flex items-center gap-2 hover:text-gray-300">
              <FaHome /> Dashboard
            </Link>
          </li>
          <li>
            <Link to="/projects" className="flex items-center gap-2 hover:text-gray-300">
              <FaProjectDiagram /> Projects
            </Link>
          </li>
          <li>
            <Link to="/tasks" className="flex items-center gap-2 hover:text-gray-300">
              <FaTasks /> Tasks
            </Link>
          </li>
          <li>
            <Link to="/settings" className="flex items-center gap-2 hover:text-gray-300">
              <FaCog /> Settings
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
