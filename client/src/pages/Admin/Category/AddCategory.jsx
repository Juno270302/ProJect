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

const AddCategory = () => {
  const {
    data: categories,
    refetch,
    isLoading,
    isError,
  } = useGetAllCategoryQuery();
  const [createCategory] = useCreateCategoryMutation();
  

  const { _id } = useSelector((state) => state.auth);

  const [category, setCategory] = useState();

  const navigate = useNavigate();
  

  const createHandler = async () => {
    try {
      
      const res = await createCategory({ category_name: category }).unwrap();
      toast.success("Add category success");
      navigate("/admin/manageCategory");
      refetch();
    } catch (error) {
      console.error(error);
      toast.error(error?.data?.message);
    }
  };
  return (
    <div className="flex">
      <MenuAdmin />
      <div className="w-full my-5 px-3 ">
        <div className="w-full h-full bg-white/40 rounded-xl shadow-xl b">
          <div className="w-full bg-white rounded-t-xl px-10 py-5 border flex items-center justify-between ">
            <div>
              <div className="font-semibold text-2xl">Add new category</div>
              <span className="font-semibold text-[14px] text-gray-500">
                Create a category
              </span>
            </div>
          </div>

          <div className="w-full h-full px-10 py-10 flex flex-col ">
            <div className="bg-white w-full  py-10 rounded-lg px-10 flex  space-x-10">
              <div className="w-[20%]">
                <div className="flex flex-col w-full ">
                  <label className="font-semibold">Category Name</label>
                  <input
                    onChange={(e) => setCategory(e.target.value)}
                    type="text"
                    className=" py-2 w-full rounded-lg bg-gray-50 border-2 border-gray-400 shadow-xl px-4"
                  />
                </div>
              </div>
              <div className="flex items-center flex-col">
                <div className="w-full">
                  <br />
                </div>
                <button
                  onClick={() => createHandler()}
                  className="bg-blue-500 text-white px-5 py-2 rounded-lg flex items-center space-x-2"
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
  );
};

export default AddCategory;
