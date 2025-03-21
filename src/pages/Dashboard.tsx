import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import RecentActivity from "../components/RecentActivity";
import ProjectList from "../components/ProjectList";

function Dashboard() {
    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1">
                <Navbar />
                <div className="p-6">
                    <h1 className="text-2xl font-bold">Welcome to Your Dashboard</h1>
                    <p className="text-gray-600">Manage your projects and tasks efficiently.</p>

                    {/* Dashboard Grid Layout */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                        <ProjectList readOnly={true} />  {/* 👈 Pass readOnly mode */}
                        <RecentActivity />
                    </div>

                    {/* ✅ Manage Projects Button */}
                    <div className="mt-6">
                        <Link to="/projects" className="bg-blue-500 text-white px-4 py-2 rounded shadow-md hover:bg-blue-600 transition">
                            Manage Projects
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
