import React, { useState, useEffect, useRef } from "react";
import User_side_menu from '../Componenet/user_side_menu';
import { useNavigate } from "react-router-dom";
import EmployList from '../Componenet/EmployList';
import SubHeader from '../Componenet/sub_header';
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useAddSubCategoryMutation, useGetCategoriesQuery } from "../services/apiSlice";
import Dropdown from "../Componenet/dropdown";
import Searchdropdown from '../Componenet/searchdropdown'

const Add_SubCategory = () => {
    const [modal, setModal] = useState(null);

    const openModal = (modalId) => {
        setModal(modalId);
    };

    const [selectedImage, setSelectedImage] = useState(null);
    const [category, setCategory] = useState({
        name: "",
        description: "",
        is_active: "True",
        is_home: "True",
        category: "",
        subcategory_id: "",
        subcategory_img: "",
    });

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

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

    const navigate = useNavigate();



    let categoryOptions = [];
    const { data: categories } = useGetCategoriesQuery();
    if (categories?.data) {
        categoryOptions = categories?.data.map((val) => ({ id: val.category_id, name: val.name })); // Store objects
    }

    const [addCategory] = useAddSubCategoryMutation();

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
            const response = await addCategory(formData).unwrap();
    

            if (response) {
                toast.success(response.message);
                setTimeout(() => {
                    navigate("/sub_category");
                }, 2000);
            }

        } catch (error) {
            toast.error(error.data?.message || "Failed to add category");
        }
    };

    const [openDropdown, setOpenDropdown] = useState(null); // Track which dropdown is open
    const dropdownRefs = useRef([]);

    // Handle image selection
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(URL.createObjectURL(file));
            setCategory((prev) => ({ ...prev, file }));
        }
    };



    // Toggle dropdown visibility
    const toggleDropdown = (index) => {
        setOpenDropdown(openDropdown === index ? null : index);
    };

    // Handle outside click to close dropdown
    const handleClickOutside = (event) => {
        dropdownRefs.current.forEach((ref, index) => {
            if (ref && !ref.contains(event.target)) {
                setOpenDropdown((prev) => (prev === index ? null : prev));
            }
        });
    };

    // Add event listener for outside clicks
    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const [isOpen, setIsOpen] = useState(false);
    const [isOpenside, setIsOpenside] = useState(false);


    const [openDropdown1, setOpenDropdown1] = useState(null);

    const toggleDropdown1 = () => {
        setOpenDropdown1((prev) => (prev === 'subcategory' ? null : 'subcategory'));
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

                <div className="w-full width__right relative max-md:ms-0">
                    <SubHeader pageName={"Category"} />
                    <div className="flex justify-between gap-[10px] mb-[27px] flex-wrap items-center max-sm:block">
                        <h3 className="text-[24px] font-[700]">Sub Category</h3>
                        <div className="flex justify-end items-center max-lg:justify-start">
                            <nav className="text-sm text-gray-600 max-sm:mt-[15px] max-sm:ps-[5px]" aria-label="Breadcrumb">
                                <ol className="flex flex-wrap items-center">
                                    <li className="flex items-center">
                                        <Link to="/dashboard" className="hover:text-primary transition-colors font-[12px] text-[#575864]">Dashboard</Link>
                                        <svg className="mx-2 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <path d="M9 5l7 7-7 7" />
                                        </svg>
                                    </li>
                                    <li className="flex items-center">
                                        <Link to="/sub_category" className="hover:text-primary transition-colors font-[12px] text-[#575864]">SubCategory</Link>
                                        <svg className="mx-2 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <path d="M9 5l7 7-7 7" />
                                        </svg>
                                    </li>
                                    <li className="text-primary font-medium text-[12px]">New SubCategory</li>
                                </ol>
                            </nav>
                        </div>
                    </div>

                    <div className="flex flex-col max-sm:py-[24px] max-sm:px-[15px] gap-6 p-6 rounded-xl bg-white shadow-[0_4px_24px_2px_rgba(20,25,38,0.05)]">

                        <div className="flex items-center max-md:flex-wrap gap-[10px]">
                            <h3 className="text-[#111] text-sm font-bold w-[100%] max-w-[300px] max-lg:w-[200px]">Category <span className="text-[#ff5200]">*</span></h3>

                            <Searchdropdown
                                options={categoryOptions.map((val) => val.name)} // Show only names
                                main_color="text-gray"
                                labelClassName="text-[#9CA3AF]"
                                
                                isOpen={openDropdown1 === 'subcategory'}
                                onToggle={toggleDropdown1}
                                onSelect={(value) => {
                                    const selectedRoom = categories?.data.find((category) => category.name === value);
                                    if (selectedRoom) {
                                        setCategory({ ...category, category: selectedRoom.category_id });
                                    } else {
                                        console.warn('Category not found for selected value:', value);
                                    }
                                }}
                            />



                        </div>


                        <div className="flex items-center max-md:flex-wrap gap-[10px]">
                            <h3 className="text-[#111] text-sm font-bold w-[100%] max-w-[300px] max-lg:w-[200px]">SubCategory name <span className="text-[#ff5200]">*</span></h3>
                            <input
                                className="w-full p-[14px_22px] text-sm font-normal leading-5 bg-transparent border border-[#d6e0ea] rounded-xl text-[#9CA3AF] outline-0 shadow-none overflow-hidden mb-0 font-inter"
                                placeholder="SubCategory name"
                                required
                                type="text"
                                name="name"
                                value={category.name}
                                onChange={(e) => {
                                    const filtered = e.target.value.replace(/[^a-zA-Z\s-]/g, ''); // keep letters, spaces, hyphens
                                    setCategory({ ...category, name: filtered });
                                }}
                            />

                        </div>

                        <div className="flex items-center max-md:flex-wrap gap-[10px]">
                            <h3 className="text-[#111] text-sm font-bold w-[100%] max-w-[300px] max-lg:w-[200px]">Upload images  <span className="text-[#ff5200]">*</span></h3>
                            <div className="w-full relative">
                                <div className={`min-h-[250px] flex items-center w-[100%] p-2 rounded-[12px] border border-dashed  border-[#2275fc] ${selectedImage ? 'justify-start' : 'justify-center'}`}>
                                    {!selectedImage ? (
                                        <label className="flex items-center flex-col justify-center " htmlFor="myFile">
                                            <span className="icon"><svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" viewBox="0 0 489.4 489.4" className=""><g><path d="M382.4 422.75H277.4v-106.1h34.7c8.8 0 14-10 8.8-17.2l-67.5-93.4c-4.3-6-13.2-6-17.5 0l-67.5 93.4c-5.2 7.2-.1 17.2 8.8 17.2h34.7v106.1H94.3c-52.5-2.9-94.3-52-94.3-105.2 0-36.7 19.9-68.7 49.4-86-2.7-7.3-4.1-15.1-4.1-23.3 0-37.5 30.3-67.8 67.8-67.8 8.1 0 15.9 1.4 23.2 4.1 21.7-46 68.5-77.9 122.9-77.9 70.4.1 128.4 54 135 122.7 54.1 9.3 95.2 59.4 95.2 116.1 0 60.6-47.2 113.1-107 117.3z" fill="#2275fc"></path></g></svg></span>
                                            <span className="body-text text-[12px] text-center text-wrap">Drop your images here or select <span className="text-[#2275fc]">click to browse</span></span>
                                            <input
                                                className="absolute w-full h-full cursor-pointer opacity-0 visibility-hidden"
                                                id="myFile"
                                                type="file"
                                                name="filename"
                                                onChange={handleImageChange}
                                            />
                                        </label>
                                    ) : (
                                        <div className="m-4">
                                            {selectedImage ? (
                                                <div className="relative">
                                                    <img
                                                        src={selectedImage}
                                                        alt="Preview"
                                                        className="object-contain rounded-lg max-w-[300px] max-h-[300px] max-sm:max-h-[100%] cursor-pointer"
                                                        onClick={() => document.getElementById('myFile').click()}
                                                    />
                                                    <input
                                                        id="myFile"
                                                        type="file"
                                                        className="hidden"
                                                        onChange={handleImageChange}
                                                    />
                                                </div>
                                            ) : (
                                                <div onClick={() => document.getElementById('myFile').click()} className="cursor-pointer">
                                                    <span className="text-[#2275fc]">Click to upload an image</span>
                                                </div>
                                            )}
                                        </div>

                                    )}
                                </div>

                            </div>
                        </div>






                        <div className='flex items-center max-md:flex-wrap gap-[10px]'>
                            <h3 className="text-[#111] text-sm font-bold w-[100%] max-w-[300px] max-lg:w-[200px]">Description</h3>
                            <textarea
                                placeholder="Description"
                                onChange={(e) => setCategory({ ...category, description: e.target.value })}
                                className="pt-[5px] w-[100%] max-sm:h-[100px] h-[120px] px-[15px] max-sm:px-[12px] border border-[#C8C8C8] text-[#9CA3AF] rounded-[7px] bg-transparent text-sm focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div className="flex items-center max-md:flex-wrap gap-[10px]">
                            <h3 className="text-[#111] text-sm font-bold w-[100%] max-w-[300px] max-lg:w-[200px]">Home</h3>
                            <div className="relative w-full flex gap-4 items-center">
                                <label className="flex items-center gap-1 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={category.is_home === "True"}
                                        onChange={() =>
                                            setCategory({ ...category, is_home: "True" })
                                        }
                                    />
                                    <span className="text-sm">Active</span>
                                </label>
                                <label className="flex items-center gap-1 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={category.is_home === "False"}
                                        onChange={() =>
                                            setCategory({ ...category, is_home: "False" })
                                        }
                                    />
                                    <span className="text-sm">Inactive</span>
                                </label>
                            </div>
                        </div>
                        <div className="flex items-center max-md:flex-wrap gap-[10px] ">
                            <h3 className="text-[#111] text-sm font-bold w-[100%] max-w-[300px] max-lg:w-[200px]">Status</h3>
                            <div className="relative w-full flex gap-4 items-center">

                                <label className="flex items-center gap-1 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={category.is_active === "True"}
                                        onChange={() =>
                                            setCategory({ ...category, is_active: "True" })
                                        }
                                    />
                                    <span className="text-sm">Active</span>
                                </label>
                                <label className="flex items-center gap-1 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={category.is_active === "False"}
                                        onChange={() =>
                                            setCategory({ ...category, is_active: "False" })
                                        }
                                    />
                                    <span className="text-sm">Inactive</span>
                                </label>
                            </div>
                        </div>
                        <div className="flex items-center max-md:flex-wrap gap-[10px]">
                            <h3 className="text-[#111] text-sm font-bold w-[100%] max-w-[300px] max-lg:w-[150px]"></h3>
                            <button
                                className="h-[50px] w-[200px] px-[22px] py-[15px] text-white flex items-center justify-center gap-2 font-inter text-sm font-bold leading-5 border border-[#2275fc] rounded-[12px] bg-[#2275fc] max-md:w-full"
                                onClick={handleAddCategory}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <div
                    className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-75 z-50"
                    onClick={closeModal}
                >
                    <div className="relative">
                        <img
                            src={modalImage}
                            alt="Zoomed"
                            className="w-auto h-auto max-w-[90%] max-h-[90%] rounded-lg shadow-lg"
                        />
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

export default Add_SubCategory
