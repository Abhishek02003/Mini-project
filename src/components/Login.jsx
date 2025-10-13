import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle login submit
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form), // send { email, password }
      });

      // Handle non-JSON or network failures gracefully
      let data = { message: "", error: "" };
      try {
        data = await res.json();
      } catch (_) {
        // no-op: keep default data
      }

      if (res.ok) {
        alert("✅ " + data.message);

        // Save user info to localStorage (for session)
        localStorage.setItem("user", JSON.stringify(data.user));

        // Redirect to HomePage
        navigate("/HomePage");
      } else {
        const msg = data?.error || `Request failed (${res.status})`;
        alert("❌ " + msg);
      }
    } catch (err) {
      console.error(err);
      alert("⚠️ Network error: Unable to reach server");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 ">
      <div className=" bg-white shadow-xl rounded-xl w-[400px] text-center mx-10">
        <h1 className="text-2xl font-bold mb-6 pt-10">Welcome to FoundIt</h1>

        {/* Login Form */}
        <form className="flex flex-col gap-4 px-10 pt-5 " onSubmit={handleLogin}>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="border rounded-lg px-4 py-2"
            required
          />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            className="border rounded-lg px-4 py-2 p-10"
            required
          />
          <label className="flex items-center gap-2 text-sm text-gray-600 select-none">
            <input
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
            Show password
          </label>
          <button
            type="submit"
            className="bg-[#75bae6] hover:bg-[#2E3C4E] text-white rounded-lg px-4 py-2 transition font-semibold p-10"
          >
            Login
          </button>
        </form>

        {/* Signup Link */}
        <p className="mt-4 text-sm pt-5 pb-10">
          Don’t have an account?{" "}
          <a href="/signup" className="text-blue-500 underline">
            Sign up here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
