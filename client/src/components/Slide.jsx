import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useFetchProductQuery } from "../redux/api/productApiSlice";

const Slide = () => {
  const { data: products, isLoading } = useFetchProductQuery();

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    centerMode: true, // Kích hoạt chế độ trung tâm
    centerPadding: "20%", // Khoảng cách giữa các slide (từ lề bên trái của slide trung tâm)
  };

  return (
    <div className="w-full z-0">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <Slider {...settings}>
          {products?.map((data) => (
            <>
              <div
                key={data.id}
                className="w-full p-5 flex items-center justify-center "
              >
                <img
                  className="w-[60%] h-auto"
                  src={data.image}
                  alt={data.name}
                />
                <div className="absolute top-10 right-96">
                  Best Seller
                </div>
              </div>
            </>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default Slide;
