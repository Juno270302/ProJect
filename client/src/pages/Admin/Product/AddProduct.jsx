import React, { useState } from "react";
import { useSelector } from "react-redux";
import MenuAdmin from "../../../components/MenuAdmin";
import { Link, useNavigate } from "react-router-dom";

import {
  useCreateCategoryMutation,
  useGetAllCategoryQuery,
} from "../../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";
import { FaLongArrowAltRight } from "react-icons/fa";
import { useUploadProductImageMutation } from "../../../redux/api/userApiSlice";
import {
  useCreateProductMutation,
  useFetchProductQuery,
} from "../../../redux/api/productApiSlice";

const AddProduct = () => {
  const { data: categories } = useGetAllCategoryQuery();
  const { data: products, refetch } = useFetchProductQuery();

  const [createProduct] = useCreateProductMutation();
  const [uploadProductImage] = useUploadProductImageMutation();

  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const uploadFileHandler = async (e) => {
    e.preventDefault(); // Prevent default form submission

    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    try {
      const res = await uploadProductImage(formData).unwrap();
      setImage(res.image);
    } catch (error) {
      console.log(error);
    }
  };

  const createHandler = async (e) => {
    const value = {
      name,
      category,
      brand,
      price,
      quantity,
      description,
      image,
    };
    try {
      const res = await createProduct(value).unwrap();
      refetch();
      toast.success("Add category success");
      navigate("/admin/manageProduct");
    } catch (error) {
      console.error(error);
      toast.error(error?.data?.message);
    }
  };

  console.log(image)
  return (
    <div className="flex">
      <MenuAdmin />
      <div className="w-full my-5 px-3 ">
        <div className="w-full h-full bg-white/40 rounded-xl shadow-xl b">
          <div className="w-full bg-white rounded-t-xl px-10 py-5 border flex items-center justify-between ">
            <div>
              <div className="font-semibold text-2xl">Add new product</div>
              <span className="font-semibold text-[14px] text-gray-500">
                Create a product
              </span>
            </div>
          </div>

          <div className="w-full h-full px-10 py-10 flex flex-col ">
            <div className="bg-white w-full  py-10 rounded-lg px-10 flex flex-row items-center justify-center  space-y-5">
              {image ? (
                <div className="w-[30%] border-2 rounded-md border-black">
                  <img src={image} className="rounded-xl p-3 px-5" />
                </div>
              ) : (
                ""
              )}
              <div className="bg-white w-full  py-10 rounded-lg px-10 flex flex-col items-center justify-center  space-y-5">
                <div
                  className={
                    image
                      ? "flex space-x-10 w-[70%]"
                      : "flex space-x-10 w-[50%]"
                  }
                >
                  <div className="flex flex-col w-full ">
                    <label className="font-semibold">Name</label>
                    <input
                      onChange={(e) => setName(e.target.value)}
                      type="text"
                      className=" py-2 w-full rounded-lg bg-gray-50 border-2 border-gray-400 shadow-xl px-4"
                    />
                  </div>
                  <div className="flex flex-col w-full ">
                    <label className="font-semibold">Category</label>
                    <select
                      onChange={(e) => setCategory(e.target.value)}
                      className=" py-2 w-full rounded-lg bg-gray-50 border-2 border-gray-400 shadow-xl px-4"
                    >
                      {categories.map((item) => {
                        return (
                          <option value={item._id}>{item.category_name}</option>
                        );
                      })}
                    </select>
                  </div>
                </div>
                <div
                  className={
                    image
                      ? "flex space-x-10 w-[70%]"
                      : "flex space-x-10 w-[50%]"
                  }
                >
                  <div className="flex flex-col w-full ">
                    <label className="font-semibold">Brand</label>
                    <input
                      onChange={(e) => setBrand(e.target.value)}
                      type="text"
                      className=" py-2 w-full rounded-lg bg-gray-50 border-2 border-gray-400 shadow-xl px-4"
                    />
                  </div>
                  <div className="flex flex-col w-full ">
                    <label className="font-semibold">Price</label>
                    <input
                      onChange={(e) => setPrice(e.target.value)}
                      type="number"
                      className=" py-2 w-full rounded-lg bg-gray-50 border-2 border-gray-400 shadow-xl px-4"
                    />
                  </div>
                </div>
                <div
                  className={
                    image
                      ? "flex space-x-10 w-[70%]"
                      : "flex space-x-10 w-[50%]"
                  }
                >
                  <div className="flex flex-col w-full ">
                    <label className="font-semibold">Quantity</label>
                    <input
                      onChange={(e) => setQuantity(e.target.value)}
                      type="number"
                      className=" py-2 w-full rounded-lg bg-gray-50 border-2 border-gray-400 shadow-xl px-4"
                    />
                  </div>
                  <div className="flex flex-col w-full ">
                    <label className="font-semibold">Description</label>
                    <textarea
                      onChange={(e) => setDescription(e.target.value)}
                      type="text"
                      className=" py-2 w-full rounded-lg bg-gray-50 border-2 border-gray-400 shadow-xl px-4"
                    ></textarea>
                  </div>
                </div>
                <div
                  className={
                    image
                      ? "flex space-x-10 w-[70%]"
                      : "flex space-x-10 w-[50%]"
                  }
                >
                  <div className="flex flex-col w-full ">
                    <div className="font-semibold">Image Product</div>
                    <label
                      className=" py-2 w-full h-[100px] font-semibold rounded-lg bg-gray-50 border-2 border-gray-400 shadow-xl px-4 flex justify-center items-center text"
                      htmlFor="imageFile"
                    >
                      {image ? image : "Choose File..."}
                    </label>

                    <input
                      type="file"
                      id="imageFile"
                      name="image"
                      accept="image/*"
                      onChange={uploadFileHandler}
                      className="hidden"
                    />
                  </div>
                </div>
                <div>
                  <button
                    onClick={() => createHandler()}
                    className="bg-blue-500 text-white px-5 py-2 rounded-lg flex items-center space-x-2 mt-5"
                  >
                    <div>Add it </div>
                    <FaLongArrowAltRight className="text-xl" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
