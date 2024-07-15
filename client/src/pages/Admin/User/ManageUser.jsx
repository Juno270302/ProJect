import React, { useState } from "react";
import {
  useDeleteUserByCheckMutation,
  useDeleteUserByIdMutation,
  useGetAllUserQuery,
} from "../../../redux/api/userApiSlice";
import { useSelector } from "react-redux";
import MenuAdmin from "../../../components/MenuAdmin";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { CiSearch } from "react-icons/ci";

const ManageUser = () => {
  const { data: users, refetch, isLoading, isError } = useGetAllUserQuery();
  const [deleteUserById] = useDeleteUserByIdMutation();
  const [deleteUserByCheck] = useDeleteUserByCheckMutation();

  const [searchRole, setSearchRole] = useState("");
  const [search, setSearch] = useState("");

  const { _id } = useSelector((state) => state.auth);

  const [selectedRows, setSelectedRows] = useState(null || []);
  const [selectAll, setSelectAll] = useState(false);

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
      setSelectedRows(users.map((user) => user._id));
    }
    setSelectAll(!selectAll);
  };

  const handleDelete = async (id) => {
    console.log(id);
    try {
      const res = await deleteUserById({ _id: id }).unwrap();
      refetch();
      console.log(res);
    } catch (error) {
      console.error(error);
      toast.error(error?.data?.message);
    }
  };

  const handleDeleteSelected = async () => {
    try {
      const res = await deleteUserByCheck({ ids: selectedRows }).unwrap();
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
              <div className="font-semibold text-2xl">Manage user</div>
              <span className="font-semibold text-[14px] text-gray-500">
                Find all user here
              </span>
            </div>
            <div>
              <Link
                to={`/admin/addUser`}
                className="bg-black text-white px-5 py-3 rounded-xl font-semibold"
              >
                + Add User
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
                <option value="">Choose Role</option>
                <option value="admin">Admin Role</option>
                <option value="user">User Role</option>
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
                        Date
                      </th>
                      <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Role
                      </th>
                      <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ">
                        Dean names
                      </th>
                      <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Edit
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {users
                      ?.filter((item) =>
                        item.email.includes(search.toLowerCase())
                      )
                      ?.filter((item) =>
                        item.role.includes(searchRole.toLowerCase())
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
                              {item.role === "admin" ? (
                                ""
                              ) : (
                                <input
                                  type="checkbox"
                                  checked={selectedRows.includes(item._id)}
                                  onChange={() => handleSelectRow(item._id)}
                                />
                              )}
                            </td>
                            {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              <input
                                type="checkbox"
                                checked={selectedRows.includes(item._id)}
                                onChange={() => handleSelectRow(item._id)}
                              />
                            </td> */}
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              # {index + 1}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {shortDate}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              <span
                                className={`inline-flex px-2 text-sm leading-5 font-semibold rounded-full ${
                                  item.role === "admin"
                                    ? " text-red-600"
                                    : " text-gray-800"
                                }`}
                              >
                                {item.role}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 flex items-center">
                              <img
                                className="h-10 w-10 rounded-full"
                                src={item.user_image}
                                alt=""
                              />
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {item.username}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {item.email}
                                </div>
                              </div>
                            </td>
                            <td>
                              {item.role === "admin" ? (
                                <div>Can't Del</div>
                              ) : (
                                <button
                                  className="bg-red-500 text-white px-3 py-1.5 rounded-lg"
                                  onClick={() => handleDelete(item._id)}
                                >
                                  Delete
                                </button>
                              )}
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

export default ManageUser;
