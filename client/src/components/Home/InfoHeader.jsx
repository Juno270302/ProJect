import React from "react";
import { Link } from "react-router-dom";

const InfoHeader = () => {
  return (
    <div className="w-full ">
      <div className="px-[15%]">
        <h1 className="text-center py-14 text-[70px] font-medium">JUNO</h1>
        <hr style={{ borderTop: "2px solid black" }} />
        <div className="w-full py-10 flex px-[10%] justify-between font-medium text-black/70 text-lg ">
          <p className="w-[30%]">
            We carry the latest and most stylish fashion collections
          </p>
          <p className="w-[30%]">
            We provide personalized fashion advice, right in the store or at
            your home!
          </p>
          <p className="w-[30%]">
            At Juno, we help you find a fashion style that truly reflects you.
          </p>
        </div>
        <div className=" text-center pb-14">
          <Link to={"/shop"}>
            <button className="border px-5 py-3 border-black text-lg font-medium rounded-full">
              JUNO Products
            </button>
          </Link>
        </div>

        <div className="w-full  border border-red-400">
          <img src="/uploads\Cloth-Store.jpg" className="w-full h-[400px]" />
        </div>
      </div>
    </div>
  );
};

export default InfoHeader;
