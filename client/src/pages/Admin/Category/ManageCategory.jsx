import React, { useState } from "react";
import MenuAdmin from "../../../components/MenuAdmin";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { CiSearch } from "react-icons/ci";
import {
  useDeleteCategoryMutation,
  useGetAllCategoryQuery,
} from "../../../redux/api/categoryApiSlice";
import Swal from "sweetalert2";

const ManageCategory = () => {
  const {
    data: categories,
    refetch,
    isLoading,
    isError,
  } = useGetAllCategoryQuery();
  const [deleteById] = useDeleteCategoryMutation();

  const [search, setSearch] = useState("");

  const handleDelete = async (id) => {
    try {
      Swal.fire({
        title: "Bạn Muốn Xóa?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Xóa",
        cancelButtonText: "Hủy"
      }).then(async (result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          const res = await deleteById({ _id: id }).unwrap();
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

  console.log(search);

  return (
    <div className="flex">
      <MenuAdmin />
      <div className="w-full my-5 px-3 ">
        <div className="w-full h-full bg-white/40 rounded-xl shadow-xl b">
          <div className="w-full bg-white rounded-t-xl px-10 py-5 border flex items-center justify-between ">
            <div>
              <div className="font-semibold text-2xl">Manage category</div>
              <span className="font-semibold text-[14px] text-gray-500">
                All category here
              </span>
            </div>
            <div>
              <Link
                to={`/admin/addCategory`}
                className="bg-black text-white px-5 py-3 rounded-xl font-semibold"
              >
                + Add Category
              </Link>
            </div>
          </div>
          <div className="w-full py-5 flex items-center justify-between px-14">
            <div className="relative w-full py-2 flex items-center justify-center">
              <input
                type="text"
                className="w-[50%] border py-1.5 rounded-lg px-3 shadow-lg"
                placeholder="Search name category"
                onChange={(e) => setSearch(e.target.value)}
              />
              <div className="absolute inset-y-0 left-[66%] pl-3 flex items-center pointer-events-none">
                <CiSearch className="text-gray-400 text-xl" />
              </div>
            </div>
            <div className="w-full "></div>
            <div className="w-full"></div>
          </div>
          <div className="w-full h-full px-10 pb-10 flex flex-col  rounded-t-2xl">
            <div className="bg-white w-full rounded-t-2xl">
              <div className="overflow-x-auto rounded-t-2xl">
                <table className="min-w-full bg-white border border-gray-200 rounded-t-2xl ">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ID number
                      </th>
                      <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name category
                      </th>

                      <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Active
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {categories
                      ?.filter((item) =>
                        item?.category_name
                          .toLowerCase()
                          .includes(search.toLowerCase())
                      )
                      ?.map((item, index) => {
                        const isoDate = item.createdAt;
                        const date = new Date(isoDate);

                        const options = {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        };
                        const shortDate = date.toLocaleDateString(
                          "en-US",
                          options
                        );
                        return (
                          <tr key={item?._id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              # {index + 1}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {item?.category_name}
                            </td>

                            <td className="space-x-3">
                              {/* <button
                                className="bg-green-500 text-white px-5 py-1.5 rounded-lg"
                                //onClick={() => handleDelete(item._id)}
                              >
                                Edit
                              </button> */}
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

export default ManageCategory;
