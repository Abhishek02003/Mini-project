import React from 'react'
import { useNavigate } from 'react-router-dom'


const Login = () => {
    const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // 👉 Here you’d normally validate credentials with backend
    // For now, we just redirect
    navigate("/HomePage");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="p-10 bg-white shadow-xl rounded-xl w-[400px] text-center">
        <h1 className="text-2xl font-bold mb-6">Welcome to FoundIt</h1>

        {/* Login Form */}
        <form className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className="border rounded-lg px-4 py-2"
          />
          <input
            type="password" 
            placeholder="Password"
            className="border rounded-lg px-4 py-2"
          />
          <button
            type="submit"
            onClick={handleLogin}
            className="bg-[#75bae6] hover:bg-[#2E3C4E] text-white rounded-lg px-4 py-2 transition"
          >
            Login
          </button>
        </form>

        {/* Signup Link */}
        <p className="mt-4 text-sm">
          Don’t have an account?{" "}
          <a href="/signup" className="text-blue-500 underline">
            Sign up here
          </a>
        </p>
      </div>
    </div>
  )
}

export default Login
