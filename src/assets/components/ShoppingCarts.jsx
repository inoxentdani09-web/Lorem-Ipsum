import React, { useEffect } from 'react';
import './styles/shoppingCart.css';
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const ShoppingCarts = ({ cartItems, setCartItems }) => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const updateQty = (idx, delta) => {
    setCartItems(prev =>
      prev.map((item, i) =>
        i === idx
          ? { ...item, qty: Math.max(1, item.qty + delta) }
          : item
      )
    );
  };

  const removeItem = (idx) => {
    setCartItems(prev => prev.filter((_, i) => i !== idx));
  };

  const subtotal = cartItems.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = cartItems.length ? 5.5 : 0;
  const total = subtotal + shipping;

  return (
    <div className="mt-5 p-4 sm:p-6 lg:p-5 w-full flex flex-col lg:flex-row gap-8 bg-[#ccc]">

      <div className="w-full lg:flex-1">

        <h1 className="text-xl sm:text-3xl lg:text-5xl font-bold mb-5 ">
          Your Shopping Cart
        </h1>

        <div className="h-100 sm:h-125 overflow-y-auto space-y-4 pr-2 mt-10 cart">

          {cartItems.map((item, idx) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row items-center sm:items-center gap-4 bg-[#a8a3a3] p-4 rounded-2xl shadow-xl"
            >

              <img
                src={item.image}
                className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded"
              />

              <div className="flex-1 text-center sm:text-left">
                <div className="font-medium text-sm sm:text-base">
                  {item.brand}
                </div>
                <div className="text-xs text-gray-600">
                  {item.color}
                </div>
              </div>

              <div className="flex items-center gap-3">

                <button
                  onClick={() => updateQty(idx, -1)}
                  className="w-8 h-8 flex items-center justify-center bg-[#4E36CF] text-white rounded cursor-pointer"
                >
                  -
                </button>

                <span className="text-sm sm:text-base">{item.qty}</span>

                <button
                  onClick={() => updateQty(idx, 1)}
                  className="w-8 h-8 flex items-center justify-center bg-[#4E36CF] text-white rounded cursor-pointer"
                >
                  +
                </button>

              </div>

              <div className="font-medium text-sm sm:text-base">
                ${(item.price * item.qty).toFixed(2)}
              </div>

              <button
                onClick={() => removeItem(idx)}
                className="w-7 h-7 flex items-center justify-center bg-[#4E36CF] text-white rounded-full cursor-pointer"
              >
                x
              </button>

            </div>
          ))}

          {cartItems.length === 0 && (
            <p className="text-center text-sm sm:text-base">
              Your cart is empty.
            </p>
          )}

        </div>

        <button
          className="flex items-center gap-2 font-bold mt-5 text-sm sm:text-base cursor-pointer"
          onClick={() => navigate('/')}
        >
          <FaArrowLeft />
          Continue Shopping
        </button>

      </div>

      <div className="w-full h-100 lg:w-[320px] flex flex-col  justify-between bg-[#a8a3a3] p-5 sm:p-6 rounded-2xl shadow-inner">

        <h2 className="text-lg sm:text-2xl font-semibold text-center mb-6">
          Order Summary
        </h2>

        <div className="space-y-4 text-sm sm:text-base">

          <div className="flex  justify-between">
            <span>Items ({cartItems.length})</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between border-b border-gray-600 pb-3">
            <span>Shipping</span>
            <span>${shipping.toFixed(2)}</span>
          </div>

          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>

        </div>

        <button className="w-full mt-6 h-11.25 bg-[#4E36CF] text-white rounded">
          Checkout
        </button>

      </div>

    </div>
  );
};

export default ShoppingCarts;