import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
const Myitems = () => {
  const [items, setItems] = useState([]);

  // Fetch user’s items (lost/found) from backend
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user") || "null");
        const email = user?.email || "";
        const res = await fetch(`https://mini-project-backend-3g5a.onrender.com/myitems?email=${encodeURIComponent(email)}`); // 👈 backend API
        const data = await res.json();
        setItems(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchItems();
  }, []);

  return (
    <><Navbar /><div className="p-8">
          <h1 className="text-2xl font-bold mb-6">My Reported Items</h1>

          {items.length === 0 ? (
              <p>No items reported yet.</p>
          ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {items.map((item, idx) => (
                      <div
                          key={idx}
                          className="p-4 border rounded-lg shadow-md bg-white"
                      >
                          <h2 className="text-xl font-semibold">{item.title}</h2>
                          <p className="text-gray-600">{item.description}</p>
                          <span
                              className={`mt-2 inline-block px-3 py-1 rounded-full text-sm ${item.type === "lost" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}
                          >
                              {item.type.toUpperCase()}
                          </span>
                      </div>
                  ))}
              </div>
          )}
      </div></>
  );
};

export default Myitems;
