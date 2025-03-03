import React, { useState } from 'react';
import { loginUser, registerUser } from "../utils/api"; // Ensure correct path

function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const response = await loginUser(email, password);
        console.log("Login successful:", response);
      } else {
        const response = await registerUser(name, email, password);
        console.log("Registration successful:", response);
      }
    } catch (error) {
      console.error(isLogin ? "Login failed:" : "Registration failed:", error);
    }
  };

  return (
    <div>
      <h1>{isLogin ? 'Login' : 'Register'}</h1>
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <div>
            <label>Name:</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
        )}
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
      </form>
      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? 'Switch to Register' : 'Switch to Login'}
      </button>
    </div>
  );
}

export default Auth;