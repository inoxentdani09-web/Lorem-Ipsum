import { FaFacebook, FaTwitter, FaLinkedin, FaWhatsapp, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white px-4 sm:px-6 py-6 mt-10 text-[#333]">

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-10 max-w-300 mx-auto">

        <div className="flex justify-center md:justify-start">
          <img src="/images/logo.png" alt="logo" className="w-30 sm:w-35" />
        </div>

        <div>
          <ul className="flex flex-col sm:flex-row md:flex-row items-center md:items-start justify-center md:justify-start gap-3 sm:gap-5">
            <li><Link to="/" className="text-[14px] font-semibold hover:text-[#4b31cd]">Home</Link></li>
            <li><Link to="/about" className="text-[14px] font-semibold hover:text-[#4b31cd]">About</Link></li>
            <li><Link to="/Contact us" className="text-[14px] font-semibold hover:text-[#4b31cd]">Contact Us</Link></li>
            <li><Link to="/FAQ" className="text-[14px] font-semibold hover:text-[#4b31cd]">FAQ</Link></li>
          </ul>
        </div>

        <div className="flex flex-col items-center md:items-start border-t md:border-t-0 md:border-l-2 border-[#ccc] pt-5 md:pt-0 md:pl-6">
          <div className="text-[14px] space-y-3 text-center md:text-left">

            <div>
              <p className="text-[15px] font-semibold">Call</p>
              <p className="text-[13px]">+92 318 2315238</p>
            </div>

            <div>
              <p className="text-[15px] font-semibold">Email</p>
              <p className="text-[13px]">inoxentdani09@gmail.com</p>
            </div>

            <div className="flex items-center justify-center md:justify-start">
              <input
                type="email"
                placeholder="Write Email"
                className="text-[13px] py-1 px-2 w-full md:text-[12px] sm:w-auto outline-none border border-[#ccc] border-r-0 rounded-l-lg"
              />
              <button className="bg-[#5E558A] text-white py-1 md:py-1 px-3 md:text-[13px] rounded-r-lg hover:bg-[#908ab0]">
                Send
              </button>
            </div>

          </div>
        </div>

      </div>

      <div className="px-4 sm:px-6 mt-6 border-t border-[#ccc] pt-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 max-w-300 mx-auto">

          <div className="flex flex-col items-center md:items-start gap-3">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full border flex items-center justify-center hover:bg-[#5E558A] hover:text-white"><FaFacebook /></div>
              <div className="w-7 h-7 rounded-full border flex items-center justify-center hover:bg-[#5E558A] hover:text-white"><FaTwitter /></div>
              <div className="w-7 h-7 rounded-full border flex items-center justify-center hover:bg-[#5E558A] hover:text-white"><FaLinkedin /></div>
              <div className="w-7 h-7 rounded-full border flex items-center justify-center hover:bg-[#5E558A] hover:text-white"><FaWhatsapp /></div>
              <div className="w-7 h-7 rounded-full border flex items-center justify-center hover:bg-[#5E558A] hover:text-white"><FaInstagram /></div>
            </div>
            <p className="font-semibold text-xl md:text-2xl">Follow Us</p>
          </div>

          <div className="w-full md:w-1/2 text-center md:text-left">
            <p className="font-semibold text-xl md:text-2xl">About Us</p>
            <p className="text-[13px] mt-3">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Neque repellat quaerat, officiis beatae necessitatibus vitae.
            </p>
          </div>

        </div>
      </div>

    </footer>
  );
};

export default Footer;