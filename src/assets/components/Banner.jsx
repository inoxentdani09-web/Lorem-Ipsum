import { useEffect, useRef } from "react";

const Banner = () => {
  const scrolldiv = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const div = scrolldiv.current;

      if (div) {
        const scrollAmount = div.offsetWidth;

        div.scrollBy({
          left: scrollAmount,
          behavior: "smooth",
        });

        if (div.scrollLeft + scrollAmount >= div.scrollWidth - scrollAmount) {
          div.scrollLeft = 0;
        }
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      ref={scrolldiv}
      className=" w-full flex overflow-x-auto overflow-y-hidden  pb-30 pt-30  md:pt-10  scroll-smooth snap-x snap-mandatory h-[45vh] sm:h-[0vh] md:h-[100vh] md:px-4 banner"
    >
      {["banner.jpg",
        "shoesbanner.jpg",
        "banner2.jpg",
        "banner3.jpg",
        "banner4.jpg"].map((img, i) => (
          <div
            key={i}
            className="shrink-0 w-full h-full snap-center px-2 sm:px-4  "
          >
            <div className="w-full h-full rounded-[15px] sm:rounded-[25px] md:rounded-[40px] overflow-hidden">
              <img
                className="w-full h-full object-cover bg-center"
                src={`/images/${img}`}
              />
            </div>
          </div>
        ))}
    </div>
  );
};

export default Banner;