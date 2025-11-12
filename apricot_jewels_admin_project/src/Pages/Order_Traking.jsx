import React, { useEffect, useState, useRef } from "react";
import User_side_menu from '../Componenet/user_side_menu'
import EmployList from '../Componenet/EmployList'
import SubHeader from '../Componenet/sub_header'
import { ToastContainer, toast } from "react-toastify";
import { useGetUserQuery, useGetOrderQuery, useGetAddressQuery } from "../services/apiSlice";
import { useNavigate } from "react-router-dom";
import Product_1 from "../assets/product_1.png"


const Order_Traking = () => {

  const navigate = useNavigate()



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

  // ✅ Pagination
  const [searchTerm, setSearchTerm] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const handleItemChange = (event) => {
    const value = parseInt(event.target.value, 10);
    setItemsPerPage(value);
    setCurrentPage(1);
  };


  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on new search
  };


  const [isOpen, setIsOpen] = useState(false);
  const [isOpenside, setIsOpenside] = useState(false);

  const handleitemchnage = (event) => {
    const value = parseInt(event.target.value, 10); // Convert to number
    setItemsPerPage(value);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState("");

  const handleImageClick = (imageUrl) => {
    setModalImage(imageUrl);
    setIsModalOpen(true);
  };


  const steps = [
    { title: "Receiving orders", time: "05:43 AM", status: "completed" },
    { title: "Order Processing", time: "01:21 AM", status: "completed" },
    { title: "Being delivered", time: "Processing", status: "active" },
    { title: "Delivered", time: "Pending", status: "pending" },
  ];


  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={1500}
      />
      <User_side_menu setIsOpen={setIsOpen} isOpenside={isOpenside} />
      <div className='flex inter'>
        <EmployList isOpen={isOpen} setIsOpen={setIsOpen} />
        {/* <Service_side_menu isOpenside={isOpenside} setIsOpenside={setIsOpenside} /> */}
        <div className="w-full width__right relative max-md :ms-0">
          <SubHeader setIsOpenside={setIsOpenside} pageName={"Order Traking"} />
          <div className="flex justify-between gap-[10px]  flex-wrap" >
            <h3 className="text-[26px] text-gray font-semibold"> Order Traking</h3>

          </div>

          <div className="border mt-[30px] bg-white border-[#EBE9F1] shadow-[0px_4px_24px_0px_#0000000F]  rounded-[10px]">
            <div className="flex flex-col lg:flex-row p-[24px] gap-[24px] max-sm:p-[15px]">
              {/* Product Image */}
              <div className="w-full max-w-[300px] h-[300px] rounded-[15px] overflow-hidden lg:mx-0">
                <img src={Product_1} className="w-full h-full object-cover" alt="Product" />
              </div>

              {/* Product Info */}
              <div className="flex-1 p-[0] lg:p-[24px]">
                <h3 className="text-[20px] font-[700] mb-[20px]  lg:text-left">
                  Pouch Pocket Hoodie Orange
                </h3>

                <div className="max-lg:flex">
                  <div className="bg-white rounded w-full space-y-3">
                    {[
                      { label: "Order ID", value: "#192847" },
                      { label: "Brand", value: "BrandName" },
                      { label: "Order Placed", value: "20 Nov 2023" },
                      { label: "Quantity", value: "1" },
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center">
                        <div className="text-[#575864] text-[14px] font-[400] w-[110px]">{item.label}</div>
                        <div className="font-[700] text-[14px]">{item.value}</div>
                      </div>
                    ))}

                    <div className="flex max-sm:flex-col  gap-2 pt-4">
                      <button className=" h-[45px] w-[230px] max-sm:w-[100%] rounded-[12px] text-sm font-medium hover:text-white hover:bg-primary border border-primary bg-white text-primary transition">
                        View Shop
                      </button>
                      <button className=" h-[45px] w-[230px] max-sm:w-[100%] text-sm font-medium text-white bg-primary border border-primary hover:bg-white hover:text-primary rounded-[12px] transition">
                        View Product
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            </div>

          </div>

          <div className="border mt-[30px] bg-white border-[#EBE9F1] shadow-[0px_4px_24px_0px_#0000000F]  rounded-[10px] p-[24px] max-sm:p-[15px]">
            <div className="text-[15px] font-bold  mb-[10px] ">
              <h5>Cart Items</h5>
            </div>
            <p className="text-[#575864] text-[14px] font-[400] mb-[20px]">Your items is on the way. Tracking information will be available within 24 hours.</p>

              <div className="flex relative overflow-x-auto none__apee_scrol  max-sm:block">
                {steps.map((step, index) => {
                  const isCompleted = step.status === "completed";
                  const isActive = step.status === "active";

                  // Determine circle and text color
                  const circleBg = isCompleted || isActive ? "bg-primary" : "bg-[#ecf0f4]";
                  const textColor = isCompleted || isActive ? "text-primary" : "text-[#95989d]";

                  // Determine line color between steps
                  const lineColor =
                    index !== steps.length - 1 && (isCompleted || isActive)
                      ? "bg-primary"
                      : "bg-[#ecf0f4]";

                  return (
                    <div key={index} className="relative  text-center min-w-[200px] w-[100%]  max-md:min-w-[50px]">
                      {/* Horizontal line */}
                      {index !== steps.length && (
                        <div
                          className={`absolute top-[23px] max-sm:hidden w-full h-[4px] z-0 ${lineColor}`}
                          style={{ transform: "translateX(0%)" }}
                        />
                      )}

                      {/* Step icon and content */}
                      <div className="relative z-10 flex flex-col items-center max-sm:py-[10px]">
                        <div className={`h-[50px] w-[50px] ${circleBg}  rounded-full text-white flex items-center justify-center mb-[20px] max-sm:mb-[10px]`}>
                          <i className="fa-solid fa-check text-lg max-md:text-sm"></i>
                        </div>
                        <div>
                          <h6 className="text-[18px] font-[700] mb-[10px] max-lg:text-[15px] max-lg:mb-0  max-md:mb-[0px]">{step.title}</h6>
                          <span className={`text-[14px] ${textColor} `}>{step.time}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>



              
          </div>

          <div className="border mt-[30px] bg-white border-[#EBE9F1] shadow-[0px_4px_24px_0px_#0000000F] rounded-[10px] p-[24px] max-sm:p-[15px]">
            <div className="overflow-x-auto max-sm:overflow-x-auto">
              <table className="min-w-full max-sm:min-w-[550px] text-left border-collapse">
                <thead>
                  <tr className="bg-[#F9FAFB] text-[14px] font-semibold text-[#111827]">
                    <th className="p-3">Date</th>
                    <th className="p-3">Time</th>
                    <th className="p-3 max-md:hidden">Description</th>
                    <th className="p-3">Location</th>
                  </tr>
                </thead>
                <tbody className="text-[14px] text-[#374151]">
                  <tr className="border-t hover:bg-gray-50 transition">
                    <td className="p-3 whitespace-nowrap">20 Nov 2023</td>
                    <td className="p-3 whitespace-nowrap">2:30 PM</td>
                    <td className="p-3 max-md:hidden">The sender is preparing the goods</td>
                    <td className="p-3">2715 Ash Dr. San Jose, South Dakota 83475</td>
                  </tr>
                  <tr className="border-t hover:bg-gray-50 transition">
                    <td className="p-3 whitespace-nowrap">20 Nov 2023</td>
                    <td className="p-3 whitespace-nowrap">2:30 PM</td>
                    <td className="p-3 max-md:hidden">The sender is preparing the goods</td>
                    <td className="p-3">2715 Ash Dr. San Jose, South Dakota 83475</td>
                  </tr>
                  <tr className="border-t hover:bg-gray-50 transition">
                    <td className="p-3 whitespace-nowrap">20 Nov 2023</td>
                    <td className="p-3 whitespace-nowrap">2:30 PM</td>
                    <td className="p-3 max-md:hidden">The sender is preparing the goods</td>
                    <td className="p-3">2715 Ash Dr. San Jose, South Dakota 83475</td>
                  </tr>
                  <tr className="border-t hover:bg-gray-50 transition">
                    <td className="p-3 whitespace-nowrap">20 Nov 2023</td>
                    <td className="p-3 whitespace-nowrap">2:30 PM</td>
                    <td className="p-3 max-md:hidden">The sender is preparing the goods</td>
                    <td className="p-3 text-wrap">2715 Ash Dr. San Jose, South Dakota 83475</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>


        </div>
      </div>
    </div>
  )
}

export default Order_Traking







