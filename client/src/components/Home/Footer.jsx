import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-[#202020] pb-20 text-white w-full pt-10 space-y-10">
      <h1 className="text-center font-medium text-[30px]">DISCOVER NEW </h1>
      <div className="px-[18%] pt-10 flex items-end space-x-14">
        <div className="w-[50%]">
          <img
            src="/uploads\fashion-1.jpg"
            alt="áo"
            className="w-[550px] h-[300px]"
          />
        </div>
        <div className="space-y-5 w-[50%]">
          <h1 className="text-[30px] font-medium">Shirt Clother</h1>
          <p>
            Whether you're aiming for comfort or style, finding the perfect
            shirt is effortless with Shirt Clother.
          </p>
          <p className="text-end">View more &gt;</p>
        </div>
      </div>
      <div className="px-[18%] pt-20 flex items-end space-x-14">
        <div className="space-y-5 w-[50%]">
          <h1 className="text-[30px] font-medium">Trousers Clother</h1>
          <p>
            At Shirt Clother, discover trousers that combine superior comfort
            with timeless style, designed to enhance your everyday wardrobe with
            effortless elegance and lasting quality.
          </p>
          <p className="text-end">View more &gt;</p>
        </div>
        <div className="w-[50%]">
          <img
            src="/uploads\fashion-2.jpg"
            alt="áo"
            className="w-[550px] h-[300px]"
          />
        </div>
      </div>
    </div>
  );
};

export default Footer;
