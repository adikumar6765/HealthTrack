import React, { useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  // ✅ FIX 1
  const [token, setToken] = useState(true);

  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400">
      
      <img
        onClick={() => navigate("/")}
        className="w-44 cursor-pointer"
        src={assets.logo}
        alt=""
      />

      <ul className="hidden md:flex items-start gap-5 font-medium">
        <NavLink to="/"><li>HOME</li></NavLink>
        <NavLink to="/doctors"><li>ALL DOCTORS</li></NavLink>
        <NavLink to="/about"><li>ABOUT</li></NavLink>
        <NavLink to="/contact"><li>CONTACT</li></NavLink>
      </ul>

      <div className="flex items-center gap-4">
        {token ? (
          <div className="flex items-center gap-2 cursor-pointer group relative">
            
            <img className="w-8 rounded-full" src={assets.profile_pic} alt="" />
            <img className="w-2.5" src={assets.dropdown_icon} alt="" />

            {/* ✅ FIX 2 */}
            <div className="absolute right-0 top-0 pt-14 hidden group-hover:block z-20">
              <div className="min-w-48 bg-white shadow-lg rounded flex flex-col gap-3 p-4">
                
                {/* ✅ FIX 3 */}
                <p onClick={() => navigate("/my-profile")} className="cursor-pointer hover:text-black">
                  My Profile
                </p>

                <p onClick={() => navigate("/my-appointments")} className="cursor-pointer hover:text-black">
                  My Appointments
                </p>

                <p onClick={() => setToken(false)} className="cursor-pointer hover:text-black">
                  Logout
                </p>

              </div>
            </div>

          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-blue-500 text-white px-8 py-3 rounded-full"
          >
            Create account
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;