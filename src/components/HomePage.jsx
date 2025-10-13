import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { IoPersonSharp } from "react-icons/io5";
import { MdLocationOn } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";

const HomePage = () => {
  const [foundItems, setfoundItems] = useState([]);
  const [lostItems, setlostItems] = useState([]);
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const role = user?.role || "user";
  const isAdmin = role === "admin";

  const fetchfounddata = async () => {
    try {
      const res = await fetch("http://localhost:5000/report-found");
      const data = await res.json();
      setfoundItems(data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };
  useEffect(() => {
    fetchfounddata();
  }, []);

  const fetchlostdata = async () => {
    try {
      const res = await fetch("http://localhost:5000/report-lost");
      const data = await res.json();
      setlostItems(data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };
  useEffect(() => {
    fetchlostdata();
  }, []);

  const handlefounddelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/report-found/${id}`, {
        method: "DELETE",
        headers: { "x-role": role },
      });
      if (res.ok) {
        alert("Item deleted successfully!");
        // remove from state so UI updates without reload
        setfoundItems(foundItems.filter((item) => item._id !== id));
      } else {
        const data = await res.json();
        alert("Error: " + data.error);
      }
    } catch (err) {
      console.error("Error deleting item:", err);
    }
  };


  const handlelostdelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/report-lost/${id}`, {
        method: "DELETE",
        headers: { "x-role": role },
      });
      if (res.ok) {
        alert("Item deleted successfully!");
        // remove from state so UI updates without reload
        setlostItems(lostItems.filter((item) => item._id !== id));
      } else {
        const data = await res.json();
        alert("Error: " + data.error);
      }
    } catch (err) {
      console.error("Error deleting item:", err);
    }
  };

  return (
    <>
      {/* Navbar */}
      <Navbar />
      <div className="min-h-screen bg-[rgb(248 250 252)] sm:w-[85vw] m-auto w-full">
        {/* Hero Section */}
        <header className="text-center py-12 bg-white">
          <h2 className="text-5xl font-bold text-[#rgb(15 23 42)] mb-5">
            Welcome back to FoundIt 👋
          </h2>
          <p className="mt-2 text-gray-600">
            Helping you reconnect with your lost items on campus.
          </p>
        </header>
        <div className="">
          {" "}
          <h2 className="text-3xl font-bold m-5">Recently Found Items</h2>
        </div>
        {/* Items Section */}
        <main className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Example Item Card */}
          {foundItems.map((item) => {
            const r = Math.floor(Math.random() * 256);
            const g = Math.floor(Math.random() * 256);
            const b = Math.floor(Math.random() * 256);

            const buttonStyle = {
              backgroundColor: `rgba(${r}, ${g}, ${b}, 0.2)`,
            };

            const textStyle = {
              color: `rgba(${r}, ${g}, ${b}, 1)`,
            };

            return (
              <div
                key={item.id}
                className="bg-white rounded-xl border border-slate-200 p-4 hover:shadow-lg transition hover:scale-101"
              >
                <div className="flex justify-between">
                  <h3 className="text-lg font-semibold text-[#rgb(15 23 42)] mb-2">
                    {item.title}
                  </h3>
                  {isAdmin && (
                    <button
                      className=" rounded-2xl px-2 bg-red-600 text-white cursor-pointer"
                      onClick={() => {
                        handlefounddelete(item._id);
                      }}
                    >
                      Delete
                    </button>
                  )}
                </div>
                <p className="text-black text-md flex items-center gap-1"><MdLocationOn />{item.location}</p>
                <p className="text-gray-600 text-md flex">
                  <span className="text-black flex items-center gap-1"><IoPersonSharp />Name:</span> {item.name}
                </p>
                <p className="text-gray-600 text-md flex">
                  <span className="text-black flex items-center gap-1"><FaPhoneAlt />Phone:</span> {item.phone}
                </p>
                <button
                  className="mt-3 text-white px-4 py-1 rounded-4xl transition"
                  style={{ ...buttonStyle, ...textStyle }}
                >
                  {item.description}
                </button>
              </div>
            );
          })}
        </main>

        <div className="">
          {" "}
          <h2 className="text-3xl font-bold m-5">Recently Lost Items</h2>
        </div>

        <main className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Example Item Card */}
          {lostItems.map((item) => {
            const r = Math.floor(Math.random() * 256);
            const g = Math.floor(Math.random() * 256);
            const b = Math.floor(Math.random() * 256);

            const buttonStyle = {
              backgroundColor: `rgba(${r}, ${g}, ${b}, 0.2)`,
            };

            const textStyle = {
              color: `rgba(${r}, ${g}, ${b}, 1)`,
            };

            return (
              <div
                key={item.title}
                className="bg-white rounded-xl border border-slate-200 p-4 hover:shadow-lg transition hover:scale-101"
              >
                <div className="flex justify-between">
                  <h3 className="text-lg font-semibold text-[#rgb(15 23 42)] mb-2">
                    {item.title}
                  </h3>
                  {isAdmin && (
                    <button
                      className=" rounded-2xl px-2 bg-red-600 text-white cursor-pointer"
                      onClick={() => {
                        handlelostdelete(item._id);
                      }}
                    >
                      Delete
                    </button>
                  )}
                </div>{" "}
                <p className="text-black text-md flex items-center gap-1"><MdLocationOn /> {item.location}</p>
                <p className="text-gray-600 text-md flex">
                  <span className="text-black flex items-center gap-1"><IoPersonSharp />Name:</span> {item.name}
                </p>
                <p className="text-gray-600 text-md flex">
                  <span className="text-black flex items-center gap-1"><FaPhoneAlt />Phone:</span> {item.phone}
                </p>
                <button
                  className="mt-3 text-white px-4 py-1 rounded-4xl transition"
                  style={{ ...buttonStyle, ...textStyle }}
                >
                  {item.description}
                </button>
              </div>
            );
          })}
        </main>
      </div>

      <Footer />
    </>
  );
};

export default HomePage;
