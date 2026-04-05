import Banner from "./Banner";
import Shoescard from "./Shoescard";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = ({ shoesData, addTocart, searchTerm, handleDelete }) => {
  const navigate = useNavigate();

  // SAFE FILTER (null crash se bachao)
  const filteredShoes = shoesData
    ?.filter((shoe) => shoe?.img) // sirf images wali items
    ?.filter((shoe) => {
      if (!searchTerm || searchTerm.trim() === "") return true;

      const search = searchTerm.toLowerCase().trim();

      return (
        shoe.brand?.toLowerCase().includes(search) ||
        shoe.color?.toLowerCase().includes(search)
      );
    });

  console.log("fetch", shoesData);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <>
      {/* BANNER */}
      <div className="flex sm:items-center overflow-x-auto overflow-y-hidden scroll-smooth snap-x snap-mandatory h-[40vh] sm:h-[70vh] md:h-screen w-full">
        <Banner />
      </div>

      {/* PRODUCTS */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 sm:px-4 gap-4 mt-10 sm:mt-0">
        {filteredShoes?.length === 0 ? (
          <h2 className="card-heading">Result Not Found.....</h2>
        ) : (
          filteredShoes?.map((shoe) => (
            <Shoescard
              key={shoe.id}
              shoe={shoe}
              addTocart={addTocart}
              onDelete={handleDelete}
              
            />
          ))
        )}
       
        
      </div>

      {/* BOTTOM BANNER */}
      <div className="mt-10 w-full px-5 flex justify-center items-center">
        <img
          src="/images/bottombanner.jpg"
          alt=""
          className="w-full h-90 rounded-2xl bg-center bg-cover"
        />
      </div>
    </>
  );
};

export default HomePage;