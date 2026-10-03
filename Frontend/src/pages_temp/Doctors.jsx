import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../Context/AppContext";

const Doctors = () => {
  const { speciality } = useParams();
  const { doctors } = useContext(AppContext);
  const navigate = useNavigate();

  const [showFilter, setShowFilter] = useState(false);

 
  const filterDoc = speciality
    ? doctors.filter((doc) => doc.speciality === speciality)
    : doctors;

  return (
    <div>
      <p className="text-gray-600">Browse through the doctors specialist.</p>

      <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
        
       
        <button
          className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${
            showFilter ? "bg-primary text-white" : ""
          }`}
          onClick={() => setShowFilter((prev) => !prev)}
        >
          Filters
        </button>

        
        <div
          className={`flex-col gap-4 text-sm text-gray-600 ${
            showFilter ? "flex" : "hidden sm:flex"
          }`}
        >
          {[
            "General physician",
            "Gynecologist",
            "Dermatologist",
            "Pediatricians",
            "Neurologist",
            "Gastroenterologist",
          ].map((spec, index) => (
            <p
              key={index}
              onClick={() =>
                speciality === spec
                  ? navigate("/doctors")
                  : navigate(`/doctors/${spec}`)
              }
              className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border rounded cursor-pointer transition-all ${
                speciality === spec ? "bg-indigo-100 text-black" : ""
              }`}
            >
              {spec}
            </p>
          ))}
        </div>

      
        <div className="w-full grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-4 gap-y-6">
          
          {filterDoc.map((item, index) => (
            <div
              key={index}
              onClick={() => navigate(`/appointment/${item._id}`)}
              className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
            >
              <img className="bg-blue-50 w-full h-40 object-cover" src={item.image} alt="" />

              <div className="p-4">
               
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <p className="text-green-500">Available</p>
                </div>

                <p className="text-gray-900 text-lg font-medium mt-1">
                  {item.name}
                </p>
                <p className="text-gray-600 text-sm">
                  {item.speciality}
                </p>
              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default Doctors;