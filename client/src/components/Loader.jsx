import React from "react";

const Loader = () => {
  return (
    <div className="flex space-x-2">
      <div>Loading...</div>
      <div className="animate-spin rounded-full h-5 w-5 border-t-4 border-white border-opacity-100"></div>
    </div>
  );
};

export default Loader;
