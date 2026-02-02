import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";

const Admin = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPending = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "null");
      const role = user?.role || "user";
      const res = await fetch("https://mini-project-backend-3g5a.onrender.com/admin/pending", {
        headers: { "x-role": role }
      });
      const data = await res.json();
      setItems(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPending();
  }, []);

  const approveItem = async (id, type) => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "null");
      const role = user?.role || "user";
      const res = await fetch("https://mini-project-backend-3g5a.onrender.com/admin/approve", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-role": role },
        body: JSON.stringify({ id, type })
      });
      if (res.ok) {
        setItems((prev) => prev.filter((i) => i._id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const deleteItem = async (id, type) => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "null");
      const role = user?.role || "user";
      const res = await fetch("https://mini-project-backend-3g5a.onrender.com/admin/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-role": role },
        body: JSON.stringify({ id, type })
      });
      if (res.ok) {
        setItems((prev) => prev.filter((i) => i._id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-6">Admin - Pending Reports</h1>
        {loading ? (
          <p>Loading...</p>
        ) : items.length === 0 ? (
          <p>No pending items.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {items.map((item) => (
              <div key={item._id} className="p-4 border rounded-lg shadow-md bg-white">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">{item.title}</h2>
                  <span className={`mt-2 inline-block px-3 py-1 rounded-full text-sm ${item.type === "lost" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
                    {item.type.toUpperCase()}
                  </span>
                </div>
                <p className="text-gray-600">{item.description}</p>
                <div className="mt-4 flex gap-3">
                  <button onClick={() => approveItem(item._id, item.type)} className="px-3 py-1 rounded bg-blue-600 text-white">Approve</button>
                  <button onClick={() => deleteItem(item._id, item.type)} className="px-3 py-1 rounded bg-red-600 text-white">Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Admin;


