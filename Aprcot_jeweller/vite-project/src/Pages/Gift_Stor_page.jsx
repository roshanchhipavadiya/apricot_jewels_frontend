import React, { useCallback, useEffect, useState } from "react";
import cottonbro from '../assets/cottonbro.png'
import jibarofoto from '../assets/jibarofoto.png'
import pexelsrdne from '../assets/pexels-rdne.png'
import pexelscottonbro from '../assets/pexels-cottonbro.png'
import Design from '../assets/deisgn.png'
import Navbar from "../Componenet/Navbar";
import Product from '../Componenet/Product'
import Product_1 from '../assets/product_2.png'
import mana from '../assets/mana.png'
import Product_2 from '../assets/product_2.png'
import ring_sub_b from '../assets/ring__sub.png'
import Product_3 from '../assets/product_3.png'
import Product_4 from '../assets/product_4.png'
import Banner_img from '../assets/gift_image.png'
import Footer from "../Componenet/Footer";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Jewerlly_cat_1 from '../assets/jewellry_category_1.png'
import Jewerlly_cat_2 from '../assets/jewellry_category_2.png'
import DiamondHeader from '../assets/diamondHeader.jpg'
import Jewerlly_cat_3 from '../assets/jewellry_category_3.png'
import Jewerlly_cat_4 from '../assets/jewellry_category_4.png'
import Jewerlly_cat_5 from '../assets/jewellry_category_5.png'
import Jewerlly_cat_6 from '../assets/jewellry_category_6.png'
import FilterdData from "../Componenet/FilterdData";
import { useGetAllProductQuery, useGetCategoriesQuery, useGetProductQuery, useGetSubCategoriesQuery } from "../services/apiSlice";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

