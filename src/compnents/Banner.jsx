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
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      ref={scrolldiv}
      className="flex items-center -mt-5  overflow-x-auto scroll-smooth snap-x snap-mandatory h-[60vh] sm:h-[70vh] md:h-screen banner"
    >
      <div className="shrink-0 w-full h-full flex items-center justify-center snap-center px-2 sm:px-4 md:px-10">
        <img className="w-full h-37.5 sm:h-75 md:h-112.5  rounded-[15px] sm:rounded-[25px] md:rounded-[40px]" src="./images/banner.jpg" />
      </div>

      <div className="shrink-0 w-full h-full flex items-center justify-center snap-center px-2 sm:px-4 md:px-10">
        <img className="w-full h-37.5 sm:h-75 md:h-112.5 rounded-[15px] sm:rounded-[25px] md:rounded-[40px]" src="./images/shoesbanner.jpg" />
      </div>

      <div className="shrink-0 w-full h-full flex items-center justify-center snap-center px-2 sm:px-4 md:px-10">
        <img className="w-full h-37.5 sm:h-75 md:h-112.5 rounded-[15px] sm:rounded-[25px] md:rounded-[40px]" src="./images/banner2.jpg" />
      </div>

      <div className="shrink-0 w-full h-full flex items-center justify-center snap-center px-2 sm:px-4 md:px-10">
        <img className="w-full h-37.5 sm:h-75 md:h-112.5  rounded-[15px] sm:rounded-[25px] md:rounded-[40px]" src="./images/banner3.jpg" />
      </div>

      <div className="shrink-0 w-full h-full flex items-center justify-center snap-center px-2 sm:px-4 md:px-10">
        <img className="w-full h-37.5 sm:h-75 md:h-112.5  rounded-[15px] sm:rounded-[25px] md:rounded-[40px]" src="./images/banner4.jpg" />
      </div>
    </div>
  );
};

export default Banner;