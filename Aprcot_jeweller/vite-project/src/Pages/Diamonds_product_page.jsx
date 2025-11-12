import React, { useState } from 'react'
import Navbar from '../Componenet/Navbar'
import DiamondHeader from '../assets/diamondHeader.jpg'
import FilterdData from '../Componenet/FilterdData'
import Product from '../Componenet/Product'
import Product_1 from '../assets/product_2.png'
import Product_2 from '../assets/product_2.png'
import Product_3 from '../assets/product_3.png'
import Product_4 from '../assets/product_4.png'
import Footer from '../Componenet/Footer'
import { useGetAllProductQuery } from '../services/apiSlice'

const Diamonds_product_page = () => {


    const [itemsPerPage, setitemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);


    const queryParams = {
        page_size: itemsPerPage,
        page: currentPage,
        category_type: 'Diamond'
    };
    const { data: products, isLoading: productDataLoading, error: productDataError } = useGetAllProductQuery(queryParams);
    const product_data = Array.isArray(products?.data) ? products.data : [];
    const filteredTemplates = product_data

    const totalPages = products?.total_pages
    return (
        <div>
            <Navbar />
            <div
                className="header relative bg-cover bg-right bg-no-repeat"
                style={{ backgroundImage: `url(${DiamondHeader})` }}
            >
                <section className="relative h-[700px] max-lg:h-auto">
                    {/* Text Content Inside Container */}
                    <div className="container">
                        <div className="w-full flex gap-[20px]">
                            {/* Left Content */}
                            <div className="pt-[60px] w-[50%] max-2xl:w-[60%] relative z-10 max-lg:w-[70%] max-md:w-[80%] max-lg:py-[70px] max-sm:w-[100%] ">
                                <h1 className="libre_askerville font-bold text-[50px] leading-[100%] capitalize text-[#D86A37] mb-[14px] max-sm:text-[40px] text-center">
                                    Diamond Jewelry Collection – Timeless Elegance & Luxury
                                </h1>

                                <p className="font-normal text-[17px] leading-[190%] tracking-[0%] text-[#58637C] max-sm:text-[15px] text-center">
                                    Explore our exquisite <strong>Diamond Jewelry Collection</strong>, crafted with brilliance and sophistication. From classic diamond rings and elegant necklaces to modern bracelets and earrings, each piece is designed to reflect timeless beauty and luxury. Perfect for weddings, anniversaries, or everyday elegance, our diamonds are ethically sourced and cut to perfection. Add sparkle to your style with jewelry that lasts for generations.
                                </p>


                                <div className="flex justify-center mt-[34px] max-sm:block">
                                    {/* <button className="w-[200px] max-sm:w-[100%] font-nunito font-bold text-[18px] leading-none tracking-[1px] text-center capitalize flex items-center justify-center bg-[#D86A37] text-white rounded-md transition-all duration-300 py-[14px] border-2 border-[#D86A37] hover:bg-white hover:text-[#D86A37] hover:border-[#D86A37] me-[20px] max-sm:me-[0px] max-sm:mb-[10px]">
                                        Shop Diamond
                                    </button> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <section className="justify-center ">
                {/* <FilterdData /> */}
                <div className="container pt-[60px]">
                    <div className="grid grid-cols-5 gap-x-4 gap-y-6 max-2xl:grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-lg:grid-cols-3  h-[auto]">
                        {productDataLoading ? (
                            <p>Loading products...</p>
                        ) : productDataError ? (
                            <p>No products</p>
                        ) : filteredTemplates.length > 0 ? (
                            filteredTemplates.map((item) => ( // ✅ Show max 5 products

                                <Product
                                    image={item.product_img}
                                    name={item.name}
                                    price={item.total_price}
                                    originalPrice={item.original_price}
                                    discount={item.original_price - item.price}
                                    productId={item.product_id}// ✅ Calculate discount dynamically
                                    slug={item.slug}
                                />

                            ))
                        ) : (
                            <p>No products found</p>
                        )}
                    </div>

                    {products?.data && products?.total_items > itemsPerPage &&
                        (

                            <div className="pagination max-sm:gap-0 flex items-center justify-center mt-8 gap-2 flex-wrap">


                                <div
                                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                    className={`border-[#E2E9EE] flex border-[2.4px] rounded-[3.6px] items-center py-[13px] px-[15.6px] cursor-pointer
      max-sm:px-[5px] max-lg:py-[10px] max-lg:px-[10px] max-sm:py-[5px] mr-[14px] 
      ${currentPage === 1 ? 'opacity-50 pointer-events-none' : ''}`}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="18" viewBox="0 0 13 18" fill="none">
                                        <g clipPath="url(#clip0_125_4399)">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M9.70627 17.7469L0.912109 9.01825L9.70627 0.289551L11.999 2.5692L5.49613 9.01825L11.999 15.4673L9.70627 17.7469Z" fill="#6E777D" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_125_4399">
                                                <rect width="11.6383" height="17.4574" fill="white" transform="translate(0.912109 0.289551)" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </div>

                                {/* Smart page numbers */}
                                {Array.from({ length: totalPages }, (_, index) => index + 1)
                                    .filter(number => (
                                        number === 1 ||
                                        number === totalPages ||
                                        (number >= currentPage - 1 && number <= currentPage + 1)
                                    ))
                                    .reduce((acc, number, idx, array) => {
                                        if (idx > 0 && number - array[idx - 1] > 1) {
                                            acc.push('ellipsis');
                                        }
                                        acc.push(number);
                                        return acc;
                                    }, [])
                                    .map((item, index) => (
                                        item === 'ellipsis' ? (
                                            <span key={`ellipsis-${index}`} className="px-2">...</span>
                                        ) : (
                                            <button
                                                key={item}
                                                onClick={() => setCurrentPage(item)}
                                                className={`Inter cursor-pointer ${currentPage === item ? 'active text-[#303538] bg-[#f8885333] rounded-[4px]' : 'bg-transparent'
                                                    } max-lg:py-[0px] max-lg:text-[16px] max-lg:h-[34px] max-lg:px-[15px] max-sm:h-[24px] max-sm:text-[12px] max-sm:px-[10px] flex justify-center items-center px-[16px] py-2`}
                                            >
                                                {item}
                                            </button>
                                        )
                                    ))}


                                {/* Next button */}
                                <div
                                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                    className={`border-[#E2E9EE] flex border-[2.4px] rounded-[3.6px] items-center py-[13px] px-[15.6px] cursor-pointer
      max-sm:px-[5px] max-lg:py-[5px] max-lg:px-[5px] max-sm:py-[5px] ml-[14px]
      ${currentPage === totalPages ? 'opacity-50 pointer-events-none' : ''}`}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="18" viewBox="0 0 13 18" fill="none">
                                        <g clipPath="url(#clip0_125_4415)">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M2.72183 17.7469L11.4767 9.02261L2.72183 0.289551L0.449463 2.5692L6.91597 9.02261L0.449463 15.4746L2.72183 17.7469Z" fill="#303538" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_125_4415">
                                                <rect width="11.6383" height="17.4574" fill="white" transform="translate(0.449463 0.289551)" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </div>

                            </div>

                        )
                    }
                </div>
            </section>
            <Footer />

        </div>
    )
}

export default Diamonds_product_page
