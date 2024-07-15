import React, { useEffect, useState } from "react";

import InfoHeader from "../components/Home/InfoHeader";
import ProductHeader from "../components/Home/ProductHeader";
import Footer from "../components/Home/Footer";

const Home = () => {
  return (
    <div className="space-y-10">
      <InfoHeader />
      <ProductHeader />
      <Footer />
    </div>
  );
};

export default Home;
