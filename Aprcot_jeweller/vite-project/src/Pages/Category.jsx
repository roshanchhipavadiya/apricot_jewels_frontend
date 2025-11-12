import React from 'react'
import Navbar from '../Componenet/Navbar'
import Header_img from '../assets/header-img.png'

import FilterdData from '../Componenet/FilterdData'
import Footer from '../Componenet/Footer'
import { Link, useNavigate } from 'react-router-dom'
import { useGetCategoriesQuery } from '../services/apiSlice'
import Category from '../Componenet/Category'


const Category_Page = () => {
    const {
        data: category_Data,
        isLoading: categoryDataLoading,
        error: categoryDataError,
    } = useGetCategoriesQuery();

    const Category_item = Array.isArray(category_Data?.data) ? category_Data.data : [];
    const navigate = useNavigate()
    const handleCategoryClick = (id) => {
        navigate('/product', { state: { categoryId: id } });
    }


    return (
        <div>
            <Navbar />
            <div className='header relative '>
                <section className="relative ">
                    {/* Text Content Inside Container */}
                    <div className="container ">
                        <div className=" w-full flex gap-[20px]">
                            {/* Left Content */}
                            <div className="py-[208px] w-[50%] max-2xl:w-[60%] relative z-10 max-lg:w-[90%] max-lg:py-[50px]  max-md:w-[100%]">
                                <h1 className="libre_askerville font-bold text-[50px] leading-[100%] capitalize text-[#D86A37] mb-[14px] max-sm:text-[40px]">
                                    Designer Bracelet Collection
                                </h1>

                                <p className="font-normal text-[17px] leading-[190%] tracking-[0%] text-[#58637C] max-sm:text-[15px]">
                                    Discover our exclusive <strong>Designer Bracelet Collection</strong>, featuring handcrafted luxury bracelets made with premium materials. From elegant gold and silver bracelets to modern minimalist designs, our collection blends timeless craftsmanship with contemporary style. Perfect for special occasions, gifts, or everyday wear, these designer bracelets add a touch of sophistication to your look. Shop the latest styles and find the perfect piece that matches your personality and fashion sense.
                                </p>

                                <div className="flex mt-[34px] max-sm:block">
                                    <button className=" w-[200px]  max-sm:w-[100%] font-nunito font-bold text-[18px] leading-none tracking-[1px] text-center capitalize flex items-center justify-center bg-[#D86A37] text-white rounded-md transition-all duration-300 py-[14px] border-2 border-[#D86A37] hover:bg-white hover:text-[#D86A37] hover:border-[#D86A37] me-[20px] max-sm:me-[0px] max-sm:mb-[10px] ">
                                        Shop Jewelry
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Image Outside Container */}

                    {/* <img src={Header_img} alt="Header" className=" object-cover absolute right-0 top-0 w-[780px] h-full max-2xl:w-[550px] max-lg:w-[auto]  pt-[54px]  max-lg:hidden" /> */}

                </section>
            </div>

            <section className="justify-center ">
                {/* <FilterdData /> */}

                <div className="container pt-[60px]">
                    <div className="grid grid-cols-5 gap-x-4 gap-y-5 max-2xl:grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 h-auto">

                        {categoryDataLoading ? (
                            <p>Loading categories...</p>
                        ) : categoryDataError ? (~
                            <p className="text-red-500">Error loading categories</p>
                        ) : Category_item.length > 0 ? (
                            Category_item.map((item) => (
                                <div
                                    key={item.category_id}
                                    onClick={() => handleCategoryClick(item.category_id)}
                                    className="cursor-pointer p-2 rounded-md hover:bg-gray-100 transition"
                                >
                                    <Category image={item.category_img} title={item.name} />
                                </div>
                            ))
                        ) : (
                            <p>No categories found</p>
                        )}

                    </div>

                </div>
            </section>

            <Footer />
        </div>
    )
}

export default Category_Page
