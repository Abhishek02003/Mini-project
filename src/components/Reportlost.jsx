import React, { useState } from "react";
import Navbar from "./Navbar";
import Spline from '@splinetool/react-spline';

const Reportlost = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    name: "",
    phone: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/report-lost", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Lost item reported successfully!");
      } else {
        alert("Error: " + data.error);
      }
    } catch (err) {
      console.error(err);
    }

    setForm({ title: "", description: "", location: "", name: "", phone: "" });
  };

  return (
    <>
      <Navbar />
      <div className="relative w-full h-[90vh]">
      <Spline
        scene="https://prod.spline.design/hBCPhPRbZwKIiNUw/scene.splinecode"  
      />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <form
          onSubmit={handleSubmit}
          className="bg-white/50 backdrop-blur-md shadow-lg rounded-xl p-8 w-[400px] pointer-events-auto"
        >
          <h1 className="text-2xl font-bold mb-6">Report Lost Item</h1>

          <input
            type="text"
            name="title"
            placeholder="Item Name"
            className="border rounded-lg px-4 py-2 w-full mb-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={form.title}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            className="border rounded-lg px-4 py-2 w-full mb-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={form.description}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="location"
            placeholder="Last Seen Location"
            className="border rounded-lg px-4 py-2 w-full mb-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={form.location}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="name"
            placeholder="Enter Your Name"
            className="border rounded-lg px-4 py-2 w-full mb-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            type="tel"
            name="phone"
            placeholder="Enter Your Contact Details"
            className="border rounded-lg px-4 py-2 w-full mb-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={form.phone}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="bg-red-500 hover:bg-red-700 text-white rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            Report Lost
          </button>
        </form>
      </div>
     </div>
    </>
  );
};

export default Reportlost;
