import React, { useState, useEffect, useRef } from "react";
import User_side_menu from '../Componenet/user_side_menu';
import { useNavigate } from "react-router-dom";
import EmployList from '../Componenet/EmployList';
import SubHeader from '../Componenet/sub_header';
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useAddCategoryMutation } from "../services/apiSlice";
import Dropdown from "../Componenet/dropdown";

const Add_category = () => {
    const [modal, setModal] = useState(null);

    const openModal = (modalId) => {
     
        setModal(modalId);
    };

    const [selectedImage, setSelectedImage] = useState(null);
    const [category, setCategory] = useState({
        name: "",
        description: "",
        file: "",
        is_home: "True",
        is_active: "True",
        category_type: ""
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

    const [addCategory] = useAddCategoryMutation();

    const handleAddCategory = async () => {
        try {
            // === Validation ===
            if (!category.name?.trim()) {
                return toast.error("Category name is required");
            }



            if (!category.category_type) {
                return toast.error("Please select a category type");
            }

            if (category.is_active === "") {
                return toast.error("Please select active status");
            }

            if (category.is_home === "") {
                return toast.error("Please select homepage status");
            }

            if (!selectedImage) {
                return toast.error("Please upload an image");
            }

            let formData = new FormData();

            // Append form data
            formData.append("name", category.name.trim());
            formData.append("description", category.description.trim());
            formData.append("is_active", category.is_active);
            formData.append("category_type", category.category_type);
            formData.append("is_home", category.is_home);

            // Append the image file directly
            formData.append("category_img", category.file);

            const response = await addCategory(formData).unwrap();
          

            if (response) {
                toast.success(response.message);
                setTimeout(() => {
                    navigate("/category");
                }, 2000);
            }

        } catch (error) {
          
            toast.error(error?.data?.message || "Failed to add category");
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


    // ----------------------------
    const [searchTerm, setSearchTerm] = useState("");

    // Category options
    const categoryOptions = [
      "Jewelry",
      "Diamond",
      "Engagement",
      "Wedding",
      "High Jewelry",
      "Collections",
      "Gifts",
    ];
  
    // Filter options based on search term
    const filteredOptions = categoryOptions.filter((option) =>
      option.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    // Handle category selection
    const handleCategorySelect = (value) => {
      setCategory({ ...category, category_type: value });
      setOpenDropdown(null); // Close dropdown after selection
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
                        <h3 className="text-[24px] font-[700]"> Category</h3>
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
                                        <Link to="/category" className="hover:text-primary transition-colors font-[12px] text-[#575864]">Category</Link>
                                        <svg className="mx-2 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <path d="M9 5l7 7-7 7" />
                                        </svg>
                                    </li>
                                    <li className="text-primary font-medium text-[12px]">New Category</li>
                                </ol>
                            </nav>
                        </div>
                    </div>

                    <div className="flex flex-col max-sm:py-[24px] max-sm:px-[15px] gap-6 p-6 rounded-xl bg-white shadow-[0_4px_24px_2px_rgba(20,25,38,0.05)]">
                        <div className="flex items-center max-md:flex-wrap gap-[10px]">
                            <h3 className="text-[#111] text-sm font-bold w-[100%] max-w-[300px] max-lg:w-[200px]">Category name <span className="text-[#ff5200]">*</span></h3>
                            <input
                                className="w-full p-[14px_22px] text-sm font-normal leading-5 bg-transparent border border-[#d6e0ea] rounded-xl text-[#9CA3AF] outline-0 shadow-none overflow-hidden mb-0 font-inter"
                                placeholder="Category name"
                                required
                                type="text"
                                name="name"
                                value={category.name}
                                onChange={(e) => {
                                    const lettersOnly = e.target.value.replace(/[0-9]/g, ''); // Remove digits
                                    setCategory({ ...category, name: lettersOnly });
                                }}
                            />

                        </div>

                        <div className="flex items-center max-md:flex-wrap gap-[10px]">
                            <h3 className="text-[#111] text-sm font-bold w-[100%] max-w-[300px] max-lg:w-[200px]">Upload images  <span className="text-[#ff5200]">*</span></h3>
                            <div className="w-full relative">
                                <div className={`min-h-[250px] flex items-center w-[100%] rounded-[12px] border max-sm:p-2 border-dashed border-[#2275fc] ${selectedImage ? 'justify-start' : 'justify-center'}`}>
                                    {!selectedImage ? (
                                        <label className="flex items-center flex-col justify-center overflow-hidden" htmlFor="myFile">
                                            <span className="icon">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" viewBox="0 0 489.4 489.4" className="">
                                                    <g>
                                                        <path
                                                            d="M382.4 422.75H277.4v-106.1h34.7c8.8 0 14-10 8.8-17.2l-67.5-93.4c-4.3-6-13.2-6-17.5 0l-67.5 93.4c-5.2 7.2-.1 17.2 8.8 17.2h34.7v106.1H94.3c-52.5-2.9-94.3-52-94.3-105.2 0-36.7 19.9-68.7 49.4-86-2.7-7.3-4.1-15.1-4.1-23.3 0-37.5 30.3-67.8 67.8-67.8 8.1 0 15.9 1.4 23.2 4.1 21.7-46 68.5-77.9 122.9-77.9 70.4.1 128.4 54 135 122.7 54.1 9.3 95.2 59.4 95.2 116.1 0 60.6-47.2 113.1-107 117.3z"
                                                            fill="#2275fc"
                                                        />
                                                    </g>
                                                </svg>
                                            </span>
                                            <span className="body-text text-[12px] text-center">Drop your images here or select <span className="text-[#2275fc]">click to browse</span></span>
                                            <input
                                                className="absolute w-full h-full cursor-pointer opacity-0 visibility-hidden"
                                                id="myFile"
                                                type="file"
                                                name="filename"
                                                onChange={handleImageChange}
                                            />
                                        </label>
                                    ) : (
                                        <div className="m-4 max-md:m-1 overflow-hidden flex flex-col items-center justify-center">
                                            {selectedImage ? (
                                                <div className="relative">
                                                    <img
                                                        src={selectedImage}
                                                        alt="Preview"
                                                        className="object-contain rounded-lg max-w-[300px]  max-sm:max-h-[100%] cursor-pointer"
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
                                                <div
                                                    onClick={() => document.getElementById('myFile').click()}
                                                    className="cursor-pointer text-center"
                                                >
                                                    <span className="text-[#2275fc]">Click to upload an image</span>
                                                </div>
                                            )}
                                        </div>


                                    )}
                                </div>

                            </div>
                        </div>



                        <div className="flex items-center max-md:flex-wrap gap-[10px]">
                            <h3 className="text-[#111] text-sm font-bold w-[100%] max-w-[300px] max-lg:w-[200px]">Select Category Type</h3>
                            <div className="relative w-full">
                                {/* <Dropdown
                                    label="Category Type"
                                    options={[
                                        "Jewelry",
                                        "Diamond",
                                        "Engagement",
                                        "Wedding",
                                        "High Jewelry",
                                        "Collections",
                                        "Gifts",
                                    ]}
                                    value={category.category_type || "Category Type"} // Ensure controlled value
                                    onSelect={(value) => {
                                        setCategory({ ...category, category_type: value });
                                        setOpenDropdown(null); // Close dropdown
                                    }}
                                    isOpen={openDropdown === 2}
                                    onToggle={() => toggleDropdown(2)}
                                    ref={(el) => (dropdownRefs.current[2] = el)}
                                /> */}

                                <Dropdown
                                  
                                    options={filteredOptions} // Pass filtered options here
                                    value={category.category_type || "Category Type"} // Ensure controlled value
                                    onSelect={handleCategorySelect}
                                    isOpen={openDropdown === 2}
                                    onToggle={() => setOpenDropdown(openDropdown === 2 ? null : 2)}
                                    searchfield="Search Category" // Optional: can be changed to display the default search text
                                    searchable={true} // Enable search functionality
                                />
                                {/* Optional: Add a search bar outside the dropdown if you want the user to be able to search directly */}
                            


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

                        {/* <div className="flex items-center max-md:flex-wrap gap-[10px]">
                            <h3 className="text-[#111] text-sm font-bold w-[100%] max-w-[300px]">Home</h3>
                             <div className="relative w-full">
                                <Dropdown
                                    label="Select Home"
                                    options={["Active", "Inactive"]}
                                    defaultValue={category.is_home === "True" ? "Active" : "Inactive"}
                                    onSelect={(value) => handleDropdownSelect("home", value)}
                                    isOpen={openDropdown === 0}
                                    onToggle={() => toggleDropdown(0)}
                                    ref={(el) => (dropdownRefs.current[0] = el)} 
                                />
                            </div>
                            <input type="cheackbox"></input>
                        </div>

                        
                        <div className="flex items-center max-md:flex-wrap gap-[10px]">
                            <h3 className="text-[#111] text-sm font-bold w-[100%] max-w-[300px]">Status</h3>
                             <div className="relative w-full">
                                <Dropdown
                                    label="Select Status"
                                    options={["Active", "Inactive"]}
                                    defaultValue={category.is_active === "True" ? "Active" : "Inactive"}
                                    onSelect={(value) => handleDropdownSelect("status", value)}
                                    isOpen={openDropdown === 1}
                                    onToggle={() => toggleDropdown(1)}
                                    ref={(el) => (dropdownRefs.current[1] = el)}
                                />
                            </div>
                        </div> */}


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
    );
};

export default Add_category;
