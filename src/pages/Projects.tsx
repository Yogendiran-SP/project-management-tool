// This page displays a list of projects and allows users to edit or delete them.
//
// We add a new page called Projects.tsx in the pages folder. This page displays a list of projects and allows users to edit or delete them. We import the ProjectList component and pass readOnly={false} to enable edit and delete functionality. We also add a link to navigate back to the Dashboard page.
//
// The Projects page is accessible at /projects.
//
// Let's implement the Projects page.
// Run the following command in your terminal to create a new file for the Projects page:
//
// touch src/pages/Projects.tsx
// Open the Projects.tsx file and add the following code:

import ProjectList from "../components/ProjectList";
import { Link } from "react-router-dom";

const Projects = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Projects</h1>
      <ProjectList readOnly={false} /> {/* ✅ Enable edit/delete */}
      <div className="mt-4">
        <Link to="/dashboard" className="text-blue-500 underline">
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default Projects;
// In the Projects page, we import the ProjectList component and pass readOnly={false} to enable edit and delete functionality. We also add a link to navigate back to the Dashboard page.