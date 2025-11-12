import React, { useEffect, useState, useRef } from "react";
import User_side_menu from '../Componenet/user_side_menu'
import EmployList from '../Componenet/EmployList'
import Service_side_menu from '../Componenet/service_side_menu'
import SubHeader from '../Componenet/sub_header'
import { ToastContainer, toast } from "react-toastify";
import svg_file from '../assets/file_not.svg'
import { useGetProdctMediaQuery, useDeleteProductMediaMutation, useGetMetalQuery, useGetDiamondQuery } from "../services/apiSlice";
import { Link } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';


const Product_Media = () => {
    const [modal, setModal] = useState(null);


    const [openDropdown, setOpenDropdown] = useState(null);
    const dropdownRefs = useRef([]);

    // ✅ Fetch Diamond using RTK Query
    const productId = localStorage.getItem("product_id");

    const { data: product_mediaData, error, isLoading } = useGetProdctMediaQuery({ product_id: productId });
    const data = product_mediaData?.results || [];

    const [deleteProductMedia] = useDeleteProductMediaMutation();
    const [deleteMediaId, setDeleteMediaId] = useState(null);


    const rawData = product_mediaData?.results || [];
    console.log(data);


    const flattenedData = rawData.flatMap((group) =>
        group.data.map((media) => ({
            ...media,
            metal: group.img_data.metal,
            diamond_details: group.img_data.diamond_details,
        }))
    );
    console.log(flattenedData.length);




    // ✅ Open & Close Modal
    const openModal = (modalId) => setModal(modalId);
    const closeModal = () => setModal(null);



    // ✅ Handle Edit Diamond
    const handleDeleteMedia = async () => {
        try {
            await deleteProductMedia(deleteMediaId).unwrap();
            toast.success("Product Media deleted successfully!");
            closeModal();
        } catch (error) {
            toast.error(error?.data?.message || "Failed to delete diamond");
        }
    };



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

    // ✅ Pagination
    const [searchTerm, setSearchTerm] = useState("");
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil((flattenedData?.length || 0) / itemsPerPage);
    let displayedData = flattenedData ? flattenedData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage) : [];
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenside, setIsOpenside] = useState(false);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); // Reset to first page on new search
    };

    // const displayedData = filteredData?.slice(
    //     (currentPage - 1) * itemsPerPage,
    //     currentPage * itemsPerPage
    // );


    console.log(displayedData);

    const handleItemChange = (event) => {
        const value = parseInt(event.target.value, 10);
        setItemsPerPage(value);
        setCurrentPage(1);
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



    const { data: MetalData } = useGetMetalQuery();
    const metaldata = MetalData?.data || [];


    const { data: diamondData } = useGetDiamondQuery();
    const diamonddata = diamondData?.data || [];

    const handleDragEnd = (result) => {
        if (!result.destination) return;
        const reordered = Array.from(displayedData);

        const [movedItem] = reordered.splice(result.source.index, 1);
        reordered.splice(result.destination.index, 0, movedItem);

        // Update ordering_priority based on new order
        const updatedData = reordered.map((item, i) => ({
            ...item,
            ordering_priority: i + 1,
        }));
        const store = reordered.map((item, i) => ({
            product_media_id: item.product_media_id,
            ordering_priority: i + 1,
        }));


        console.log(store);


        displayedData = updatedData

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
                <Service_side_menu isOpenside={isOpenside} setIsOpenside={setIsOpenside} />
                <div className="w-full width__right relative max-md:ms-0">
                    <SubHeader setIsOpenside={setIsOpenside} pageName={"Diamonds"} />
                    <div className="flex justify-between gap-[10px] mb-[27px] flex-wrap items-center max-sm:block" >
                        <h3 className="text-[24px] font-[700]"> Product Media</h3>


                        <nav className="text-sm text-gray-600 max-sm:mt-[15px] max-sm:ps-[5px]" aria-label="Breadcrumb" >
                            <ol className="flex flex-wrap items-center ">

                                <li className="flex items-center">
                                    <Link to="/dashboard" className="hover:text-primary transition-colors font-[12px] text-[#575864]">Dashboard</Link>
                                    <svg className="mx-2 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path d="M9 5l7 7-7 7" />
                                    </svg>
                                </li>

                                <li className="flex items-center">
                                    <Link to="/product" className="hover:text-primary transition-colors font-[12px] text-[#575864]">Product</Link>
                                    <svg className="mx-2 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path d="M9 5l7 7-7 7" />
                                    </svg>
                                </li>
                                <li className="text-primary font-medium text-[12px]">Product Media</li>
                            </ol>
                        </nav>



                    </div>

                    <div className="border mt-[30px] bg-white border-[#ecf0f4] shadow-[0px_4px_24px_0px_#0000000F]  rounded-[10px]">
                        <div className="p-[20px] flex gap-4 justify-between max-sm:flex-col">
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
                                {/* <div className=" w-[458px] max-xl:w-[350px] max-sm:w-[100%]">
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
                                </div> */}
                            </div>


                            <div className="flex justify-end max-lg:justify-start max-sm:order-1 max-sm:justify-end">

                                <Link to="/add_product_media">
                                    <button id="" className="shadow-[0px_8px_20px_1px_#3DB0F733] hover:text-white text-[14px] h-[50px] w-[208px] font-bold max-lg:h-[40px] max-lg:w-[180px] max-md:w-[150px] max-md:text-[12px] flex items-center justify-center gap-2 rounded-[12px] hover:bg-primary border-[1px] border-[rgba(34,117,252,1)] bg-white text-primary ">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 11 11" fill="none">
                                            <path d="M10.5938 5.33984H6.16406V0.910156C6.16406 0.683627 5.98044 0.5 5.75391 0.5C5.52738 0.5 5.34375 0.683627 5.34375 0.910156V5.33984H0.914062C0.687533 5.33984 0.503906 5.52347 0.503906 5.75C0.503906 5.97653 0.687533 6.16016 0.914062 6.16016H5.34375V10.5898C5.34375 10.8164 5.52738 11 5.75391 11C5.98044 11 6.16406 10.8164 6.16406 10.5898C6.16406 8.85994 6.16406 7.89006 6.16406 6.16016H10.5938C10.8203 6.16016 11.0039 5.97653 11.0039 5.75C11.0039 5.52347 10.8203 5.33984 10.5938 5.33984Z" fill="currentColor" />
                                        </svg>   Add Product Media
                                    </button>

                                </Link>


                            </div>


                        </div>
                        <div className="min-h-[65vh] ">

                            <table className="w-full ">
                                <thead className="">
                                    <tr className="table-flex items-center h-[40px] sm:h-[54px]  ">
                                        <th className="text-start px-[30px] text-[14px] font-[700] max-md:px-[20px] max-md:text-[13px] max-lg:hidden"> </th>
                                        <th className="text-start px-[30px] text-[14px] font-[700]   max-md:px-[20px] max-md:text-[13px] max-sm:px-[10px]">Image</th>
                                        <th className=" text-[14px] font-[700] text-center  max-md:text-[12px] max-sm:px-[5px] max-sm:hidden"> Type</th>
                                        <th className=" text-[14px] font-[700] text-center  max-md:text-[12px] max-sm:px-[5px]">Metal </th>
                                        <th className=" text-[14px] font-[700] text-center  max-md:text-[12px] max-sm:px-[5px]">Diamond  </th>
                                        <th className="text-[14px] font-[700] text-center max-md:text-[12px] max-sm:px-[5px]">
                                            <span className="hidden max-sm:inline">Priority</span>
                                            <span className="inline max-sm:hidden">Ordering Priority</span>
                                        </th>


                                    </tr>
                                </thead>

                                <DragDropContext onDragEnd={handleDragEnd}>
                                    <Droppable droppableId="mediaTable">
                                        {(provided) => (
                                            <tbody
                                                {...provided.droppableProps}
                                                ref={provided.innerRef}
                                                className="last_tr"
                                            >{displayedData.length === 0 ? (
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
                                            ) : (displayedData.map((media, index) => (
                                                <Draggable
                                                    key={media.product_media_id}
                                                    draggableId={media.product_media_id.toString()}
                                                    index={index}
                                                >
                                                    {(provided, snapshot) => (
                                                        <tr
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            className={`h-[44px] sm:h-[58px] transition-all duration-200 border-b border-b-[#EBE9F1]
    ${snapshot.isDragging ? 'bg-blue-100' : index % 2 === 0 ? 'bg-[#eef3f9cc] hover:bg-[rgba(35,119,252,.1)]' : 'bg-white hover:bg-[#eef3f9cc]'}
  `}
                                                        >

                                                            <td className="text-sm text-[#5E5873] px-[30px] cursor-move max-lg:hidden">
                                                                <svg
                                                                    className="w-4 h-4 inline-block mr-2"
                                                                    fill="currentColor"
                                                                    viewBox="0 0 20 20"
                                                                >
                                                                    <path d="M7 4a1 1 0 100 2 1 1 0 000-2zM7 9a1 1 0 100 2 1 1 0 000-2zM7 14a1 1 0 100 2 1 1 0 000-2zM13 4a1 1 0 100 2 1 1 0 000-2zM13 9a1 1 0 100 2 1 1 0 000-2zM13 14a1 1 0 100 2 1 1 0 000-2z" />
                                                                </svg>

                                                            </td>
                                                            <td className="text-sm text-[#5E5873] cursor-pointer group-hover:bg-gray-200 ps-[30px] max-lg:px-0 max-lg:ps-[10px] max-sm:ps-[5px]">
                                                                {media?.media_type == "Image" ? (
                                                                    <img
                                                                        src={`${import.meta.env.VITE_API_BASE_URL}/${media?.file}`}
                                                                        className="w-[60px] h-[60px] max-sm:w-[50px] max-sm:h-[50px] rounded-xl object-cover cursor-pointer my-3"
                                                                        alt="product"
                                                                        onClick={() =>
                                                                            handleImageClick(`${import.meta.env.VITE_API_BASE_URL}/${media?.file}`)
                                                                        }
                                                                    />
                                                                ) : media?.media_type == "Video" ? (
                                                                    <video
                                                                        src={`${import.meta.env.VITE_API_BASE_URL}/${media?.file}`}
                                                                        className="w-[60px] h-[60px] max-sm:w-[50px] max-sm:h-[50px] rounded-xl object-cover cursor-pointer my-3"
                                                                        controls
                                                                        onClick={() =>
                                                                            handleImageClick(`${import.meta.env.VITE_API_BASE_URL}/${media?.file}`)
                                                                        }
                                                                    />
                                                                ) : null}

                                                            </td>
                                                            <td className="text-sm text-[#5E5873] text-center px-[30px] max-sm:hidden max-md:text-[12px]">
                                                                {media?.media_type}
                                                            </td>
                                                            <td className="text-sm text-[#5E5873] text-center px-[30px] max-md:text-[12px]">
                                                                {
                                                                    metaldata?.find((m) => m.metal_id == media?.metal)
                                                                        ?.metal_type || "-"
                                                                }
                                                            </td>
                                                            <td className="text-sm text-[#5E5873] text-center max-md:text-[12px]">
                                                                {
                                                                    diamonddata.find(
                                                                        (d) => d.diamond_id === media?.diamond_details
                                                                    )?.diamond_shape || "-"
                                                                }
                                                            </td>
                                                            <td className="text-sm text-[#5E5873] text-center max-md:text-[12px]">
                                                                {media?.ordering_priority}
                                                            </td>
                                                            <td className="text-sm px-[50px] dropdown-container max-lg:hidden">
                                                                {/* Your dropdown code here */}
                                                            </td>
                                                        </tr>
                                                    )}
                                                </Draggable>
                                            )))}
                                                {provided.placeholder}
                                            </tbody>
                                        )}
                                    </Droppable>
                                </DragDropContext>



                            </table>

                        </div>
                        {flattenedData.length > itemsPerPage && (
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





            {
                modal === 'modal3' && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">

                        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                            <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
                                <div className="relative transform overflow-hidden p-[30px] border-t-[8px] border-[#F44336] rounded-[6px] bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-xl z-40">
                                    <div className="bg-white ">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-xl font-medium text-gray">Delete</h3>
                                            <div onClick={closeModal}>
                                                <svg className="closeModal cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="16" height="15" viewBox="0 0 16 15" fill="none">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M1.15128 0.751862C1.61991 0.283233 2.3797 0.283233 2.84833 0.751862L7.9998 5.90333L13.1513 0.751862C13.6199 0.283233 14.3797 0.283233 14.8483 0.751862C15.317 1.22049 15.317 1.98029 14.8483 2.44892L9.69686 7.60039L14.8483 12.7519C15.317 13.2205 15.317 13.9803 14.8483 14.4489C14.3797 14.9175 13.6199 14.9175 13.1513 14.4489L7.9998 9.29745L2.84833 14.4489C2.3797 14.9175 1.61991 14.9175 1.15128 14.4489C0.682647 13.9803 0.682647 13.2205 1.15128 12.7519L6.30275 7.60039L1.15128 2.44892C0.682647 1.98029 0.682647 1.22049 1.15128 0.751862Z" fill="#495567" />
                                                </svg>
                                            </div>
                                        </div>
                                        <p className="pt-[14px] text-[#8492A6]">Are you sure you want to delete this product image?</p>


                                    </div>
                                    <div className="  pt-[30px] flex flex-row-reverse gap-3 ">
                                        <button type="button" onClick={handleDeleteMedia} className="inline-flex h-[35px] sm:h-[40px]  w-[114px] shadow-[0px_8px_20px_1px_#F443364D] rounded-md bg-[#F44336] items-center   justify-center py-2 text-sm font-semibold text-white shadow-xs  sm:ml-3 ">Delete</button>
                                        <button type="button" className="mt-3 bg-[#F4F1FC] h-[35px] sm:h-[40px] w-[114px] closeModal   rounded-md border-0   inline-flex justify-center items-center  py-2 text-sm font-semibold  shadow-xs   sm:mt-0 " onClick={closeModal} >Cancel</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }

            {
                isModalOpen && (
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
                )
            }


        </div>
    )
}

export default Product_Media