const validCategories = [
    "jewelry-collections",
    "diamonds_product_page",
    "engagement-diamond-rings",
    "wedding-bands-jewelry",
    "luxury-high-jewelry",
    "exclusive-jewelry-collections",
    "luxury-gifts-jewelry"
];
export const GiftStorepage = () => {
    const navigate = useNavigate()
    const { category11 } = useParams();
    useEffect(() => {
        if (!validCategories.includes(category)) {
            // Redirect to 404 page if category is invalid
            navigate('*', { replace: true });
        }
    }, [category11, navigate]);
    const [isOpen, setIsOpen] = useState(false); // Main Dropdown
    const [isAvailabilityOpen, setIsAvailabilityOpen] = useState(true); // Availability Default Open
    const [isMetalOpen, setIsMetalOpen] = useState(true); // Metal Default Closed
    const [isStonesOpen, setIsStonesOpen] = useState(true); // Metal Default Closed
    const [isPriceOpen, setIsPriceOpen] = useState(true) // Metal Default Closed
    const [checkedItems, setCheckedItems] = useState({
        inStock: false,
        outOfStock: false,
    });
    const [checkedMetals, setCheckedMetals] = useState({
        sterlingSilver: false,
        whiteGold_14KT: false,
        yellowGold_14KT: false,
        whiteGold_18KT: false,
        yellowGold_18KT: false,
        roseGold_18KT: false,
        white_roseGold_14KT: false,
    });
    const [checkedStones, setCheckedStones] = useState({
        pearl: false,
        diamon: false,
        diamond: false,
    });

    // Array of metals
    const metals = [
        { key: "sterlingSilver", label: "Sterling Silver" },
        { key: "whiteGold_14KT", label: "14KT White Gold" },
        { key: "yellowGold_14KT", label: "14KT Yellow Gold" },
        { key: "whiteGold_18KT", label: "18KT White Gold" },
        { key: "yellowGold_18KT", label: "18KT Yellow Gold" },
        { key: "roseGold_18KT", label: "18KT Rose Gold" },
        { key: "white_roseGold_14KT", label: "14KT White & Rose Gold" },
    ];
    const stones = [
        { key: "pearl", label: "Pearl" },
        { key: "diamon", label: "Diamon" },
        { key: "diamond", label: "Diamond" },
    ];

    const toggleDropdown = () => setIsOpen(!isOpen);
    const closeDropdown = () => setIsOpen(false);
    const toggleAvailability = () => setIsAvailabilityOpen(!isAvailabilityOpen);
    const toggleMetal = () => setIsMetalOpen(!isMetalOpen);
    const toggleStones = () => setIsStonesOpen(!isStonesOpen);

    const togglePrice = () => setIsPriceOpen(!isPriceOpen);

    const handleCheckboxChange = (key) => {
        setCheckedItems((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };
    const handleMetalChange = (key) => {
        setCheckedMetals((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };
    const handleStoneChange = (key) => {
        setCheckedStones((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };


    // mobilw view
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [menuTitle, setMenuTitle] = useState("Filters"); // Default title

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);


    // feture
    const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);

    const toggleSortDropdown = () => {
        setIsSortDropdownOpen(!isSortDropdownOpen);
    };



    // Silder

    const settings = {
        dots: false,
        infinite: false, // Disable infinite scrolling
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: false, // Disable autoplay
        responsive: [
            {
                breakpoint: 576,
                nav: false,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 768,
                nav: false,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 1400,
                settings: {
                    slidesToShow: 4,
                },
            },

        ],

    };



    // /////////////////////////////////////////////////////////
    const categoryMapping = {
        "jewelry-collections": "Jewelry",
        "diamond-jewelry": "Diamond",
        "engagement-diamond-rings": "Engagement",
        "wedding-bands-jewelry": "Wedding",
        "luxury-high-jewelry": "High Jewelry",
        "exclusive-jewelry-collections": "Collections",
        "luxury-gifts-jewelry": "Gifts",
    };


    const { category } = useParams(); // Get URL parameter
    const categoryName = categoryMapping[category] || "Unknown Category"; // Match it

    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [subcategory_id, setsubcategory_id] = useState(sessionStorage.getItem("subcategory_id") || null);

    // ✅ Fetch categories
    const { data: categories, error, isLoading } = useGetCategoriesQuery(categoryName);

    const category_data = Array.isArray(categories?.data) ? categories.data : [];

    // ✅ Set the first category when page loads
    useEffect(() => {
        if (category_data.length > 0 && selectedCategoryId === null) {
            setSelectedCategoryId(sessionStorage.getItem("categoryId") || category_data[0].category_id);
        }

    }, [category_data, selectedCategoryId]); // ✅ Reacts to both category_data and selectedCategoryId
    const handleCategoryClick = useCallback((categoryId) => {
        sessionStorage.setItem("gifted_page", 1);
        sessionStorage.setItem("categoryId", categoryId);
        setsubcategory_id("")
        setCurrentPage(1); // ✅ also update state
        if (selectedCategoryId !== categoryId) {
            setSelectedCategoryId(categoryId);
        }
    }, [selectedCategoryId]);



    // ✅ Fetch subcategories for selected category
    const { data: subcategory, refetch } = useGetSubCategoriesQuery(selectedCategoryId, {
        skip: !selectedCategoryId, // ✅ Prevents unnecessary calls
        refetchOnMountOrArgChange: true, // ✅ Ensures API is re-called when argument changes
    });

    // 🔥 Trigger API call when category changes
    useEffect(() => {
        if (selectedCategoryId) {
            refetch(); // ✅ Ensures API is triggered
        }
    }, [selectedCategoryId, refetch]);

    // ✅ States for filtering
    const [filterType, setFilterType] = useState(null);     // 'metal' | 'diamond' | 'price'
    const [filterValue, setFilterValue] = useState(null);   // selected value for above
    const [sortorder, setSortorder] = useState(null);       // sorting value (optional)

    const [itemsPerPage, setitemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(() => {
        return parseInt(sessionStorage.getItem("gifted_page") || "1");
    });


    const queryParams = {
        categoryName: categoryName,
        filter_type: filterType,
        subcategory_id: subcategory_id,
        category_id: selectedCategoryId,
        filter_data: filterValue,
        sort_order: sortorder,
        page_size: itemsPerPage,
        page: currentPage,
    };

    const subcategory_data = Array.isArray(subcategory?.data) ? subcategory.data : [];
    const { data: products, isLoading: productDataLoading, error: productDataError } = useGetAllProductQuery(queryParams);
    const product_data = Array.isArray(products?.data) ? products.data : [];

    const filteredTemplates = product_data

    const totalPages = products?.total_pages

    const handleFilterChange = ({ type, value }) => {


        setFilterType(type);
        setFilterValue(value);
    };

    return (
        <>
            <Navbar />
            {
                category == 'diamond-jewelry' && (
                    <div
                        className="header relative bg-cover bg-right bg-no-repeat"
                        style={{ backgroundImage: `url(${DiamondHeader})` }}
                    >
                        <section className="relative h-[700px] max-lg:h-auto">

                            <div className="container">
                                <div className="w-full max-lg:justify-center  flex gap-[20px]">

                                    <div className="py-[100px]   pb-[460px] max-sm:py-[50px]   z-10   max-lg:py-[70px]   ">
                                        <h1 className="libre_askerville line_of_bottom max-lg:text-center font-bold text-[90px] leading-[100%] relative capitalize text-[#D86A37] mb-[14px] max-sm:text-[40px] ">
                                            Diamonds
                                        </h1>

                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                )
            }
            {
                category == 'luxury-gifts-jewelry' && (
                    <div className="backgroundimage header flex  flex-col justify-center ">

                        <div className="container">
                            <div className="relative flex  max-lg:py-[70px] max-sm:py-[50px] overflow-auto ">
                                <div className="w-[69%] max-lg:w-[100%]   ml-auto bg-cover max-xl:w-[83%] max-sm:w-[100%]" >
                                    <h2 className=" LibreasBkerville leading-[102px] max-md:text-[50px] max-sm:text-[40px] font-[700] mx-auto text-[76.84px] text-[#B20411] text-center  ">Jewelry Gifts</h2>
                                    <p className="NunitoSans font-[400] max-md:leading-10 max-sm:leading-8 max-sm:pt-[10px] leading-12  max-md:text-[17px] max-sm:w-[100%] text-[26.13px]  text-[#58637C] mx-auto text-center pt-[30px]">
                                        Make your loved one’s day truly special with a one-of-a-kind gift from With Clarity’s fine jewelry collection. Whether it’s an anniversary, birthday or milestone moment, our carefully curated selection offers the perfect pieces to celebrate and cherish those special occasions. Choose from our unique and exquisite designs to create a lasting memory that will be treasured forever.
                                    </p>
                                    <div className="flex justify-center  items-center space-x-2 pt-[12px]">
                                        <p className="NunitoSans font-[400] max-md:text-[15px] text-[23.05px] text-[#222222] text-center">Home</p>
                                        <div>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="5" height="5" viewBox="0 0 5 5" fill="none">
                                                <circle cx="2.5" cy="2.5" r="2.5" fill="#D86A37" />
                                            </svg>
                                        </div>
                                        <p className="text-[#D86A37]   max-md:text-[15px] font-[700] text-[23.05px]">Jewelry Gifts</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
            {
                category == 'wedding-bands-jewelry' && (
                    <div className="backgroundimage1  header max-lg:h-auto flex flex-col justify-center">

                        <div className="container">
                            <div className="relative flex  max-xl:py-[60px] max-lg:py-[70px] max-sm:py-[50px] overflow-auto ">
                                <div className="w-[55%] max-lg:w-full    bg-cover max-xl:w-[66%] max-2xl:w-[66%] max-sm:w-[100%]" >
                                    <h2 className=" LibreasBkerville font-[700] mx-auto text-[55.27px] text-[#D86A37]   max-lg:text-[40px] max-md:text-[35px] max-sm:text-[25px]">Exclusive Wedding</h2>


                                    <p className="text-[23.37px] my-[15px] leading-[45px] text-[#D86A37] max-sm:text-[17px] max-sm:leading-[30px]">
                                        Discover our exclusive Jewelry Collection featuring handcrafted pieces that blend elegance with timeless design. From gold and silver jewelry to diamond-studded creations, each piece is crafted to perfection for weddings, anniversaries, and everyday luxury. Explore rings, necklaces, bracelets, and earrings that showcase both traditional artistry and modern style. Elevate your look with jewelry that defines sophistication and lasts for generations.
                                    </p>

                                    {/* <button className="px-[50px] max-sm:w-full max-sm:h-[50px] max-ms:w-full h-[55px] border-2 rounded-[6.15px] border-primary text-primary text-[22.14px] font-[700]">Shop Jewelry</button> */}
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }

            {
                category == 'engagement-diamond-rings' && (
                    <div
                        className="header    relative bg-contain backgroundimage2 bg-no-repeat"

                    >
                        <img src={mana} className="w-full absolute top-0 left-0 h-full object-cover max-lg:hidden" alt="" />
                        <section className="relative  max-lg:h-auto">

                            <div className="container h-full">
                                <div className="w-full max-lg:justify-center h-full  flex gap-[20px]">

                                    <div className="py-[83px] max-lg:py-[70] flex flex-col justify-between  max-sm:py-[50px]   z-10      ">
                                        <h1 className="libre_askerville max-md:leading-12 max-md:text-[50px] max-sm:text-[40px]   line_of_bottom max-lg:text-center font-bold text-[62.99px] leading-[55px] relative capitalize text-[#D86A37]  ">
                                            Engagement Rings
                                        </h1>
                                        <img src={ring_sub_b} alt="" srcSet="" className="block mx-auto max-md:h-[150px] max-sm:h-[100px] h-[200px] my-[50px]" />
                                        <div className="flex justify-center items-center space-x-2 ">

                                            {/* <button className="px-[50px] max-sm:w-full max-sm:h-[50px] max-ms:w-full h-[55px] border-2 rounded-[6.15px] border-primary text-primary text-[22.14px] font-[700]">Shop Jewelry</button> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                )
            }
            {
                category == 'exclusive-jewelry-collections' && (
                    <div
                        className="header  flex flex-col justify-center  relative backgroundimage3 bg-no-repeat"

                    >
                        <section className="relative max-lg:h-auto">

                            <div className="container">
                                <div className="w-full max-lg:justify-center   flex gap-[20px]">

                                    <div className="py-[238px]    max-lg:py-[70px] max-sm:py-[50px]  z-10      ">
                                        <h1 className="libre_askerville mb-[75px]   line_of_bottom max-lg:text-center font-bold text-[62.99px] leading-[100%] relative capitalize text-[#D86A37] max-sm:text-[40px] ">
                                            Collections
                                        </h1>
                                        <div className="flex justify-center items-center space-x-2 ">

                                            {/* <button className="px-[50px] max-sm:h-[50px] max-ms:w-full h-[55px] border-2 rounded-[6.15px] border-primary text-primary text-[22.14px] font-[700]">Shop Now</button> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                )
            }
            {
                (category === 'jewelry-collections' || category === 'luxury-high-jewelry') && (
                    <div
                        className="header flex flex-col justify-center    relative  backgroundimage4 bg-no-repeat"

                    >
                        <section className="relative  max-lg:h-auto">
                            <div className="container ">
                                <div className=" w-full flex gap-[20px]">

                                    <div className="    w-[50%] max-2xl:w-[60%] relative z-10 max-lg:w-[90%] max-lg:py-[70px]  max-md:w-[100%]">
                                        <h1 className="libre_askerville font-bold text-[50px] leading-[40px] capitalize text-[#D86A37] mb-[14px] max-md:text-[45px] max-sm:text-[30px]">
                                            Begin Your Forever
                                        </h1>

                                        <p className="font-normal max-lg:w-full w-[92%] text-[20px] leading-[190%] tracking-[0%] text-[#58637C] max-sm:text-[15px]">
                                            Celebrate life’s most cherished moments with our <strong>engagement rings</strong>, <strong>wedding bands</strong>, and timeless <strong>diamond jewelry</strong>. Our collection is designed to symbolize love, commitment, and forever elegance. From classic solitaire rings to modern bespoke designs, each piece is crafted with precision and passion. Start your forever with jewelry that reflects your unique journey and lasts for generations.
                                        </p>


                                        <div className="flex mt-[34px] max-sm:block ">
                                            {/* 
                                            <button className=" w-[200px]  max-sm:w-[100%] font-nunito font-bold text-[18px] leading-none tracking-[1px] text-center capitalize flex items-center justify-center bg-[#D86A37] text-white rounded-md transition-all duration-300 py-[14px] border-2 border-[#D86A37] hover:bg-transparent hover:text-[#D86A37] hover:border-[#D86A37] me-[20px] max-sm:me-[0px] max-sm:mb-[10px] ">
                                                Shop Jewelry
                                            </button>



                                            <button className=" w-[233px] max-sm:w-[100%] font-nunito font-bold text-[18px] leading-none tracking-wide
 text-center capitalize flex items-center justify-center bg-transparent text-[#D86A37] rounded-md transition-all duration-300 py-[14px]  border-2 border-[#D86A37] hover:bg-[#D86A37] hover:text-white max-sm:me-[0px] ">
                                                Shop Engagement Ring
                                            </button> */}

                                        </div>
                                    </div>

                                </div>
                            </div>
                        </section>
                    </div>
                )
            }


            {/* gift by occasion */}
            <section className="container pt-[50px] overflow-hidden">
                <div className='mb-[40px] max-sm:mb-[20px]'>
                    <h2 className="text-[#D86A37] font-bold text-[40px] capitalize leading-[100%] text-center mb-[11px] max-sm:text-[28px] ">
                        {category.replace(/-/g, " ")}

                    </h2>

                    <div className='relative flex justify-center'>
                        <div className="relative  design">
                            <img src={Design} alt="Design" className='mx-[50px] relative' />
                        </div>

                    </div>
                </div>
                <div className="grid w-[80%] max-sm:w-full mx-auto   place-content-center grid-cols-4 gap-[41px] max-xl:gap-[25px] max-2xl:grid-cols-4  max-md:grid-cols-2 max-lg:grid-cols-2 ">
                    {category_data.length > 0 &&
                        category_data.map((val) => (
                            <div key={val.category_id} onClick={() => {
                                handleCategoryClick(val.category_id)

                                const el = document.getElementById("produccct");
                                if (el) {
                                    el.scrollIntoView({ behavior: "smooth", block: "start" });

                                }
                            }}>  {/* Always add a unique key when mapping */}
                                <img
                                    src={`https://srv963148.hstgr.cloud:10443${val.category_img}`}
                                    className="mx-auto max-h-[300px] w-full object-cover rounded-[30px]  cursor-pointer"
                                    alt={val.name || "Category Image"}
                                // ✅ Add alt for better accessibility
                                />
                                <div>
                                    <p className="font-semibold text-[20px] leading-[100%] text-center my-[17px] cursor-pointer" >
                                        {val.name || "Anniversary Gift"}  {/* Show dynamic name */}
                                    </p>
                                </div>
                            </div>
                        ))
                    }


                </div>
            </section >

            <section className=" pt-[100px] max-lg:pt-[50px] max-sm:pt-[40px] justify-center overflow-hidden">
                <div className='container overflow-hidden' >
                    <div className='mb-[40px] max-sm:mb-[20px] overflow-hidden '>
                        <h2 className="text-[#D86A37] font-bold text-[40px] leading-[100%] text-center mb-[11px] max-sm:text-[28px]  ">
                            By Style
                        </h2>
                        <div className='relative flex justify-center'>
                            <div className="relative  design">
                                <img src={Design} alt="Design" className='mx-[50px] relative' />
                            </div>
                        </div>
                    </div>
                    {subcategory_data.length > 0 &&
                        <div className="silder_silde container">

                            <div >
                                <Slider {...settings} className="gap-[32px] ">
                                    {subcategory_data.map((val, ibndex) => (
                                        <div key={ibndex} className="cursor-pointer" onClick={() => {
                                            const el = document.getElementById("produccct");
                                            if (el) {
                                                el.scrollIntoView({ behavior: "smooth", block: "start" });

                                            }
                                            sessionStorage.setItem("gifted_page", 1)
                                            sessionStorage.setItem("subcategory_id", val.subcategory_id);
                                            setsubcategory_id(val.subcategory_id)
                                            setCurrentPage(1)
                                        }}>
                                            <div className="w-full aspect-[3/3] rounded-[30px] overflow-hidden">
                                                <img
                                                    src={`https://srv963148.hstgr.cloud:10443${val.subcategory_img}`}
                                                    className="w-full h-full object-cover"
                                                    alt="Diamond"
                                                />
                                            </div>

                                            <h5 className="font-semibold text-[20px] leading-[100%] text-center my-[17px] ">{val.name}</h5>
                                        </div>
                                    ))}


                                </Slider>
                            </div>




                        </div>
                    }
                </div>
            </section>
            {/* section....3 */}

            <section className="justify-center " id="produccct">
                <FilterdData
                    length__of_pro={products?.total_items}
                    onSelectMetal={handleFilterChange} // ✅ single function handles all
                    setfiltertype={setFilterType}
                    onorder={setSortorder}
                />
                <div className="container pt-[60px]" >
                    <div className="grid grid-cols-5 gap-x-4 gap-y-6 max-2xl:grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-lg:grid-cols-3  h-[auto]">
                        {/* {product_data.length > 0 &&
                            product_data.map((val, ibndex) => (
                                <Product image={`${val.product_img}`}
                                    name={val.name}
                                    price={val.total_price}
                                    originalPrice={699}
                                    productId={val.product_id}
                                    key={ibndex}
                                    discount={100} />
                            ))
                        } */}
                        {productDataLoading ? (
                            <p>Loading products...</p>
                        ) : productDataError ? (
                            <p>No products</p>
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
                                    gifted_page={currentPage}
                                    slug={item.slug}
                                />

                            ))
                        ) : (
                            <p>No products found</p>
                        )}
                    </div>

                    {products && products?.total_items > itemsPerPage &&
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


            {/* <section className=" pt-[100px] max-lg:pt-[50px] max-sm:pt-[40px] overflow-hidden">
                <div
                    className="h-[624px] bg-cover bg-end flex items-center text-white  max-md:h-[350px]"
                    style={{
                        backgroundImage: `url(${Banner_img})`,
                        backgroundPositionX: "right", // Correct way to set horizontal positioning
                    }}>
                    <div className='container'>
                        <div className='ms-[auto] flex justify-end max-md:justify-center max-sm:justify-start max-md:ms-0'>
                            <div>
                                <h1 className=" text-[50px] font-bold leading-[100%] capitalize libre_askerville mb-[40px] max-md:text-[45px] max-sm:text-[35px] max-md:mb-[30px] text-[#4D4C4C]">
                                    Still not sure what to buy?
                                </h1>
                                <div className="flex justify-center max-sm:justify-start">
                                    <button
                                        className="flex items-center ms-[15px] font-bold text-[22px] leading-[100%] tracking-[2%] 
                         text-center align-middle capitalize 
                         text-[#4D4C4C]
                         transition-all duration-300 ease-out  max-sm:text-[18px]
                         "
                                    >
                                        Talk to an Expert<svg xmlns="http://www.w3.org/2000/svg" width="13" height="22" viewBox="0 0 13 22" fill="none" className="ms-[15px]">
                                            <path d="M1.42426 1.03857L11.4849 11.0939L1.42426 21.1493" stroke="#4D4C4C" strokeWidth="1.33264" />
                                        </svg>
                                    </button>  </div>

                            </div>


                        </div>
                    </div>
                </div>
            </section> */}
            <Footer />


        </>

    )
}

export default GiftStorepage