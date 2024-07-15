import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaRegUser } from "react-icons/fa6";
import { FaOpencart } from "react-icons/fa";
import { MdOutlinePassword } from "react-icons/md";
import { FaRegAddressBook } from "react-icons/fa";

import {
  useUpdateProfileMutation,
  useUploadProductImageMutation,
} from "../redux/api/userApiSlice";
import { toast } from "react-toastify";

const MenuUser = ({ data }) => {
  const location = useLocation();
  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState(null);


  const [uploadProductImage] = useUploadProductImageMutation();
  const [updateUser] = useUpdateProfileMutation();

  const uploadFileHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
  

    try {
      const res = await uploadProductImage(formData).unwrap();

      const res2 = await updateUser({ user_image: res.image }).unwrap();

      setImage(res.image);
      setImageUrl(res.image);
      toast.success("Upload Image Success");
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };
  return (
    <div className="w-[30%] h-screen border-r-2 border-gray-300 bg-white">
      <div>
        <form>
          <div className="mb-3"></div>
        </form>
      </div>
      <div className="w-full flex items-center justify-center py-8  ">
        {imageUrl ? (
          <label className="cursor-pointer">
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={uploadFileHandler}
              className={!image ? "hidden" : "hidden"}
            />
            <img className="w-[200px] h-[200px] rounded-full" src={imageUrl} />
          </label>
        ) : (
          <label className="cursor-pointer">
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={uploadFileHandler}
              className={!image ? "hidden" : "text-white"}
            />
            <img
              className="w-[200px] h-[200px] rounded-full"
              src={data?.user_image}
            />
          </label>
        )}
      </div>
      <div>
        <div className="w-full flex flex-col items-center py-5 space-y-1 ">
          <div
            className={
              location.pathname === "/profile"
                ? "w-full h-full text-center font-bold text-xl border-r-2 border-gray-500 "
                : "w-full h-full text-center font-bold text-xl text-gray-500"
            }
          >
            <Link
              to={"/profile"}
              className="flex items-center justify-center py-3 space-x-2"
            >
              <FaRegUser />
              <div>User Info</div>
            </Link>
          </div>
          <div
            className={
              location.pathname === "/profile/address"
                ? "w-full h-full text-center font-bold text-xl border-r-2 border-gray-500 "
                : "w-full h-full text-center font-bold text-xl text-gray-500"
            }
          >
            <Link
              to={"/profile/address"}
              className="flex items-center justify-center py-3 space-x-2"
            >
              <FaRegAddressBook />
              <div>Address Info</div>
            </Link>
          </div>
          <div
            className={
              location.pathname === "/profile/cart"
                ? "w-full h-full text-center font-bold text-xl border-r-2 border-gray-500 "
                : "w-full h-full text-center font-bold text-xl text-gray-500"
            }
          >
            <Link
              to={"/profile/cart"}
              className="flex items-center justify-center py-3 space-x-2"
            >
              <FaOpencart />
              <div>Shopping</div>
            </Link>
          </div>
          <div
            className={
              location.pathname === "/profile/password"
                ? "w-full h-full text-center font-bold text-xl border-r-2 border-gray-500 "
                : "w-full h-full text-center font-bold text-xl text-gray-500"
            }
          >
            <Link
              to={"/profile/password"}
              className="flex items-center justify-center py-3 space-x-2"
            >
              <MdOutlinePassword />
              <div>Password</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuUser;
