import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import { assets } from "../assets/assets";
import RelatedDoctors from "../Components/RelatedDoctors";

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol } = useContext(AppContext);

  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  // ✅ direct doctor find (NO state)
  const docInfo = doctors.find((d) => d._id === docId);

  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  // ✅ slots direct generate (NO useEffect, NO setState)
  const getSlots = () => {
    if (!docInfo) return [];

    let today = new Date();
    let slots = [];

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(
          currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
        );
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];

      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        timeSlots.push({
          datetime: new Date(currentDate),
          time: formattedTime,
        });

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      slots.push(timeSlots);
    }

    return slots;
  };

  const docSlots = getSlots();

  // ✅ loading safety
  if (!docInfo) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div>
      {/* Doctor Info */}
      <div className="flex flex-col sm:flex-row gap-4">
        <img
          className="bg-blue-500 w-full sm:max-w-72 rounded-lg"
          src={docInfo.image}
          alt=""
        />

        <div className="flex-1 border border-gray-400 rounded-lg p-6">
          <p className="flex items-center gap-2 text-2xl font-medium">
            {docInfo.name}
            <img className="w-5" src={assets.verified_icon} alt="" />
          </p>

          <p className="text-gray-600 mt-2">
            {docInfo.degree} - {docInfo.speciality}
          </p>

          <p className="text-gray-500 mt-3">{docInfo.about}</p>

          <p className="mt-3 font-medium">
            Fee: {currencySymbol}
            {docInfo.fees}
          </p>
        </div>
      </div>

      {/* Slots */}
      <div className="mt-6">
        <p className="font-medium">Booking slots</p>

        {/* Days */}
        <div className="flex gap-3 mt-3 overflow-x-scroll">
          {docSlots.map((item, index) => (
            <div
              key={index}
              onClick={() => setSlotIndex(index)}
              className={`p-3 rounded-full cursor-pointer ${
                slotIndex === index
                  ? "bg-blue-500 text-white"
                  : "border border-gray-300"
              }`}
            >
              <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
              <p>{item[0] && item[0].datetime.getDate()}</p>
            </div>
          ))}
        </div>

        {/* Time */}
        <div className="flex gap-3 mt-3 overflow-x-scroll">
          {docSlots[slotIndex]?.map((item, index) => (
            <p
              key={index}
              onClick={() => setSlotTime(item.time)}
              className={`px-4 py-2 rounded-full cursor-pointer border ${
                slotTime === item.time
                  ? "bg-blue-500 text-white"
                  : "text-gray-400"
              }`}
            >
              {item.time}
            </p>
          ))}
        </div>

        <button className="mt-5 bg-blue-500 text-white px-6 py-2 rounded-full">
          Book Appointment
        </button>
      </div>

      {/* Related Doctors */}
      <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
    </div>
  );
};

export default Appointment;