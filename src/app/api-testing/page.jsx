"use client";
import React, { useState } from "react";
import axios from "axios";

const Page = () => {
  const [isSignup, setIsSignup] = useState(false); // toggle between login/signup
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = () => {
    if (!email || !password) {
      alert("⚠️ Please fill all the fields");
      return;
    }
    localStorage.setItem(
      "user",
      JSON.stringify({ email: email, password: password })
    );

    alert("✅ Signup successful! You can now log in.");
    setEmail("");
    setPassword("");
    setIsSignup(false);
  };



  // --- LOGIN ---
  const handleLogin = async () => {
    if (!email || !password) {
      alert("⚠️ Please fill all the fields");
      return;
    }
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser && savedUser.email === email && savedUser.password === password) {
      alert("✅ Login successful (LocalStorage)");
      setEmail("");
      setPassword("");
      return;
    }




    try {
      const response = await axios.post("https://reqres.in/api/login", {
        email,
        password,
      });

      alert("✅ Login successful (API)");
      console.log("Token:", response.data.token);
      setEmail("");
      setPassword("");
    } catch (error) {
      if (error.response) {
        alert(`❌ Login failed: ${error.response.data.error}`);
      } else {
        alert("Something went wrong. Please try again later.");
      }
      console.error("Error during login:", error);
    }
  };



  
  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <div className="bg-gray-800 p-6 rounded-lg shadow-md w-96">
        <h1 className="text-white text-2xl mb-4">
          {isSignup ? "Signup" : "Login"}
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-3 rounded bg-gray-700 text-white border border-gray-600 outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-3 rounded bg-gray-700 text-white border border-gray-600 outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {isSignup ? (
          <button
            onClick={handleSignup}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded transition"
          >
            Signup
          </button>
        ) : (
          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition"
          >
            Login
          </button>
        )}

        <p className="text-gray-400 mt-4 text-sm text-center">
          {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
          <span
            onClick={() => setIsSignup(!isSignup)}
            className="text-blue-400 cursor-pointer hover:underline"
          >
            {isSignup ? "Login" : "Signup"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Page;
