import React, { useState } from 'react'
import { ToastContainer, toast } from "react-toastify";
import User_side_menu from '../Componenet/user_side_menu'
import EmployList from '../Componenet/EmployList'
import SubHeader from '../Componenet/sub_header'
import MiniAreaChart from '../Componenet/Chart';
import AreaChart from '../Componenet/ResentChart';
import Meen from '../assets/meen.png'
import DoubleColumnChart from '../Componenet/ColumnChart';
import { Link, useNavigate } from 'react-router-dom';
import { useGetCategoriesQuery, useGetOrderQuery, useGetProductQuery, useGetTop_productQuery, useGetUserQuery } from '../services/apiSlice';

const Dashboard = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenside, setIsOpenside] = useState(false);

    const { data: product } = useGetTop_productQuery()
    const { data: category } = useGetCategoriesQuery()
    const { data: order } = useGetOrderQuery()
    const { data: user } = useGetUserQuery()


const navigate = useNavigate()

    return (
        <div>
            <ToastContainer
                position="top-center"
                autoClose={1500}
            />
            <User_side_menu setIsOpen={setIsOpen} isOpenside={isOpenside} />
            <div className='flex inter'>
                <EmployList isOpen={isOpen} setIsOpen={setIsOpen} />
                <div className="w-full width__right relative max-md:ms-0 max-3xl:max-w-[1150px]">
                    <SubHeader setIsOpenside={setIsOpenside} pageName={"Dashboard"} />
                    <div className="flex justify-between gap-[10px] mb-[27px] flex-wrap items-center max-sm:block" >
                        <h3 className="text-[24px] font-[700]"> DashBoard</h3>
                        {/* <div className="flex justify-end items-center  " >
                            <div className="flex gap-[20px]">
                                <button id="" onClick={() => openModal('modal1')} className="  shadow-[0px_8px_20px_1px_#3DB0F733]  text-white text-[14px] font-medium h-[35px] sm:h-[40px] sm:px-[20px] px-[12px] flex items-center justify-center gap-2 rounded-[7px] bg-primary">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 11 11" fill="none">
                                        <path d="M10.5938 5.33984H6.16406V0.910156C6.16406 0.683627 5.98044 0.5 5.75391 0.5C5.52738 0.5 5.34375 0.683627 5.34375 0.910156V5.33984H0.914062C0.687533 5.33984 0.503906 5.52347 0.503906 5.75C0.503906 5.97653 0.687533 6.16016 0.914062 6.16016H5.34375V10.5898C5.34375 10.8164 5.52738 11 5.75391 11C5.98044 11 6.16406 10.8164 6.16406 10.5898C6.16406 8.85994 6.16406 7.89006 6.16406 6.16016H10.5938C10.8203 6.16016 11.0039 5.97653 11.0039 5.75C11.0039 5.52347 10.8203 5.33984 10.5938 5.33984Z" fill="currentColor" />
                                    </svg>   Add Category
                                </button>
                            </div>
                        </div> */}
                    </div>

                    <div>
                        <div className='grid grid-cols-4  max-2xl:grid-cols-2 max-sm:grid-cols-1 gap-4 mt-5 '>
                            <div className="border  bg-white border-[#EBE9F1] shadow-[0px_4px_24px_0px_#0000000F] p-[24px]  max-sm:p-[10px] rounded-[10px] overflow-hidden    ">
                                <div className="flex justify-between items-center">
                                    <div className='flex gap-[14px]'>
                                        <div className="relative flex items-center justify-center w-[48px] h-[52px] max-sm:w-[32px] max-sm:h-[36px]">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 48 52"
                                                fill="none"
                                                className="absolute w-full h-full" >
                                                <path
                                                    d="M19.1094 2.12943C22.2034 0.343099 26.0154 0.343099 29.1094 2.12943L42.4921 9.85592C45.5861 11.6423 47.4921 14.9435 47.4921 18.5162V33.9692C47.4921 37.5418 45.5861 40.8431 42.4921 42.6294L29.1094 50.3559C26.0154 52.1423 22.2034 52.1423 19.1094 50.3559L5.72669 42.6294C2.63268 40.8431 0.726688 37.5418 0.726688 33.9692V18.5162C0.726688 14.9435 2.63268 11.6423 5.72669 9.85592L19.1094 2.12943Z"
                                                    fill="#22C55E"
                                                />
                                            </svg>
                                            <i className="fa-solid fa-bag-shopping text-white text-[20px] max-sm:text-[16px] z-10"></i>
                                        </div>
                                        <div>
                                            <span className='text-[14px] text-[#575864] font-[400] lending-[20px]'>Total Product</span>
                                            <h4 className='text-[22px] font-[700]'>{product?.data?.length}</h4>
                                        </div>
                                    </div>
                                    <div className='flex gap-2'>
                                        {/* <div >
                                            <i className="fa-solid fa-arrow-right -rotate-45" style={{ color: "#22C55E" }}></i>
                                        </div>
                                         <span className='text-[14px] font-[700] text-[#575864]'>1.56%</span> */}
                                    </div>
                                </div>
                                <div className="wrap-chart">
                                    <MiniAreaChart color="#22C55E" gradientTo="#91E2AF" />
                                </div>
                            </div>
                            <div className="border  bg-white border-[#EBE9F1] shadow-[0px_4px_24px_0px_#0000000F] p-[24px]  max-sm:p-[10px] rounded-[10px] overflow-hidden">
                                <div className="flex justify-between items-center">
                                    <div className='flex gap-[14px]'>
                                        <div className="relative flex items-center justify-center w-[48px] h-[52px] max-sm:w-[32px] max-sm:h-[36px]">

                                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="52" viewBox="0 0 48 52" fill="none" className="absolute w-full h-full"><path d="M19.1094 2.12943C22.2034 0.343099 26.0154 0.343099 29.1094 2.12943L42.4921 9.85592C45.5861 11.6423 47.4921 14.9435 47.4921 18.5162V33.9692C47.4921 37.5418 45.5861 40.8431 42.4921 42.6294L29.1094 50.3559C26.0154 52.1423 22.2034 52.1423 19.1094 50.3559L5.72669 42.6294C2.63268 40.8431 0.726688 37.5418 0.726688 33.9692V18.5162C0.726688 14.9435 2.63268 11.6423 5.72669 9.85592L19.1094 2.12943Z" fill="#FF5200"></path></svg>
                                            <i className="fa-solid fa-dollar-sign text-white text-[20px] max-sm:text-[16px] z-10"></i>
                                        </div>
                                        <div>
                                            <span className='text-[14px] text-[#575864] font-[400] lending-[20px]'>Total Order</span>
                                            <h4 className='text-[22px] font-[700]'>{order?.data?.length}</h4>
                                        </div>
                                    </div>
                                    <div className='flex gap-2'>
                                        {/* <div >
                                            <i className="fa-solid fa-arrow-right -rotate-45" style={{ color: "#FF5200" }}></i>
                                        </div>
                                        <span className='text-[14px] font-[700] text-[#575864]'>1.56%</span> */}
                                    </div>
                                </div>
                                <div className="wrap-chart">
                                    <MiniAreaChart color="#FF5200" gradientTo="#FFB088" />
                                </div>
                            </div>
                            <div className="border  bg-white border-[#EBE9F1] shadow-[0px_4px_24px_0px_#0000000F] p-[24px]  max-sm:p-[10px] rounded-[10px] overflow-hidden">
                                <div className="flex justify-between items-center">
                                    <div className='flex gap-[14px]'>
                                        <div className="relative flex items-center justify-center w-[48px] h-[52px] max-sm:w-[32px] max-sm:h-[36px]">

                                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="52" viewBox="0 0 48 52" fill="none" className="absolute w-full h-full"><path d="M19.1094 2.12943C22.2034 0.343099 26.0154 0.343099 29.1094 2.12943L42.4921 9.85592C45.5861 11.6423 47.4921 14.9435 47.4921 18.5162V33.9692C47.4921 37.5418 45.5861 40.8431 42.4921 42.6294L29.1094 50.3559C26.0154 52.1423 22.2034 52.1423 19.1094 50.3559L5.72669 42.6294C2.63268 40.8431 0.726688 37.5418 0.726688 33.9692V18.5162C0.726688 14.9435 2.63268 11.6423 5.72669 9.85592L19.1094 2.12943Z" fill="#CBD5E1"></path></svg>
                                            <i className="fa-regular fa-file  text-white text-[20px] max-sm:text-[16px] z-10"></i>
                                        </div>
                                        <div>
                                            <span className='text-[14px] text-[#575864] font-[400] lending-[20px]'>Category</span>
                                            <h4 className='text-[22px] font-[700]'>{category?.data?.length}</h4>
                                        </div>
                                    </div>
                                    <div className='flex gap-2'>
                                        {/* <div>
                                            <i className="fa-solid fa-arrow-right rotate-45" style={{ color: "#CBD5E1" }}></i>
                                        </div>
                                        <span className="text-[14px] font-[700] text-[#575864]">1.56%</span> */}
                                    </div>


                                </div>
                                <div className="wrap-chart">
                                    <MiniAreaChart color="#CBD5E1" gradientTo="#E2E8F0" />
                                </div>
                            </div>
                            <div className="border  bg-white border-[#EBE9F1] shadow-[0px_4px_24px_0px_#0000000F] p-[24px]  max-sm:p-[10px] rounded-[10px] overflow-hidden">
                                <div className="flex justify-between items-center">
                                    <div className='flex gap-[14px]'>
                                        <div className="relative flex items-center justify-center w-[48px] h-[52px] max-sm:w-[32px] max-sm:h-[36px]">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="52" viewBox="0 0 48 52" fill="none" className="absolute w-full h-full"><path d="M19.1094 2.12943C22.2034 0.343099 26.0154 0.343099 29.1094 2.12943L42.4921 9.85592C45.5861 11.6423 47.4921 14.9435 47.4921 18.5162V33.9692C47.4921 37.5418 45.5861 40.8431 42.4921 42.6294L29.1094 50.3559C26.0154 52.1423 22.2034 52.1423 19.1094 50.3559L5.72669 42.6294C2.63268 40.8431 0.726688 37.5418 0.726688 33.9692V18.5162C0.726688 14.9435 2.63268 11.6423 5.72669 9.85592L19.1094 2.12943Z" fill="#2377FC"></path></svg>
                                            <i className="fa-solid fa-users  text-white text-[20px] max-sm:text-[16px] z-10"></i>
                                        </div>
                                        <div>
                                            <span className='text-[14px] text-[#575864] font-[400] lending-[20px]'>Total Users    </span>
                                            <h4 className='text-[22px] font-[700]'>{user?.data?.length}</h4>
                                        </div>
                                    </div>
                                    <div className='flex gap-2'>
                                        {/* <div >
                                            <i className="fa-solid fa-arrow-right -rotate-45" style={{ color: "#2377FC" }}></i>
                                        </div>
                                        <span className='text-[14px] font-[700] text-[#575864]'>1.56%</span> */}
                                    </div>
                                </div>
                                <div className="wrap-chart">
                                    <MiniAreaChart color="#2377FC" gradientTo="#9BC3FF" />
                                </div>
                            </div>
                        </div>

                        <div className='grid grid-cols-3 max-2xl:grid-cols-2 max-lg:grid-cols-1 gap-[20px] flex-wrap'>

                            <div className="w-full  border mt-[20px] bg-white border-[#EBE9F1] shadow-[0px_4px_24px_0px_#0000000F] p-[24px] max-sm:p-[10px] rounded-[10px] min-w-[50] overflow-hidden">
                                <div className="text-[15px] font-bold mb-[15px] max-sm:mb-[10px]">
                                    <h5>Recent Order</h5>
                                </div>
                                <div className=''>
                                    <AreaChart /> {/* Make sure AreaChart has height/width defined inside */}
                                </div>
                            </div>



                            <div className="w-full  border mt-[20px] bg-white border-[#EBE9F1] shadow-[0px_4px_24px_0px_#0000000F] p-[24px] max-sm:p-[15px] rounded-[10px]">
                                <div className='flex justify-between items-center mb-[15px] max-sm:mb-0'>
                                    <div className="text-[15px] font-bold max-sm:mb-[10px]">
                                        <h5>Top Product</h5>
                                    </div>
                                    <div onClick={() => {
                                        navigate('/product')
                                    }} className='text-[12px] font-[400] text-[#95989d] cursor-pointer hover:underline'>
                                        View all
                                    </div>
                                </div>

                                {/* Scrollable content */}
                                <div className="overflow-x-auto none__apee_scrol">
                                    <table className="min-w-[450px]  max-md:min-w-[300px] w-full text-left divide-y divide-[#d4cdf0]">
                                        <thead className="bg-[#f9f9f9] h-[40px] max-md:h-[35px]">
                                            <tr>
                                                <th className="px-4 py-2 max-2xl:py-0  max-md:px-1 text-[14px] font-semibold text-[#333] max-md:text-[12px]">Product</th>
                                                <th className="px-4 py-2 max-2xl:py-0  max-md:px-1 text-[14px] font-semibold text-[#333] max-md:text-[12px] text-center">Total</th>
                                            </tr>


                                        </thead>
                                        <tbody>
                                            {product?.data?.slice(0, 4).map((val, index) => (
                                                <tr key={index} className="">
                                                    <td className="pe-4 py-4  max-md:pe-1 max-md:py-2">
                                                        <div className="flex items-center gap-2 max-sm:gap-1">
                                                            {/* <img
                                                                src={import.meta.env.VITE_API_BASE_URL + val.product_img}
                                                                alt="product"
                                                                className="h-[40px] w-[40px] rounded-full object-cover"
                                                            /> */}
                                                            <div>
                                                                <h4 className="text-[14px] font-[600] max-md:text-[11px]">{val.name}</h4>
                                                                {/* <span className="text-[12px] text-[#595858] max-md:text-[9px] block">73 Purchases</span> */}
                                                            </div>
                                                        </div>
                                                    </td>

                                                    <td className="px-4 py-3 text-left  max-md:px-1  max-md:py-2">
                                                        <span className="text-[12px] text-[#595858] max-md:text-[9px] block text-center">₹{val.total_price}</span>
                                                    </td>

                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                            </div>
                            <div className="w-full  border mt-[20px] bg-white border-[#EBE9F1] shadow-[0px_4px_24px_0px_#0000000F] p-[24px] max-sm:p-[15px] rounded-[10px]">
                                <div className='flex justify-between items-center mb-[15px] max-sm:mb-0'>
                                    <div className="text-[15px] font-bold max-sm:mb-[10px]">
                                        <h5>Shop Users</h5>
                                    </div>
                                    <div  onClick={() => {
                                        navigate('/user')
                                    }} className='text-[12px] font-[400] text-[#95989d] cursor-pointer hover:underline'>
                                        View all
                                    </div>
                                </div>

                                {/* Scrollable content */}
                                <div className="overflow-x-auto none__apee_scrol">
                                    <table className="min-w-[450px]  max-md:min-w-[300px] w-full text-left divide-y divide-[#d4cdf0]">
                                        <thead className="bg-[#f9f9f9] h-[40px] max-md:h-[35px]">
                                            <tr>
                                                <th className="px-4 py-2 max-2xl:py-0  max-md:px-1 text-[14px] font-semibold text-[#333] max-md:text-[12px]">User</th>
                                                <th className="px-4 py-2 max-2xl:py-0  max-md:px-1 text-[14px] font-semibold text-[#333] max-md:text-[12px]">Email</th>
                                                <th className="px-4 py-2 max-2xl:py-0  max-md:px-1 text-[14px] font-semibold text-[#333] max-md:text-[12px]">Mobile No</th>
                                            </tr>


                                        </thead>
                                        <tbody>
                                            {user?.data?.slice(0, 4).map((val, index) => (
                                                <tr key={index} className="">
                                                    <td className="pe-4 py-3  max-md:pe-1 max-md:py-2">
                                                        <div className="flex items-center gap-2 max-sm:gap-1">
                                                            <img
                                                                src={import.meta.env.VITE_API_BASE_URL + val.profile_picture}
                                                                alt="product"
                                                                className="h-[40px] w-[40px] rounded-full object-cover"
                                                            />
                                                            <div>
                                                                <h4 className="text-[14px] font-[600] max-md:text-[11px]">{val.username}</h4>
                                                                {/* <span className="text-[12px] text-[#595858] max-md:text-[9px] block">73 Purchases</span> */}
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-3 text-left max-md:px-1  max-md:py-2">
                                                        <span className="text-[14px] font-[500] max-md:text-[11px]">{val.email}</span>
                                                    </td>

                                                    <td className="px-4 py-3 text-left  max-md:px-1  max-md:py-2">
                                                        <span className="text-[14px] font-[500] max-md:text-[11px]">{val.mobile_no}</span>
                                                    </td>


                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                            </div>



                            <div className="w-full  border  bg-white border-[#EBE9F1] shadow-[0px_4px_24px_0px_#0000000F] p-[24px] max-sm:p-[15px] rounded-[10px]">
                                <div className='flex justify-between items-center mb-[15px] max-sm:mb-0'>
                                    <div className="text-[15px] font-bold max-sm:mb-[10px]">
                                        <h5>Orders</h5>
                                    </div>
                                    <Link to="/order">
                                        <div className='text-[12px] font-[400] text-[#95989d] cursor-pointer hover:underline'>
                                            View all
                                        </div>

                                    </Link>
                                </div>

                                {/* Scrollable content */}
                                <div className="overflow-x-auto none__apee_scrol">
                                    <table className="min-w-[450px] max-md:min-w-[300px] w-full text-left divide-y divide-[#d4cdf0]">


                                        <thead className="bg-[#f9f9f9] h-[40px]">
                                            <tr>
                                                <th className="px-4 py-2 text-[14px] font-semibold text-[#333] max-md:text-[12px] max-md:px-1  max-2xl:py-0">Order Id</th>
                                                <th className="px-4 py-2 text-[14px] font-semibold text-[#333] max-md:text-[12px] max-md:px-1  max-2xl:py-0">Items</th>
                                                <th className="px-4 py-2 text-[14px]  text-center font-semibold text-[#333] max-md:text-[12px] max-md:px-1  max-2xl:py-0">Status</th>
                                                <th className="px-4 py-2 text-[14px] font-semibold text-[#333] max-md:text-[12px] max-md:px-1  max-2xl:py-0">Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {order?.data?.slice(0, 5).map((val, index) => (
                                                <tr key={index} className="">
                                                    <td className="px-4 py-3 max-md:pe-1 max-md:py-2">
                                                        <span className="text-[14px] font-[500] max-sm:text-[11px] ">{val.order_id}</span>
                                                    </td>
                                                    <td className="px-4 py-3 text-left   max-md:px-1  max-md:py-2">
                                                        <span className="text-[14px] font-[500] max-sm:text-[11px] ">{val.order_items.length}</span>
                                                    </td>
                                                    <td className="px-4 py-3 text-center   max-md:px-1  max-md:py-2">
                                                        {/* <span className="text-[14px] font-[500] max-sm:text-[11px] ">{val.status}</span> */}
                                                        <button
                                                            className={`w-[80px] mx-4 py-1 text-[12px] rounded-[400px] ${val?.status
                                                                ? "bg-[rg   a(69%,82%,96%,0.1)] shadow-[0_0_5px_rgba(61,176,247,0.5)_inset] text-primary"
                                                                : "text-[rgba(255,21,76,1)] bg-[rgba(255,21,76,0.1)] shadow-[0_0_5px_rgba(255,20,75,0.5)_inset]"
                                                                }`}
                                                        >
                                                            {val?.status ? "Pending" : "Complete"}
                                                        </button>
                                                    </td>

                                                    <td className="px-4 py-3 text-left   max-md:px-1  max-md:py-2">
                                                        <span className="text-[14px] font-[500] max-sm:text-[11px]">{val.total_amount}</span>
                                                    </td>


                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                            </div>

                            <div className="w-full  border  bg-white border-[#EBE9F1] shadow-[0px_4px_24px_0px_#0000000F] p-[24px] max-sm:p-[20px] rounded-[10px]">
                                <div className='flex justify-between items-center mb-[15px] max-sm:mb-0'>
                                    <div className="text-[15px] font-bold max-sm:mb-[10px]">
                                        <h5>Earnings</h5>
                                    </div>
                                    <div onClick={() => {
                                        navigate('/appoinment')
                                    }} className='text-[12px] font-[400] text-[#95989d] cursor-pointer hover:underline'>
                                        View all
                                    </div>
                                </div>

                                {/* Scrollable content */}
                                <div className="wrap-chart">
                                    <DoubleColumnChart />
                                </div>

                            </div>


                            <div className="w-full  border  bg-white border-[#EBE9F1] shadow-[0px_4px_24px_0px_#0000000F] p-[24px] max-sm:p-[15px] rounded-[10px]">
                                <div className='flex justify-between items-center mb-[15px] max-sm:mb-0'>
                                    <div className="text-[15px] font-bold max-sm:mb-[10px]">
                                        <h5>Category</h5>
                                    </div>
                                    <Link to="/category">
                                        <div className='text-[12px] font-[400] text-[#95989d] cursor-pointer hover:underline'>
                                            View all
                                        </div>

                                    </Link>
                                </div>

                                {/* Scrollable content */}
                                <div className="overflow-x-auto none__apee_scrol">
                                    <table className="min-w-[450px]  max-md:min-w-[300px] w-full text-left divide-y divide-[#d4cdf0]">
                                        <thead className="bg-[#f9f9f9] h-[40px] max-md:h-[35px]">
                                            <tr>
                                                <th className="px-4 py-2 max-2xl:py-0  max-md:px-1 text-[14px] font-semibold text-[#333] max-md:text-[12px]">Category</th>
                                                <th className="px-4 py-2 max-2xl:py-0  max-md:px-1 text-[14px] font-semibold text-[#333] max-md:text-[12px]">Type</th>
                                                <th className="px-4 py-2 max-2xl:py-0  max-md:px-1 text-[14px] text-center font-semibold text-[#333] max-md:text-[12px]">Status</th>
                                            </tr>


                                        </thead>
                                        <tbody>
                                            {category?.data?.slice(0, 4).map((val, index) => (
                                                <tr key={index} className="">
                                                    <td className="pe-4 py-3  max-md:pe-1 max-md:py-2">
                                                        <div className="flex items-center gap-2 max-sm:gap-1">
                                                            <img
                                                                src={import.meta.env.VITE_API_BASE_URL + val.category_img}
                                                                alt="product"
                                                                className="h-[40px] w-[40px] rounded-full object-cover"
                                                            />
                                                            <div>
                                                                <h4 className="text-[14px] font-[600] max-md:text-[11px]">{val.name}</h4>
                                                                {/* <span className="text-[12px] text-[#595858] max-md:text-[9px] block">73 Purchases</span> */}
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-3 text-left max-md:px-1  max-md:py-2">
                                                        <span className="text-[14px] font-[500] max-md:text-[11px]">{val.category_type}</span>
                                                    </td>

                                                    <td className="px-4 py-3 text-center  max-md:px-1  max-md:py-2">
                                                        <button
                                                            className={`w-[80px] mx-4 py-1 text-[12px] rounded-[400px] ${val?.is_active
                                                                ? "bg-[rg   a(69%,82%,96%,0.1)] shadow-[0_0_5px_rgba(61,176,247,0.5)_inset] text-primary"
                                                                : "text-[rgba(255,21,76,1)] bg-[rgba(255,21,76,0.1)] shadow-[0_0_5px_rgba(255,20,75,0.5)_inset]"
                                                                }`}
                                                        >
                                                            {val?.is_active ? "Active" : "Inactive"}
                                                        </button>
                                                    </td>


                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                            </div>


                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
