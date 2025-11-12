import React, { useEffect, useState, useRef } from "react";
import User_side_menu from '../Componenet/user_side_menu'
import EmployList from '../Componenet/EmployList'
import SubHeader from '../Componenet/sub_header'
import { ToastContainer, toast } from "react-toastify";
import { useGetAddressQuery, useGetWishlistQuery, useGetCartQuery, useGetOrderQuery, useGetProductQuery } from "../services/apiSlice";
import { Link, useLocation } from "react-router-dom";
import Meen from '../assets/meen.png'


const Order_details = () => {
    const location = useLocation();
    const order_id = location?.state?.order || null;
    console.log(order_id);


    const { data: address } = useGetAddressQuery();
    const data = address?.data || [];
    console.log(data);


    const { data: product } = useGetProductQuery();
    console.log(product?.data);


    // const { data: order } = useGetOrderQuery(order_id);
    // const orderdata = order?.data || [];
    // console.log(orderdata);


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
            console.log(file);

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
    function formatDate(isoString) {
        const date = new Date(isoString);
        const options = { day: '2-digit', month: 'short', year: 'numeric' };
        return date.toLocaleDateString('en-GB', options); // Example: "16 May 2025"
    }

    const subTotal = order_id?.order_items?.reduce((acc, item) => acc + Number(item.total_price), 0) || 0;
    console.log(subTotal); // should log the sum of all product total_price values

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
                    <SubHeader setIsOpenside={setIsOpenside} pageName={"Order Details"} />
                    <div className="flex justify-between gap-[10px]  flex-wrap mb-[30px]" >
                        <h3 className="text-[26px] text-gray font-semibold "> </h3>

                    </div>

                    <div>
                        <div className="flex gap-6 max-xl:block">
                            <div className="w-[65%] max-xl:w-[100%] ">
                                <div className="border mt-[20px] bg-white border-[#EBE9F1] shadow-[0px_4px_24px_0px_#0000000F] p-[24px]  max-sm:p-[10px] rounded-[10px]">
                                    <div className="text-[15px] font-bold mb-[15px] max-sm:mb-[10px] ">
                                        <h5>Order Item</h5>
                                    </div>
                                    <div className="divide-y divide-[#d4cdf0]">
                                        {/* {[1, 2, 3].map((_, index) => (
                                            <div
                                                key={index}
                                                className="flex justify-between items-center py-3  max-md:gap-1"
                                            >
                                               
                                                <div className="flex items-center gap-4 max-sm:gap-1">
                                                    <img
                                                        src={Meen}
                                                        alt="product"
                                                        className="h-[50px] w-[50px] rounded-[8px] object-cover max-md:h-[40px] max-md:w-[40px]"
                                                    />
                                                    <div>
                                                        <span className="text-[12px] text-[#595858] max-md:text-[9px] ">Product Name</span>
                                                        <h4 className="text-[14px] font-[600] max-md:text-[11px]">Diamond Ring</h4>
                                                    </div>
                                                </div>

                                             
                                                <div className="">
                                                    <span className="text-[12px] text-[#595858] max-md:text-[9px] ">Quantity</span>
                                                    <h4 className="text-[14px] font-[600] max-md:text-[11px]">1</h4>
                                                </div>

                                             
                                                <div className="">
                                                    <span className="text-[12px] text-[#595858] max-md:text-[9px] ">Price</span>
                                                    <h4 className="text-[14px] font-[600] max-md:text-[11px]">$5000</h4>
                                                </div>
                                            </div>
                                        ))} */}
                                        {order_id?.order_items?.map((val, index) => {
                                            const matchedProduct = product?.data?.find(val1 => val1.product_id === val.product);
                                            console.log(matchedProduct);

                                            return (
                                                <div
                                                    key={index}
                                                    className="flex border-t justify-between  items-center py-3  max-md:gap-1"
                                                >

                                                    <div className="flex items-center gap-4 max-w-[300px] max-sm:w-[180px] w-full max-sm:gap-1">
                                                        <img
                                                            src={import.meta.env.VITE_API_BASE_URL + matchedProduct?.product_img}
                                                            alt={matchedProduct?.product_img}
                                                            className="h-[50px] w-[50px] rounded-[8px] object-cover max-md:h-[40px] max-md:w-[40px]"
                                                        />
                                                        <div>
                                                            <span className="text-[12px] text-[#595858] max-md:text-[9px] ">Product Name</span>
                                                            <h4 className="text-[14px] font-[600] max-md:text-[11px]">{matchedProduct?.name}</h4>
                                                        </div>
                                                    </div>


                                                    <div className="">
                                                        <span className="text-[12px] text-[#595858] max-md:text-[9px] ">Quantity</span>
                                                        <h4 className="text-[14px] text-center font-[600] max-md:text-[11px]">{val.quantity}</h4>
                                                    </div>


                                                    <div className=" max-w-[100px] max-sm:w-[60px] w-full">
                                                        <span className="text-[12px] text-[#595858] max-md:text-[9px] ">Price</span>
                                                        <h4 className="text-[14px] font-[600] max-md:text-[11px]">₹{parseInt(val.total_price)}</h4>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>

                                </div>
                                <div className="border mt-[20px] bg-white border-[#EBE9F1] shadow-[0px_4px_24px_0px_#0000000F] p-[24px] max-sm:p-[10px] rounded-[10px]">
                                    <div className="text-[15px] font-bold mb-[15px] max-sm:mb-[10px] flex justify-between">
                                        <h5 className="w-1/2">Cart Totals</h5>
                                        <h5 className="w-1/2 text-center">Price</h5>
                                    </div>
                                    <div className="items-center border-t border-t-[#ebe7f8]">
                                        <div className="text-[15px] font-bold max-sm:mb-[10px] py-3 flex border-b border-b-[#ebe7f8] justify-between">
                                            <span className="w-1/2 font-[400] text-[#575864]">Sub Total:</span>
                                            <span className="w-1/2 font-[600] text-center">₹{subTotal}</span>
                                        </div>
                                        {/* <div className="text-[15px] font-bold max-sm:mb-[10px] py-3 flex border-b border-b-[#ebe7f8] justify-between">
                                            <span className="w-1/2 font-[400] text-[#575864]">Shipping:</span>
                                            <span className="w-1/2 font-[600] text-center">$10.00</span>
                                        </div>
                                        <div className="text-[15px] font-bold max-sm:mb-[10px] py-3 flex border-b border-b-[#ebe7f8] justify-between">
                                            <span className="w-1/2 font-[400] text-[#575864]">Tax:</span>
                                            <span className="w-1/2 font-[600] text-center">$5.00</span>
                                        </div> */}
                                        <div className="text-[15px] font-bold max-sm:mb-[10px] py-3 flex justify-between">
                                            <span className="w-1/2 ">Total Price:</span>
                                            <span className="w-1/2 text-center text-[#ff5200]">₹{parseInt(order_id?.total_amount)}</span>
                                        </div>
                                    </div>
                                </div>






                            </div>
                            <div className="w-[35%] max-xl:w-[100%]">
                                {/* {data.length === 0 ? (
                                    <div className="text-[14px] text-gray-500 mt-2">No shipping addresses found.</div>
                                ) : (
                                    data.map((item, index) => (
                                        <div
                                            key={index}
                                            className="border mt-[10px] bg-white border-[#EBE9F1] shadow-[0px_4px_24px_0px_#0000000F] p-[20px] rounded-[10px]"
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
                                )} */}

                                <div className="border mt-[20px] bg-white border-[#EBE9F1] shadow-[0px_4px_24px_0px_#0000000F] p-[24px] max-sm:p-[10px] rounded-[10px]">
                                    <div className="text-[15px] font-bold mb-[5px]  ">
                                        <h5>Summary</h5>
                                    </div>
                                    <div className=" ">
                                        <div className="text-[15px] font-bold max-sm:mb-[10px] pt-1  flex  ">
                                            <span className="w-[150px] font-[400] text-[#575864]">Order ID</span>
                                            <span className=" font-[600] ">#{order_id?.order_id}</span>
                                        </div>
                                        <div className="text-[15px] font-bold max-sm:mb-[10px] pt-3 flex  ">
                                            <span className="w-[150px] font-[400] text-[#575864]">Date</span>
                                            <span className=" font-[600] ">{formatDate(order_id?.created_at)}</span>
                                        </div>
                                        <div className="text-[15px] font-bold max-sm:mb-[10px] pt-3 flex  ">
                                            <span className="w-[150px] font-[400] text-[#575864]">Total </span>
                                            <span className=" font-[600] text-[#ff5200] ">₹{parseInt(order_id?.total_amount)}</span>
                                        </div>

                                    </div>
                                </div>

                                <div className="border mt-[20px] bg-white border-[#EBE9F1] shadow-[0px_4px_24px_0px_#0000000F] p-[24px] max-sm:p-[10px] rounded-[10px]">
                                    <div className="text-[15px] font-bold mb-[5px]  ">
                                        <h5>Shipping Address</h5>
                                    </div>
                                    <div className=" ">
                                        <div className="text-[14px] font-bold max-sm:mb-[10px] ">
                                            <span className=" font-[400] text-[#575864]"> {
                                                (() => {
                                                    const matchedAddress = address?.data?.find(item => item.address_id === order_id?.address);
                                                    if (!matchedAddress) return "N/A";

                                                    const addressText = `
        
        ${matchedAddress.address_line_1} ${matchedAddress.landmark},
        ${matchedAddress.city}, ${matchedAddress.pin_code}, ${matchedAddress.state}
      `.replace(/\s+/g, ' ').trim(); // Remove extra spaces

                                                    const words = addressText.split(' ');
                                                    const shortText = words.slice(0, 30).join(' ') + (words.length > 30 ? '...' : '');

                                                    return shortText;
                                                })()
                                            }</span>

                                        </div>
                                    </div>
                                </div>

                                <div className="border mt-[20px] bg-white border-[#EBE9F1] shadow-[0px_4px_24px_0px_#0000000F] p-[24px] max-sm:p-[10px] rounded-[10px]">
                                    <div className="text-[15px] font-bold mb-[5px]  ">
                                        <h5>Payment Method</h5>
                                    </div>
                                    <div className="">
                                        <div className="text-[14px] font-bold max-sm:mb-[10px] ">
                                            <p className=" text-[14px] font-[400] text-[#575864] leading-[1.6]">
                                                Pay on Delivery (Cash/Card). Cash on delivery (COD) available. Card/Net banking acceptance subject to device availability.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* <div className="border mt-[20px] bg-white border-[#EBE9F1] shadow-[0px_4px_24px_0px_#0000000F] p-[24px] max-sm:p-[10px] rounded-[10px]">
                                    <div className="text-[15px] font-bold mb-[5px]  ">
                                        <h5>Expected Date Of Delivery</h5>
                                    </div>
                                    <div className=" ">
                                        <div className="text-[14px] font-bold  mb-[10px]">
                                            <div className=" text-[14px] font-[600] text-[#22c55e] leading-[1.6]">
                                                19 April 2025
                                            </div>
                                        </div>
                                        <Link to="/order-Traking">
                                            <div className="w-[100%]">
                                                <button className="flex items-center font-[600] justify-center gap-2 border border-primary text-primary px-4 py-2 rounded-lg   hover:bg-primary hover:text-white transition w-[100%]">

                                                    <i className="fa-solid fa-truck"></i>
                                                    Track Order
                                                </button>
                                            </div>

                                        </Link>


                                    </div>
                                </div> */}
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

export default Order_details
