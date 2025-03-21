const RecentActivity = () => {
    // Dummy activity data (replace with API data later)
    const activities = [
      { id: 1, description: "Created a new project: AI Chatbot", time: "2 hours ago" },
      { id: 2, description: "Updated task status in E-commerce Website", time: "5 hours ago" },
      { id: 3, description: "Added a new team member to Project Management Tool", time: "1 day ago" },
    ];
  
    return (
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <ul className="list-none p-0">
          {activities.map((activity) => (
            <li key={activity.id} className="p-2 border-b last:border-none">
              <span>{activity.description}</span> - 
              <span className="text-gray-500 ml-2">{activity.time}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default RecentActivity;
  