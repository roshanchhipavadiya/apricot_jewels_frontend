import React, { useEffect, useState, useRef } from "react";
import User_side_menu from '../Componenet/user_side_menu'
import EmployList from '../Componenet/EmployList'
import SubHeader from '../Componenet/sub_header'
import Dropdown from '../Componenet/dropdown'
import { ToastContainer, toast } from "react-toastify";
import { useGetCategoriesQuery, useAddCategoryMutation, useEditCategoryMutation, useDeleteCategoryMutation, useGetProfileQuery, useGetAppoinmentQuery } from "../services/apiSlice";
import { Link, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import svg_file from '../assets/file_not.svg'

const Category = () => {
    const [modal, setModal] = useState(null);
    const [category, setCategory] = useState({
        name: "",
        description: "",
        is_active: "",
        is_home: "",
        category_type: "",
        category_img: "",
        category_id: ""
    });

    const [selectedDate, setSelectedDate] = useState(null);
    const formattedDate = selectedDate
        ? selectedDate.toISOString().split('T')[0]
        : '';



    const navigate = useNavigate()

    const { data: cate } = useGetCategoriesQuery()
    const [deleteCategoryId, setDeleteCategoryId] = useState(null);
    const [openDropdown, setOpenDropdown] = useState(null);
    const dropdownRefs = useRef([]);

    // ✅ Fetch categories using RTK Query
    const { data: categories, error, isLoading } = useGetAppoinmentQuery(formattedDate);
    const [addCategory] = useAddCategoryMutation();
    const [editCategory] = useEditCategoryMutation();
    const [deleteCategory] = useDeleteCategoryMutation();
    const data = categories?.data || [];
  



    // ✅ Open & Close Modal
    const openModal = (modalId) => setModal(modalId);
    const closeModal = () => setModal(null);

    // ✅ Handle Add Category



    // ✅ Handle Edit Category


    const [deletcategory, setDeletcategory] = useState(null);
    // ✅ Handle Delete Category

    // ✅ Dropdown Handling
    const toggleDropdown = (index) => setOpenDropdown(openDropdown === index ? null : index);
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
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenside, setIsOpenside] = useState(false);

    const filteredData = data?.filter(item =>
        item.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.last_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );


    const totalPages = Math.ceil((filteredData?.length || 0) / itemsPerPage);

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
        setCurrentPage(1); // Reset to first page on new search
    };

    const edit_category11 = (category) => {

        let user_category = data.find((val) => val.category_id == category)
        setCategory(user_category)
    }

    const [selectedImage, setSelectedImage] = useState(null);
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
        

            setSelectedImage(URL.createObjectURL(file));
            setCategory((prev) => ({ ...prev, file })); // Store the file object
        }
    };
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalImage, setModalImage] = useState("");

    const handleImageClick = (imageUrl) => {
        setModalImage(imageUrl);
        setIsModalOpen(true);
    };

    const closeModal1 = () => {
        setIsModalOpen(false);
        setModalImage("");
    };

    const { data: user } = useGetProfileQuery();
    const userdata = user?.data || [];
 

    const [item, setitem] = useState('')

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
                    <SubHeader setIsOpenside={setIsOpenside} pageName={"Appoinmnet"} />
                    <div className="flex justify-between gap-[10px] mb-[27px] flex-wrap items-center max-sm:block" >
                        <h3 className="text-[24px] font-[700] "> Appoinmnet</h3>

                        <nav className="text-sm text-gray-600 max-sm:mt-[15px] max-sm:ps-[5px]" aria-label="Breadcrumb" >
                            <ol className="flex flex-wrap items-center ">

                                <li className="flex items-center">
                                    <Link to="/dashboard" className="hover:text-primary transition-colors font-[12px] text-[#575864]">Dashboard</Link>
                                    <svg className="mx-2 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path d="M9 5l7 7-7 7" />
                                    </svg>
                                </li>
                                <li className="text-primary font-medium text-[12px]">All Appoinmnet</li>
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

                            {/* Right Section - Button */}

                            <div className="">

                                <DatePicker
                                    selected={selectedDate}
                                    onChange={(date) => setSelectedDate(date)}
                                    // minDate={new Date()}
                                    dateFormat="yyyy-MM-dd"
                                    placeholderText="Select a date"
                                    className="w-[130px] h-[40px] px-4 border border-[#d8dfe7] rounded-[0.5rem] text-[14px] text-[#5d7186] focus:outline-none focus:border-[#b0b0bb]"
                                />
                            </div>

                        </div>

                        <div className="min-h-[65vh] over__scroll overflow-x-auto">

                            <table className="w-full ">
                                <thead className=" ">
                                    <tr className="table-flex items-center h-[40px] sm:h-[54px]  ">

                                        <th className="text-start px-[30px] text-[14px] font-[700]   max-md:px-[20px] max-md:text-[13px] max-sm:hidden">First Name</th>
                                        <th className="text-start px-[30px] text-[14px] font-[700]   max-md:px-[20px] max-md:text-[13px] sm:hidden">Name</th>
                                        <th className="text-[14px] font-[700] text-center max-md:hidden max-md:text-[12px] max-sm:px-[5px]">Last Name</th>
                                        <th className="text-[14px] font-[700] text-center max-lg:hidden ">Email</th>
                                        <th className="text-[14px] font-[700] text-center max-md:px-[1px] max-md:text-[13px] max-sm:px-[5px] max-xl:hidden">Mobile No. </th>
                                        <th className="text-[14px] font-[700] text-center max-md:px-[1px] max-md:text-[13px] max-sm:px-[5px] max-2xl:hidden">Category </th>
                                        <th className="text-[14px] font-[700] text-center max-md:px-[10px] max-md:text-[13px] max-sm:px-[5px]">Date </th>
                                        <th className="text-[14px] font-[700] text-center max-md:px-[10px] max-md:text-[13px] max-sm:px-[5px] whitespace-nowrap">Start Time </th>
                                        <th className="text-[14px] font-[700] text-center max-md:px-[10px] max-md:text-[13px] max-sm:px-[5px] whitespace-nowrap">End Time </th>
                                    </tr>
                                </thead>
                                <tbody className="last_tr">
                                    {displayedData?.length > 0 ? (
                                        displayedData.map((category, index) => (
                                            <tr
                                                key={index}
                                                className={`h-[44px]  sm:h-[58px] transition-all duration-200 ${index % 2 === 0 ? 'bg-[#eef3f9cc] hover:bg-[rgba(35,119,252,.1)]' : 'bg-transparent hover:bg-[#eef3f9cc]'}`}
                                                onClick={() => {
                                                    openModal('modal1')
                                                    setitem(category)
                                                }}
                                            >

                                                <td className="  text-sm text-[#5E5873]  px-[30px] max-md:px-[20px]" >
                                                    {category?.first_name?.charAt(0).toUpperCase() + category?.first_name?.slice(1)}
                                                </td>
                                                {/* <td className="text-sm text-[#5E5873] text-center px-[30px]">{category?.name}</td> */}
                                                <td className="text-sm text-[#5E5873] text-center px-[30px] max-md:hidden">{category?.last_name?.charAt(0).toUpperCase() + category?.last_name?.slice(1)}</td>
                                                <td className="text-sm text-[#5E5873] text-center max-lg:hidden">
                                                    {category?.email}
                                                </td>
                                                <td className="text-sm text-[#5E5873] text-center max-xl:hidden">
                                                    {category?.mobile}
                                                </td>
                                                <td className="text-sm text-[#5E5873] text-center max-2xl:hidden">
                                                    {cate?.data?.find((val) => val.category_id == category.category)?.name}
                                                </td>
                                                <td className="text-sm text-[#5E5873] text-center whitespace-nowrap">
                                                    {category?.appointment_date}
                                                </td>
                                                <td className="text-sm text-[#5E5873] text-center ">
                                                    {category?.appointment_start_time}
                                                </td>
                                                <td className="text-sm text-[#5E5873] text-center ">
                                                    {category?.appointment_end_time}
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


            {modal === 'modal1' && (
                <div className="relative z-10 modal" id="modal1" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                    <div className="fixed inset-0 bg-gray-500/75 transition-opacity" id="overlay"></div>

                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
                            <div className="relative transform overflow-hidden   p-[30px] rounded-[30px] bg-white text-left shadow-xl transition-all sm:my-8  w-full sm:max-w-2xl">
                                <div className="bg-white ">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-xl font-medium text-gray">Appoinmnet Details</h3>
                                        <div>
                                            <svg onClick={() => closeModal()} className="closeModal cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="16" height="15" viewBox="0 0 16 15" fill="none">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M1.15128 0.751862C1.61991 0.283233 2.3797 0.283233 2.84833 0.751862L7.9998 5.90333L13.1513 0.751862C13.6199 0.283233 14.3797 0.283233 14.8483 0.751862C15.317 1.22049 15.317 1.98029 14.8483 2.44892L9.69686 7.60039L14.8483 12.7519C15.317 13.2205 15.317 13.9803 14.8483 14.4489C14.3797 14.9175 13.6199 14.9175 13.1513 14.4489L7.9998 9.29745L2.84833 14.4489C2.3797 14.9175 1.61991 14.9175 1.15128 14.4489C0.682647 13.9803 0.682647 13.2205 1.15128 12.7519L6.30275 7.60039L1.15128 2.44892C0.682647 1.98029 0.682647 1.22049 1.15128 0.751862Z" fill="#495567"></path>
                                            </svg>
                                        </div>
                                    </div>


                                    <div className="mt-[20px] pt-[20px] border-t  space-y-4">

                                        <div className="flex items-center ">
                                            <div className="w-[200px] text-[#888]">First Name</div>
                                            <div className="w-[20px]">:</div>
                                            <div className="">{item.first_name}</div>
                                        </div>
                                        <div className="flex items-center ">
                                            <div className="w-[200px] text-[#888]">Last Name</div>
                                            <div className="w-[20px]">:</div>
                                            <div className="">{item.last_name}</div>
                                        </div>
                                        <div className="flex items-center ">
                                            <div className="w-[200px] text-[#888]">Email</div>
                                            <div className="w-[20px]">:</div>
                                            <div className="">{item.email}</div>
                                        </div>
                                        <div className="flex items-center ">
                                            <div className="w-[200px] text-[#888]">Mobile</div>
                                            <div className="w-[20px]">:</div>
                                            <div className="">{item.mobile}</div>
                                        </div>
                                        <div className="flex items-center ">
                                            <div className="w-[200px] text-[#888]">Category</div>
                                            <div className="w-[20px]">:</div>
                                            <div className="">{cate?.data?.find((val) => val.category_id == item.category)?.name}</div>
                                        </div>
                                        <div className="flex items-center ">
                                            <div className="w-[200px] text-[#888]">Date</div>
                                            <div className="w-[20px]">:</div>
                                            <div className="">{item.appointment_date}</div>
                                        </div>
                                        <div className="flex items-center ">
                                            <div className="w-[200px] text-[#888]">Start Time</div>
                                            <div className="w-[20px]">:</div>
                                            <div className="">{item.appointment_start_time}</div>
                                        </div>
                                        <div className="flex items-center ">
                                            <div className="w-[200px] text-[#888]">End Time</div>
                                            <div className="w-[20px]">:</div>
                                            <div className="">{item.appointment_end_time}</div>
                                        </div>
                                        <div className="flex items-center ">
                                            <div className="w-[200px] text-[#888]">Message</div>
                                            <div className="w-[20px]">:</div>
                                            <div className="">{item.message}</div>
                                        </div>
                                    </div>

                                </div>
                                <div className=" pt-[30px] flex flex-row-reverse  gap-3">

                                    <button type="button" onClick={() => closeModal()} className=" text-primary items-center closeModal h-[35px] sm:h-[40px]  inline-flex  justify-center rounded-md bg-white    py-2 w-[114px] text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-blue-600 ring-inset hover:bg-gray-50 sm:mt-0 ">Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}



            {isModalOpen && (
                <div
                    className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-75 z-50"
                    onClick={closeModal}
                >
                    <div className="">
                        <img
                            src={modalImage}
                            alt="Zoomed"
                            className="w-auto h-auto max-w-[90%] max-h-[90%] rounded-lg shadow-lg"
                        />
                        {/* Close Button */}
                        <button
                            className="absolute top-2 right-2 bg-white text-black px-3 py-1 rounded-full text-xl"
                            onClick={closeModal1}
                        >
                            ✕
                        </button>
                    </div>
                </div>
            )}


        </div>
    )
}
export default Category
