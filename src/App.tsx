import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Auth from "./pages/Auth"; // Import the Auth component
import "./App.css";

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link> | <Link to="/about">About</Link> | 
        <Link to="/login">Login</Link> | <Link to="/signup">Signup</Link>
      </nav>

      {/* App Routes - Includes Home, About, and Auth */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/signup" element={<Auth />} />
      </Routes>
    </Router>
  );
}

export default App;
