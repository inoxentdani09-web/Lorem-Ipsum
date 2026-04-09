import React from "react";

const About = () => {
  const newLocal = "w-25 h-25 sm:w-30 sm:h-30 md:w-35 md:h-35 flex items-center justify-center";
  return (
    <div className="w-full overflow-x-hidden">

      <div className="px-3 sm:px-5 md:px-10 lg:px-5 py-5">

        <div 
        style={{ backgroundImage: "url('/images/aboutbg.jpg')" }}
        className=' bg-center bg-cover h-62.5 sm:h-87.5 md:h-100 lg:h-117.5 rounded-lg w-full flex items-center justify-center px-3'>
          
          <h1 className='text-white text-xl sm:text-3xl md:text-4xl text-center font-bold'>
            LOREM IPSUM IS A MALL, A MARKETPLACE
            <br />
            AND A COMMUNITY
          </h1>
        </div>

        <div className='about-content px-4 sm:px-10 md:px-25 py-10 sm:py-12.5 my-5 sm:my-10 flex flex-col items-center justify-center gap-6 sm:gap-10 bg-[#c2c2c2]'>

          <h1 className='text-xl sm:text-2xl md:text-3xl font-bold text-center text-[#ff6f01] fjalla-one-regular'>
            WHO WE ARE
          </h1>

          <div className='text-center w-full sm:w-[90%] md:w-[80%] text-sm sm:text-lg md:text-xl text-[#433737] space-y-5'>

            <p>
              We are a passionate team dedicated to delivering high-quality products and exceptional experiences.
              Our mission is to bring innovation, style, and reliability to everything we offer.
              We believe in building trust, creating value, and growing together with our customers.
            </p>

            <p>
              We are committed to quality, innovation, and customer satisfaction.
              Our goal is to create products that make your life better and easier.We are driven by passion and creativity.
              Our focus is to deliver value and build lasting relationships.
            </p>

            <p>
              We believe in quality, trust, and innovation.
              Our journey is all about making a difference in every step.
              We are a team that turns ideas into reality.
            </p>

            <p>
              Our aim is to provide solutions that truly matter.We are committed to excellence and growth.
              Our vision is to inspire and lead with purpose.
            </p>

          </div>
        </div>

        <div 
        style={{backgroundImage: "url('/images/ourMission.jpg')" }}
        className='bg-cover bg-center h-62.5 sm:h-87.5 md:h-100 w-full flex items-center justify-center px-3 text-white my-5 sm:my-10 rounded-lg'>

          <div className='space-y-3 sm:space-y-5 text-center px-2 max-w-200'>

            <h1 className='text-2xl sm:text-4xl md:text-5xl font-bold'>
              Our Mission
            </h1>

            <p className='text-sm sm:text-xl md:text-2xl'>
              Make a positive impact through our products and services. Make customer satisfaction our top priority.
            </p>

          </div>
        </div>

        <div className="px-4 sm:px-10 md:px-25 py-7.5 sm:py-12.5 my-5 sm:my-10 bg-[#c2c2c2]">

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-10 justify-items-center">

            {[
              { img: "/images/ownership.png", text: "Ownership" },
              { img: "/images/creatchange.png", text: "Creativity" },
              { img: "/images/teamwork.png", text: "Teamwork" },
              { img: "/images/coustomer.png", text: "Customer Commitment" },
              { img: "/images/integrity.png", text: "Integrity" },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center gap-3 border-b-2 border-[#bab9b9] pb-3">

                <div className="w-25 h-25 sm:w-30 sm:h-30 md:w-35 md:h-35 flex items-center justify-center">
                  <img src={item.img} className="w-full h-full object-contain" />
                </div>

                <p>{item.text}</p>

              </div>
            ))}

          </div>

        </div>

        <div className='relative w-full my-5 sm:my-10 overflow-hidden'>

          <div
            style={{backgroundImage:"url('/images/coustomerbg.webp')"}}
            className="w-full h-25 sm:h-100 md:h-100 object-cover object-center rounded-lg "
          >
          </div>

        </div>

        <div className='about-content px-4 sm:px-10 md:px-25 py-7.5 sm:py-12.5 my-5 sm:my-10 flex flex-wrap items-center justify-center gap-5 sm:gap-10 md:gap-20 lg:gap-10 text-[#433737]'>

          {[
            { img: "/images/mobilecart.png", text: "Biggest Variety" },
            { img: "/images/moiletrofy.png", text: "Best Prices" },
            { img: "/images/ease.png", text: "Ease & Speed" },
            { img: "/images/delivery.png", text: "Fast Delivery" },
            { img: "/images/protected.png", text: "100% Protected" },
          ].map((item, i) => (

            <div key={i} className="flex flex-col items-center justify-center text-center gap-4 w-35">

              <div className={newLocal}>
                <img src={item.img} className="w-full h-full object-contain" />
              </div>

              <p className="text-black dark:text-white font-semibold">{item.text}</p>

            </div>

          ))}

        </div>

        <div 
        style={{backgroundImage:"url('/images/deliveryservices.webp')"}}
        className='bg-cover bg-center h-auto md:h-100 w-full px-4 sm:px-10 md:px-25 py-10 text-white flex items-center rounded-lg'>

          <div className="space-y-4 w-full ">

            <h1 className="text-xl sm:text-3xl md:text-4xl  font-bold">
              Our own delivery service - DEX
            </h1>

            <p className="text-sm sm:text-lg md:text-xl">
              Our own delivery service, DEX, ensures fast and reliable shipping every time.
              We handle every order with care to guarantee safe and timely delivery.
              With DEX, you get real-time updates and a smooth delivery experience.
              Our goal is to make your shopping journey simple, quick, and stress-free.
            </p>

          </div>

        </div>

        <div className="w-full my-5 sm:my-10 overflow-hidden">

          <img
            src="/images/mistakes.webp"
            className="w-full h-32.5 sm:h-75 md:h-100 object-cover object-center rounded-lg"
          />

        </div>

        <div className='bg-[#F7F7F7] px-4 sm:px-10 md:px-12.5 py-10 sm:py-12.5'>

          <h1 className='text-xl sm:text-2xl md:text-3xl font-bold mb-7.5 sm:mb-12.5 text-center text-[#3f3d3d]'>
            Six aspirations to lead Pakistan into the digital era by 2026
          </h1>

          <img src="/images/last.jpg" className="w-full max-w-225 mx-auto object-contain" />

        </div>

      </div>
    </div>
  );
};

export default About;