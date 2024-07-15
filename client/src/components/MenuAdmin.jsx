import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaRegUser } from "react-icons/fa6";
import { IoMdMenu } from "react-icons/io";
import { BiCategory } from "react-icons/bi";
import { AiOutlineProduct } from "react-icons/ai";

import "./MenuAdmin.css"; // Import the CSS file

const MenuAdmin = () => {
  const location = useLocation();

  const [isMenu, setIsMenu] = useState(false);

  return (
    <div
      className={`menu-container ${
        isMenu ? "expanded" : "collapsed"
      } my-1 rounded-lg`}
    >
      {isMenu ? (
        <div className="w-full flex flex-col py-5 space-y-1">
          <div
            className={
              location.pathname === "/admin/manageUser"
                ? "w-full h-full text-center font-bold text-xl border-r-2 border-gray-500"
                : "w-full h-full text-center font-bold text-xl text-gray-500"
            }
          >
            <Link
              to={"/admin/manageUser"}
              className="flex items-center px-5 py-3 space-x-2"
              onClick={(e) => setIsMenu(false)}
            >
              <FaRegUser />
              <div>User</div>
            </Link>
          </div>
          <div
            className={
              location.pathname === "/admin/manageCategory"
                ? "w-full h-full text-center font-bold text-xl border-r-2 border-gray-500"
                : "w-full h-full text-center font-bold text-xl text-gray-500"
            }
          >
            <Link
              to={"/admin/manageCategory"}
              className="flex items-center px-5 py-3 space-x-2"
              onClick={(e) => setIsMenu(false)}
            >
              <BiCategory />
              <div>Category</div>
            </Link>
          </div>
          <div
            className={
              location.pathname === "/admin/manageProduct"
                ? "w-full h-full text-center font-bold text-xl border-r-2 border-gray-500"
                : "w-full h-full text-center font-bold text-xl text-gray-500"
            }
          >
            <Link
              to={"/admin/manageProduct"}
              className="flex items-center px-5 py-3 space-x-2"
              onClick={(e) => setIsMenu(false)}
            >
              <AiOutlineProduct />
              <div>Product</div>
            </Link>
          </div>
        </div>
      ) : (
        <div className="w-full flex flex-col py-5 space-y-1 items-center">
          <button className="text-3xl" onClick={(e) => setIsMenu(!isMenu)}>
            <IoMdMenu />
          </button>
        </div>
      )}
    </div>
  );
};

export default MenuAdmin;
