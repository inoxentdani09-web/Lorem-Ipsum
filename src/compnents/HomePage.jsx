import Banner from "./Banner";
import Shoescard from "./Shoescard";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const HomePage = ({ shoesData, addTocart, searchTerm }) => {
  const navigate = useNavigate();
  const filteredShoes = shoesData.filter(shoe => {
    if (!searchTerm || searchTerm.trim() === "") return true;
    const search = searchTerm.toLowerCase().trim();
    return (
      shoe.brand.toLowerCase().includes(search) ||
      shoe.color.toLowerCase().includes(search)
    );
  });

  useEffect(() => {
    const user = localStorage.getItem('userData')
    if (!user) {
      navigate('/Login')
    }
  }, []);
  return (
    <>
      <div className="banner p-0">
        <Banner />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 px-4 gap-4 ">
        {filteredShoes.length === 0 ? (
          <h2 className="card-heading">Result Not Found.....</h2>
        ) : (
          filteredShoes.map((shoe) => (
            <Shoescard
              key={shoe.id}
              shoe={shoe}
              image={shoe.image}
              brand={shoe.brand}
              size={shoe.size}
              color={shoe.color}
              des={shoe.description}
              price={shoe.price}
              addTocart={addTocart}
            />
          ))
        )}
      </div>
      <div className=" mt-10  w-full px-5  flex justify-center items-center" >
        <img src="./images/bottombanner.jpg" alt="" className="w-full h-90 rounded-2xl  bg-center bg-cover" />
      </div>
    </>
  );
};

export default HomePage;