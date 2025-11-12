import React, { useEffect, useState, useRef } from "react";
import User_side_menu from '../Componenet/user_side_menu'
import EmployList from '../Componenet/EmployList'
import SubHeader from '../Componenet/sub_header'
import { ToastContainer, toast } from "react-toastify";
import { useGetAddressQuery, useGetWishlistQuery, useGetCartQuery, useGetOrderUsernameQuery, useGetAddressUsernameQuery } from "../services/apiSlice";
import { useLocation, useNavigate } from "react-router-dom";
import Meen from '../assets/meen.png'
import { Link } from "react-router-dom";

const Address = () => {
    const location = useLocation();
    const username = location?.state?.username || null;
  
    const navigate = useNavigate()
    const { data: address } = useGetAddressUsernameQuery(username);
    const data = address?.data || [];
   
    const { data: wishlist } = useGetWishlistQuery(username);
    const wishlistdata = wishlist?.data || [];
    

    const { data: cart } = useGetCartQuery(username);
    const cartData = cart?.data || [];
    

    const { data: order } = useGetOrderUsernameQuery(username);
    const orderdata = order?.data || [];
   


    const dropdownRefs = useRef([]);

    const handleClickOutside = (event) => {
        dropdownRefs.current.forEach((ref, index) => {
            if (ref && !ref.contains(event.target)) {
                setOpenDropdown((prev) => (prev === index ? null : prev));
            }
        });
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);


    const [searchTerm, setSearchTerm] = useState("");
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil((data?.length || 0) / itemsPerPage);


    const filteredData = data?.filter(item =>
        item.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.last_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.mobile_no?.toLowerCase().includes(searchTerm.toLowerCase())
    );


    const displayedData = filteredData?.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleItemChange = (event) => {
        const value = parseInt(event.target.value, 10);
        setItemsPerPage(value);
        setCurrentPage(1);
    };


    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };


    const [isOpen, setIsOpen] = useState(false);
    const [isOpenside, setIsOpenside] = useState(false);

    const [selectedImage, setSelectedImage] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalImage, setModalImage] = useState('');


    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {

            setSelectedImage(URL.createObjectURL(file));
            setCategory((prev) => ({ ...prev, file })); // Store the file object
        }
    };


    const handleImageClick = (imageUrl) => {
        setModalImage(imageUrl);
        setIsModalOpen(true);
    };

    const openModal = (modalId) => setModal(modalId);
    const closeModal = () => setModal(null);

    const groupedByName = data.reduce((acc, item) => {
        if (!acc[item.name]) {
            acc[item.name] = {
                email: item.email,
                addresses: [],
            };
        }
        acc[item.name].addresses.push(item);
        return acc;
    }, {});

    const closeModal1 = () => {
        setIsModalOpen(false);
        setModalImage("");
    };


    // tab
    const [activeTab, setActiveTab] = useState("wishlist");






    return (
        <div>
            <ToastContainer
                position="top-center"
                autoClose={1500}
            />
            <User_side_menu setIsOpen={setIsOpen} isOpenside={isOpenside} />
            <div className='flex inter'>
                <EmployList isOpen={isOpen} setIsOpen={setIsOpen} />

                <div className="w-full width__right relative max-md:ms-0">
                    <SubHeader setIsOpenside={setIsOpenside} pageName={"Address"} />
                    <div className="flex justify-between gap-[10px] mb-[27px] flex-wrap items-center max-sm:block" >
                        <h3 className="text-[24px] font-[700]"> </h3>
                        <nav className="text-sm text-gray-600 max-sm:mt-[15px] max-sm:ps-[5px]" aria-label="Breadcrumb" >
                            <ol className="flex flex-wrap items-center ">

                                <li className="flex items-center">
                                    <Link to="/dashboard" className="hover:text-primary transition-colors font-[12px] text-[#575864]">Dashboard</Link>
                                    <svg className="mx-2 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path d="M9 5l7 7-7 7" />
                                    </svg>
                                </li>
                                <li className="flex items-center">
                                    <Link to="/user" className="hover:text-primary transition-colors font-[12px] text-[#575864]">User</Link>
                                    <svg className="mx-2 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path d="M9 5l7 7-7 7" />
                                    </svg>
                                </li>
                                <li className="text-primary font-medium text-[12px]">User Details</li>
                            </ol>
                        </nav>
                    </div>

                    {/* <div className="border mt-[30px] bg-white border-[#EBE9F1] shadow-[0px_4px_24px_0px_#0000000F]  rounded-[10px]"> */}
                    {/* <div className="p-[20px] flex items-center gap-3">
                            <div className="flex items-center gap-3">
                                 <span className="text-[#95989d] text-[12px]">Showing</span>
                                <select name="" className="border-[#E2E2E2] text-[#5E5873] rounded-[6px] text-sm border h-[35px] ps-[5px] pe-[10px]" id=""
                                    onChange={handleItemChange} value={itemsPerPage}>
                                    <option value="10">10</option>
                                    <option value="15">15</option>
                                    <option value="20">20</option>
                                    <option value="30">30</option>
                                </select>
                                <span className="text-[#95989d] text-[12px]">Entries</span>

                            </div>
                            <div className="wg-filter flex-grow">
                                <div className="w-[458px] max-md:w-[200px]">
                                    <fieldset className="relative border border-[#E2E2E2] text-[#5E5873] rounded-[6px] h-[40px] ">
                                        <input
                                            placeholder="Search here..."
                                            tabIndex="2"
                                            required
                                            type="text"
                                            name="name"
                                            value={searchTerm}
                                            onChange={handleSearchChange}
                                            className="outline-none shadow-none w-full h-full pr-8 text-sm font-inter font-normal leading-5 bg-transparent focus:bg-white selection:bg-white text-heading ps-[10px] transition-colors duration-200"
                                        />
                                        <i className="fa-solid fa-magnifying-glass absolute right-2 top-1/2 -translate-y-1/2 text-[#5E5873] text-sm pointer-events-none"></i>
                                    </fieldset>

                                </div>
                            </div>
                        </div> */}
                    {/* <div className="border mt-[30px] bg-white border-[#EBE9F1] shadow-[0px_4px_24px_0px_#0000000F]  rounded-[10px]">

                        <div className=" overflow-x-auto custom-scrollbar">
                            {Object.entries(groupedByName).map(([name, { email, addresses }]) => (
                                <div
                                    key={name}
                                    className=" bg-white border border-[#EBE9F1] shadow-[0px_4px_24px_0px_#0000000F] rounded-xl p-8 space-y-4"
                                >
                              
                                    <div>
                                        <h2 className="text-xl font-semibold text-[#343434]">User Name: {name}</h2>
                                        <p className="text-sm text-gray-600">Email: {email}</p>
                                    </div>

                                    <div className="grid gap-6 max-sm:grid-cols-1 max-lg:grid-cols-2 grid-cols-3">
                                        {addresses.map((addr, index) => (
                                            <div
                                                key={addr.address_id}
                                                className="border border-[#e0dddd] rounded-2xl p-6 bg-white shadow-md hover:shadow-lg transition-all shadow-[0px_4px_24px_0px_#0000000F] "
                                            >
                                                <div className="flex flex-col gap-2 text-sm text-gray-700 font-inter">
                                                    <div className="space-y-1">
                                                        <h3 className="text-base font-semibold text-[#3B3B3B] mb-2">Address </h3>

                                                        {addr.address_line_1 && (
                                                            <div className="flex items-start gap-2">
                                                            
                                                                <span className="text-[#595858] text-[13px] font-bold">Address 1: </span>
                                                                <p className="leading-5 text-[12px]">
                                                                    {[addr.address_line_1, addr.city, addr.state, addr.landmark, addr.pin_code]
                                                                        .filter((val) => val && val.trim() !== "")
                                                                        .join(", ")}
                                                                </p>
                                                            </div>
                                                        )}

                                                        {addr.address_line_2 && (
                                                            <div className="flex items-start gap-2">
                                                            
                                                                <span className="text-[#595858] text-[13px] font-bold">Address 2: </span>
                                                                <p className="leading-5  text-[12px]">
                                                                    {[addr.address_line_2, addr.city, addr.state, addr.landmark, addr.pin_code]
                                                                        .filter(Boolean)
                                                                        .join(", ")}
                                                                </p>
                                                            </div>
                                                        )}

                                                        <div className="flex items-center gap-2 mt-2">
                                                          
                                                            <span className="text-[#595858] text-[13px] font-bold">Contact No: </span>
                                                            <span className="text-[#3B3B3B] text-[12px]">{addr.contact_no || "N/A"}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>


                                </div>
                            ))}
                        </div>
                        {data.length > itemsPerPage && (
                            <div className="flex align-items-center my-[20px] justify-end mx-[30px]">
                                
                                <button
                                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                    className={`w-[32px] md:w-[38px] h-[32px] md:h-[38px] bg-[#D3ECFB] rounded-full flex items-center justify-center ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                                        }`}
                                >
                                    <svg xmlns="http:www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                        <path d="M14.3465 15.7965C14.7085 16.1584 14.7085 16.7013 14.3465 17.0632C14.1656 17.2442 13.9846 17.3346 13.7132 17.3346C13.4418 17.3346 13.2608 17.2442 13.0799 17.0632L7.65131 11.6346C7.28941 11.2727 7.28941 10.7299 7.65131 10.368L13.0799 4.9394C13.4418 4.57749 13.9846 4.57749 14.3465 4.9394C14.7085 5.3013 14.7085 5.84416 14.3465 6.20606L9.55131 11.0013L14.3465 15.7965Z" fill="black" />

                                      
                                        <mask id="mask0_514_1023" maskUnits="userSpaceOnUse" x="7" y="4" width="8" height="14">
                                            <path d="M14.3465 15.7965C14.7085 16.1584 14.7085 16.7013 14.3465 17.0632C14.1656 17.2442 13.9846 17.3346 13.7132 17.3346C13.4418 17.3346 13.2608 17.2442 13.0799 17.0632L7.65131 11.6346C7.28941 11.2727 7.28941 10.7299 7.65131 10.368L13.0799 4.9394C13.4418 4.57749 13.9846 4.57749 14.3465 4.9394C14.7085 5.3013 14.7085 5.84416 14.3465 6.20606L9.55131 11.0013L14.3465 15.7965Z" fill="white" />
                                        </mask>


                                        <g mask="url(#mask0_514_1023)">
                                            <rect x="0.142578" y="0.142578" width="21.7143" height="21.7143" fill="#9CA3AF" />
                                        </g>
                                    </svg>

                                </button>

                            
                                <ul className="flex pagination h-[32px] md:h-[38px] mx-[7px]">
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                        <li
                                            key={page}
                                            onClick={() => setCurrentPage(page)}
                                            className={`h-[32px] md:h-[38px] w-[32px] md:w-[38px] flex items-center justify-center monst font-semibold text-[16px] md:text-[19px] ${currentPage === page ? " active " : "cursor-pointer"
                                                }`}
                                        >
                                            {page}
                                        </li>
                                    ))}
                                </ul>

                 
                                <button
                                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                    disabled={currentPage === totalPages}
                                    className={`w-[32px] md:w-[38px] h-[32px] md:h-[38px] bg-[#D3ECFB] rounded-full flex items-center justify-center ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
                                        }`}
                                >
                                    <svg xmlns="http:www.w3.org/2000/svg" width="23" height="22" viewBox="0 0 23 22" fill="none">
                                        <path d="M15.0487 11.6346L9.62013 17.0632C9.43917 17.2442 9.25822 17.3346 8.98679 17.3346C8.71536 17.3346 8.53441 17.2442 8.35346 17.0632C7.99156 16.7013 7.99156 16.1584 8.35346 15.7965L13.1487 11.0013L8.35346 6.20606C7.99156 5.84416 7.99156 5.3013 8.35346 4.9394C8.71536 4.57749 9.25822 4.57749 9.62013 4.9394L15.0487 10.368C15.4106 10.7299 15.4106 11.2727 15.0487 11.6346Z" fill="black" />

                              
                                        <mask id="mask0_514_1015" maskUnits="userSpaceOnUse" x="8" y="4" width="8" height="14">
                                            <path d="M15.0487 11.6346L9.62013 17.0632C9.43917 17.2442 9.25822 17.3346 8.98679 17.3346C8.71536 17.3346 8.53441 17.2442 8.35346 17.0632C7.99156 16.7013 7.99156 16.1584 8.35346 15.7965L13.1487 11.0013L8.35346 6.20606C7.99156 5.84416 7.99156 5.3013 8.35346 4.9394C8.71536 4.57749 9.25822 4.57749 9.62013 4.9394L15.0487 10.368C15.4106 10.7299 15.4106 11.2727 15.0487 11.6346Z" fill="white" />
                                        </mask>


                                        <g mask="url(#mask0_514_1015)">
                                            <rect x="0.844727" y="0.142578" width="21.7143" height="21.7143" fill="#9CA3AF" />
                                        </g>
                                    </svg>

                                </button>
                            </div>
                        )}
                    </div> */}

                    <div>
                        {/* <div className="flex mb-[20px] ">
                            {["wishlist", "cart", "orders"].map((tab) => (
                                <button
                                    key={tab}
                                    className={`flex-1 px-[40px] py-[10px] rounded-[6px] mr-2 transition-all duration-200 max-sm:px-0 ${activeTab === tab
                                            ? "bg-primary text-white font-bold"
                                            : "bg-[#f0f0f0] text-black"
                                        }`}
                                    onClick={() => setActiveTab(tab)}
                                >
                                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                </button>
                            ))}
                        </div> */}
                        <div className="flex mb-[40px] ">
                            {["wishlist", "cart", "orders"].map((tab) => (
                                <button
                                    key={tab}
                                    className={`px-[40px] py-[10px] rounded-[6px] mr-2 transition-all  max-sm:px-[20px] duration-200 ${activeTab === tab
                                        ? "bg-[#2275fc] text-white font-bold"
                                        : "bg-[#f0f0f0] text-black"
                                        }`}
                                    onClick={() => setActiveTab(tab)}
                                >
                                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                </button>
                            ))}
                        </div>





                        <div className="flex gap-6 max-xl:flex-wrap">

                            <div className="w-[65%] max-2xl:w-[70%] max-xl:w-[100%] ">
                                {activeTab === "wishlist" && (
                                    <div className="border  bg-white border-[#EBE9F1] shadow-[0px_4px_24px_0px_#0000000F] p-[24px] max-md:p-[15px]  rounded-[10px]">
                                        <div className="text-[15px] font-bold mb-[15px] max-sm:mb-[10px]">
                                            <h5>Wishlist Item</h5>
                                        </div>
                                        <div className="overflow-x-auto none__apee_scrol">
                                            {wishlistdata.length === 0 ? (
                                                <div className="text-center text-gray-500 text-[14px]">No data available</div>
                                            ) : (
                                                <div    >
                                                    {wishlistdata.map((item, index) => (
                                                        <div
                                                            key={index}
                                                            className="flex justify-between border-t border-t-[#5E5873]  py-3 gap-4"
                                                        >
                                                            {/* Product Info */}
                                                            <div className="flex items-center gap-4  max-lg:gap-2 max-md:gap-1 ">
                                                                <div className="cursor-pointer">
                                                                    <img
                                                                        src={`${import.meta.env.VITE_API_BASE_URL}/${item?.product_img}`}
                                                                        className="w-[60px] h-[60px] max-sm:w-[40px] max-sm:h-[40px] max-sm:rounded-md rounded-xl object-cover"
                                                                        alt="product"
                                                                        onClick={() =>
                                                                            handleImageClick(`${import.meta.env.VITE_API_BASE_URL}/${item?.product_img}`)
                                                                        }
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <span className="text-[12px] text-[#595858] max-md:text-[9px]">
                                                                        {item.product_name}
                                                                    </span>
                                                                    <h4 className="text-[14px] font-[600] max-md:text-[11px]">
                                                                        {item.username}
                                                                    </h4>
                                                                </div>
                                                            </div>

                                                            {/* Diamond */}
                                                            <div className="my-3 max-md:my-1">
                                                                <span className="text-[12px] text-[#595858] max-md:text-[10px]">Diamond</span>
                                                                <h4 className="text-[14px] font-[600] max-md:text-[11px]">{item.diamond_shape}</h4>
                                                            </div>

                                                            {/* Metal */}
                                                            <div className="my-3 max-md:my-1">
                                                                <span className="text-[12px] text-[#595858] max-sm:text-[9px]">Metal</span>
                                                                <h4 className="text-[14px] font-[600] max-sm:text-[11px]">{item.metal_type}</h4>
                                                            </div>

                                                            {/* Price */}
                                                            <div className="my-3 max-md:my-1">
                                                                <span className="text-[12px] text-[#595858] max-md:text-[9px]">Price</span>
                                                                <h4 className="text-[14px] font-[600] max-md:text-[11px]">₹{item.total_price}</h4>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>


                                    </div>
                                )}
                                {activeTab === "cart" && (
                                    <div className="border mt-[20px] bg-white border-[#EBE9F1] shadow-[0px_4px_24px_0px_#0000000F] p-[24px] max-sm:p-[10px] max-lg:p-[15x]">
                                        <div className="text-[15px] font-bold mb-[15px] max-sm:mb-[10px] ">
                                            <h5>Cart Items</h5>
                                        </div>


                                        <div className="overflow-x-auto ">
                                            {cartData.length === 0 ? (
                                                <div className="text-center text-gray-500 text-[14px]">No items in cart</div>
                                            ) : (
                                                <div className="">
                                                    {cartData.map((item, index) => (
                                                        <div
                                                            key={index}
                                                            className="flex justify-between  gap-4 items-center  max-sm:gap-2 py-3 border-t border-t-[#5E5873]"
                                                        >
                                                            {/* Image + Product Name */}
                                                            <div className="flex items-center gap-4  max-lg:gap-2 max-md:gap-1 ">
                                                                <div className="cursor-pointer">
                                                                    <img
                                                                        src={`${import.meta.env.VITE_API_BASE_URL}/${item?.product_img}`}
                                                                        className="w-[60px] h-[60px] max-md:h-[40px] max-md:w-[40px] max-sm:rounded-md rounded-xl object-cover"
                                                                        alt="product"
                                                                        onClick={() =>
                                                                            handleImageClick(`${import.meta.env.VITE_API_BASE_URL}/${item?.product_img}`)
                                                                        }
                                                                    />
                                                                </div>
                                                                <div className="max-w-[100px]">
                                                                    <h4 className="text-[14px] font-[600] max-md:text-[11px] max-md:max-w-[80px] truncate text-wrap w-[150px] max-sm:w-[100%]">{item.product_name}</h4>
                                                                </div>
                                                            </div>

                                                            {/* Diamond Shape */}
                                                            <div className="my-1  text-sm">
                                                                <span className="text-[12px] text-[#595858] max-md:text-[9px] ">Diamond</span>
                                                                <h4 className="text-[14px] font-[600] max-md:text-[11px]">{item.diamond_shape || "-"}</h4>
                                                            </div>

                                                            {/* Weight */}
                                                            <div className="my-1  text-sm max-sm:hidden">
                                                                <span className="text-[12px] text-[#595858] max-md:text-[9px] ">Weight</span>
                                                                <h4 className="text-[14px] font-[600] max-md:text-[11px]">{item.total_carat_weight || "-"}</h4>
                                                            </div>

                                                            {/* Metal Color */}
                                                            <div className="my-1  text-sm">
                                                                <span className="text-[12px] text-[#595858] max-md:text-[9px]">Metal</span>
                                                                <h4 className="text-[14px] font-[600] max-md:text-[11px]">{item.metal_color || "-"}</h4>
                                                            </div>

                                                            {/* Total Price */}
                                                            <div className="my-1  text-sm">
                                                                <span className="text-[12px] text-[#595858] max-md:text-[9px]">Total</span>
                                                                <h4 className="text-[14px] font-[600] max-md:text-[11px]">₹{item.total_price}</h4>
                                                            </div>

                                                            {/* Unit Price */}
                                                            <div className="my-1  text-sm max-sm:hidden">
                                                                <span className="text-[12px] text-[#595858] max-md:text-[9px] ">Unit Price</span>
                                                                <h4 className="text-[14px] font-[600] max-md:text-[11px]">₹{item.unit_price}</h4>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                    </div>


                                )}



                                {activeTab === "orders" && (

                                    <div className="border  bg-white border-[#EBE9F1] shadow-[0px_4px_24px_0px_#0000000F] p-[24px]  max-sm:p-[10px] rounded-[10px] max-lg:p-[15px]">
                                        <div className="text-[15px] font-bold mb-[15px] max-sm:mb-[10px] ">
                                            <h5>Order Item</h5>
                                        </div>
                                        {orderdata?.map((val) => (

                                            <div className="flex justify-between items-center gap-11 border-t border-t-[#5E5873] py-3 max-lg:gap-12">
                                                <Link
                                                    to="/order-details"
                                                    state={{ order: val }}
                                                    className="flex flex-1 justify-between items-center gap-4"
                                                >
                                                    <div className="col-span-1 max-sm:hidden">
                                                        <span className="text-[12px] text-[#595858] block max-md:text-[10px]">Order Id</span>
                                                        <h4 className="text-[14px] font-[600] max-md:text-[11px]">#{val.order_id}</h4>
                                                    </div>

                                                    <div className="col-span-1 max-sm:hidden">
                                                        <span className="text-[12px] text-[#595858] block max-md:text-[10px] ">Price</span>
                                                        <h4 className="text-[14px] font-[600] max-md:text-[11px]">₹{val.total_amount}</h4>
                                                    </div>

                                                    <div className="col-span-1">
                                                        <span className="text-[12px] text-[#595858] block max-md:text-[10px]">Payment Status</span>
                                                        <h4 className="text-[14px] font-[600] max-md:text-[11px]">{val.payment_status}</h4>
                                                    </div>

                                                    <div className="col-span-1">
                                                        <span className="text-[12px] text-[#595858] block max-md:text-[10px]">Status</span>
                                                        <h4 className="text-[14px] font-[600] max-md:text-[11px]">{val.status}</h4>
                                                    </div>
                                                </Link>

                                                <div>
                                                    {val.status !== 'Pending' ? (
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation(); // still good to keep
                                                                navigate(`/invoice_details`, {
                                                                    state: { order_id: val.order_id },
                                                                });
                                                            }}
                                                            className="p-1 max-sm:text-[12px]  px-4 text-white bg-primary rounded-md transition-all duration-200"
                                                            aria-label="Edit user"
                                                            title="Edit"
                                                        >
                                                            Invoice
                                                        </button>
                                                    ) : (
                                                        <div className="p-1 cursor-default max-sm:text-[12px] max-sm:w-[72px] max-sm:px-2 opacity-0 w-[85px] px-4 text-white bg-primary rounded-md transition-all duration-200">
                                                            asdsadSsdasd
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                        ))

                                        }

                                    </div>



                                )}

                            </div>
                            <div className="w-[35%]  max-2xl:w-[30%] max-xl:w-[100%]">
                                {data.length === 0 ? (
                                    <div className="text-[14px] mb-3 text-gray-500 mt-2">No shipping addresses found.</div>
                                ) : (
                                    data.map((item, index) => (
                                        <div
                                            key={index}
                                            className="border  bg-white mb-3 border-[#EBE9F1] shadow-[0px_4px_24px_0px_#0000000F] p-[20px] rounded-[10px]"
                                        >
                                            <h4 className="text-[15px] font-bold mb-[5px]">
                                                Shipping Address {index + 1}
                                            </h4>
                                            <div>

                                                <span className="text-[13px] text-[#595858]">
                                                    {item.address_line_1 || "-"},{item.landmark || ""} ,{item.city || "-"}, {item.state || "-"} {item.pin_code || "-"}
                                                </span>
                                                <span className="text-[13px] text-[#595858]">
                                                    {item.email}
                                                </span>
                                                <span className="text-[13px] text-[#595858]">
                                                    {item.contact_no}
                                                </span>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            {
                isModalOpen && (
                    <div
                        className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-75 z-50"
                        onClick={closeModal}
                    >
                        <div
                            className=""
                            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking image or button
                        >
                            <img
                                src={modalImage}
                                alt="Zoomed"
                                className="relative w-auto h-auto max-w-[70vw] max-h-[70vh] rounded-lg shadow-lg"
                            />

                            {/* Close Button */}
                            <button
                                className="absolute top-2 right-2 bg-white text-black px-3 py-1 rounded-full text-xl shadow"
                                onClick={closeModal1}
                            >
                                ✕
                            </button>
                        </div>
                    </div>

                )
            }


        </div>
    )
}

export default Address
