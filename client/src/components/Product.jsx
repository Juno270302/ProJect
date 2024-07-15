import React from "react";

const Product = ({ product }) => {
  return (
    <div>
      <img src={product.image} className="w-[400px] h-[150px]" />
      <div className="flex justify-between pr-20">
        <div>{product.name}</div>
        {/* <HeartIcon product={product} /> */}
      </div>
    </div>
  );
};

export default Product;
