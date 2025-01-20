import React from 'react';

const Login = () => {
  return (
  <div className="flex-col px-10 py-40 items-center min-h-screen bg-blue-950">

      <img
        src="/assets/Noise.svg"
        alt="Background Noise"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

    <div className="relative z-10 flex flex-row space-y-6">
        <div className="flex flex-col">
        <img
            src="/assets/triathlon.svg"
            className="h-100 w-100 "
          />
          <img
            src="/assets/codecraft.svg"
            className="h-200 w-200"
          />
        </div> 
    </div> 
    



      <div className="bg-blue-300 p-8 rounded-lg shadow-md w-703">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-900 text-md font-semibold mb-2"
            >
              Email
            </label>
            <input
              type="text"
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
   
  );
};

export default Login;
