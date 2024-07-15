import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Route, RouterProvider, createRoutesFromElements } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Auth/Login.jsx";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import RegisterUser from "./pages/Auth/RegisterUser.jsx";
import Profile from "./pages/User/Profile.jsx";
import AddressUser from "./pages/User/AddressUser.jsx";
import ManageUser from "./pages/Admin/User/ManageUser.jsx";
import AdminRoute from "./components/AdminRoute.jsx";
import AddUser from "./pages/Admin/User/AddUser.jsx";
import ManageCategory from "./pages/Admin/Category/ManageCategory.jsx";
import AddCategory from "./pages/Admin/Category/AddCategory.jsx";
import ManageProduct from "./pages/Admin/Product/ManageProduct.jsx";
import AddProduct from "./pages/Admin/Product/AddProduct.jsx";
import UpdateProduct from "./pages/Admin/Product/UpdateProduct.jsx";
import Shop from "./pages/Product/Shop.jsx";
import ProductDetail from "./pages/Product/ProductDetail.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" index element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registerUser" element={<RegisterUser />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/productDetail/:id" element={<ProductDetail />} />


      <Route path="/profile" element={<Profile />} />
      <Route path="/profile/address" element={<AddressUser />} />

      <Route path="/admin" element={<AdminRoute />}>
        {/* UserManage */}
        <Route path="manageUser" element={<ManageUser />} />
        <Route path="addUser" element={<AddUser />} />

        {/* CategoryManage */}
        <Route path="manageCategory" element={<ManageCategory />} />
        <Route path="addCategory" element={<AddCategory />} />

        {/* ProductManage */}
        <Route path="manageProduct" element={<ManageProduct />} />
        <Route path="addProduct" element={<AddProduct />} />
        <Route path="updateProduct/:id" element={<UpdateProduct />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
