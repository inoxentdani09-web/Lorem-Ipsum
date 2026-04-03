import React, { useEffect, useState } from "react";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

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
import Terms from "./assets/components/TermsCondition";
import AddShoes from "./assets/components/AddShoes";

function App() {
  const [shoesData, setShoesData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("cartItems");
    return saved ? JSON.parse(saved) : [];
  });

  const fetchShoes = () => {
    fetch("http://localhost:5000/api/shoes")
      .then((res) => res.json())
      .then((data) => setShoesData(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchShoes();
  }, []);

  const cartCount = cartItems.reduce(
    (total, item) => total + (item.qty || 0),
    0
  );

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
      <Routes>
        <Route
          path="/add-shoe"
          element={
            <>
              <Navigation cartCount={cartCount} setSearchTerm={setSearchTerm} />
              <AddShoes onAddSuccess={fetchShoes} />
              <Footer />
            </>
          }
        />

        <Route
          path="/terms"
          element={
            <>
              <Navigation cartCount={cartCount} setSearchTerm={setSearchTerm} />
              <Terms />
              <Footer />
            </>
          }
        />

        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/"
          element={
            <>
              <Navigation cartCount={cartCount} setSearchTerm={setSearchTerm} />
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
              <Navigation cartCount={cartCount} setSearchTerm={setSearchTerm} />
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
              <Navigation cartCount={cartCount} setSearchTerm={setSearchTerm} />
              <About />
              <Footer />
            </>
          }
        />

        <Route
          path="/contact us"
          element={
            <>
              <Navigation cartCount={cartCount} setSearchTerm={setSearchTerm} />
              <Contactus />
              <Footer />
            </>
          }
        />

        <Route
          path="/faq"
          element={
            <>
              <Navigation cartCount={cartCount} setSearchTerm={setSearchTerm} />
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