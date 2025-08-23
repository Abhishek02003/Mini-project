import React from 'react'

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-[#2E3C4E] text-white px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">FoundIt</h1>
        <ul className="flex gap-6">
          <li><a href="#" className="hover:text-[#75bae6]">Home</a></li>
          <li><a href="#" className="hover:text-[#75bae6]">My Items</a></li>
          <li><a href="#" className="hover:text-[#75bae6]">Report Lost</a></li>
          <li><a href="#" className="hover:text-[#75bae6]">Report Found</a></li>
          <li><a href="/" className="hover:text-[#75bae6]">Logout</a></li>
        </ul>
      </nav>

      {/* Hero Section */}
      <header className="text-center py-12 bg-white shadow-md">
        <h2 className="text-3xl font-bold text-[#2E3C4E]">
          Welcome back to FoundIt 👋
        </h2>
        <p className="mt-2 text-gray-600">
          Helping you reconnect with your lost items on campus.
        </p>
      </header>

      {/* Items Section */}
      <main className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Example Item Card */}
        <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition">
          <img
            src="https://via.placeholder.com/300"
            alt="Lost Item"
            className="rounded-lg mb-4 w-full h-40 object-cover"
          />
          <h3 className="text-lg font-semibold text-[#2E3C4E]">Lost Wallet</h3>
          <p className="text-gray-600 text-sm">Last seen near the library.</p>
          <button className="mt-3 bg-[#75bae6] hover:bg-[#2E3C4E] text-white px-4 py-2 rounded-lg transition">
            View Details
          </button>
        </div>

        {/* Example Item Card */}
        <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition">
          <img
            src="https://via.placeholder.com/300"
            alt="Found Item"
            className="rounded-lg mb-4 w-full h-40 object-cover"
          />
          <h3 className="text-lg font-semibold text-[#2E3C4E]">Found Backpack</h3>
          <p className="text-gray-600 text-sm">Turned in at the campus office.</p>
          <button className="mt-3 bg-[#75bae6] hover:bg-[#2E3C4E] text-white px-4 py-2 rounded-lg transition">
            Claim Item
          </button>
        </div>

        {/* Add more cards as needed */}
      </main>
    </div>
  )
}

export default HomePage
