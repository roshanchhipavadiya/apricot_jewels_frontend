import React from 'react'
import Login from './Pages/Login'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Category from './Pages/category';
import Sub_category from './Pages/sub_category';
import Product from './Pages/product';
import Product_details from './Pages/product_details';
import Add_product from './Pages/add_product_details';
import Diamond from './Pages/Daimond';
import Add_Diamond from './Pages/Add_Diamond';
import Edit_Diamond from './Pages/Edit_Diamond';
import Metal from './Pages/Metal';
import Add_Metal from './Pages/Add_Metal';
import Edit_metal from './Pages/Edit_metal';
import Add_product_Media from './Pages/Add_product_Media';
import Edit_product_Media from './Pages/Edit_product_Media';
import Product_Media from './Pages/Product_Media';
import User from './Pages/User';
import Address from './Pages/Address';
import Dashboard from './Pages/Dashboard';
import Order_details from './Pages/Order_details';
import Order from './Pages/Order';
import Order_Traking from './Pages/Order_Traking';
import SignupPage from './Pages/Signup';
import Add_category from './Pages/Add_category';
import Edit_Category from './Pages/Edit_Category';
import Add_SubCategory from './Pages/Add_SubCategory';
import Edit_SubCategory from './Pages/Edit_SubCategory';
import Invoice_details from './Pages/invoice_details';
import Appoinment from './Pages/appoinment';
import Contact from './Pages/contact';
import Forgot from './Pages/forgot';



const PrivateRoute = ({ element }) => {
  const token = localStorage.getItem('accesstoken');
  return token ? element : <Navigate to="/" />;
};

const App = () => {
  const token = localStorage.getItem('accesstoken');

  return (
    <BrowserRouter basename="/admin/">
      <Routes>
        {/* Public Route */}
        <Route path="/" element={token ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/register" element={<SignupPage />} />
        <Route path="/forgot_password" element={<Forgot />} />



        <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />


        {/* Protected Routes */}
        <Route path="/category" element={<PrivateRoute element={<Category />} />} />
        <Route path="/add_category" element={<PrivateRoute element={<Add_category />} />} />
        <Route path="/edit_category" element={<PrivateRoute element={<Edit_Category />} />} />

        <Route path="/sub_category" element={<PrivateRoute element={<Sub_category />} />} />
        <Route path="/add_subcategory" element={<PrivateRoute element={<Add_SubCategory />} />} />
        <Route path="/edit_subcategory" element={<PrivateRoute element={<Edit_SubCategory />} />} />

        <Route path="/product" element={<PrivateRoute element={<Product />} />} />
        <Route path="/product_details" element={<PrivateRoute element={<Product_details />} />} />
        <Route path="/add_product" element={<PrivateRoute element={<Add_product />} />} />

        <Route path="/diamond" element={<PrivateRoute element={<Diamond />} />} />
        <Route path="/add_diamond" element={<PrivateRoute element={<Add_Diamond />} />} />
        <Route path="/edit_diamond" element={<PrivateRoute element={<Edit_Diamond />} />} />

        <Route path="/metal" element={<PrivateRoute element={<Metal />} />} />
        <Route path="/add_metal" element={<PrivateRoute element={<Add_Metal />} />} />
        <Route path="/edit_metal" element={<PrivateRoute element={<Edit_metal />} />} />

        <Route path="/product_media" element={<PrivateRoute element={<Product_Media />} />} />
        <Route path="/add_product_media" element={<PrivateRoute element={<Add_product_Media />} />} />

        <Route path="/user" element={<PrivateRoute element={<User />} />} />
        <Route path="/address" element={<PrivateRoute element={<Address />} />} />
        <Route path="/order-details" element={<PrivateRoute element={<Order_details />} />} />
        <Route path="/order" element={<PrivateRoute element={<Order />} />} />
        <Route path="/order-Traking" element={<PrivateRoute element={<Order_Traking />} />} />
        <Route path="/invoice_details" element={<PrivateRoute element={<Invoice_details />} />} />
        <Route path="/appoinment" element={<PrivateRoute element={<Appoinment />} />} />
        <Route path="/contact" element={<PrivateRoute element={<Contact />} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
