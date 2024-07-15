import React, { useEffect, useState } from "react";
import { useFetchProductQuery } from "../../redux/api/productApiSlice";
import { Link } from "react-router-dom";

const ProductHeader = () => {
  const { data: product, refetch, isLoading, isError } = useFetchProductQuery();

  const sortedProducts = product
    ? [...product].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    : [];

  return (
    <div className="w-full py-10">
      <div className="px-[15%]">
        <div className="flex justify-between items-center px-[5%]">
          <h1 className=" font-medium text-[30px]">NEW ARRIVAL</h1>
          <Link to={"/shop"}>View All &gt; </Link>
        </div>
        <div className="pt-14 flex justify-center space-x-5">
          {sortedProducts.slice(0, 4).map((item) => {
            return (
              <Link>
                <div className="px-2 flex flex-col justify-center items-center">
                  <img
                    src={item.image}
                    className="w-[250px] h-[270px] rounded-lg shadow-xl "
                  />
                </div>
                <div className="px-[8%] flex items-center justify-between pt-5">
                  <div>
                    <div className="font-medium text-lg">{item.name}</div>
                    <div>{item.price}$</div>
                  </div>
                  <button className="bg-black text-white px-3 py-2 rounded-full text-sm">
                    Order Now
                  </button>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductHeader;
