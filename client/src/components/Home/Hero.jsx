import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaLongArrowAltRight } from "react-icons/fa";
import Button from "../Button";

const Hero = () => {
  const [productsInfo, setProductsInfo] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch(`/api/product/getproducts?limit=3`);
      const data = await res.json();
      if (res.ok) {
        setProductsInfo(data.products);
      }
    };
    fetchProducts();
  }, []);
  const settings = {
    dots: false,
    infinite: true,
    arrows: false,
    speed: 800,
    slidesToScroll: 1,
    //autoplay: true,
    autoplaySpeed: 4000,
    cssEase: "ease-in-out",
    pauseOnHover: false,
    pauseOnFocus: true,
  };
  return (
    <div className="w-[90%] mx-auto ">
      <div className="overflow-hidden rounded-3xl min-h-[550px] sm:min-h-[650px] hero-bg-color flex justify-center items-center">
        <div className="container pb-8 sm:pb-0">
          <Slider {...settings}>
            {productsInfo.map((data) => (
              <div key={data.id}>
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="flex flex-col justify-center gap-4 md:pl-3 pt-12 md:pt-0 text-center md:text-left order-2 md:order-1 relative z-10 ">
                    <h1 className="text-5xl md:text-6xl font-bold">
                      {data.title}
                    </h1>
                    <p
                      className="text-slate-600"
                      dangerouslySetInnerHTML={{ __html: data.content }}
                    ></p>
                    <div className="flex items-center gap-3">
                      <p className="flex items-center text-primary px-4 py-2 bg-brandWhite rounded-full gap-3 font-semibold">
                        Exclusive offer -50%{" "}
                        <span>
                          <FaLongArrowAltRight />
                        </span>
                      </p>
                      <button className="underline font-semibold">Buy now</button>
                    </div>
                  </div>
                  <div className="order-1 md:order-2">
                    <div>
                      <img
                        src={data.images[0]}
                        alt=""
                        className="w-[300px] h-[300px] sm:h-[450px] sm:w-[450px]  object-contain mx-auto drop-shadow-[-8px_4px_6px_rgba(0,0,0,.4)] z-40 relative"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Hero;
