import React, { useState } from "react";
import { useFetchProductQuery } from "../../redux/api/productApiSlice";
import { Link } from "react-router-dom";
import { useGetAllCategoryQuery } from "../../redux/api/categoryApiSlice";

const Shop = () => {
  const {
    data: products,
    refetch,
    isLoading,
    isError,
  } = useFetchProductQuery();

  const { data: categories } = useGetAllCategoryQuery();
  const [saveData, setSaveData] = useState([]); // Sử dụng mảng để lưu trữ các id

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products?.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(products?.length / itemsPerPage);

  const handleCheckBox = (id) => {
    if (saveData.includes(id)) {
      // Nếu id đã tồn tại trong mảng, loại bỏ nó
      setSaveData((prev) => prev.filter((item) => item !== id));
    } else {
      // Nếu id chưa tồn tại trong mảng, thêm vào
      setSaveData((prev) => [...prev, id]);
    }
  };

  console.log(saveData.some((id) => categories.includes(id)));

  return (
    <div className="min-h-screen">
      <div className="w-full border bg-black py-10">
        <p className="text-white">hello</p>
      </div>
      <div className="flex w-full px-[10%]">
        <div className="w-[20%] border border-red-600 sticky top-0 self-start">
          <h1 className="text-center font-bold text-xl">Category</h1>
          <div>
            {categories?.map((item) => (
              <div key={item._id}>
                <input
                  onChange={() => handleCheckBox(item._id)}
                  type="checkbox"
                  id={item._id}
                  name={item._id}
                  value={item._id}
                  checked={saveData.includes(item._id)} // Kiểm tra xem id có trong mảng không
                />
                <label htmlFor={item._id}>{item.category_name}</label>
              </div>
            ))}
          </div>
        </div>
        <div className="w-[80%]">
          <h1>All Product</h1>
          <div className="pt-14 grid grid-cols-4 gap-10">
            {currentItems
              ?.filter((item) => {
                if (saveData.length === 0) return true; // Nếu không có lựa chọn nào, hiển thị tất cả sản phẩm
                return saveData.some((id) => item.category.includes(id));
                // Kiểm tra xem sản phẩm có thuộc ít nhất một danh mục trong mảng saveData không
              })
              ?.map((item) => (
                <div key={item._id}>
                  <Link
                    to={`/productDetail/${item._id}`}
                    className="px-2 flex flex-col justify-center items-center"
                  >
                    <img
                      src={item.image}
                      className="w-[250px] h-[270px] rounded-lg shadow-xl"
                      alt={item.name}
                    />
                  </Link>
                  <div className="px-[8%] flex items-center justify-between pt-5">
                    <div>
                      <div className="font-medium text-lg">{item.name}</div>
                      <div>{item.price}$</div>
                    </div>
                    <button className="bg-black text-white px-3 py-2 rounded-full text-sm">
                      Order Now
                    </button>
                  </div>
                </div>
              ))}
          </div>
          <div className="flex justify-center my-10">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`mx-2 px-3 py-1 border rounded-lg  ${
                  currentPage === index + 1 ? "bg-black text-white" : "bg-white"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
