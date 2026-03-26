import React, { useState } from 'react'
import '../index.css'

const Contactus = () => {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: ""
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const oldData = JSON.parse(localStorage.getItem("contacts")) || []

        const newEntry = {
            ...formData,
            id: Date.now()
        }

        localStorage.setItem("contacts", JSON.stringify([...oldData, newEntry]))

        setFormData({
            name: "",
            email: "",
            phone: "",
            message: ""
        })

        alert("Message saved successfully!")
    }

    return (
        <div className="px-4 sm:px-10 lg:px-10 py-10 sm:py-15 lg:py-20 overflow-x-hidden">

            <div className='mb-6 sm:mb-10'>
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-[#40003a] fjalla-one-regular">
                    Contact Us
                </h1>
            </div>

            <div className='flex flex-col lg:flex-row gap-8 lg:gap-10'>

                <div className='contact-card w-full lg:w-[40%]'>

                    <div className='bg-[#4B31CD] rounded-t-2xl text-white p-4 sm:p-5 font-bold'>
                        <p>Media</p>
                        <p className="text-sm sm:text-base">media@loremipsum.com</p>
                    </div>

                    <div 
                    style={{backgroundImage:"url('/images/contact.jpg')"}}
                    className=" bg-cover bg-center h-55 sm:h-75 lg:h-87.5 rounded-b-2xl"></div>
                     
                </div>

                <div className="w-full lg:w-[60%]">

                    <h1 className="text-2xl sm:text-3xl font-bold text-purple-900 mb-6 sm:mb-8">
                        Leave us a message
                    </h1>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-2">

                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Your name*"
                            className="w-full px-3 py-3 border border-black rounded-sm focus:outline-none text-sm sm:text-base"
                        />

                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email*"
                            className="w-full px-3 py-3 border border-black rounded-sm focus:outline-none text-sm sm:text-base"
                        />

                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Phone"
                            className="w-full px-3 py-3 border border-black rounded-sm focus:outline-none text-sm sm:text-base"
                        />

                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Message*"
                            rows="5"
                            className="w-full px-3 py-3 border border-black rounded-md focus:outline-none text-sm sm:text-base"
                        ></textarea>

                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 w-full">

                            <p className="text-xs sm:text-sm text-gray-600">
                                By clicking Submit you agree to our{" "}
                                <span className="text-orange-500 underline cursor-pointer">
                                    Privacy Policy
                                </span>
                            </p>

                            <button className="btn-p flex items-center justify-center gap-2 border px-5 py-3 rounded-md text-purple-900 hover:bg-purple-900 hover:text-white transition w-full sm:w-auto">
                                ➜ Submit
                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </div>
    )
}

export default Contactus