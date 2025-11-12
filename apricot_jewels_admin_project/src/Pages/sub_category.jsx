import React, { useEffect, useState, useRef } from "react";
import User_side_menu from '../Componenet/user_side_menu'
import EmployList from '../Componenet/EmployList'
import SubHeader from '../Componenet/sub_header'
import Dropdown from '../Componenet/dropdown'
import Searchdropdown from '../Componenet/searchdropdown'
import { ToastContainer, toast } from "react-toastify";
import { useGetSubCategoriesQuery, useAddSubCategoryMutation, useEditSubCategoryMutation, useDeleteSubCategoryMutation, useGetCategoriesQuery } from "../services/apiSlice";
import { Link, useNavigate } from "react-router-dom";
import svg_file from '../assets/file_not.svg'

const daily_logs = () => {

    const navigate = useNavigate()
    const [modal, setModal] = useState(null);
    const [category, setCategory] = useState({
        name: "",
        description: "",
        is_active: "",
        is_home: "",
        category: "",
        subcategory_id: "",
        subcategory_img: "",
    });

    const [openDropdown, setOpenDropdown] = useState(null);
    const dropdownRefs = useRef([]);

    // ✅ Fetch categories using RTK Query
    const { data: subcategories, error, isLoading } = useGetSubCategoriesQuery();
    const [addCategory] = useAddSubCategoryMutation();
    const [editCategory] = useEditSubCategoryMutation();
    const [deletesubCategory] = useDeleteSubCategoryMutation();
    const data = subcategories?.data || [];

    // ✅ Open & Close Modal
    const openModal = (modalId) => setModal(modalId);
    const closeModal = () => setModal(null);

    // ✅ Handle Add Category
    const handleAddCategory = async () => {
        try {

            const filePath = selectedImage;
            let imageBlob = null;

            // ✅ Fetch image from backend path (convert string to binary blob)
            if (typeof filePath === "string") {
                const response = await fetch(filePath);
                imageBlob = await response.blob();
            }

            // ✅ Validate blob (relaxed check)
            if (!imageBlob || !(imageBlob instanceof Blob)) {
                toast.error("Invalid image data");
                return;
            }

            // Optional: Preview image in UI
            const previewURL = URL.createObjectURL(imageBlob);
            setSelectedImage(previewURL);
            let formData = new FormData();
            formData.append("name", category.name);
            formData.append("description", category.description);
            formData.append("is_active", category.is_active);
            formData.append("is_home", category.is_home);
            formData.append("subcategory_img", imageBlob);
            formData.append("category_id", category.category);
            await addCategory(formData).unwrap();
            toast.success("Category added successfully!");
            closeModal();
        } catch (error) {
            toast.error(error.data?.message || "Failed to add category");
        }
    };

    // ✅ Handle Edit Category
    const handleEditCategory = async () => {
        try {
            let formData = new FormData();
            const filePath = selectedImage;
            let imageBlob = null;

            // ✅ Fetch image from backend path (convert string to binary blob)
            if (typeof filePath === "string") {
                const response = await fetch(filePath);
                imageBlob = await response.blob();
            }

            // ✅ Validate blob (relaxed check)
            if (!imageBlob || !(imageBlob instanceof Blob)) {
                toast.error("Invalid image data");
                return;
            }

            // Optional: Preview image in UI
            const previewURL = URL.createObjectURL(imageBlob);
            setSelectedImage(previewURL);
            function capitalizeBoolean(value) {
                return value.toString().charAt(0).toUpperCase() + value.toString().slice(1);
            }
            formData.append("name", category.name);
            formData.append("description", category.description);
            formData.append("is_active", capitalizeBoolean(category.is_active));
            formData.append("is_home", capitalizeBoolean(category.is_home));
            formData.append("subcategory_img", imageBlob);
            formData.append("category_id", category.category);
            formData.append("subcategory_id", category.subcategory_id);
            await editCategory(formData).unwrap();
            toast.success("Category updated successfully!");
            closeModal();
        } catch (error) {
            toast.error(error.data?.message || "Failed to update category");
        }
    };
    const [deletcategory, setDeletcategory] = useState(null);
    // ✅ Handle Delete Category
    const handleDeleteCategory = async () => {
        try {
            const formdata = new FormData()

            formdata.append('subcategory_id', deletcategory)
            await deletesubCategory(formdata).unwrap();
            toast.success("Sub Category deleted successfully!");
            closeModal();
        } catch (error) {
            toast.error(error.data?.message || "Failed to delete category");
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
    const [currentPage, setCurrentPage] = useState(() => {
        return parseInt(sessionStorage.getItem("subcategory_page") || "1");
    });
    const totalPages = Math.ceil((data?.length || 0) / itemsPerPage);
    // const displayedData = data ? data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage) : [];
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenside, setIsOpenside] = useState(false);

    const filteredData = data?.filter(item =>
        item.name?.toLowerCase().includes(searchTerm.toLowerCase())
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


    const displayedData = filteredData?.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );


    const edit_category11 = (category) => {

        let user_category = data.find((val) => val.subcategory_id == category)
        setCategory(user_category)
    }

    let categoryOptions = [];
    const { data: categories } = useGetCategoriesQuery();
    if (categories?.data) {
        categoryOptions = categories?.data.map((val) => ({ id: val.category_id, name: val.name })); // Store objects
    }


    const [selectedImage, setSelectedImage] = useState(null);
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            console.log(file);

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
                    <SubHeader setIsOpenside={setIsOpenside} pageName={"Sub Category"} />
                    <div className="flex justify-between gap-[10px] mb-[27px] flex-wrap items-center max-sm:block" >
                        <h3 className="text-[24px] font-[700] "> Sub Category</h3>

                        <nav className="text-sm text-gray-600 max-sm:mt-[15px] max-sm:ps-[5px]" aria-label="Breadcrumb" >
                            <ol className="flex flex-wrap items-center ">

                                <li className="flex items-center">
                                    <Link to="/dashboard" className="hover:text-primary transition-colors font-[12px] text-[#575864]">Dashboard</Link>
                                    <svg className="mx-2 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path d="M9 5l7 7-7 7" />
                                    </svg>
                                </li>
                                <li className="text-primary font-medium text-[12px]">All SubCategory</li>
                            </ol>
                        </nav>




                    </div>

                    <div className="border mt-[30px] bg-white border-[#ecf0f4] shadow-[0px_4px_24px_0px_#0000000F]  rounded-[10px]">
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
                            <div className="flex justify-end max-lg:justify-start max-sm:order-1 max-sm:justify-end">
                                <button
                                    onClick={() => navigate("/add_subcategory")}
                                    className="shadow-[0px_8px_20px_1px_#3DB0F733] hover:text-white text-[14px] h-[50px] w-[208px] font-bold max-lg:h-[40px] max-lg:w-[180px] max-md:w-[150px] max-md:text-[12px] flex items-center justify-center gap-2 rounded-[12px] hover:bg-primary border-[1px] border-[rgba(34,117,252,1)] bg-white text-primary "
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="11"
                                        height="11"
                                        viewBox="0 0 11 11"
                                        fill="none"
                                        className="text-inherit"
                                    >
                                        <path
                                            d="M10.5938 5.33984H6.16406V0.910156C6.16406 0.683627 5.98044 0.5 5.75391 0.5C5.52738 0.5 5.34375 0.683627 5.34375 0.910156V5.33984H0.914062C0.687533 5.33984 0.503906 5.52347 0.503906 5.75C0.503906 5.97653 0.687533 6.16016 0.914062 6.16016H5.34375V10.5898C5.34375 10.8164 5.52738 11 5.75391 11C5.98044 11 6.16406 10.8164 6.16406 10.5898C6.16406 8.85994 6.16406 7.89006 6.16406 6.16016H10.5938C10.8203 6.16016 11.0039 5.97653 11.0039 5.75C11.0039 5.52347 10.8203 5.33984 10.5938 5.33984Z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                    Add SubCategory
                                </button>
                            </div>
                        </div>
                        <div className="min-h-[65vh] ">
                            <table className="w-full ">
                                <thead className="">
                                    <tr className="table-flex items-center h-[40px] sm:h-[54px]  ">
                                        <th className="text-start px-[30px] text-[14px] font-[700] max-md:px-[20px] max-md:text-[13px]">Name</th>
                                        <th className=" text-[14px] font-[700] text-center max-lg:hidden">Description</th>
                                        <th className=" text-[14px] font-[700] text-center  max-md:hidden max-md:text-[12px] max-sm:px-[5px]">Category </th>
                                        <th className=" text-[14px] font-[700] text-center  max-md:px-[1px] max-md:text-[13px] max-sm:px-[5px]">Home </th>
                                        <th className=" text-[14px] font-[700] text-center  max-md:px-[10px] max-md:text-[13px] max-sm:px-[5px]">Status </th>
                                        <th className="  px-[30px] text-[14px] font-[700]  max-md:px-[10px] max-md:text-[13px] max-sm:px-[5px]">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="last_tr">
                                    {displayedData?.length > 0 ? (
                                        displayedData.map((subcategory, index) => (
                                            <tr
                                                key={index}
                                                className={`h-[44px] sm:h-[58px] transition-all duration-200 ${index % 2 === 0 ? 'bg-[#eef3f9cc] hover:bg-[rgba(35,119,252,.1)]' : 'bg-white hover:bg-[#eef3f9cc]'}`}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    sessionStorage.setItem("subcategory_page", currentPage)
                                                    navigate("/edit_subcategory", {
                                                        state: { subcategory_id: subcategory?.subcategory_id },
                                                    });
                                                }}
                                            >
                                                <td className="flex items-center gap-6 max-xl:min-w-[200px] max-lg:gap-4 max-md:gap-2 max-lg:min-w-[150px]" >
                                                    <div className="text-sm text-[#5E5873] cursor-pointer group-hover:bg-gray-200 ps-[30px] max-lg:px-0 max-lg:ps-[10px] max-md:ps-[5px]">
                                                        <img
                                                            src={`${import.meta.env.VITE_API_BASE_URL}${subcategory?.subcategory_img}`}
                                                            className="w-[60px] h-[60px] max-sm:w-[50px] max-sm:h-[50px] rounded-xl object-cover cursor-pointer my-3"
                                                            alt="product"
                                                            onClick={() =>
                                                                handleImageClick(`${import.meta.env.VITE_API_BASE_URL}${subcategory?.subcategory_img}`)
                                                            }
                                                        />

                                                    </div>
                                                    <h6 className="text-sm text-[#5E5873] max-md:text-[12px] truncate max-md:max-w-[100px] max-sm:text-[11px]">
                                                        {subcategory?.name?.charAt(0).toUpperCase() + subcategory?.name?.slice(1)}
                                                    </h6>
                                                </td>

                                                <td className="text-sm text-[#5E5873] text-center px-[30px] max-lg:hidden">{subcategory?.description}</td>
                                                <td className="text-sm text-[#5E5873] text-center max-md:hidden">{categories?.data.find(category => category.category_id == subcategory?.category)?.name}</td>
                                                {/* <td className="text-sm text-[#5E5873] text-center">
                                                    <button
                                                        className={`w-[120px] py-1 mx-4 rounded-[400px] ${subcategory?.is_home
                                                            ? "bg-[rgba(69%,82%,96%,0.1)] shadow-[0_0_5px_rgba(34,117,252,0.5)_inset] text-primary"
                                                            : "text-[#FF154C] bg-[rgba(255,21,76,0.1)] shadow-[0_0_5px_rgba(255,20,75,0.5)_inset]"
                                                            }`}
                                                    >
                                                        {subcategory?.is_home ? "Active" : "Inactive"}
                                                    </button>
                                                </td> */}

                                                <td className="text-sm text-[#5E5873] text-center align-middle">
                                                    <div className="flex justify-center">
                                                        <button
                                                            className={`w-[120px] max-lg:w-auto mx-4 py-1 max-lg:border-0 rounded-full flex items-center justify-center gap-2
        ${subcategory?.is_home
                                                                    ? "bg-[rgba(69%,82%,96%,0.1)] shadow-[0_0_5px_rgba(34,117,252,0.5)_inset] text-primary max-lg:bg-transparent max-lg:shadow-none"
                                                                    : "text-[#FF154C] bg-[rgba(255,21,76,0.1)] shadow-[0_0_5px_rgba(255,20,75,0.5)_inset] max-lg:bg-transparent max-lg:shadow-none"
                                                                }`}
                                                        >
                                                            {subcategory?.is_home ? (
                                                                <>
                                                                    <span className="hidden max-lg:flex justify-center items-center text-[#22c55e] text-2xl max-md:text-lg">
                                                                        <i className="fa-solid fa-check"></i>
                                                                    </span>
                                                                    <span className="max-lg:hidden">Active</span>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <span className="hidden max-lg:flex justify-center items-center text-[#e44b30] text-2xl max-md:text-lg">
                                                                        <i className="fa-solid fa-xmark"></i>
                                                                    </span>
                                                                    <span className="max-lg:hidden">Inactive</span>
                                                                </>
                                                            )}
                                                        </button>
                                                    </div>
                                                </td>


                                                <td className="text-sm text-[#5E5873] text-center align-middle">
                                                    <div className="flex justify-center">
                                                        <button
                                                            className={`w-[120px] max-lg:w-auto mx-4 py-1 max-lg:border-0 rounded-full flex items-center justify-center gap-2
        ${subcategory?.is_active
                                                                    ? "bg-[rgba(69%,82%,96%,0.1)] shadow-[0_0_5px_rgba(34,117,252,0.5)_inset] text-primary max-lg:bg-transparent max-lg:shadow-none"
                                                                    : "text-[#FF154C] bg-[rgba(255,21,76,0.1)] shadow-[0_0_5px_rgba(255,20,75,0.5)_inset] max-lg:bg-transparent max-lg:shadow-none"
                                                                }`}
                                                        >
                                                            {subcategory?.is_active ? (
                                                                <>
                                                                    <span className="hidden max-lg:flex justify-center items-center text-[#22c55e] text-2xl max-md:text-lg">
                                                                        <i className="fa-solid fa-check"></i>
                                                                    </span>
                                                                    <span className="max-lg:hidden">Active</span>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <span className="hidden max-lg:flex justify-center items-center text-[#e44b30] text-2xl max-md:text-lg">
                                                                        <i className="fa-solid fa-xmark"></i>
                                                                    </span>
                                                                    <span className="max-lg:hidden">Inactive</span>
                                                                </>
                                                            )}
                                                        </button>
                                                    </div>
                                                </td>

                                                <td className="text-sm px-[50px] max-lg:px-[20px] max-md:px-[5px] dropdown-container"
                                                //  ref={(el) => (dropdownRefs.current[index] = el)}
                                                >
                                                    {/* <div className="relative  flex justify-end" >
                                                        <div className="px-2 py-2 cursor-pointer ms-auto inline-block" onClick={() => toggleDropdown(index)}>

                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                className="ms-auto cursor-pointer"
                                                                width="4"
                                                                height="16"
                                                                viewBox="0 0 4 16"
                                                                fill="none"


                                                            >
                                                                <path
                                                                    d="M2.00033 15.3327C0.987803 15.3327 0.166992 14.5119 0.166992 13.4993C0.166992 12.4868 0.987803 11.666 2.00033 11.666C3.01285 11.666 3.83366 12.4868 3.83366 13.4993C3.83366 14.5119 3.01285 15.3327 2.00033 15.3327ZM2.00033 9.83268C0.987803 9.83268 0.166992 9.01187 0.166992 7.99935C0.166992 6.98683 0.987803 6.16602 2.00033 6.16602C3.01285 6.16602 3.83366 6.98683 3.83366 7.99935C3.83366 8.48558 3.6405 8.95189 3.29669 9.29571C2.95287 9.63953 2.48656 9.83268 2.00033 9.83268ZM2.00033 4.33268C0.987803 4.33268 0.166992 3.51187 0.166992 2.49935C0.166992 1.48683 0.987803 0.666016 2.00033 0.666016C3.01285 0.666016 3.83366 1.48683 3.83366 2.49935C3.83366 2.98558 3.6405 3.45189 3.29669 3.79571C2.95287 4.13953 2.48656 4.33268 2.00033 4.33268Z"
                                                                    fill="#5E5873"
                                                                ></path>
                                                            </svg>
                                                        </div>

                                               

                                                        <ul className={`absolute top-[-10px] right-2 shadow-lg bg-white rounded-[6px] p-[5px] border border-[#EBE9F1] mt-2 z-[10]  ${openDropdown === index ? 'block' : 'hidden'}`}>
                                                            <li onClick={(e) => {
                                                                e.stopPropagation(); 
                                                                openModal('modal2')
                                                                edit_category11(subcategory?.subcategory_id)
                                                            }}
                                                            >
                                                                <button
                                                                    className="flex items-center justify-between w-[112px] p-[5px] text-sm transition-all hover:bg-[#D9F0FF] rounded-[4px]">
                                                                    <span className="text-primary">Edit</span><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                                                                        <path d="M12.9215 8.74235C12.7289 8.74235 12.5728 8.89842 12.5728 9.09102V12.1869C12.5721 12.7643 12.1043 13.2323 11.5268 13.2329H1.74337C1.16586 13.2323 0.698043 12.7643 0.697346 12.1869V3.10079C0.698043 2.52342 1.16589 2.05547 1.74337 2.05477H4.83923C5.0318 2.05477 5.18791 1.89867 5.18791 1.70609C5.18791 1.51363 5.0318 1.35742 4.83923 1.35742H1.74337C0.780958 1.3585 0.00108089 2.13838 0 3.10079V12.187C0.00108089 13.1494 0.780958 13.9292 1.74337 13.9304H11.5268C12.4892 13.9292 13.2691 13.1494 13.2701 12.187V9.09102C13.2701 8.89842 13.114 8.74235 12.9215 8.74235Z" fill="#3DB0F7"></path>
                                                                        <path d="M13.1322 0.459568C12.5195 -0.153189 11.526 -0.153189 10.9133 0.459568L4.69266 6.68014C4.65008 6.72271 4.61925 6.77559 4.60319 6.83362L3.78517 9.78689C3.76866 9.84635 3.76823 9.90913 3.78393 9.96881C3.79962 10.0285 3.83089 10.0829 3.87451 10.1266C3.91814 10.1702 3.97258 10.2015 4.03225 10.2172C4.09193 10.2329 4.15471 10.2325 4.21417 10.216L7.16743 9.39787C7.22547 9.38181 7.27835 9.35098 7.32092 9.3084L13.5413 3.08773C14.1531 2.47451 14.1531 1.48191 13.5413 0.868736L13.1322 0.459568ZM5.45238 6.90678L10.5435 1.81559L12.1854 3.45749L7.09418 8.54868L5.45238 6.90678ZM5.12442 7.5649L6.43613 8.87678L4.6217 9.3795L5.12442 7.5649ZM13.0483 2.59467L12.6785 2.9644L11.0365 1.32236L11.4064 0.952592C11.7468 0.612217 12.2987 0.612217 12.639 0.952592L13.0483 1.36172C13.3881 1.70252 13.3881 2.25401 13.0483 2.59467Z" fill="#3DB0F7"></path>
                                                                    </svg>
                                                                </button>
                                                            </li>
                                                            <li>
                                                                <button className="flex items-center justify-between w-[112px] p-[5px] text-sm bg-white transition-all hover:bg-[#FFD6D6] rounded-[4px]" onClick={() => {
                                                                    openModal('modal3')
                                                                    setDeletcategory(subcategory?.subcategory_id);
                                                                }}>
                                                                    <span className="text-[#EA5455]">Delete</span><svg xmlns="http://www.w3.org/2000/svg" width="11" height="13" viewBox="0 0 11 13" fill="none">
                                                                        <path d="M7.07663 4.70898C6.90848 4.70898 6.77218 4.84529 6.77218 5.01343V10.7675C6.77218 10.9356 6.90848 11.072 7.07663 11.072C7.24481 11.072 7.38108 10.9356 7.38108 10.7675V5.01343C7.38108 4.84529 7.24481 4.70898 7.07663 4.70898ZM3.48414 4.70898C3.31599 4.70898 3.17969 4.84529 3.17969 5.01343V10.7675C3.17969 10.9356 3.31599 11.072 3.48414 11.072C3.65231 11.072 3.78858 10.9356 3.78858 10.7675V5.01343C3.78858 4.84529 3.65231 4.70898 3.48414 4.70898Z" fill="#F44336"></path>
                                                                        <path d="M0.864677 3.87022V11.3712C0.864677 11.8146 1.02725 12.2309 1.31124 12.5296C1.45108 12.6778 1.61966 12.796 1.80669 12.8769C1.99372 12.9577 2.19527 12.9996 2.39904 13H8.15933C8.3631 12.9997 8.56466 12.9578 8.75169 12.8769C8.93872 12.796 9.1073 12.6779 9.24713 12.5296C9.53115 12.2309 9.69369 11.8146 9.69369 11.3712V3.87022C10.2582 3.72037 10.6241 3.17498 10.5486 2.59571C10.4729 2.01653 9.97948 1.58329 9.3953 1.58317H7.83655V1.20261C7.83743 1.04419 7.80683 0.887167 7.74652 0.740667C7.68621 0.594167 7.5974 0.461107 7.48525 0.349212C7.37307 0.237327 7.23978 0.148845 7.09311 0.0889041C6.94645 0.0289627 6.78934 -0.00124351 6.63091 3.94643e-05H3.92749C3.76905 -0.00124755 3.61194 0.0289567 3.46527 0.0888982C3.3186 0.14884 3.1853 0.237324 3.07312 0.349212C2.96096 0.461107 2.87216 0.594167 2.81185 0.740667C2.75154 0.887167 2.72094 1.04419 2.72181 1.20261V1.58317H1.1631C0.578922 1.58329 0.0855016 2.01653 0.00984606 2.59571C-0.0656572 3.17498 0.300138 3.72037 0.864677 3.87022ZM8.15933 12.3911H2.39907C1.87852 12.3911 1.47357 11.9439 1.47357 11.3712V3.89698H9.08479V11.3712C9.08479 11.944 8.67988 12.3911 8.15933 12.3911ZM3.33071 1.20261C3.32972 1.12412 3.3445 1.04623 3.37419 0.97356C3.40387 0.900891 3.44785 0.834926 3.50352 0.77958C3.55916 0.724203 3.62537 0.680564 3.6982 0.651252C3.77102 0.621939 3.849 0.60755 3.92749 0.608937H6.63091C6.7094 0.60755 6.78737 0.621939 6.8602 0.651252C6.93303 0.680564 6.99923 0.724203 7.05488 0.77958C7.11055 0.834923 7.15453 0.900888 7.18421 0.973558C7.21389 1.04623 7.22867 1.12412 7.22766 1.20261V1.58317H3.33071V1.20261ZM1.1631 2.19207H9.39536C9.69801 2.19207 9.94337 2.43743 9.94337 2.74008C9.94337 3.04273 9.69801 3.28809 9.39536 3.28809H1.16307C0.860415 3.28809 0.61506 3.04273 0.61506 2.74008C0.61506 2.43743 0.860445 2.19207 1.1631 2.19207Z" fill="#F44336"></path>
                                                                        <path d="M5.27906 4.70898C5.11091 4.70898 4.97461 4.84529 4.97461 5.01343V10.7675C4.97461 10.9356 5.11091 11.072 5.27906 11.072C5.44724 11.072 5.58351 10.9356 5.58351 10.7675V5.01343C5.58351 4.84529 5.44724 4.70898 5.27906 4.70898Z" fill="#F44336"></path>
                                                                    </svg>
                                                                </button>
                                                            </li>
                                                        </ul>

                                                    </div> */}
                                                    <div className="flex gap-2 justify-center max-lg:gap-0">
                                                        <button
                                                            className="p-2 hover:bg-[rgba(34,197,94,0.1)] rounded-full transition-all duration-200 max-lg:hidden"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                sessionStorage.setItem("subcategory_page", currentPage)
                                                                navigate("/edit_subcategory", {
                                                                    state: { subcategory_id: subcategory?.subcategory_id },
                                                                });
                                                            }}
                                                        >

                                                            <i className="fa-regular fa-pen-to-square text-[#22c55e] text-lg"></i>
                                                        </button>

                                                        <button
                                                            className="p-2 hover:bg-red-100 rounded-full transition-all duration-200"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                openModal('modal3')
                                                                setDeletcategory(subcategory?.subcategory_id);
                                                            }}
                                                        >
                                                            <i className="fa-regular fa-trash-can text-[#e44b30] text-lg"></i>
                                                        </button>
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
                                        <h3 className="text-xl font-medium text-gray">Add Sub Category</h3>
                                        <div>
                                            <svg onClick={() => closeModal()} className="closeModal cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="16" height="15" viewBox="0 0 16 15" fill="none">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M1.15128 0.751862C1.61991 0.283233 2.3797 0.283233 2.84833 0.751862L7.9998 5.90333L13.1513 0.751862C13.6199 0.283233 14.3797 0.283233 14.8483 0.751862C15.317 1.22049 15.317 1.98029 14.8483 2.44892L9.69686 7.60039L14.8483 12.7519C15.317 13.2205 15.317 13.9803 14.8483 14.4489C14.3797 14.9175 13.6199 14.9175 13.1513 14.4489L7.9998 9.29745L2.84833 14.4489C2.3797 14.9175 1.61991 14.9175 1.15128 14.4489C0.682647 13.9803 0.682647 13.2205 1.15128 12.7519L6.30275 7.60039L1.15128 2.44892C0.682647 1.98029 0.682647 1.22049 1.15128 0.751862Z" fill="#495567"></path>
                                            </svg>
                                        </div>
                                    </div>
                                    <p className="pt-[14px] text-[#8492A6]">Required fields are marked with&nbsp;<span className="text-[#F44336] ">*</span></p>

                                    <form action="" className="mt-[30px] ">
                                        <div className='mb-[15px]'>
                                            <Searchdropdown
                                                label="Category"
                                                options={categoryOptions.map((val) => val.name)} // Display only names
                                                main_color="text-gray"

                                                labelclassName="text-[#9CA3AF]"
                                                onSelect={(value) => {
                                                    const selectedRoom = categories?.data.find(category => category.name === value);
                                                    console.log(selectedRoom)
                                                    setCategory({ ...category, category: selectedRoom?.category_id });
                                                }}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm  text-gray font-medium">SubCategory Name&nbsp;<span className="text-[#F44336] ">*</span></label>
                                            <input type="text"
                                                placeholder="Category Name" onChange={(e) => setCategory({ ...category, name: e.target.value })} className="mt-[10px] w-[100%]  h-[35px] sm:h-[40px] sm:px-[15px] px-[12px] border border-[#C8C8C8] text-[#9CA3AF] rounded-[7px] bg-transparent  text-sm focus:ring-blue-500 focus:border-blue-500" />
                                        </div>



                                        <div className='my-[15px]'>
                                            <label className="block text-sm  text-gray font-medium">Description</label>
                                            <input type="text"
                                                placeholder="Description" onChange={(e) => setCategory({ ...category, description: e.target.value })} className="mt-[10px] w-[100%]  h-[35px] sm:h-[40px] sm:px-[15px] px-[12px] border border-[#C8C8C8] text-[#9CA3AF] rounded-[7px] bg-transparent  text-sm focus:ring-blue-500 focus:border-blue-500" />
                                        </div>
                                        <div className="my-[15px]">
                                            <label className="block text-sm text-gray font-medium">
                                                Image&nbsp;<span className="text-[#F44336]">*</span>
                                            </label>

                                            <div className="mt-[10px] w-full flex flex-col items-center">
                                                {/* File Input */}
                                                <div className="relative w-full flex items-center h-[35px] sm:h-[40px] px-[12px] sm:px-[15px] border border-[#C8C8C8] text-[#9CA3AF] rounded-[7px] bg-transparent text-sm cursor-pointer">
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={handleImageChange}
                                                        className="opacity-0 absolute top-0 left-0 w-full h-full cursor-pointer"
                                                    />
                                                    {selectedImage ? (
                                                        selectedImage
                                                    ) : (
                                                        'Choose Image'
                                                    )}
                                                </div>

                                                {/* Show Image Preview */}

                                            </div>
                                        </div>
                                        <div className='my-[15px]'>
                                            <Dropdown
                                                label="Home "
                                                options={[
                                                    "Active",
                                                    "Inactive",
                                                ]}
                                                defaultValue="Home"
                                                onSelect={(value) => setCategory({ ...category, is_home: value == 'Active' ? 'True' : 'False' })}
                                            />
                                        </div>
                                        <div className='my-[15px]'>
                                            <Dropdown
                                                label="Status"
                                                options={[
                                                    "Active",
                                                    "Inactive",
                                                ]}
                                                defaultValue="Status"
                                                onSelect={(value) => setCategory({ ...category, is_active: value == 'Active' ? 'True' : 'False' })}
                                            />
                                        </div>

                                    </form>

                                </div>
                                <div className=" pt-[30px] flex flex-row-reverse  gap-3">
                                    <button type="button" onClick={handleAddCategory} className="inline-flex  items-center justify-center h-[35px] sm:h-[40px]  shadow-[0px_8px_20px_1px_#3DB0F733] rounded-md bg-primary    w-[154px] py-2 text-sm font-semibold text-white shadow-xs  sm:ml-3 ">Add Sub Category</button>
                                    <button type="button" onClick={() => closeModal()} className=" text-primary items-center closeModal h-[35px] sm:h-[40px]  inline-flex  justify-center rounded-md bg-white    py-2 w-[114px] text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-blue-600 ring-inset hover:bg-gray-50 sm:mt-0 ">Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {modal === 'modal2' && (
                <div className="relative z-10 modal" id="modal1" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                    <div className="fixed inset-0 bg-gray-500/75 transition-opacity" id="overlay"></div>

                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
                            <div className="relative transform overflow-hidden   p-[30px] rounded-[30px] bg-white text-left shadow-xl transition-all sm:my-8  w-full sm:max-w-2xl">
                                <div className="bg-white ">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-xl font-medium text-gray">Edit Sub Category</h3>
                                        <div>
                                            <svg onClick={() => closeModal()} className="closeModal cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="16" height="15" viewBox="0 0 16 15" fill="none">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M1.15128 0.751862C1.61991 0.283233 2.3797 0.283233 2.84833 0.751862L7.9998 5.90333L13.1513 0.751862C13.6199 0.283233 14.3797 0.283233 14.8483 0.751862C15.317 1.22049 15.317 1.98029 14.8483 2.44892L9.69686 7.60039L14.8483 12.7519C15.317 13.2205 15.317 13.9803 14.8483 14.4489C14.3797 14.9175 13.6199 14.9175 13.1513 14.4489L7.9998 9.29745L2.84833 14.4489C2.3797 14.9175 1.61991 14.9175 1.15128 14.4489C0.682647 13.9803 0.682647 13.2205 1.15128 12.7519L6.30275 7.60039L1.15128 2.44892C0.682647 1.98029 0.682647 1.22049 1.15128 0.751862Z" fill="#495567"></path>
                                            </svg>
                                        </div>
                                    </div>
                                    <p className="pt-[14px] text-[#8492A6]">Required fields are marked with&nbsp;<span className="text-[#F44336] ">*</span></p>

                                    <form action="" className="mt-[30px] ">

                                        <div className='mb-[15px]'>
                                            <Searchdropdown
                                                label="Category"
                                                options={categoryOptions.map((val) => val.name)} // Display only names
                                                main_color="text-gray"
                                                value={
                                                    categoryOptions.find((cat) => cat.id == category?.category)?.name
                                                }
                                                labelclassName="text-[#9CA3AF]"
                                                onSelect={(value) => {
                                                    const selectedRoom = categories?.data.find(category => category.name === value);
                                                    console.log(selectedRoom)
                                                    setCategory({ ...category, category: selectedRoom?.category_id });
                                                }}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm  text-gray font-medium">Category Name&nbsp;<span className="text-[z#F44336] ">*</span></label>
                                            <input type="text"
                                                placeholder="Category" value={category?.name} onChange={(e) => setCategory({ ...category, name: e.target.value })} className="mt-[10px] w-[100%]  h-[35px] sm:h-[40px] sm:px-[15px] px-[12px] border border-[#C8C8C8] text-[#9CA3AF] rounded-[7px] bg-transparent  text-sm focus:ring-blue-500 focus:border-blue-500" />
                                        </div>


                                        <div className='my-[15px]'>
                                            <label className="block text-sm  text-gray font-medium">Description</label>
                                            <input type="text"
                                                placeholder="Description" value={category?.description} onChange={(e) => setCategory({ ...category, description: e.target.value })} className="mt-[10px] w-[100%]  h-[35px] sm:h-[40px] sm:px-[15px] px-[12px] border border-[#C8C8C8] text-[#9CA3AF] rounded-[7px] bg-transparent  text-sm focus:ring-blue-500 focus:border-blue-500" />
                                        </div>

                                        <div className="my-[15px]">
                                            <label className="block text-sm text-gray font-medium">
                                                Image&nbsp;<span className="text-[#F44336]">*</span>
                                            </label>

                                            <div className="mt-[10px] w-full flex flex-col items-center">
                                                {/* File Input */}
                                                <div className="relative w-full flex items-center h-[35px] sm:h-[40px] px-[12px] sm:px-[15px] border border-[#C8C8C8] text-[#9CA3AF] rounded-[7px] bg-transparent text-sm cursor-pointer">
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={handleImageChange}
                                                        className="opacity-0 absolute top-0 left-0 w-full h-full cursor-pointer"
                                                    />
                                                    {selectedImage ? (
                                                        selectedImage
                                                    ) : (
                                                        (category.subcategory_img ? category.subcategory_img : 'Choose File')
                                                    )}
                                                </div>

                                                {/* Show Image Preview */}

                                            </div>
                                        </div>

                                        <div className='my-[15px]'>
                                            <Dropdown
                                                label="Home"
                                                options={[
                                                    "Active",
                                                    "Inactive",
                                                ]}
                                                defaultValue="Home"
                                                value={category?.is_home == true ? 'Active' : 'Inactive'}
                                                onSelect={(value) => setCategory({ ...category, is_home: value == 'Active' ? 'True' : 'False' })}
                                            />
                                        </div>
                                        <div className='my-[15px]'>
                                            <Dropdown
                                                label="Status"
                                                options={[
                                                    "Active",
                                                    "Inactive",
                                                ]}
                                                defaultValue="Status"
                                                value={category?.is_active == true ? 'Active' : 'Inactive'}
                                                onSelect={(value) => setCategory({ ...category, is_active: value == 'Active' ? 'True' : 'False' })}
                                            />
                                        </div>

                                    </form>

                                </div>
                                <div className=" pt-[30px] flex flex-row-reverse  gap-3">
                                    <button type="button" onClick={handleEditCategory} className="inline-flex  items-center justify-center h-[35px] sm:h-[40px]  shadow-[0px_8px_20px_1px_#3DB0F733] rounded-md bg-primary    w-[154px] py-2 text-sm font-semibold text-white shadow-xs  sm:ml-3 ">Edit Sub Category</button>
                                    <button type="button" onClick={() => closeModal()} className=" text-primary items-center closeModal h-[35px] sm:h-[40px]  inline-flex  justify-center rounded-md bg-white    py-2 w-[114px] text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 ">Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

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
                                        <p className="pt-[14px] text-[#8492A6]">Are you sure you want to delete this user?</p>


                                    </div>
                                    <div className="  pt-[30px] flex flex-row-reverse gap-3 ">
                                        <button type="button" onClick={handleDeleteCategory} className="inline-flex h-[35px] sm:h-[40px]  w-[114px] shadow-[0px_8px_20px_1px_#F443364D] rounded-md bg-[#F44336] items-center   justify-center py-2 text-sm font-semibold text-white shadow-xs  sm:ml-3 ">Delete</button>
                                        <button type="button" className="mt-3 bg-[#F4F1FC] h-[35px] sm:h-[40px] w-[114px] closeModal   rounded-md border-0   inline-flex justify-center items-center  py-2 text-sm font-semibold  shadow-xs   sm:mt-0 " onClick={closeModal} >Cancel</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }

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
export default daily_logs
