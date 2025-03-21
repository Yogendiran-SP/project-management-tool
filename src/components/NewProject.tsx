import { useState } from "react";
import { useNavigate } from "react-router-dom";

const NewProject = () => {
    const [project, setProject] = useState({
        name: "",
        description: "",
        startDate: "",
        endDate: "",
        status: "Pending",
    });
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setProject({ ...project, [e.target.name]: e.target.value });
    };
       
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/api/projects", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(project),
            });
            if (response.ok) {
                navigate("/dashboard"); // Redirect after successful submission
            }
        } catch (error) {
            console.error("Error creating project:", error);
        }
    };
    

    return (
        <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Create New Project</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Project Name" value={project.name} onChange={handleChange} required className="w-full mb-2 p-2 border rounded" />
                <textarea name="description" placeholder="Description" value={project.description} onChange={handleChange} required className="w-full mb-2 p-2 border rounded"></textarea>
                <input type="date" name="startDate" value={project.startDate} onChange={handleChange} required className="w-full mb-2 p-2 border rounded" />
                <input type="date" name="endDate" value={project.endDate} onChange={handleChange} required className="w-full mb-2 p-2 border rounded" />
                <select name="status" value={project.status} onChange={handleChange} className="w-full mb-2 p-2 border rounded">
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                </select>
                <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded">Create Project</button>
            </form>
        </div>
    );
};

export default NewProject;
