import React, { useEffect, useState } from "react";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi";

import Navigation from "./assets/components/Navigation";
import Footer from "./assets/components/Footer";
import ShoppingCarts from "./assets/components/ShoppingCarts";
import About from "./assets/components/about";
import Contactus from "./assets/components/Contactus";
import HomePage from "./assets/components/HomePage";
import FAQ from "./assets/components/FAQ";
import ScrollToTop from "./ScrollToTop";
import SignupPage from "./assets/components/SignupPage";
import LoginPage from "./assets/components/LoginPage";
import GoogleAuthCallback from "./assets/components/GoogleAuthCallback";
import Terms from "./assets/components/TermsCondition";
import AddShoes from "./assets/components/AddShoes";

function App() {
  const [shoesData, setShoesData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("cartItems");
    return saved ? JSON.parse(saved) : [];
  });

  const fetchShoes = () => {
    fetch(`${import.meta.env.VITE_API_URL}/api/shoes`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => setShoesData(data))
      .catch((err) => {
        console.error("Error fetching shoes:", err);
        setShoesData([]); // Set empty array on error
      });
  };

  useEffect(() => {
    fetchShoes();
  }, []);

  const cartCount = cartItems.reduce(
    (total, item) => total + (item.qty || 0),
    0
  );

  useEffect(() => {
    document.body.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const addTocart = (shoe) => {
    setCartItems((prev) => {
      const exist = prev.find((item) => item.id === shoe.id);

      if (exist) {
        return prev.map((item) =>
          item.id === shoe.id ? { ...item, qty: item.qty + 1 } : item
        );
      } else {
        return [...prev, { ...shoe, qty: 1 }];
      }
    });
  };

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const handleDelete = (id) => {
    setShoesData((prev) => prev.filter((shoe) => shoe.id !== id));
  };

  return (
    <BrowserRouter>
      <ScrollToTop />
      <button
        type="button"
        onClick={toggleTheme}
        className="theme-switcher fixed right-0 top-1/2 z-50 flex items-center gap-2 rounded-full border border-slate-300 bg-white px-2 py-2 text-sm font-medium text-slate-900 shadow-xl transition hover:bg-slate-100 transform -translate-y-1/2"
      >
        {theme === "dark" ? <HiOutlineSun className="text-lg" /> : <HiOutlineMoon className="text-lg" />}
        {theme === "dark" ? "Light Mode" : "Dark Mode"}
      </button>
      <Routes>
        <Route
          path="/add-shoe"
          element={
            <>
              <Navigation
                cartCount={cartCount}
                setSearchTerm={setSearchTerm}
                theme={theme}
                toggleTheme={toggleTheme}
              />
              <AddShoes onAddSuccess={fetchShoes} />
              <Footer />
            </>
          }
        />

        <Route
          path="/terms"
          element={
            <>
              <Terms />
             
            </>
          }
        />

        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/google-callback" element={<GoogleAuthCallback />} />

        <Route
          path="/"
          element={
            <>
              <Navigation
                cartCount={cartCount}
                setSearchTerm={setSearchTerm}
                theme={theme}
                toggleTheme={toggleTheme}
              />
              <HomePage
                shoesData={shoesData}
                addTocart={addTocart}
                searchTerm={searchTerm}
                handleDelete={handleDelete}
              />
              <Footer />
            </>
          }
        />

        <Route
          path="/cart"
          element={
            <>
              <Navigation
                cartCount={cartCount}
                setSearchTerm={setSearchTerm}
                theme={theme}
                toggleTheme={toggleTheme}
              />
              <ShoppingCarts
                cartItems={cartItems}
                setCartItems={setCartItems}
                searchIno={searchTerm}
              />
              <Footer />
            </>
          }
        />

        <Route
          path="/about"
          element={
            <>
              <Navigation
                cartCount={cartCount}
                setSearchTerm={setSearchTerm}
                theme={theme}
                toggleTheme={toggleTheme}
              />
              <About />
              <Footer />
            </>
          }
        />

        <Route
          path="/contact us"
          element={
            <>
              <Navigation
                cartCount={cartCount}
                setSearchTerm={setSearchTerm}
                theme={theme}
                toggleTheme={toggleTheme}
              />
              <Contactus />
              <Footer />
            </>
          }
        />

        <Route
          path="/faq"
          element={
            <>
              <Navigation
                cartCount={cartCount}
                setSearchTerm={setSearchTerm}
                theme={theme}
                toggleTheme={toggleTheme}
              />
              <FAQ />
              <Footer />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;