import React, { useEffect, useState, useRef } from "react";
import User_side_menu from '../Componenet/user_side_menu'
import EmployList from '../Componenet/EmployList'
import SubHeader from '../Componenet/sub_header'
import { ToastContainer, toast } from "react-toastify";
import { useGetUserQuery } from "../services/apiSlice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import svg_file from '../assets/file_not.svg'
import svg_fil1e from '../assets/Group.png'

const User = () => {

    const navigate = useNavigate()


    const { data: user, isLoading } = useGetUserQuery();
    const users = user?.data || [];

    const data = Array.isArray(users) ? users : users ? [users] : [];
    console.log(data);


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
    const totalPages = Math.ceil((data?.length || 0) / itemsPerPage);
    // const displayedData = data ? data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage) : [];



    const filteredData = data.filter(item =>
        item.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.last_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.mobile_no?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    console.log(filteredData);




    const displayedData = filteredData?.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    console.log(displayedData);


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
                <div className="w-full width__right relative max-md:ms-0">
                    <SubHeader setIsOpenside={setIsOpenside} pageName={"User"} />
                    <div className="flex justify-between gap-[10px] mb-[27px] flex-wrap items-center max-sm:block"  >
                        <h3 className="text-[24px] font-[700]"> User</h3>
                        <nav className="text-sm text-gray-600 max-sm:mt-[15px] max-sm:ps-[5px]" aria-label="Breadcrumb" >
                            <ol className="flex flex-wrap items-center ">

                                <li className="flex items-center">
                                    <Link to="/dashboard" className="hover:text-primary transition-colors font-[12px] text-[#575864]">Dashboard</Link>
                                    <svg className="mx-2 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path d="M9 5l7 7-7 7" />
                                    </svg>
                                </li>
                                <li className="text-primary font-medium text-[12px]">All User</li>
                            </ol>
                        </nav>


                    </div>

                    <div className="border mt-[30px] bg-white border-[#EBE9F1] shadow-[0px_4px_24px_0px_#0000000F]  rounded-[10px]">
                        <div className="p-[20px] flex gap-4 justify-between max-sm:flex-col">
                            {/* Left Section */}
                            <div className="flex gap-3 max-sm:order-2 ">
                                {/* Entries Selector */}
                                <div className="flex items-center gap-2 max-lg:hidden">
                                    <span className="text-[#95989d] text-[12px]">Showing</span>
                                    <select
                                        onChange={handleItemChange}
                                        value={itemsPerPage}
                                        className="border-[#dce7f2] text-[#5E5873] rounded-[6px] text-sm border h-[35px] ps-[5px] pe-[10px]"
                                    >
                                        <option value="10">10</option>
                                        <option value="15">15</option>
                                        <option value="20">20</option>
                                        <option value="30">30</option>
                                    </select>
                                    <span className="text-[#95989d] text-[12px]">Entries</span>
                                </div>

                                {/* Search Field */}
                                <div className=" w-[458px] max-xl:w-[350px] max-sm:w-[100%]">
                                    <fieldset className="relative border border-[#dce7f2] text-[#5E5873] rounded-[6px] h-[40px] mt-2 max-lg:mt-0">
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



                        </div>
                        <div className="min-h-[65vh]">

                            <table className="w-full ">
                                <thead className="">
                                    <tr className="table-flex items-center h-[40px] sm:h-[54px] ">
                                        <th className="text-start px-[30px] text-[14px] font-[700]   max-md:px-[20px] max-md:text-[13px]">User</th>
                                        <th className="text-[14px] font-[700] text-center   max-md:text-[12px] max-sm:px-[5px] max-sm:hidden ">Phone</th>
                                        <th className="text-[14px] font-[700] text-center max-lg:hidden max-md:text-[12px] max-sm:px-[5px]">Email</th>
                                        <th className="text-[14px] font-[700] text-center  max-sm:hidden  max-md:text-[12px] max-sm:px-[5px]">Acion </th>
                                    </tr>
                                </thead>
                                <tbody className="last_tr">


                                    {/* <tr className="h-[58px] max-sm:h-[44px] bg-[#FAFAFC] border-b border-b-[#EBE9F1]">
                                        <td className="flex gap-4 items-center py-[12px] ps-[30px] max-md:ps-[10px] max-sm:w-[200px]">
                                            <div className="rounded-[5px] h-[50px] w-[50px] overflow-hidden bg-gray-100">
                                                <img
                                                    src={Meen}
                                                    alt="User"
                                                    className="h-full w-full object-cover"
                                                />
                                            </div>
                                            <div>
                                                <h5 className="text-[14px] font-medium ">Kristin Watson</h5>
                                                <span className="text-[12px] text-[#85828f]">Product name</span>
                                            </div>
                                        </td>

                                        <td className="text-sm text-[#5E5873] px-[30px] text-center">1234567890</td>
                                        <td className="text-sm text-[#5E5873] text-center">kristin@gmail.com</td>

                                        <td className="text-sm px-[50px] dropdown-container">
                                            <div className="flex gap-2 justify-center">
                                                <button
                                                    className="p-2 hover:bg-blue-100 rounded-full transition-all duration-200"
                                                    aria-label="Edit user"
                                                    title="Edit"
                                                >
                                                    <i className="fa-regular fa-pen-to-square text-blue-400 text-lg"></i>
                                                </button>
                                                <button
                                                    className="p-2 hover:bg-red-100 rounded-full transition-all duration-200"
                                                    aria-label="Delete user"
                                                    title="Delete"
                                                >
                                                    <i className="fa-regular fa-trash-can text-[#F87171] text-lg"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr> */} {displayedData?.length > 0 ? (
                                        displayedData?.map((user, index) => (
                                            <tr onClick={() => {
                                                navigate(`/address`, {
                                                    state: { username: user.username }
                                                });
                                            }}
                                                key={user.username || index}
                                                className={`h-[44px] sm:h-[58px] transition-all duration-200 ${index % 2 === 0 ? 'bg-[#eef3f9cc] hover:bg-[rgba(35,119,252,.1)]' : 'bg-white hover:bg-[#eef3f9cc]'}`}
                                            >
                                                <td className="flex gap-4 items-center py-[12px] ps-[30px] max-md:ps-[10px] max-sm:w-[100%]">
                                                    <div className="rounded-[5px] h-[50px] w-[50px] overflow-hidden bg-gray-100">
                                                        <img
                                                            src={
                                                                user?.profile_picture && user?.profile_picture != '/media/default.jpg'
                                                                    ? `${import.meta.env.VITE_API_BASE_URL}${user.profile_picture}`
                                                                    : svg_fil1e // fallback image in public folder
                                                            }
                                                            alt={`${user.first_name} ${user.last_name}`}
                                                            className="h-full rounded-full w-full object-cover"
                                                        />

                                                    </div>
                                                    <div>
                                                        <h5 className="text-[14px] font-medium max-sm:text-[13px]">{`${user.first_name} ${user.last_name}`}</h5>
                                                        <span className="text-[12px] text-[#85828f] max-sm:text-[11px]">Username: {user.username}</span>
                                                    </div>
                                                </td>

                                                <td className="text-sm text-[#5E5873] px-[30px] text-center max-sm:hidden ">{user.mobile_no}</td>
                                                <td className="text-sm text-[#5E5873] text-center  max-lg:hidden ">{user.email}</td>

                                                <td className="text-sm px-[50px] dropdown-container max-sm:hidden ">
                                                    <div className="flex gap-2 justify-center">
                                                        <button onClick={() => {
                                                            navigate(`/address`, {
                                                                state: { username: user.username }
                                                            });
                                                        }}
                                                            className="p-2 hover:bg-[rgba(35,119,252,0.1)] rounded-full transition-all duration-200"
                                                            aria-label="Edit user"
                                                            title="Edit"
                                                        >
                                                            <i className="fa-regular fa-eye text-[#2377fc] text-lg"></i>
                                                        </button>
                                                        {/* <button
                                                        className="p-2 hover:bg-red-100 rounded-full transition-all duration-200"
                                                        aria-label="Delete user"
                                                        title="Delete"
                                                    >
                                                        <i className="fa-regular fa-trash-can text-[#F87171] text-lg"></i>
                                                    </button> */}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        isLoading ? (
                                            <tr>
                                                <td colSpan="7" className="text-center py-8 text-sm text-[#5E5873]">
                                                    Loading...
                                                </td>
                                            </tr>
                                        ) : (
                                            <tr className="h-[50vh]">
                                                <td colSpan="7" className="text-center text-sm text-[#5E5873] py-4">
                                                    <img src={svg_file} className="mx-auto block" alt="No data" />
                                                </td>
                                            </tr>
                                        )
                                    )}

                                </tbody>
                            </table>

                        </div>
                        {data?.length > itemsPerPage && (
                            <div className="flex align-items-center my-[20px] justify-end mx-[30px]">
                                {/* Previous Page */}
                                <button
                                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                    className={`w-[32px] md:w-[38px] h-[32px] md:h-[38px] bg-[#D3ECFB] rounded-full flex items-center justify-center ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                                        }`}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                        <path d="M14.3465 15.7965C14.7085 16.1584 14.7085 16.7013 14.3465 17.0632C14.1656 17.2442 13.9846 17.3346 13.7132 17.3346C13.4418 17.3346 13.2608 17.2442 13.0799 17.0632L7.65131 11.6346C7.28941 11.2727 7.28941 10.7299 7.65131 10.368L13.0799 4.9394C13.4418 4.57749 13.9846 4.57749 14.3465 4.9394C14.7085 5.3013 14.7085 5.84416 14.3465 6.20606L9.55131 11.0013L14.3465 15.7965Z" fill="black" />

                                        {/* Removed maskType="luminance" */}
                                        <mask id="mask0_514_1023" maskUnits="userSpaceOnUse" x="7" y="4" width="8" height="14">
                                            <path d="M14.3465 15.7965C14.7085 16.1584 14.7085 16.7013 14.3465 17.0632C14.1656 17.2442 13.9846 17.3346 13.7132 17.3346C13.4418 17.3346 13.2608 17.2442 13.0799 17.0632L7.65131 11.6346C7.28941 11.2727 7.28941 10.7299 7.65131 10.368L13.0799 4.9394C13.4418 4.57749 13.9846 4.57749 14.3465 4.9394C14.7085 5.3013 14.7085 5.84416 14.3465 6.20606L9.55131 11.0013L14.3465 15.7965Z" fill="white" />
                                        </mask>


                                        <g mask="url(#mask0_514_1023)">
                                            <rect x="0.142578" y="0.142578" width="21.7143" height="21.7143" fill="#9CA3AF" />
                                        </g>
                                    </svg>

                                </button>

                                {/* Page Numbers */}
                                <ul className="flex pagination h-[32px] md:h-[38px] mx-[7px]">
                                      <ul className="flex pagination h-[32px] md:h-[38px] mx-[7px]">
                                        {Array.from({ length: totalPages }, (_, i) => i + 1)
                                            .filter(page =>
                                                page === 1 ||
                                                page === totalPages ||
                                                (page >= currentPage - 1 && page <= currentPage + 1)
                                            )
                                            .reduce((acc, page, idx, arr) => {
                                                if (idx > 0 && page - arr[idx - 1] > 1) {
                                                    acc.push('ellipsis');
                                                }
                                                acc.push(page);
                                                return acc;
                                            }, [])
                                            .map((item, index) => (
                                                item === 'ellipsis' ? (
                                                    <li
                                                        key={`ellipsis-${index}`}
                                                        className="h-[32px] md:h-[38px] w-[32px] md:w-[38px] flex items-center justify-center monst font-semibold text-[16px] md:text-[19px] text-gray-500 select-none"
                                                    >
                                                        ...
                                                    </li>
                                                ) : (
                                                    <li
                                                        key={item}
                                                        onClick={() => setCurrentPage(item)}
                                                        className={`h-[32px] md:h-[38px] w-[32px] md:w-[38px] flex items-center justify-center monst font-semibold text-[16px] md:text-[19px] ${currentPage === item ? " active text-white" : "cursor-pointer"
                                                    }`}
                                                            
                                                    >
                                                        {item}
                                                    </li>
                                                )
                                            ))}
                                    </ul>
                                </ul>

                                {/* Next Page */}
                                <button
                                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                    disabled={currentPage === totalPages}
                                    className={`w-[32px] md:w-[38px] h-[32px] md:h-[38px] bg-[#D3ECFB] rounded-full flex items-center justify-center ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
                                        }`}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="23" height="22" viewBox="0 0 23 22" fill="none">
                                        <path d="M15.0487 11.6346L9.62013 17.0632C9.43917 17.2442 9.25822 17.3346 8.98679 17.3346C8.71536 17.3346 8.53441 17.2442 8.35346 17.0632C7.99156 16.7013 7.99156 16.1584 8.35346 15.7965L13.1487 11.0013L8.35346 6.20606C7.99156 5.84416 7.99156 5.3013 8.35346 4.9394C8.71536 4.57749 9.25822 4.57749 9.62013 4.9394L15.0487 10.368C15.4106 10.7299 15.4106 11.2727 15.0487 11.6346Z" fill="black" />

                                        {/* Removed maskType="luminance" */}
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
                    </div>
                </div>
            </div>
        </div>
    )
}

export default User





