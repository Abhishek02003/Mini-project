import React from 'react'

const Signup = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="p-10 bg-white shadow-xl rounded-xl w-[400px] text-center">
        <h1 className="text-2xl font-bold mb-6 text-[#2E3C4E]">Create an Account</h1>

        {/* Signup Form */}
        <form className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Full Name"
            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#75bae6]"
          />
          <input
            type="email"
            placeholder="Email"
            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#75bae6]"
          />
          <input
            type="password"
            placeholder="Password"
            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#75bae6]"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#75bae6]"
          />
  
          <button
            type="submit"
            className="bg-[#75bae6] hover:bg-[#2E3C4E] text-white rounded-lg px-4 py-2 transition font-semibold"
          >
            Sign Up
          </button>
        </form>

        {/* Login Link */}
        <p className="mt-4 text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 underline">
            Log in here
          </a>
        </p>
      </div>
    </div>
  )
}

export default Signup
