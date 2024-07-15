import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import MenuAdmin from "../../../components/MenuAdmin";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { CiSearch } from "react-icons/ci";
import {
  useDeleteProductByCheckMutation,
  useDeleteProductByIdMutation,
  useFetchProductQuery,
} from "../../../redux/api/productApiSlice";
import { useGetAllCategoryQuery } from "../../../redux/api/categoryApiSlice";
import Swal from "sweetalert2";

const ManageProduct = () => {
  const {
    data: products,
    refetch,
    isLoading,
    isError,
  } = useFetchProductQuery();

  const { data: categories, refetch: reCall } = useGetAllCategoryQuery();

  const [deleteProductId] = useDeleteProductByIdMutation();
  const [deleteProductByCheck] = useDeleteProductByCheckMutation();

  const [searchRole, setSearchRole] = useState("");
  const [search, setSearch] = useState("");

  const { _id } = useSelector((state) => state.auth);

  const [selectedRows, setSelectedRows] = useState(null || []);
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    refetch();
  }, [products]);

  const handleSelectRow = (id) => {
    setSelectedRows((prevSelectedRows) =>
      prevSelectedRows.includes(id)
        ? prevSelectedRows.filter((rowId) => rowId !== id)
        : [...prevSelectedRows, id]
    );
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRows([]);
    } else {
      setSelectedRows(products.map((products) => products._id));
    }
    setSelectAll(!selectAll);
  };

  const handleDelete = async (id) => {
    try {
      Swal.fire({
        title: "Bạn Muốn Xóa?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Xóa",
        cancelButtonText: "Hủy",
      }).then(async (result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          const res = await deleteProductId({ _id: id }).unwrap();
          refetch();
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });
    } catch (error) {
      console.error(error);
      toast.error(error?.data?.message);
    }
  };

  const handleDeleteSelected = async () => {
    try {
      const res = await deleteProductByCheck({ ids: selectedRows }).unwrap();
      setSelectAll(false);
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
              <div className="font-semibold text-2xl">Manage product</div>
              <span className="font-semibold text-[14px] text-gray-500">
                Find all product here
              </span>
            </div>
            <div>
              <Link
                to={`/admin/addProduct`}
                className="bg-black text-white px-5 py-3 rounded-xl font-semibold"
              >
                + Add product
              </Link>
            </div>
          </div>
          <div className="w-full py-5 flex items-center justify-between px-14">
            <div className="relative w-full py-2 text-center flex items-center justify-center">
              <input
                type="text"
                className="w-[50%] border py-1.5 rounded-lg px-3 shadow-lg"
                placeholder="Search user Email"
                onChange={(e) => setSearch(e.target.value)}
              />
              <div className="absolute inset-y-0 left-[66%] pl-3 flex items-center pointer-events-none">
                <CiSearch className="text-gray-400 text-xl" />
              </div>
            </div>
            <div className="w-full py-2 text-center flex items-center justify-center">
              <select
                type="text"
                className=" w-[50%] border py-1.5 rounded-lg px-3 shadow-lg "
                placeholder="Search user Email"
                onChange={(e) => setSearchRole(e.target.value)}
              >
                <option value="">Select Category</option>
                {categories?.map((item) => {
                  return (
                    <option key={item?._id} value={item?._id}>
                      {item?.category_name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="w-full"></div>
          </div>
          <div className="w-full h-full px-10 pb-10 flex flex-col  rounded-t-2xl">
            <div className="bg-white w-full rounded-t-2xl">
              <div className="overflow-x-auto rounded-t-2xl">
                <table className="min-w-full bg-white border border-gray-200 rounded-t-2xl ">
                  <thead>
                    <tr>
                      <th
                        className={
                          selectAll || selectedRows.length !== 0
                            ? "px-6 py-3 border-b border-gray-200 bg-gray-50 w-[13%]"
                            : "px-6 py-3 border-b border-gray-200 bg-gray-50 w-[3%]"
                        }
                      >
                        <div className="flex space-x-3">
                          <input
                            type="checkbox"
                            checked={selectAll}
                            onChange={handleSelectAll}
                          />
                          {selectAll || selectedRows.length !== 0 ? (
                            <button
                              onClick={() => handleDeleteSelected()}
                              className="text-sm bg-red-500 text-white px-2 py-1.5 rounded-lg"
                            >
                              delete select
                            </button>
                          ) : (
                            ""
                          )}
                        </div>
                      </th>
                      <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ID number
                      </th>
                      <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ">
                        Brand
                      </th>
                      <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ">
                        Quantity
                      </th>
                      <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Edit
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {products
                      ?.filter((item) =>
                        item.name.toLowerCase().includes(search.toLowerCase())
                      )
                      ?.filter((item) =>
                        item.category.includes(searchRole.toLowerCase())
                      )
                      ?.map((item, index) => {
                        const checkCategory = categories?.filter(
                          (e) => e._id === item.category
                        )[0];
                        return (
                          <tr key={item?._id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              <input
                                type="checkbox"
                                checked={selectedRows.includes(item._id)}
                                onChange={() => handleSelectRow(item._id)}
                              />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              # {index + 1}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {item.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {checkCategory?.category_name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {item.brand}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 ">
                              {item.quantity}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 space-x-3">
                              <Link
                                to={`/admin/updateProduct/${item?._id}`}
                                className="bg-green-500 text-white px-5 py-1.5 rounded-lg"
                              >
                                Edit
                              </Link>
                              <button
                                className="bg-red-500 text-white px-3 py-1.5 rounded-lg"
                                onClick={() => handleDelete(item._id)}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageProduct;
