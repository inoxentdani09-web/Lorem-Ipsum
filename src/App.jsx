// App.jsx
import React, { useEffect, useState } from "react";
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navigation from './compnents/Navigation';
import Footer from './compnents/Footer';
import ShoppingCarts from './compnents/ShoppingCarts';
import About from './compnents/about';
import Contactus from './compnents/Contactus';
import HomePage from './compnents/HomePage';
import FAQ from './compnents/FAQ';
import ScrollToTop from './ScrollToTop';
import SignupPage from './compnents/SignupPage';
import LoginPage from './compnents/LoginPage';
import Terms from './compnents/TermsCondition'

function App() {

  const shoesData = [
    { id: 1, brand: "Nike", size: "EU 38", color: "Red / White", price: 120, description: "Comfortable Nike running shoes perfect for daily jogging.", image: "./images/shoes.avif" },
    { id: 2, brand: "Adidas", size: "EU 40", color: "White / Blue", price: 110, description: "Lightweight Adidas sports shoes with breathable material.", image: "./images/adidas.webp" },
    { id: 3, brand: "Puma", size: "EU 39", color: "Black / White", price: 95, description: "Stylish Puma sneakers designed for casual wear.", image: "./images/pumashoes.webp" },
    { id: 4, brand: "Reebok", size: "EU 41", color: "Grey / White", price: 100, description: "Classic Reebok training shoes with strong grip.", image: "./images/reebookshoes.webp" },
    { id: 5, brand: "New Balance", size: "EU 42", color: "Navy Blue", price: 130, description: "Premium New Balance running shoes with extra comfort.", image: "./images/newbalance.jpg" },
    { id: 6, brand: "Under Armour", size: "EU 43", color: "Black", price: 125, description: "Under Armour performance shoes for athletes.", image: "./images/underarmour.jpg" },
    { id: 7, brand: "Converse", size: "EU 40", color: "White", price: 85, description: "Classic Converse sneakers perfect for street style.", image: "./images/converse.jpg" },
    { id: 8, brand: "Vans", size: "EU 41", color: "Black / White", price: 90, description: "Trendy Vans skate shoes with durable sole.", image: "./images/vans.webp" },
    { id: 9, brand: "Skechers", size: "EU 42", color: "Grey", price: 105, description: "Soft Skechers walking shoes with memory foam.", image: "./images/skechers.jpg" },
    { id: 10, brand: "Asics", size: "EU 39", color: "Blue / Green", price: 115, description: "High performance Asics running shoes for sports.", image: "./images/asics.webp" },
    { id: 11, brand: "Fila", size: "EU 49", color: "Black", price: 120, description: "Stylish Fila sneakers with comfortable cushioning for daily wear.", image: "./images/fila.webp" },
    { id: 12, brand: "Mizuno", size: "EU 36", color: "Black", price: 115, description: "Mizuno running shoes engineered for high performance and superior comfort", image: "./images/Mizuno2.webp" }
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("cartItems");
    return saved ? JSON.parse(saved) : [];
  });

  const cartCount = cartItems.reduce((total, item) => total + (item.qty || 0), 0);

  const addTocart = (shoe) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === shoe.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === shoe.id ? { ...item, qty: item.qty + 1 } : item
        );
      } else {
        return [...prevItems, { ...shoe, qty: 1 }];
      }
    });
  };

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>

        <Route path="/terms" element={
          <>
            <Navigation cartCount={cartCount} setSearchTerm={setSearchTerm} />
            <Terms />
            <Footer />

          </>
        } />



        <Route path="/signup" element={<SignupPage isOpen={true} onClose={() => false} />} />
        <Route path="/login" element={<LoginPage />} />

        <Route path="/" element={
          <>
            <Navigation cartCount={cartCount} setSearchTerm={setSearchTerm} />
            <HomePage shoesData={shoesData} addTocart={addTocart} searchTerm={searchTerm} />
            <Footer />
          </>
        } />

        <Route path="/cart" element={
          <>
            <Navigation cartCount={cartCount} setSearchTerm={setSearchTerm} />
            <ShoppingCarts cartItems={cartItems} setCartItems={setCartItems} searchIno={searchTerm} />
            <Footer />
          </>
        } />
        <Route path="/about" element={
          <>
            <Navigation cartCount={cartCount} setSearchTerm={setSearchTerm} />
            <About />
            <Footer />
          </>
        } />
        <Route path="/contactus" element={
          <>
            <Navigation cartCount={cartCount} setSearchTerm={setSearchTerm} />
            <Contactus />
            <Footer />
          </>
        } />
        <Route path="/faq" element={
          <>
            <Navigation cartCount={cartCount} setSearchTerm={setSearchTerm} />
            <FAQ />
            <Footer />
          </>
        } />

      </Routes>

    </BrowserRouter>
  );
}

export default App;