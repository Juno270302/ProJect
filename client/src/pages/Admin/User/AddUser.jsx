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

const AddUser = () => {
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
              <div className="font-semibold text-2xl">Add new user</div>
              <span className="font-semibold text-[14px] text-gray-500">
                Create an user
              </span>
            </div>
            
          </div>
          
          <form className="w-full h-full px-10 pb-10 flex flex-col py-5 ">
            <div className="bg-white w-full ">
              Test
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
