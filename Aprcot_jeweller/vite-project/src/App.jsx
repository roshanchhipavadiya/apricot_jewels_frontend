import React from 'react'
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import Home from './Pages/HomPage';
import Wishlist from './Pages/Wishlist_page';
import Cart from './Pages/Cart_page';
import GiftStorepage from './Pages/Gift_Stor_page';
import './App.css'
import Product_page from './Pages/Product_page';
import Diamonds_product_page from './Pages/Diamonds_product_page';
import Error404 from './Pages/404';
import Cheackout from './Pages/Checkout';
import Payment from './Pages/Payment';
import Product_details from './Pages/Product_details';
import { Login } from './Pages/Login';
import SignupPage from './Pages/Signuppage';
import Contactpage from './Pages/Contact_Page';
import AboutUs from './Pages/AboutUs';
import UserProfile from './Pages/UserProfile';
import Category_Page from './Pages/Category';
import Show from './Pages/show';
import Privacy_policy from './Pages/privacy_policy';
import Terms_condition from './Pages/terms_condition';
import Faq from './Pages/faq';
import Return_Policy from './Pages/Return_Policy';
import Shipping_Policy from './Pages/Shipping_Policy';
import Cancellation_Policy from './Pages/Cancellation_Policy';
import Customer_policy from './Pages/customer_policy';
import Forgot_password from './Pages/forgot_password';
import UseScrollRestoration from './Componenet/useScrollRestoration';



const App = () => {
  UseScrollRestoration()
  return (
    <div>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/wishlist' element={<Wishlist />}></Route>
          <Route path='/cart' element={<Cart />}></Route>
          <Route path='/:category' element={<GiftStorepage />}></Route>
          <Route path='/product' element={<Product_page />}></Route>
          <Route path='/category' element={<Category_Page />}></Route>
          {/* <Route path='/sub_category' element={<SubCategory />}></Route> */}
          <Route path='/profile' element={<UserProfile />}></Route>
          <Route path='/diamonds' element={<Diamonds_product_page />}></Route>

          {/* --------- */}
          <Route path='/checkout' element={<Cheackout />} />
          <Route path='/payment' element={<Payment />} />
          <Route path='/product/:product_details' element={<Product_details />} />
          <Route path='*' element={<Error404 />}></Route>

          {/* ----------- */}
          <Route path='/signin' element={<Login />}></Route>
          <Route path='/signUp' element={<SignupPage />}></Route>
          <Route path='/contact' element={<Contactpage />}></Route>
          <Route path='/about_us' element={<AboutUs />}></Route>
          <Route path='/show' element={<Show />}></Route>
          <Route path='/privacy_policy' element={<Privacy_policy />}></Route>
          <Route path='/terms_&_condition' element={<Terms_condition />}></Route>
          <Route path='/faq' element={<Faq />}></Route>
          <Route path='/customer_support' element={<Customer_policy />}></Route>
          <Route path='/return_policy' element={<Return_Policy />}></Route>
          <Route path='/shipping_policy' element={<Shipping_Policy />}></Route>
          <Route path='/cancellation_policy' element={<Cancellation_Policy />}></Route>
          <Route path='/forgot_password' element={<Forgot_password />}></Route>
        </Routes>

    </div>
  )
}

export default App


