import React from 'react';
import Navbar from '../Componenet/Navbar';
import Wishlist_product from '../assets/wishlist_product.png';
import Wishlist_item from '../Componenet/Wishlist_item';
import Footer from '../Componenet/Footer';
import { useGetWishlistQuery } from '../services/apiSlice';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';

const Wishlist = () => {
  const { data, refetch } = useGetWishlistQuery(undefined, {
        skip: !localStorage.getItem('aprifrontoken'),
    });
  const wishlist = data?.data || [];
  const navigate = useNavigate()
  


  return (
    <div>
      <Navbar />
      <section className='container pb-[100px] max-lg:pb-[50px] max-sm:pb-[40px]'>
        <div className='pt-[80px]'>
          {/* Back to shopping */}
          <div className='flex items-center pb-[50px] max-lg:pb-[20px]'>
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="27" viewBox="0 0 28 27" fill="none">
              <path d="M17.0708 19.9246L10.2422 13.4373L17.0708 6.95013" stroke="#222222" strokeWidth="2.73146" />
            </svg>
            <span onClick={() => {
              navigate(-1)
            }} className="text-[27.31px] cursor-pointer underline underline-offset-2 max-lg:text-[22px]">
              Continue Shopping
            </span>
          </div>

          {/* Title */}
          <div className='flex items-end mb-[25px] max-sm:mb-[20px]'>
            <h2 className="font-bold text-[61.46px] text-[#D86A37] max-lg:text-[50px] max-sm:text-[40px]">
              Wishlist
            </h2>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <span className="font-normal text-[47.8px] text-[#4D4C4C] mt-[10px] max-lg:text-[35px] max-sm:text-[22px]">
              ({wishlist?.length} products)
            </span>
          </div>

          {/* Subheading */}
          <p className="text-[20.49px] text-[#4D4C4C] mb-[66px] max-lg:text-[17px] max-lg:mb-[40px]" style={{ lineHeight: '140%' }}>
          Welcome to your Wishlist! Here, you can curate all your favorite pieces, making it easy to find that perfect sparkle whenever you need it. From timeless classics to trendy designs, your dream jewelry is just a click away. Start adding today and keep your style shining bright!
          </p>

          {/* Wishlist Items */}
          <div>
            {wishlist?.map((value, index) => (
              <Wishlist_item
                key={index}
                image={value?.product_img}
                product={value?.product}
                metal={value?.metal}
                diamond_details={value?.diamond_details}
                name={value?.product_name}
                product_slug={value?.product_slug}
                price={value?.total_price}
                total_carat_weight={value?.total_carat_weight}
                color={value?.metal_type}
                shape={value?.diamond_shape}
                whishid={value?.wishlist_id}
                refetch={refetch} // ✅ pass down
              />
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Wishlist;
