import React, { useState, useEffect, useCallback } from 'react'
import Footer from '../Componenet/Footer'
import Navbar from '../Componenet/Navbar'
import Header_img from '../assets/header-img.png'
import Img_1 from '../assets/img_1.png'
import Img_2 from '../assets/img_2.png'
import Jewelry from '../assets/jewelry_1.png'
import Quality from '../assets/quality_1.png'
import Operator from '../assets/operator_1.png'
import Transport from '../assets/transport_1.png'
import Favorite from '../assets/favorite_1.png'
import Product from '../Componenet/Product'
import Product_1 from '../assets/product_2.png'
import Product_2 from '../assets/product_2.png'
import Product_3 from '../assets/product_3.png'
import Product_4 from '../assets/product_4.png'
import Banner_img from '../assets/banner_img.png'
import Banner_img_1 from '../assets/banner_img_1.png'
import Banner_img_2 from '../assets/banner_img111.png'
import Category from '../Componenet/Category'
import Jewerlly_cat_1 from '../assets/jewellry_category_1.png'
import Jewerlly_cat_2 from '../assets/jewellry_category_2.png'
import Jewerlly_cat_3 from '../assets/jewellry_category_3.png'
import Jewerlly_cat_4 from '../assets/jewellry_category_4.png'
import Jewerlly_cat_5 from '../assets/jewellry_category_5.png'
import Jewerlly_cat_6 from '../assets/jewellry_category_6.png'
import Jewerlly_cat_7 from '../assets/jewellry_category_7.png'
import Jewerlly_cat_8 from '../assets/jewellry_category_8.png'
import Jewerlly_cat_9 from '../assets/jewellry_category_9.png'
import Jewerlly_cat_10 from '../assets/jewellry_category_10.png'
import Design from '../assets/deisgn.png'
import Trending_img_1 from '../assets/trending_img_1.png'
import Trending_img_2 from '../assets/trending_img_2.png'
import Trending_img_3 from '../assets/trending_img_3.png'
import Trending_img_4 from '../assets/trending_img_4.png'
import Trending_img_5 from '../assets/trending_img_5.png'
import Trending_img_6 from '../assets/trending_img_6.png'
import Gallery_1 from '../assets/gallery_1.png'
import Gallery_2 from '../assets/gallery_2.png'
import Gallery_3 from '../assets/gallery_3.png'
import Gallery_4 from '../assets/gallery_4.png'
import Gallery_5 from '../assets/gallery_5.png'
import Gallery_6 from '../assets/gallery_6.png'
import Gallery_7 from '../assets/gallery_7.png'
import { Link } from 'react-router-dom'
import { useGetCategoriesQuery, useGetSubCategoriesQuery, useGetTrendingQuery, useGetAllProductQuery, useGetProductDataQuery, useLazyGetProductDataQuery, useLazyGetAllProductQuery, useLazyGetTrendingQuery } from '../services/apiSlice'
import { useNavigate } from "react-router-dom";
import TrendingProducts from '../Componenet/trending'

