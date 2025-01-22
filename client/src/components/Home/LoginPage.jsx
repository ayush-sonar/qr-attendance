import React, { useState } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {setUser} from "../../redux/userSlice"

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = async (event) => {
    event.preventDefault();

    const email = event.target.email.value; // Get email value
    const password = event.target.password.value; // Get password value

    try {
      const response = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });

      if (response.data.message === "Login successful") {
        console.log("Login successful");
        navigate("/home", {  replace: true });
        dispatch(setUser(response.data.admin))
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      alert("An error occurred while logging in.");
    }
  };

  return (
    <div className="relative flex-col  py-20 items-center min-h-screen bg-blue-950">
      <img
        src="/assets/Noise.svg"
        alt="Background Noise"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      <div className="relative z-20 flex flex-row space-y-6 justify-center">
        <div className="flex flex-col">
          <img src="/assets/triathlon.svg" className=" w-96 " />
          <img src="/assets/codecraft.svg" className=" w-96" />
        </div>
      </div>
      <div className="flex justify-center">
        <div className="bg-blue-300 p-8 rounded-lg shadow-md w-96 z-20">
          <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-gray-900 text-md font-semibold mb-2"
              >
                Email
              </label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                name="email"
                placeholder="Enter your email"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-gray-900 text-md font-semibold mb-2"
              >
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                name="password"
                placeholder="Enter your password"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-700 text-white p-3 rounded-md hover:bg-blue-600 transition-colors"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;