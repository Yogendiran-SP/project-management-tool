import { useEffect, useState } from "react";

interface Project {
  id: string;
  name: string;
  status: string;
}

interface ProjectListProps {
  readOnly?: boolean; // ✅ New prop to control edit/delete visibility
}

const ProjectList: React.FC<ProjectListProps> = ({ readOnly = false }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:5000/api/projects")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched projects:", data);
        setProjects(data);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleUpdate = async (id: string, currentName: string) => {
    if (readOnly) return; // ✅ Prevent actions in read-only mode

    const updatedName = prompt("Enter new project name:", currentName);
    if (!updatedName) return;

    try {
      const response = await fetch(`http://localhost:5000/api/projects/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: updatedName }),
      });

      if (!response.ok) {
        console.error("Error updating project:", await response.text());
        return;
      }

      setProjects((prev) =>
        prev.map((p) => (p.id === id ? { ...p, name: updatedName } : p))
      );
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (readOnly) return; // ✅ Prevent actions in read-only mode

    if (!window.confirm("Are you sure you want to delete this project?")) return;

    try {
      const response = await fetch(`http://localhost:5000/api/projects/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        console.error("Error deleting project:", await response.text());
        return;
      }

      setProjects((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  if (error) return <p className="text-red-500">{error}</p>;
  if (loading) return <p className="text-gray-500">Loading...</p>;

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Your Projects</h2>
      <ul className="list-none p-0 m-0">
        {projects.length > 0 ? (
          projects.map((project) => (
            <li key={project.id} className="mb-2 flex justify-between items-center border-b pb-2">
              <div>
                <span className="font-medium">{project.name}</span> - 
                <span className="text-gray-500 ml-2">{project.status}</span>
              </div>
              {!readOnly && (
                <div>
                  <button
                    onClick={() => handleUpdate(project.id, project.name)}
                    className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              )}
            </li>
          ))
        ) : (
          <p className="text-gray-500">No projects found.</p>
        )}
      </ul>
    </div>
  );
};

export default ProjectList;
