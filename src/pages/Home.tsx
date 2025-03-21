import { useEffect, useState } from "react";
import Dashboard from "./Dashboard"; // Import Dashboard component

const Home = () => {
    const [data, setData] = useState("");

    useEffect(() => {
        fetch(import.meta.env.VITE_API_URL + "/home" + `?t=${new Date().getTime()}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Failed to fetch data");
                }
                const contentType = res.headers.get("content-type");
                if (!contentType || !contentType.includes("application/json")) {
                    throw new Error("Received non-JSON response");
                }
                return res.json();
            })
            .then((data) => {
                console.log("Fetched data:", data);
                setData(data.message); // Ensure 'message' exists in the response
            })
            .catch((err) => console.error("Error fetching data:", err));
    }, []);

    return (
        <div>
            <h1>Welcome to the Home Page</h1>
            <p>This is a protected route</p>
            <p>{data}</p>

            {/* Include Dashboard component here */}
            <Dashboard />
        </div>
    );
};

export default Home;
