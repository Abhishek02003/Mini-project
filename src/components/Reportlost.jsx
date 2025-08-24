import React, { useState } from "react";
import Navbar from "./Navbar";

const Reportlost = () => {
  const [form, setForm] = useState({ title: "", description: "", location: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("mongodb://localhost:27017/report-lost", {
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
  };

  return (
    <><Navbar /><div className="flex items-center justify-center h-screen bg-gray-100">
          <form
              onSubmit={handleSubmit}
              className="bg-white shadow-lg rounded-xl p-8 w-[400px]"
          >
              <h1 className="text-2xl font-bold mb-6">Report Lost Item</h1>

              <input
                  type="text"
                  name="title"
                  placeholder="Item Name"
                  className="border rounded-lg px-4 py-2 w-full mb-4"
                  value={form.title}
                  onChange={handleChange} />

              <textarea
                  name="description"
                  placeholder="Description"
                  className="border rounded-lg px-4 py-2 w-full mb-4"
                  value={form.description}
                  onChange={handleChange} />

              <input
                  type="text"
                  name="location"
                  placeholder="Last Seen Location"
                  className="border rounded-lg px-4 py-2 w-full mb-4"
                  value={form.location}
                  onChange={handleChange} />

              <button
                  type="submit"
                  className="bg-red-500 hover:bg-red-700 text-white rounded-lg px-4 py-2 w-full"
              >
                  Report Lost
              </button>
          </form>
      </div></>
  );
};

export default Reportlost;
