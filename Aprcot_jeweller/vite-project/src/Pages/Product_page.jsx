import React, { useEffect, useState } from 'react'
import Navbar from '../Componenet/Navbar'
import Header_img from '../assets/header-img.png'
import Product from '../Componenet/Product'
import Product_1 from '../assets/product_2.png'
import Product_2 from '../assets/product_2.png'
import Product_3 from '../assets/product_3.png'
import Product_4 from '../assets/product_4.png'

import FilterdData from '../Componenet/FilterdData'
import Footer from '../Componenet/Footer'
import { Link, useLocation } from 'react-router-dom'
import { useGetAllCateProductQuery, useGetAllProductQuery } from '../services/apiSlice'


const Product_page = () => {

  const location = useLocation();
  const categoryId = location.state?.categoryId;
  const subcategoryId = location.state?.subcategory_id;

  // ✅ States for filtering
  const [filterType, setFilterType] = useState(null);     // 'metal' | 'diamond' | 'price'
  const [filterValue, setFilterValue] = useState(null);   // selected value for above
  const [sortorder, setSortorder] = useState(null);       // sorting value (optional)

  // ✅ Build query params
  const [itemsPerPage, setitemsPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(() => {
    return parseInt(sessionStorage.getItem("product_page") || "1");
  });
  useEffect(() => {
    sessionStorage.removeItem("product_page");
  }, []); // only on mount
  const queryParams = {
    category_id: categoryId,
    subcategory_id: subcategoryId,
    filter_type: filterType,
    filter_data: filterValue,
    sort_order: sortorder,
    page_size: itemsPerPage,
    page: currentPage,
  };

  const { data: productsData, isLoading: productDataLoading, error: productDataError } =
    useGetAllProductQuery(queryParams);

  const Product_item = Array.isArray(productsData?.data) ? productsData.data : [];
  const handleFilterChange = ({ type, value }) => {

    setFilterType(type);
    setFilterValue(value);
  };


  const filteredTemplates = Product_item

  const totalPages = productsData?.total_pages



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
                  Explore our exclusive <strong>Designer Bracelet Collection</strong>, featuring elegant gold, silver, and diamond bracelets crafted with precision and style. From timeless classics to modern minimalist designs, each bracelet is made to complement your personality and elevate your look. Perfect for weddings, parties, or everyday wear, our designer bracelets combine luxury with comfort for jewelry that never goes out of style.
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
        <FilterdData
          length__of_pro={productsData?.total_items}
          onSelectMetal={handleFilterChange} // ✅ single function handles all
          setfiltertype={setFilterType}
          onorder={setSortorder}
        />

        <div className="container pt-[60px]">
          <div className="grid grid-cols-5 gap-x-4 gap-y-5 max-2xl:grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-lg:grid-cols-3  h-[auto]">


            {productDataLoading ? (
              <p>Loading products...</p>
            ) : productDataError ? (
              <p>Error loading products</p>
            ) : filteredTemplates.length > 0 ? (
              filteredTemplates.map((item) => ( // ✅ Show max 5 products

                <Product
                  image={item.product_img}
                  name={item.name}
                  key={item.product_id}
                  price={item.total_price}
                  originalPrice={item.original_price}
                  discount={item.original_price - item.price}
                  productId={item.product_id}// ✅ Calculate discount dynamically
                  currentpages={currentPage}
                  slug={item.slug}
                />

              ))
            ) : (
              <p>No products found</p>
            )}

          </div>



          {productsData && productsData?.total_items > itemsPerPage &&
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

export default Product_page
