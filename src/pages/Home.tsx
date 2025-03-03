import { useEffect, useState } from "react";

const Home = () => {
    const [data, setData] = useState("");

    useEffect(() => {
        fetch(import.meta.env.VITE_API_URL + "/api/data")
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Failed to fetch data");
                }
                return res.json();
            })
            .then((data) => {
                console.log("Fetched data:", data); // Debugging
                setData(data.message); // Ensure this is a string
            })
            .catch((err) => console.error("Error fetching data:", err));
    }, []);

    return (
        <div>
            <h1>Welcome to the Home Page</h1>
            <p>{data}</p> {/* Properly render data */}
        </div>
    );
};

export default Home;
