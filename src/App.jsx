import Button from "./components/Button";
import Login from "./components/Login";
import Signup from "./components/Signup";
import HomePage from "./components/HomePage";
import Myitems from "./components/Myitems";
import Logout from "./components/Logout";
import Reportfound from "./components/Reportfound";
import Reportlost from "./components/Reportlost";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <div className="banner">
                <div className="title bg-[url(https://www.shutterstock.com/image-vector/landscape-view-university-students-walking-600nw-2177237095.jpg)] h-[100vh] bg-no-repeat w-[100vw] bg-cover bg-center">
                  <div className="flex items-center justify-center h-full bg-white/60 pb-[10vh]">
                    <div className=" flex flex-col items-center justify-center md:w-full w-[80vw] ">
                      <div className="flex">
                        <div className="text-[#5ab0e6]  font-extrabold font-sans text-4xl">
                          FoundIt
                        </div>
                        <div className="text-[#5ab0e6]  font-extrabold font-sans text-4xl hidden sm:block">:</div>
                        <div className="text-[#2E3C4E] sm:text-4xl font-extrabold font-sans text-2xl sm:block hidden">
                          Your Campus Lost & Found Hub
                        </div>
                      </div>
                      <div className="mt-8 text-sm md:text-lg flex justify-center items-center">
                        Reuniting lost items with their rightful owners, one
                        click at a time.
                      </div>
                      <div className="flex flex-col mt-15 gap-2">
                        <Button name="Login" to="/Login" />
                        <Button name="SignUp" to="/SignUp" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            }
          />
          <Route path="/Login" element={<Login />} />
          <Route path="/SignUp" element={<Signup />} />
          <Route path="/HomePage" element={<HomePage/>} />
          <Route path="/Myitems" element={<Myitems />} />
          <Route path="/Reportlost" element={<Reportlost />} />
          <Route path="/Reportfound" element={<Reportfound />} />
          <Route path="/Logout" element={<Logout/>}/>

        </Routes>
      </Router>
    </>
  );
}

export default App;
