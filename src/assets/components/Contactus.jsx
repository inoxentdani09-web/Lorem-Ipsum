import React, { useState } from "react";
import "../../index.css";

const Contactus = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await response.text();
      console.log(data);

      if (response.ok) {
        alert("Message sent successfully ✅");

        setFormData({
          name: "",
          email: "",
          phone: "",
          message: ""

        });
      } else {
        alert("Failed to send message ❌");
      }

    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Server error ❌");
    }
  };

  return (
    <div className="px-4 sm:px-10 lg:px-10 py-10 sm:py-15 lg:py-20 overflow-x-hidden">

      <div className="mb-6 sm:mb-10">
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-[#40003a] fjalla-one-regular">
          Contact Us
        </h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">

        {/* Left Card */}
       <div className="w-full lg:w-[40%]">
  <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

    {/* Top Header */}
    <div className="bg-[#4B31CD] text-white p-5">
      <p className="text-lg font-bold">Media</p>
      <p className="text-sm opacity-90">media@loremipsum.com</p>
    </div>

    {/* Image */}
    <div className="w-full bg-gray-100 flex items-center justify-center">
      <img
        src="/images/contact.jpg"
        alt="contact"
        className="w-full h-[200px] sm:h-[250px] md:h-[350px] object-center object-cover"
      />
    </div>

  </div>
</div>

        {/* Form */}
        <div className="w-full lg:w-[60%]">

          <h1 className="text-2xl font-bold text-purple-900 mb-6">
            Leave us a message
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-2">

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name*"
              className="w-full px-3 py-3 border border-black rounded-sm"
            />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email*"
              className="w-full px-3 py-3 border border-black rounded-sm"
            />

            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone"
              className="w-full px-3 py-3 border border-black rounded-sm"
            />

            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Message*"
              rows="5"
              className="w-full px-3 py-3 border border-black rounded-md"
            />

            <button
              type="submit"
              className="mt-3 px-3 py-2 cursor-pointer rounded-md bg-purple-900 text-white hover:bg-purple-700"
            >
              ➜ Submit
            </button>

          </form>

        </div>

      </div>
    </div>
  );
};

export default Contactus;