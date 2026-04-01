const Shoescard = ({ addTocart, shoe }) => {


  return (
    <> <div className="w-full max-w-7xl flex items-center justify-center  ">
      <div className="w-72.5 overflow-hidden bg-white rounded-2xl shadow-2xl ">

        <div className=" overflow-hidden  rounded-xl">
          <img
           src={shoe.img} alt={shoe.brand}
            className='h-50 w-full rounded-[10px] cursor-pointer transition duration-300 hover:scale-105 '
          />
        </div>

        <div className=" bg-white p-4">
          <h1 className='text-[20px] font-semibold mb-2'>{shoe.brand}</h1>

          <div className="card-info flex gap-2.5">
            <p className='px-2 py-0.5 border-2 border-[#ccc] text-[#4e4a4a] margin-top-[10px] rounded-[10px] text-[11px] color-[#4e4a4a]'>{shoe.size}</p>
            <p className='px-2 py-0.5 border-2 border-[#ccc] text-[#4e4a4a]  margin-top-[10px] rounded-[10px] text-[11px] color-[#4e4a4a]'>{shoe.color}</p>
          </div>

          <div className="card-des">
            <p className='text-[13px] py-2.5 '>{shoe.description}</p>
          </div>

          <div className='card-price flex justify-between items-center mt-2.5'>
            <div>
              <p className='text-[14px] font-bold text-[#222]'>PRICE</p>
              <p className='text-[14px] font-bold text-[#222]'>${shoe.price}</p>
            </div>

            <div>
              <button onClick={() => addTocart(shoe)}
                className='bg-[#5E558A] text-white py-2.5 px-7.5 rounded-[5px] cursor-pointer hover:bg-[#a69be3]'
              >
                Add to cart
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>



    </>
  );
};
export default Shoescard
