import React, { useState } from "react";

const Signup = () => {
  const [form, setForm] = useState({ text: "", email: "", password: "", confirmPassword: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const res = await fetch("https://mini-project-backend-3g5a.onrender.com/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: form.text,
          email: form.email,
          password: form.password,
        }),
      });

      const data = await res.json();
      alert(data.message || "Signup successful!");
    } catch (err) {
      console.error(err);
      alert("Error signing up");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className=" bg-white shadow-xl rounded-xl w-[400px] text-center mx-10">
        <h1 className="text-2xl font-bold mb-6 text-[#2E3C4E] pt-10">Create an Account</h1>

        <form className="flex flex-col gap-4 px-10" onSubmit={handleSubmit}>
          <input
            type="text"
            name="text"
            value={form.text}
            onChange={handleChange}
            placeholder="Full Name"
            className="border rounded-lg px-4 py-2"
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="border rounded-lg px-4 py-2"
          />
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            className="border rounded-lg px-4 py-2"
          />
          <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            className="border rounded-lg px-4 py-2"
          />

          <button
            type="submit"
            className="bg-[#75bae6] hover:bg-[#2E3C4E] text-white rounded-lg px-4 py-2 transition font-semibold"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-4 text-sm pb-10">
          Already have an account?{" "}
          <a href="/Login" className="text-blue-500 underline ">
            Login Here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
