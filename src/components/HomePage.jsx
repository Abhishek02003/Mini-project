import {useState,useEffect} from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

const HomePage = () => {

  const [foundItems, setfoundItems] = useState([])
  const [lostItems, setlostItems] = useState([])

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
  fetchfounddata()
}, [])


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
  fetchlostdata()
}, [])


  return (
    <>
      {/* Navbar */}
    <Navbar/>
    <div className="min-h-screen bg-[rgb(248 250 252)] w-[85vw] m-auto">
      {/* Hero Section */}
      <header className="text-center py-12 bg-white">
        <h2 className="text-5xl font-bold text-[#rgb(15 23 42)] mb-5">
          Welcome back to FoundIt 👋
        </h2>
        <p className="mt-2 text-gray-600">
          Helping you reconnect with your lost items on campus.
        </p>
      </header>
  <div className=''> <h2 className='text-3xl font-bold m-5'>Recently Found Items</h2></div> 
      {/* Items Section */}
      <main className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Example Item Card */}
        {foundItems.map((item)=>{
          const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);

  const buttonStyle = {
    backgroundColor: `rgba(${r}, ${g}, ${b}, 0.2)`,
  };

    const textStyle = {
    color: `rgba(${r}, ${g}, ${b}, 1)`,
  };

        return ( <div  key={item.title} className="bg-white rounded-xl border border-slate-200 p-4 hover:shadow-lg transition hover:scale-101">
          <h3 className="text-lg font-semibold text-[#rgb(15 23 42)]">{item.title}</h3>
          <p className="text-gray-600 text-md">{item.location}</p>
          <button className="mt-3 text-white px-4 py-1 rounded-4xl transition" style={{...buttonStyle,...textStyle}} >
            {item.description}
          </button>
        </div>);
       }) }
        
      </main>

      <div className=''> <h2 className='text-3xl font-bold m-5'>Recently Lost Items</h2></div> 

       <main className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Example Item Card */}
        {lostItems.map((item)=>{
        const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);

  const buttonStyle = {
    backgroundColor: `rgba(${r}, ${g}, ${b}, 0.2)`,
  };

    const textStyle = {
    color: `rgba(${r}, ${g}, ${b}, 1)`,
  };

        return ( <div  key={item.title} className="bg-white rounded-xl border border-slate-200 p-4 hover:shadow-lg transition hover:scale-101">
          <h3 className="text-lg font-semibold text-[#rgb(15 23 42)]">{item.title}</h3>
          <p className="text-gray-600 text-md ">📍 {item.location}</p>
          <button className="mt-3 text-white px-4 py-1 rounded-4xl transition" style={{...buttonStyle,...textStyle}}>
            {item.description}
          </button>
        </div>);
       }) }
        
      </main>
    </div>

    <Footer/>
    </>
  )
}

export default HomePage
