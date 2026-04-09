import { FaShoppingCart, FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import './styles/cart.css';
import { useState } from "react";

const Navigation = ({ cartCount, setSearchTerm}) => {
  const [searchInput, setsearchInput] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = () => {
    setSearchTerm(searchInput);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const closeMenu = () => {
    setOpen(false);
  };

  return (
    <>
      <div className='w-full h-15 md:h-17.5 bg-white/60 p-3 px-4 md:px-5 flex items-center justify-between sticky top-0 z-50 backdrop-blur-md shadow-2xl'>
        <div className='w-20 md:w-25'>
          <img src="/images/logo.png" alt="Logo" />
        </div>

        <ul className="hidden lg:flex items-center  gap-5 lg:gap-6.25 ml-5 lg:ml-15 ">
          <li className="hover:text-[#4b31cd] font-semibold"><Link to="/">Home</Link></li>
          <li className="hover:text-[#4b31cd] font-semibold"><Link to="/about" preventScrollReset={false}>About</Link></li>
          <li className="hover:text-[#4b31cd] font-semibold"><Link to="/Contact us">Contact Us</Link></li>
          <li className="hover:text-[#4b31cd] font-semibold"><a href="#">Crear</a></li>
          <li className="hover:text-[#4b31cd] font-semibold">  <Link to="/FAQ">FAQ</Link></li>
        </ul>

        <div className='flex items-center gap-3 md:gap-4'>
          <div className="hidden sm:flex items-center">
            <input
              type="text"
              className=" bg-[#c6c1c1] dark:gray-300 px-3 md:px-4 py-2  rounded-tl-lg rounded-bl-lg text-[14px] md:text-[10px] outline-none"
              placeholder="Search"
              value={searchInput}
              onChange={(e) => {
                const value = e.target.value;
                setsearchInput(value);
                if (value.trim() === "") {
                  setSearchTerm("");
                }
              }}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <p
              className="flex items-center bg-[#5E558A] hover:bg-[#75708b] px-3 md:px-4 md:text-[15px] py-2   rounded-tr-lg rounded-br-lg cursor-pointer  transition text-white dark:text-white"
              onClick={handleSearch}
            >
              <FaSearch />
            </p>
          </div>

          <div className="px-1 md:px-2 flex items-center relative text-black">
            <Link to="/cart">
              <span className="absolute -top-2 -right-2 w-4 h-4 md:w-4.5 md:h-4.5 rounded-full bg-[#5E558A] text-white text-[10px] md:text-xs flex items-center justify-center">
                {cartCount}
              </span>
              <FaShoppingCart className="text-xl md:text-2xl cursor-pointer hover:text-[#5E558A] transition" />
            </Link>
          </div>
            <Link to="/add-shoe">
    <button className="hidden lg:block px-4 py-1 border-2 border-[#5E558A] hover:bg-[#5E558A]  text-sm rounded-full transition text-black font-semibold dark:text-white">
      Add Shoe
    </button>
  </Link>

          {/* Logout button - visible only on lg screens */}
          <button
            onClick={handleLogout}
            className="hidden lg:block px-5 py-1 border-2 border-[#5E558A] hover:bg-[#5E558A] hover:text-white text-black text-sm font-medium rounded-full transition-colors"
          >
            Logout
          </button>

          {/* Menu icon - visible only on mobile */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden text-2xl cursor-pointer hover:text-[#5E558A] transition"
          >
            {<FaBars />}
          </button>
        </div>
      </div>

      {/* Overlay - click to close sidebar */}
      {open && (
        <div
          onClick={closeMenu}
          className="fixed inset-0 bg-black/40 z-40"
        ></div>
      )}

      <div
        className={`fixed flex flex-col top-0 md:top-0 left-0 h-full md:h-full sm:h-160 md:w-2/3 sm:w-90  w-full bg-white rounded-t-2xl text-black z-50 
  transform transition-all duration-300 ease-in-out shadow-2xl
  ${open ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"} lg:hidden`}
      >
        <div className='flex items-center justify-between   px-2 bg-linear-to-r from-[#cfcae9] to-[#1a0765] rounded-b-xl '>
          <img src="/images/logo.png" alt="Logo" className="sm:w-24 w-20" />
          <button
            onClick={closeMenu}
            className="text-white/50 text-2xl hover:bg-white/20 p-2 rounded-lg transition-all duration-200"
          >
            <FaTimes />
          </button>
        </div>

        <ul className="flex flex-col gap-2 py-3 px-2 mt-2 md:py-10 sm:py-5 sm:mt-5 space-y-4  sm:space-y-3">
          <li>
            <Link
              to="/"
              onClick={closeMenu}
              className="block py-2 px-4  text-sm sm:text-lg bg-gray-200 hover:bg-gray-400 rounded-lg text-gray-700 font-medium hover:text-white transition-all duration-200"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              onClick={closeMenu}
              className="block py-2 px-4 text-sm sm:text-lg rounded-lg bg-gray-200 hover:bg-gray-400  text-gray-700 font-medium hover:text-white transition-all duration-200"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/Contact us"
              onClick={closeMenu}
              className="block py-2 px-4 text-sm sm:text-lg rounded-lg bg-gray-200 hover:bg-gray-400  text-gray-700 font-medium hover:text-white transition-all duration-200"
            >
              Contact Us
            </Link>
          </li>
          <li>
            <a
              href="#"
              className="block py-2 px-4 text-sm sm:text-lg rounded-lg bg-gray-200 hover:bg-gray-400  text-gray-700 font-medium hover:text-white transition-all duration-200"
            >
              Crear
            </a>
          </li>
          <li>
            <Link
              to="/FAQ"
              onClick={closeMenu}
              className="block py-2 px-4 text-sm sm:text-lg rounded-lg bg-gray-200 hover:bg-gray-400  text-gray-700 font-medium hover:text-white transition-all duration-200"
            >
              FAQ
            </Link>
          </li>
          <li>
            <Link
              to="/add-shoe"
              onClick={closeMenu}
              className="block py-2 px-4 text-sm sm:text-lg rounded-lg bg-green-500 text-white font-medium hover:bg-green-600 transition-all duration-200"
            >
              Add Shoe
            </Link>
          </li>
        </ul>

        {/* Logout Button */}
        <div className="px-4 bottom-3 fixed  sm:fixed sm:bottom-0 w-full">
          <button
            onClick={() => {
              handleLogout();
              closeMenu();
            }}
            className="w-full px-1 py-2 bg-linear-to-r mt-6 sm:mb-10  from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Navigation;