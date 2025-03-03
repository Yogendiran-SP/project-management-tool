import { useState } from "react";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        import.meta.env.VITE_API_URL + "/auth/login", // Updated to /auth/login
        { email, password }
      );

      console.log("Login Success:", response.data);
      localStorage.setItem("token", response.data.token);
      alert("Login successful!");
    } catch (err: any) {
      console.error("Login Error:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Login failed!");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
  
  // Now, when you run the app and try to login, you should see the error message if the login fails. 
  // Conclusion 
  // In this tutorial, you learned how to handle errors in React applications using Axios. You learned how to handle errors using the  try...catch  block and how to display error messages to users. 
  // You also learned how to use Axios interceptors to handle errors globally in your application. This is useful when you want to handle errors in a consistent way across your application. 
  // You can find the complete source code for this tutorial on  GitHub. 
  // Happy coding! 
  // Peer Review Contributions by:  Lalithnarayan C