const Home = () => {
  const navigate = useNavigate();
  const [selectedRing, setSelectedRing] = useState("ENGAGEMENT RINGS");

  // ✅ Category API
  const { data: categories, isLoading, error } = useGetCategoriesQuery();
  const category_data = Array.isArray(categories?.data) ? categories.data : [];

  const [selectedCategory, setSelectedCategory] = useState(null);

  // ✅ Auto-select first category
  useEffect(() => {
    if (category_data.length > 0 && selectedCategory === null) {
      setSelectedCategory(category_data[0].category_id);
    }
  }, [category_data]);

  // ✅ Subcategory API (dependent on selectedCategory)
  const {
    data: subcategory,
    isFetching: subLoading,
    error: subError,
    refetch,
  } = useGetSubCategoriesQuery(selectedCategory, {
    skip: !selectedCategory,
    refetchOnMountOrArgChange: true,
  });

  const sub_category = Array.isArray(subcategory?.data) ? subcategory.data : [];

  // ✅ Trigger refetch on category change
  useEffect(() => {
    if (selectedCategory) {
      refetch();
    }
  }, [selectedCategory, refetch]);

  // ✅ Category click handler
  const handleCategoryClick = (id, name) => {
    if (name === "Diamond") {
      navigate("/diamonds");
    } else {
      navigate("/product", {
        state: { categoryId: id },
      });
    }
  };

  // ✅ Lazy Queries
  const [triggerTrending, { data: trendingProducts, isLoading: trendingLoading, error: trendingError }] = useLazyGetTrendingQuery();
  const [triggerAllProduct, { data: productsData, isLoading: productLoading, error: productError }] = useLazyGetAllProductQuery();
  const [triggerProductData, { data: products_Data, isLoading: productDataLoading, error: productDataError }] = useLazyGetProductDataQuery();

  // ✅ Deferred API calls (non-blocking)
  useEffect(() => {
    const timer = setTimeout(() => {
      triggerTrending();
      triggerAllProduct();
      triggerProductData();
    }, 0); // Set to 300–500ms if UX requires a smoother paint

    return () => clearTimeout(timer);
  }, []);

  // ✅ Fallback for arrays
  const trendingData = Array.isArray(trendingProducts?.data) ? trendingProducts.data : [];
  const ProductData = Array.isArray(productsData?.data) ? productsData.data : [];
  const Product_item = Array.isArray(products_Data?.data) ? products_Data.data : [];

  // ✅ Responsive items count
  const [itemsToShow, setItemsToShow] = useState(12);
  useEffect(() => {
    let resizeTimer;
    const updateItemsToShow = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const width = window.innerWidth;
        setItemsToShow(width >= 1400 ? 12 : width >= 1024 ? 8 : 6);
      }, 100);
    };

    updateItemsToShow();
    window.addEventListener("resize", updateItemsToShow);
    return () => window.removeEventListener("resize", updateItemsToShow);
  }, []);

  // ✅ Session-based one-time reload (optional: avoid if possible)
  useEffect(() => {
    if (sessionStorage.getItem("shouldRefresh") === "true") {
      sessionStorage.removeItem("shouldRefresh");
      window.location.reload(); // Try to avoid full reloads
    }
  }, []);
  return (
    <div>
      <Navbar />


      <div className='header relative  flex  flex-col justify-center'>
        <section className="relative  ">
          {/* Text Content Inside Container */}
          <div className="container ">
            <div className=" w-full flex gap-[20px]">
              {/* Left Content */}
              <div className=" w-[50%] max-2xl:w-[60%] relative z-10 max-lg:w-[90%] max-lg:py-[50px]  max-md:w-[100%]">
                <h1 className="libre_askerville  font-bold text-[50px] leading-[60px] max-sm:leading-10 capitalize text-[#D86A37] mb-[14px] max-md:text-[45px] max-sm:text-[30px]">
                  Handcrafted Jewelry for Your Forever Moments
                </h1>
                <p className="font-normal max-lg:w-full   w-[82%] text-[17px] leading-[190%] tracking-[0%] text-[#58637C] max-sm:text-[15px]">
                  Celebrate life’s milestones with our ethically crafted gold and diamond pieces - timeless elegance designed to shine through generations.
                </p>

                <div className="flex mt-[34px] gap-6 flex-col max-sm:block ">
                  <Link to="/jewelry-collections" onClick={() => {
                sessionStorage.removeItem("gifted_page")
                sessionStorage.removeItem("categoryId")
                sessionStorage.removeItem("subcategory_id")
              }} title='jewelry-collections'>
                    <button className=" w-[200px]  max-sm:w-[100%] font-nunito font-bold text-[18px] leading-none tracking-[1px] text-center capitalize flex items-center justify-center bg-[#D86A37] text-white rounded-md transition-all duration-300 py-[14px] border-2 border-[#D86A37] hover:bg-transparent hover:text-[#D86A37] hover:border-[#D86A37] me-[20px] max-sm:me-[0px] max-sm:mb-[10px] ">
                      Shop Jewelry
                    </button>
                  </Link>

                  <Link to="/engagement-diamond-rings" onClick={() => {
                sessionStorage.removeItem("gifted_page")
                sessionStorage.removeItem("categoryId")
                sessionStorage.removeItem("subcategory_id")
              }} title='engagement-diamond-rings'>
                    <button className=" w-[233px] max-sm:w-[100%] font-nunito font-bold text-[18px] leading-none tracking-wide
 text-center capitalize flex items-center justify-center bg-transparent text-[#D86A37] rounded-md transition-all duration-300 py-[14px]  border-2 border-[#D86A37] hover:bg-[#D86A37] hover:text-white max-sm:me-[0px] ">
                      Shop Engagement Ring
                    </button>
                  </Link>
                </div>
              </div>

            </div>
          </div>

          {/* Image Outside Container */}



        </section>
      </div>

      <section className='container pt-[150px] max-lg:pt-[50px] max-sm:pt-[40px]'>
        <div className='max-w-[1200px] mx-[auto]'>
          {/* Our story */}
          <div className='flex  gap-[64px] items-center max-lg:gap-[40px] max-md:block'>
            <div className='w-[60%] max-md:w-[100%]'>
              <div className='flex justify-center '>
                <h2 className="libre_askerville font-normal text-[66px] leading-[100%] tracking-[0%] border-b-2 border-b-[#FFC1A4] inline-block px-6 py-2 text-[#D86A37] mb-[26px] max-lg:text-[45px] max-sm:text-[42px] max-sm:mb-[20px]">
                  Our Story
                </h2>

              </div>
              <p className=" font-normal text-[15px] leading-[100%] tracking-[0%] text-center mb-[12px] text-[#4D4C4C] max-md:mb-[5px]">
                Our story is one of passion, where every diamond is handpicked, every metal is ethereally shaped, and every design tells a unique story. It’s not just jewelry; it’s an heirloom that carries the legacy of beauty across generations.
              </p>
              <Link to="/about_us" title='about_us'>
                <div className='flex justify-center'>
                  <button className="flex font-normal text-[15px] leading-[100%] tracking-[0%] text-justify flex items-center">
                    Read More
                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="35" viewBox="0 0 36 35" fill="none" >
                      <path d="M13.7275 8.54541L22.2729 17.0909L13.7275 25.6363" stroke="#222222" />
                    </svg>
                  </button>
                </div>

              </Link>
            </div>
            <div className='w-[50%] max-md:w-[100%] max-md:mt-[20px]'>
              <img src={Img_1} alt='about' title='about' className='mx-[auto]'></img>
            </div>
          </div>
          {/* About Us*/}
          <div>
            <div className="flex gap-[64px] items-center max-lg:gap-[40px] max-md:flex-wrap">
              <div className="w-[50%] -mt-[50px] max-lg:-mt-[10px] max-md:mt-[0px] max-md:w-[100%]  flex max-md:order-2 justify-center">
                <img src={Img_2} alt="About Us" title='About Us' className="mx-auto" />
              </div>
              <div className="w-[60%] max-md:w-[100%]  max-md:order-1 max-md:mt-[40px]">
                <div className="flex justify-center">
                  <h2 className="libre_askerville font-normal text-[66px] leading-[100%] border-b-2 border-[#FFC1A4] inline-block px-6 py-2 text-[#D86A37] mb-[26px] max-lg:text-[45px] max-sm:text-[42px] max-sm:mb-[20px]">
                    About Us
                  </h2>
                </div>
                <p className="font-normal text-[15px] leading-[100%] text-center mb-[12px] text-[#4D4C4C] max-md:mb-[5px]">
                  Amidst the sparkle and shimmer, our brand stands out with its commitment to capturing the essence of sophistication in every creation. Each piece is a testament to timeless beauty, meticulously crafted to adorn moments that matter.
                </p>
                <Link to="/about_us" title='about_us'>
                  <div className="flex justify-center">
                    <button className="flex items-center font-normal text-[15px] leading-[100%]">
                      Read More
                      <svg xmlns="http://www.w3.org/2000/svg" width="36" height="35" viewBox="0 0 36 35" fill="none" className="ml-[10px]">
                        <path d="M13.7275 8.54541L22.2729 17.0909L13.7275 25.6363" stroke="#222222" />
                      </svg>
                    </button>
                  </div>

                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='bg-[#FDEEE6] mt-[100px] max-lg:mt-[50px] max-sm:mt-[40px]'>
        <div className='container '>
          <div className="py-[30px] grid grid-cols-5 gap-[50px] max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 text-center">
            <div>
              <img src={Jewelry} alt="Jewelry img 1" title='Jewelry img 1' className="mb-[10px] max-xl:mb-[15px] mx-auto max-md:mb-[10px]" />
              <span className="font-normal text-[22px] leading-[100%] tracking-[0%] text-center block  max-sm:text-[20px]">
                2500+ Unique <br className='max-md:hidden' /> Designs
              </span>
            </div>
            <div>
              <img src={Quality} alt="Jewelry img 2" title='Jewelry img 2' className="mb-[10px] max-xl:mb-[15px] mx-auto  max-md:mb-[10px]" />
              <span className="font-normal text-[22px] leading-[100%] tracking-[0%] text-center block   max-sm:text-[20px]">
                Assured <br className='max-md:hidden' /> Warranty
              </span>
            </div>
            <div>
              <img src={Favorite} alt="Jewelry img 3" title='Jewelry img 3 ' className="mb-[10px] max-xl:mb-[15px] mx-auto  max-md:mb-[10px]" />
              <span className="font-normal text-[22px] leading-[100%] tracking-[0%] text-center block   max-sm:text-[20px]">
                Celebrity <br className='max-md:hidden' /> Favorite
              </span>
            </div>
            <div>
              <img src={Operator} alt="Jewelry img 4" title='Jewelry img 3=4' className="mb-[10px] max-xl:mb-[15px] mx-auto  max-md:mb-[10px]" />
              <span className="font-normal text-[22px] leading-[100%] tracking-[0%] text-center block   max-sm:text-[20px]">
                Video Calling <br className='max-md:hidden' /> Assistance
              </span>
            </div>
            <div>
              <img src={Transport} alt="Jewelry img 5" title='Jewelry img 5' className="mb-[10px] max-xl:mb-[15px] mx-auto  max-md:mb-[10px]" />
              <span className="font-normal text-[22px] leading-[100%] tracking-[0%] text-center block   max-sm:text-[20px]">
                Shipping <br className='max-md:hidden' /> Worldwide
              </span>
            </div>
          </div>


        </div>

      </section>

      <section className='container pt-[100px] max-lg:pt-[50px] max-sm:pt-[40px] overflow-hidden'>
        <div>
          <div className="grid grid-cols-5 gap-x-4 gap-y-5 max-2xl:grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-lg:grid-cols-3  h-[auto]">


            {productDataLoading ? (
              <p>Loading products...</p>
            ) : productDataError ? (
              <p>Error loading products</p>
            ) : Product_item.length > 0 ? (
              Product_item.slice(0, 5).map((item) => ( // ✅ Show max 5 products

                <Product
                  image={item.product_img}
                  name={item.name}
                  key={item.product_id}
                  category={item.category}
                  price={item.total_price}
                    slug={item.slug}
                  originalPrice={item.original_price}
                  discount={item.original_price - item.price}
                  productId={item.product_id}// ✅ Calculate discount dynamically
                />

              ))
            ) : (
              <p>No products found</p>
            )}



          </div>

          <div className="flex items-center justify-center relative mt-[50px] max-lg:mt-[30px] max-sm:mt-[30px]">
            <Link to="/product" title='product'>
              <button className="view-more ">View More</button>
            </Link>
          </div>

        </div>


      </section>

      <section className=" pt-[100px] max-lg:pt-[50px] max-sm:pt-[40px] overflow-hidden">
        <div
          className="h-[624px] max-sm:h-[200px] max-2xl:h-[500px] max-xl:h-[400px]  max-xl:bg-[position:let] bg-cover bg-end flex items-center text-white  max-md:h-[350px]"
          style={{ backgroundImage: `url(${Banner_img})` }}>
          <div className='container max-sm:flex max-sm:flex-col max-sm:justify-center '>
            <div className=''>
              <h1 className="text-[50px] max-md:text-center font-bold leading-[100%] capitalize libre_askerville mb-[40px] max-md:text-[45px] max-sm:text-[35px] max-sm:mb-[30px]">
                Custom Jewelry
              </h1>
              <div className='max-md:flex max-md:justify-center'>
                <Link to="/jewelry-collections" onClick={() => {
                sessionStorage.removeItem("gifted_page")
                sessionStorage.removeItem("categoryId")
                sessionStorage.removeItem("subcategory_id")
              }} title='jewelry-collections'>
                  <button
                    className=" font-bold text-[22px] leading-[100%] max-md:text-[20px] max-md:px-[40px] max-md:py-[10px] tracking-[2%] 
             text-center align-middle capitalize 
             border border-black text-black px-6 py-3 rounded-md 
             transition-all duration-300 ease-out 
             hover:bg-black hover:text-white"
                  >
                    Shop Now
                  </button>

                </Link>
              </div>

            </div>
          </div>
        </div>
      </section>

      <section className=" pt-[100px] max-lg:pt-[50px] max-sm:pt-[40px] overflow-hidden">
        <div className='container  overflow-hidden' >
          <div className='mb-[40px] max-sm:mb-[20px]'>
            <h2 className="text-[#D86A37] font-bold text-[40px] leading-[100%] text-center mb-[11px] max-sm:text-[28px] ">
              Featured Categories
            </h2>

            <div className='relative flex justify-center'>
              <div className="relative  design">
                <img src={Design} alt="Design" title='Design' className='mx-[50px] relative' />
              </div>

            </div>
          </div>
          <div>
            {/* ✅ Categories Grid */}
            <div className="grid grid-cols-6 gap-[33px] max-xl:gap-[15px] max-2xl:grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-2 h-auto">
              {isLoading ? (
                <p>Loading categories...</p>
              ) : error ? (
                <p>Error loading categories</p>
              ) : category_data.length > 0 ? (
                category_data.slice(0, 7).map((item) => {
                  if (item.is_home == true) {
                    return (


                      // ✅ Only show 12 items
                      <div
                        key={item.category_id}
                        onClick={() => handleCategoryClick(item.category_id, item.name)}
                        className="cursor-pointer  rounded-md"
                      >
                        <Category image={item.category_img} title={item.name} />
                      </div>
                    )
                  }
                })
              ) : (
                <p>No categories found</p>
              )}
            </div>



            <div className="flex items-center justify-center relative mt-[50px] max-lg:mt-[30px] max-sm:mt-[30px]">
              <Link to="/category" title='category'>
                <button className="view-more ">View More</button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* <section className=" pt-[100px] max-lg:pt-[50px] max-sm:pt-[40px] overflow-hidden">
        <div className='container overflow-hidden' >
          <div className='mb-[40px] max-sm:mb-[20px]'>
            <h2 className="text-[#D86A37] font-bold text-[40px] leading-[100%] text-center mb-[11px] max-sm:text-[28px] ">
              Shop By Collection
            </h2>

            <div className='relative flex justify-center'>
              <div className="relative  design">
                <img src={Design} alt="Design" className='mx-[50px] relative' />
              </div>

            </div>
          </div>
          <div>
           
            {selectedCategory && (
              <div>
                <div className="grid grid-cols-6 gap-[33px] max-xl:gap-[15px] max-2xl:grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-2 h-auto">
                  {subLoading ? (
                    <p>Loading subcategories...</p>
                  ) : subError ? (
                    <p>No subcategories</p>
                  ) : sub_category.length > 0 ? (
                    sub_category.map((sub, index) => {
                      if (sub.is_home == true) {
                        return (

                          <div key={index} onClick={() =>
                            navigate(`/product/`, {
                              state: { subcategory_id: sub.subcategory_id }
                            })
                          }>
                            <Category
                              key={sub.subcategory_id}
                              image={sub.subcategory_img}
                              title={sub.name}


                            />

                          </div>
                        )
                      }
                    })
                  ) : (
                    <p>No subcategories found</p>
                  )}
                </div>
              </div>

            )}
            <div className="flex items-center justify-center relative mt-[50px] max-lg:mt-[30px] max-sm:mt-[30px]">
              <Link to="/exclusive-jewelry-collections">
                <button className="view-more ">View More</button>
              </Link>
            </div>
          </div>
        </div>
      </section> */}

      <section className=" pt-[100px] max-lg:pt-[50px] max-sm:pt-[40px] overflow-hidden">
        <div
          className={`h-[624px] max-sm:h-[200px] max-2xl:h-[500px] max-xl:h-[400px] max-md:bg-[url('${Banner_img_2}')]  max-xl:bg-[position:bottom] bg-[url('${Banner_img_1}')] bg-cover bg-end flex items-center text-white  max-md:h-[350px]`}
        >
          <div className='container flex justify-end max-md:justify-center'>
            <div className=''>
              <h1 className="text-[50px] max-md:text-center max-sm font-bold leading-[100%] capitalize libre_askerville mb-[40px] max-md:text-[45px] max-sm:text-[32px] max-sm:mb-[30px]">
                Engagement Rings
              </h1>
              <div className='flex  justify-center'>
                <Link to="/engagement-diamond-rings" onClick={() => {
                sessionStorage.removeItem("gifted_page")
                sessionStorage.removeItem("categoryId")
                sessionStorage.removeItem("subcategory_id")
              }} title='engagement-diamond-rings'>
                  <button
                    className=" font-bold text-[22px] leading-[100%] tracking-[2%] 
             text-center align-middle capitalize 
             border border-black text-black px-[63px] py-3 max-md:px-[40px] max-md:text-[20px] max-md:py-[10px] rounded-md 
             transition-all duration-300 ease-out 
             hover:bg-black hover:text-white">
                    Shop Now
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className=" pt-[100px] max-lg:pt-[50px] max-sm:pt-[40px] justify-center overflow-hidden">
        <div className='container overflow-hidden' >
          <div className='mb-[40px] max-sm:mb-[20px] overflow-hidden '>
            <h2 className="text-[#D86A37] font-bold text-[40px] leading-[100%] text-center mb-[11px] max-sm:text-[28px]  ">
              Trending Now
            </h2>
            <div className='relative flex justify-center'>
              <div className="relative  design">
                <img src={Design} alt="Design" title='Design' className='mx-[50px] relative' />
              </div>
            </div>
          </div>
          <div>
            <div className="grid grid-cols-6 gap-[33px] max-xl:gap-[15px] max-2xl:grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-2 h-auto">
              <TrendingProducts trendingData={trendingData} />
            </div>


            {/* <div className="grid grid-cols-6 gap-[33px] max-xl:gap-[15px] max-2xl:grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-lg:grid-cols-4 max-sm:grid-cols-2  h-[auto]">
              <div>
                <img src={Trending_img_1} className=''></img>
                <h5 className=" font-semibold text-[20px] leading-[100%] text-center my-[17px] max-h-[250px] max-w-[250px] rounded-[30px]">Elements</h5>
              </div>
              <div>
                <img src={Trending_img_2} className=''></img>
                <h5 className=" font-semibold text-[20px] leading-[100%] text-center my-[17px] max-h-[250px] max-w-[250px] rounded-[30px]">Elements</h5>
              </div>
              <div>
                <img src={Trending_img_3} className=''></img>
                <h5 className=" font-semibold text-[20px] leading-[100%] text-center my-[17px] max-h-[250px] max-w-[250px] rounded-[30px]">Elements</h5>
              </div>
              <div>
                <img src={Trending_img_4} className=''></img>
                <h5 className=" font-semibold text-[20px] leading-[100%] text-center my-[17px] max-h-[250px] max-w-[250px] rounded-[30px]">Elements</h5>
              </div>
              <div>
                <img src={Trending_img_5} className=''></img>
                <h5 className=" font-semibold text-[20px] leading-[100%] text-center my-[17px] max-h-[250px] max-w-[250px] rounded-[30px]">Elements</h5>
              </div>
              <div>
                <img src={Trending_img_6} className=''></img>
                <h5 className=" font-semibold text-[20px] leading-[100%] text-center my-[17px] max-h-[250px] max-w-[250px] rounded-[30px]">Elements</h5>
              </div>
            </div> */}
            <div className="flex items-center justify-center relative mt-[50px] max-lg:mt-[30px] max-sm:mt-[20px]">
              <Link to="/product" onClick={() => {
                sessionStorage.removeItem("product_page")
              }} title='product'>
                <button className="view-more ">View More</button>
              </Link>
            </div>
          </div>
        </div>
      </section >

      <section className=" pt-[100px] max-lg:pt-[50px] max-sm:pt-[40px] justify-center">
        <div className='container overflow-hidden' >
          <div className='mb-[40px] max-sm:mb-[20px] overflow-hidden mb-[50px]'>
            <h2 className="text-[#D86A37] font-bold text-[40px] leading-[100%] text-center mb-[11px] max-sm:text-[28px]  ">
              Explore Our Bestselling Rings
            </h2>
            <div className='relative flex justify-center'>
              <div className="relative  design">
                <img src={Design} alt='Bestselling' title='Bestselling' className='mx-[50px] relative' />
              </div>
            </div>
          </div>

          {/* <div className='flex justify-center mb-[40px]'>
            <div className="bg-[#FFC1A44D] py-[15px] px-[53px] max-w-[708px] max-md:w-[350px] text-center">
              <div className="flex flex-wrap justify-center gap-4 md:gap-[15px]">
                <button
                  className={`font-bold text-[15px] leading-[100%] text-center 
       px-4 py-2 cursor-pointer ${selectedRing === "ENGAGEMENT RINGS" ? "text-[#D86A37]" : "text-black"
                    }`}
                  onClick={() => setSelectedRing("ENGAGEMENT RINGS")}
                >
                  ENGAGEMENT RINGS
                </button>

                <button
                  className={`font-bold text-[15px] leading-[100%] text-center  max-md:border-0
       px-4 py-2 border-x-[1px] border-black cursor-pointer ${selectedRing === "ANNIVERSARY RINGS" ? "text-[#D86A37]" : "text-black"
                    }`}
                  onClick={() => setSelectedRing("ANNIVERSARY RINGS")}
                >
                  ANNIVERSARY RINGS
                </button>

                <button
                  className={`font-bold text-[15px] leading-[100%] text-center 
       px-4 py-2 cursor-pointer ${selectedRing === "ETERNITY RINGS" ? "text-[#D86A37]" : "text-black"
                    }`}
                  onClick={() => setSelectedRing("ETERNITY RINGS")}
                >
                  ETERNITY RINGS
                </button>
              </div>

            </div>

          </div> */}

          {/* Show selected button text */}
          {selectedRing == "ENGAGEMENT RINGS" && (

            <div className="grid grid-cols-5 gap-x-4 gap-y-5 max-2xl:grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-lg:grid-cols-3  h-[auto]">

              {productLoading ? (
                <p>Loading products...</p>
              ) : productError ? (
                <p>Error loading products</p>
              ) : Array.isArray(ProductData) && ProductData.length > 0 ? (
                ProductData.slice(0, 5).map((item) => (
                  <Product
                    key={item.id || item.product_id} // Unique key
                    image={`${item.product_img}`}
                    name={item.name}
                      slug={item.slug}
                    price={item.total_price}
                    originalPrice={item.original_price}
                    productId={item.product_id}
                    discount={
                      item.original_price
                        ? item.original_price - item.total_price // 🛠️ fixed logic: total_price not price
                        : 0
                    }
                  />
                ))
              ) : (
                <p>No products found</p>
              )}


            </div>

          )}
          {selectedRing == "ANNIVERSARY RINGS" && (

            <div className="grid grid-cols-5 gap-x-4 gap-y-5 max-2xl:grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-lg:grid-cols-3  h-[auto]">
              {productLoading ? (
                <p>Loading products...</p>
              ) : productError ? (
                <p>Error loading products</p>
              ) : Array.isArray(ProductData) && ProductData.length > 0 ? (
                ProductData.slice(0, 5).map((item) => (
                  <Product
                    key={item.id || item.product_id} // Unique key
                    image={`${item.product_img}`}
                    name={item.name}
                    price={item.total_price}
                      slug={item.slug}
                    originalPrice={item.original_price}
                    discount={
                      item.original_price
                        ? item.original_price - item.total_price // 🛠️ fixed logic: total_price not price
                        : 0
                    }
                  />
                ))
              ) : (
                <p>No products found</p>
              )}
            </div>

          )}
          {selectedRing == "ETERNITY RINGS" && (

            <div className="grid grid-cols-5 gap-x-4 gap-y-5 max-2xl:grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-lg:grid-cols-3  h-[auto]">
              {productLoading ? (
                <p>Loading products...</p>
              ) : productError ? (
                <p>Error loading products</p>
              ) : Array.isArray(ProductData) && ProductData.length > 0 ? (
                ProductData.slice(0, 5).map((item) => (
                  <Product
                    key={item.id || item.product_id} // Unique key
                    image={`${item.product_img}`}
                    name={item.name}
                    price={item.total_price}
                      slug={item.slug}
                    originalPrice={item.original_price}
                    discount={
                      item.original_price
                        ? item.original_price - item.total_price // 🛠️ fixed logic: total_price not price
                        : 0
                    }
                  />
                ))
              ) : (
                <p>No products found</p>
              )}
            </div>

          )}

        </div>
      </section>

      <section className=" pt-[100px] max-lg:pt-[50px] max-sm:pt-[40px] justify-center">
        <div className='container overflow-hidden' >
          <div className='mb-[40px] max-sm:mb-[20px] overflow-hidden '>
            <h2 className="text-[#D86A37] font-bold text-[40px] leading-[100%] text-center mb-[11px] max-sm:text-[28px]  ">
              Our Gallery
            </h2>
            <div className='relative flex justify-center'>
              <div className="relative  design">
                <img src={Design} alt="Design" title='Design' className='mx-[50px] relative' />
              </div>
            </div>
          </div>
          <div>

            <div className=" mx-auto ">
              <div className="flex gap-[17px] max-lg:gap-[10px] max-sm:gap-[5px]  relative max-md:flex-wrap">

                {/* Left Column */}
                <div className="space-y-[17px] max-lg:space-y-[10px] max-sm:space-y-[5px] w-full">
                  <div className="grid grid-cols-2 max-sm:gap-[5px] gap-[17px] ">
                    <img src={Gallery_1} alt="Gallery_1 img" title='Gallery_1 img' className="w-full object-cover" />
                    <img src={Gallery_2} alt="Gallery_2 img" title='Gallery_2 img' className="w-full object-cover" />
                  </div>
                  <div className=''>
                    <img src={Gallery_3} alt="Gallery_3 img" title='Gallery_3 img' className="w-full h-full object-cover" />
                  </div>
                </div>

                {/* Middle Column */}
                <div className='max-md:order-2 max-md:w-[100%]'>
                  <img src={Gallery_4} alt="Gallery_4 img" title='Gallery_4 img' className="w-[1000px] max-4xl:w-[809px]  max-2xl:w-[600px] max-md:w-full max-sm:h-[150px] max-md:h-[350px] max-lg:w-[470px] h-full object-cover" />
                </div>

                {/* Right Column */}
                <div className="space-y-[17px] max-lg:space-y-[10px] max-sm:space-y-[5px] w-full max-md:relative  max-md:order-1 max-md:my-auto">

                  <div className=''>
                    <img src={Gallery_5} alt="Gallery_5 img" title='Gallery_5 img' className="w-[100%] object-cover" />
                  </div>
                  <div className="grid grid-cols-2 max-sm:gap-[5px] gap-[17px]  ">
                    <img src={Gallery_6} alt="Gallery_6 img" title='Gallery_6 img' className="w-full object-cover" />
                    <img src={Gallery_7} alt="Gallery_7 img" title='Gallery_7 img' className="w-full object-cover" />
                  </div>
                </div>

              </div>
            </div>







          </div>
        </div>
      </section>

      <section className='bg-[#FDEEE6] mt-[100px] max-lg:mt-[50px] max-sm:mt-[40px]'>
        <div className='container '>
          <div className="py-[41px] grid grid-cols-4 gap-[37px] max-lg:grid-cols-2  max-sm:grid-cols-1 text-center">
            <div>
              <div className='flex justify-center'>
                <svg xmlns="http://www.w3.org/2000/svg" width="91" height="91" viewBox="0 0 91 91" fill="none">
                  <path d="M17.1035 30.0107C17.1035 29.2092 17.1035 28.8085 17.2179 28.4306C17.3324 28.0527 17.5547 27.7192 17.9992 27.0523L23.0925 19.4125C23.8675 18.25 24.255 17.6687 24.8446 17.3531C25.4342 17.0376 26.1328 17.0376 27.5301 17.0376H63.4686C64.8659 17.0376 65.5645 17.0376 66.1541 17.3531C66.7437 17.6687 67.1312 18.25 67.9062 19.4125L72.9995 27.0523C73.444 27.7192 73.6663 28.0527 73.7808 28.4306C73.8952 28.8085 73.8952 29.2092 73.8952 30.0107V68.4959C73.8952 71.0101 73.8952 72.2672 73.1141 73.0482C72.3331 73.8293 71.076 73.8293 68.5618 73.8293H22.4369C19.9227 73.8293 18.6656 73.8293 17.8846 73.0482C17.1035 72.2672 17.1035 71.0101 17.1035 68.4959V30.0107Z" stroke="#222222" strokeWidth="2.66667" />
                  <path d="M17.1035 36.3462H73.8952" stroke="#222222" strokeWidth="2.66667" strokeLinecap="round" />
                  <path d="M36.0342 36.5462C36.0342 36.4357 36.1237 36.3462 36.2342 36.3462H54.7647C54.8752 36.3462 54.9647 36.4357 54.9647 36.5462V54.217C54.9647 54.6834 54.456 54.9715 54.056 54.7315L45.671 49.7005C45.5654 49.6371 45.4335 49.6371 45.328 49.7005L36.9429 54.7315C36.543 54.9715 36.0342 54.6834 36.0342 54.217V36.5462Z" stroke="#222222" strokeWidth="2.66667" />
                </svg>
              </div>
              <div>
                <h4 className=" font-semibold text-[23px] leading-[100%] text-center mb-[15px]">
                  Complementary Shipping & Return
                </h4>

                <p className="font-['Nunito_Sans'] font-normal text-[18px] leading-[100%] text-center text-[#4D4C4C] ">

                  Explore our flexible payment options designed to fit every budget
                </p>

                <div className="flex justify-center">
                  <button className="flex items-center font-normal text-[19px] leading-[100%]">
                    Learn More
                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="35" viewBox="0 0 36 35" fill="none" >
                      <path d="M13.7275 8.54541L22.2729 17.0909L13.7275 25.6363" stroke="#222222" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div>
              <div className='flex justify-center'>
                <svg xmlns="http://www.w3.org/2000/svg" width="91" height="92" viewBox="0 0 91 92" fill="none">
                  <rect x="11.3867" y="23.3833" width="68.15" height="56.7917" rx="2.66667" stroke="#222222" strokeWidth="2.66667" />
                  <path d="M11.3867 28.7166C11.3867 26.2025 11.3867 24.9454 12.1678 24.1643C12.9488 23.3833 14.2059 23.3833 16.7201 23.3833H74.2034C76.7176 23.3833 77.9746 23.3833 78.7557 24.1643C79.5367 24.9454 79.5367 26.2025 79.5367 28.7166V38.5277H11.3867V28.7166Z" stroke="black" strokeWidth="2.66667" />
                  <path d="M26.5312 12.0244L26.5312 23.3827" stroke="#222222" strokeWidth="2.66667" strokeLinecap="round" />
                  <path d="M64.3926 12.0244L64.3926 23.3827" stroke="#222222" strokeWidth="2.66667" strokeLinecap="round" />
                  <rect x="26.5312" y="46.1001" width="15.1444" height="7.57222" rx="0.666667" fill="#222222" />
                  <rect x="26.5312" y="61.2441" width="15.1444" height="7.57222" rx="0.666667" fill="#222222" />
                  <rect x="49.248" y="46.1001" width="15.1444" height="7.57222" rx="0.666667" fill="#222222" />
                  <rect x="49.248" y="61.2441" width="15.1444" height="7.57222" rx="0.666667" fill="#222222" />
                </svg>
              </div>
              <div>
                <h4 className=" font-semibold text-[23px] leading-[100%] text-center mb-[15px]">
                  Complementary Shipping & Return
                </h4>

                <p className="font-['Nunito_Sans'] font-normal text-[18px] leading-[100%] text-center text-[#4D4C4C]">
                  We offer complementary shipping and returns on all orders.
                </p>

                <div className="flex justify-center">
                  <button className="flex items-center font-normal text-[19px] leading-[100%]">
                    Learn More
                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="35" viewBox="0 0 36 35" fill="none" >
                      <path d="M13.7275 8.54541L22.2729 17.0909L13.7275 25.6363" stroke="#222222" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div>
              <div className='flex justify-center'>
                <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="92" height="92" viewBox="0 0 92 92" fill="none">
                  <rect x="0.539551" y="0.88916" width="70.4706" height="70.4217" fill="url(#pattern0_1_1059)" />
                  <defs>
                    <pattern id="pattern0_1_1059" patternContentUnits="objectBoundingBox" width="1" height="1">
                      <use xlinkHref="#image0_1_1059" transform="matrix(0.00195312 0 0 0.00195448 0 -0.00034728)" />
                    </pattern>
                    <image id="image0_1_1059" width="512" height="512" preserveAspectRatio="none" xlinkHref="data:image/png;base64,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" />
                  </defs>
                </svg>
              </div>
              <div>
                <h4 className=" font-semibold text-[23px] leading-[100%] text-center mb-[15px]">
                  Complementary Shipping & Return
                </h4>

                <p className="font-['Nunito_Sans'] font-normal text-[18px] leading-[100%] text-center text-[#4D4C4C]">

                  We’re happy to help with in-store or vertual appointments.
                </p>

                <div className="flex justify-center">
                  <button className="flex items-center font-normal text-[19px] leading-[100%]">
                    Learn More
                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="35" viewBox="0 0 36 35" fill="none">
                      <path d="M13.7275 8.54541L22.2729 17.0909L13.7275 25.6363" stroke="#222222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>

                  </button>
                </div>
              </div>
            </div>
            <div>
              <div className='flex justify-center'>
                <svg xmlns="http://www.w3.org/2000/svg" width="89" height="92" viewBox="0 0 89 92" fill="none">
                  <path d="M16.3443 37.2924C15.9906 35.9722 15.8137 35.3121 15.9401 34.7397C16.0466 34.2574 16.2993 33.8196 16.6638 33.4862C17.0963 33.0906 17.7564 32.9137 19.0766 32.56L58.2396 22.0663C59.5598 21.7125 60.2199 21.5357 60.7923 21.662C61.2747 21.7685 61.7124 22.0212 62.0458 22.3857C62.4414 22.8182 62.6183 23.4783 62.972 24.7985L69.7911 50.2475C70.1448 51.5678 70.3217 52.2279 70.1953 52.8002C70.0888 53.2826 69.8361 53.7203 69.4716 54.0537C69.0391 54.4493 68.379 54.6262 67.0588 54.98L27.8958 65.4737C26.5756 65.8274 25.9155 66.0043 25.3431 65.8779C24.8607 65.7714 24.423 65.5187 24.0896 65.1542C23.694 64.7217 23.5171 64.0616 23.1634 62.7414L16.3443 37.2924Z" stroke="#222222" strokeWidth="2.66667" />
                  <path d="M18.2837 44.5313L64.9114 32.0374" stroke="#222222" strokeWidth="2" strokeLinecap="round" />
                  <path d="M30.7822 45.7053C30.7822 44.3385 30.7822 43.6551 31.0524 43.135C31.2801 42.6966 31.6375 42.3392 32.0759 42.1115C32.5961 41.8413 33.2794 41.8413 34.6462 41.8413H75.1908C76.5576 41.8413 77.241 41.8413 77.7611 42.1115C78.1995 42.3392 78.5569 42.6966 78.7846 43.135C79.0548 43.6551 79.0548 44.3385 79.0548 45.7053V72.0521C79.0548 73.4188 79.0548 74.1022 78.7846 74.6224C78.5569 75.0607 78.1995 75.4182 77.7611 75.6459C77.241 75.9161 76.5576 75.9161 75.1908 75.9161H34.6462C33.2794 75.9161 32.5961 75.9161 32.0759 75.6459C31.6375 75.4182 31.2801 75.0607 31.0524 74.6224C30.7822 74.1022 30.7822 73.4188 30.7822 72.0521V45.7053Z" fill="white" stroke="#222222" strokeWidth="2.66667" />
                  <path d="M30.7822 53.1992L79.0548 53.1992" stroke="#222222" strokeWidth="2" strokeLinecap="round" />
                  <circle cx="40.7209" cy="65.9777" r="2.83956" fill="#222222" />
                  <circle cx="43.5608" cy="65.9777" r="2.83956" fill="#222222" />
                </svg>
              </div>
              <div>
                <h4 className=" font-semibold text-[23px] leading-[100%] text-center mb-[15px]">
                  Complementary Shipping & Return
                </h4>

                <p className="font-['Nunito_Sans'] font-normal text-[18px] leading-[100%] text-center text-[#4D4C4C]">
                  Our customer care experts are always here to help you.
                </p>

                <div className="flex justify-center">
                  <button className="flex items-center font-normal text-[19px] leading-[100%]">
                    Learn More
                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="35" viewBox="0 0 36 35" fill="none" >
                      <path d="M13.7275 8.54541L22.2729 17.0909L13.7275 25.6363" stroke="#222222" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>



          </div>


        </div>

      </section>
      <Footer />
    </div >
  )
}

export default Home
