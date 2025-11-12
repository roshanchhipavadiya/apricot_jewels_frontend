import React, { useState, useRef, useEffect } from "react";
import { useAddDiamondMutation, useGetProducts11Query } from "../services/apiSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useLocation } from "react-router-dom";
import Select from 'react-select';
// Layout Components (✅ make sure these are correctly imported)
import User_side_menu from '../Componenet/user_side_menu'
import EmployList from '../Componenet/EmployList'
import Service_side_menu from '../Componenet/service_side_menu'
import SubHeader from '../Componenet/sub_header'
import { useNavigate } from "react-router-dom";
import Dropdown from "../Componenet/dropdown";

const Add_Diamond = ({ closeModal }) => {

    const location = useLocation()
    const diamond_id = location.state?.diamond_id
    console.log(diamond_id);

    const navigate = useNavigate();
    const { refetch } = useGetProducts11Query();
    const [diamond, setDiamond] = useState({
        product_id: localStorage.getItem("product_id"),
        diamond_weight_ct: "",
        diamond_count: "",
        diamond_shape: "",
        diamond_setting: "",
        diamond_clarity_grade: "",
        diamond_color_grade: "",
        diamond_cut: "",
        diamond_fluorescence: "",
        diamond_certification: "",
        diamond_origin: "",
        total_diamond_price: "",
        vpo: diamond_id,
        component: "Accent Stone", // ✅
    });

    const [isOpen, setIsOpen] = useState(false);
    const [isOpenside, setIsOpenside] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const [addDiamond] = useAddDiamondMutation();
    const handleAddDiamonds = async () => {
        try {
            // Validate required fields
            const requiredFields = [
                "diamond_weight_ct",
                "diamond_count",
                "diamond_shape",
                "diamond_setting",
                "diamond_clarity_grade",
                "diamond_color_grade",
                "diamond_cut",
                "diamond_fluorescence",
                "diamond_certification",

                "total_diamond_price",
                "component",
            ];


            for (const field of requiredFields) {
                if (!diamond[field]) {
                    toast.error(`Please fill in ${field.replace(/_/g, " ")}`);
                    return;
                }
            }

            // Optional: Validate numeric fields and provide default value of 0 if empty
            const numericFields = ["diamond_weight_ct", "diamond_count", "total_diamond_price"];
            for (const field of numericFields) {
                if (diamond[field] === "" || isNaN(diamond[field])) {
                    toast.error(`${field.replace(/_/g, " ")} must be a valid number`);
                    return;
                }
            }

            // Ensure diamond numeric fields have valid default values if missing
            const validatedDiamond = {
                ...diamond,
                diamond_weight_ct: Number(diamond.diamond_weight_ct) || 0,
                diamond_count: Number(diamond.diamond_count) || 0,
                total_diamond_price: Number(diamond.total_diamond_price) || 0,
            };

            const formData = new FormData();
            Object.keys(validatedDiamond).forEach((key) => {
                // Only append `vpo` if `diamond_id` exists
                if (key === 'vpo') {
                    if (diamond_id) {
                        formData.append(key, validatedDiamond[key]);
                    }
                  
                } else {
                    formData.append(key, validatedDiamond[key]);
                }
               
            });


            // Submit the form data (addDiamond should be defined elsewhere, e.g., via RTK Query or API call)
            const res = await addDiamond(formData).unwrap();


            toast.success("Diamond added successfully!");
            setTimeout(() => {
                navigate('/diamond');
            }, 1500);


        } catch (error) {

            toast.error(error?.data?.message || "Failed to add diamond");
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDiamond({
            ...diamond,
            [name]: name === "diamond_weight_ct" || name === "diamond_count" || name === "total_diamond_price"
                ? (value === "" ? 0 : Number(value)) // convert to 0 if empty
                : value,
        });
    };


    const [openDropdown, setOpenDropdown] = useState(null);
    const dropdownRefs = useRef({});


    const toggleDropdown = (index) => {
        setOpenDropdown((prev) => (prev === index ? null : index));
    };


    // ----------------------------------------
    const [searchTerms, setSearchTerms] = useState({});


    const clarityOptions = ["SI2", "SI", "VS", "VVS", "IF"].map(val => ({ label: val, value: val }));
    const colorOptions = ["D", "E", "F", "G", "H", "I", "J"].map(val => ({ label: val, value: val }));

    const handleDropdownSelect = (key, value) => {
        setDiamond(prev => ({
            ...prev,
            [key]: value
        }));
        setOpenDropdown(false)
    };

    return (
        <div>
            <ToastContainer
                position="top-center"
                autoClose={1500}
            />
            <User_side_menu setIsOpen={setIsOpen} isOpenside={isOpenside} />
            <div className="flex inter">
                <EmployList isOpen={isOpen} setIsOpen={setIsOpen} />
                <Service_side_menu isOpenside={isOpenside} setIsOpenside={setIsOpenside} />
                <div className="w-full width__right relative max-md:ms-0">
                    <SubHeader setIsOpenside={setIsOpenside} pageName={"Diamond"} />



                    <div className="flex justify-between gap-[10px] mb-[27px] flex-wrap items-center max-sm:block"   >
                        <h3 className="text-[24px] font-[700] "> Diamond </h3>
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
                                <li className="text-primary font-medium text-[12px]">Add Daimond</li>
                            </ol>
                        </nav>
                    </div>

                    <div>
                        <div className=" mt-[20px] max-sm:mt-[10px]  max-sm:p-[15px]    border  bg-white border-[#EBE9F1] shadow-[0px_4px_24px_0px_#0000000F] rounded-[10px] p-[30px] space-y-[15px]">
                            <div className="mb-6 max-sm:mb-5">
                                <h5 className="text-[22px] font-[700] ">Add Diamond</h5>
                            </div>

                            <div className="flex  gap-6 w-[100%]">

                                <form className="w-[100%]">
                                    <div className="mb-[50px]">
                                        <div className="border-t-[1px] border-b-[1px] border-[#C8C8C8] py-2 mb-5  ">
                                            <h5 className="font-bold text-gray-400">General Information</h5>
                                        </div>
                                        <div className="grid grid-cols-3 gap-5 max-lg:grid-cols-2 max-sm:grid-cols-1 max-sm:gap-3">
                                            {
                                                !diamond_id ? (
                                                    <div className=''>
                                                        <Dropdown
                                                            label="Component"
                                                            options={["Main Stone", "Accent Stone"]}
                                                            value={diamond.component}
                                                            // onSelect={(selected) => setDiamond({ ...diamond, component: selected })}
                                                            onSelect={(val) => handleDropdownSelect("component", val)}
                                                            isOpen={openDropdown === 1}
                                                            onToggle={() => toggleDropdown(1)}
                                                            ref={(el) => (dropdownRefs.current[1] = el)}
                                                        />
                                                    </div>
                                                ) : (
                                                    ""
                                                )
                                            }

                                            <div className=''>
                                                <Dropdown
                                                    label="Diamond Shape"
                                                    options={[
                                                        "Asscher",
                                                        "Baguette",
                                                        "Briolette",
                                                        "Bullet",
                                                        "Calf",
                                                        "Cushion",
                                                        "Cushion Brilliant",
                                                        "Emerald",
                                                        "European",
                                                        "Flanders",
                                                        "Half",
                                                        "Heart",
                                                        "Hexagonal",
                                                        "Kite",
                                                        "Lozenge",
                                                        "Marquise",
                                                        "Octagonal",
                                                        "Old",
                                                        "Other",
                                                        "Oval",
                                                        "Pear",
                                                        "Pentagonal",
                                                        "Princess",
                                                        "Radiant",
                                                        "Rose",
                                                        "Round",
                                                        "Shield",
                                                        "Sq.Emerald",
                                                        "Sq.Radiant",
                                                        "Square",
                                                        "Star",
                                                        "Tapered",
                                                        "Trapezoid",
                                                        "Tapered Bullet",
                                                        "Triangular",
                                                        "Trilliant"
                                                    ]
                                                    }
                                                    value={diamond.diamond_shape}
                                                    onSelect={(val) => handleDropdownSelect("diamond_shape", val)}
                                                    isOpen={openDropdown === 0}
                                                    onToggle={() => toggleDropdown(0)}
                                                    ref={(el) => (dropdownRefs.current[0] = el)}
                                                    searchable={true}
                                                    searchfield="Search diamond shape"
                                                />
                                            </div>

                                            <div className=''>
                                                <label className="block text-sm  text-gray font-medium">Origin</label>
                                                <input
                                                    type="text"
                                                    placeholder="Diamond origin"
                                                    value={diamond.diamond_origin}
                                                    onChange={(e) => {
                                                        const lettersOnly = e.target.value.replace(/[^a-zA-Z\s]/g, ''); // Filter non-alphabetic characters and spaces
                                                        setDiamond({ ...diamond, diamond_origin: lettersOnly }); // Set filtered value
                                                    }}
                                                    className="mt-[10px] w-[100%] h-[40px] sm:px-[15px] px-[12px] border border-[#C8C8C8] text-[#9CA3AF] rounded-[7px] bg-transparent text-sm focus:ring-blue-500 focus:border-blue-500"
                                                />

                                            </div>
                                            <div className=''>
                                                <label className="block text-sm  text-gray font-medium">Diamond Count</label>
                                                <input type="number"
                                                    placeholder="Diamond count" value={diamond.diamond_count} onChange={(e) => setDiamond({ ...diamond, diamond_count: e.target.value })} className="mt-[10px] w-[100%]    h-[40px] sm:px-[15px] px-[12px] border border-[#C8C8C8] text-[#9CA3AF] rounded-[7px] bg-transparent  text-sm focus:ring-blue-500 focus:border-blue-500" />
                                            </div>
                                            <div className=''>

                                                <Dropdown
                                                    label="Cut"
                                                    options={["Excellent", "Very Good", "Good", "Fair"]}
                                                    value={diamond.diamond_cut}
                                                    // onSelect={(selected) => setDiamond({ ...diamond, diamond_cut: selected })}
                                                    onSelect={(val) => handleDropdownSelect("diamond_cut", val)}
                                                    isOpen={openDropdown === 2}
                                                    onToggle={() => toggleDropdown(2)}
                                                    ref={(el) => (dropdownRefs.current[2] = el)}
                                                    searchable={true}
                                                    searchfield="Search Diamond cut"
                                                />
                                            </div>
                                        </div>


                                    </div>

                                    <div className="mb-[50px]">
                                        <div className="border-t-[1px] border-b-[1px] border-[#C8C8C8] py-2 mb-5 max-sm:gap-3 ">
                                            <h5 className="font-bold text-gray-400">Quality Details</h5>
                                        </div>
                                        <div className="grid grid-cols-3 max-lg:grid-cols-2 gap-5 max-sm:grid-cols-1">
                                            <div className=''>
                                                <label className="block text-sm  text-gray font-medium">Diamond Weight Ct</label>
                                                <Select
                                                    isMulti={diamond.component === "Accent Stone"} // 👈 conditionally multi-select
                                                    options={clarityOptions}
                                                    placeholder="Select Clarity Grade"
                                                    value={
                                                        diamond.component === "Accent Stone"
                                                            ? clarityOptions.filter(opt => diamond.diamond_clarity_grade?.includes(opt.value))
                                                            : clarityOptions.find(opt => opt.value === diamond.diamond_clarity_grade)
                                                    }
                                                    onChange={(selected) => {
                                                        const value = Array.isArray(selected)
                                                            ? selected.map((s) => s.value)
                                                            : selected?.value || "";
                                                        handleDropdownSelect("diamond_clarity_grade", value);
                                                    }}
                                                    className="mt-[10px] w-[100%]  h-[40px]   border border-[#C8C8C8] text-[#9CA3AF] rounded-[7px] bg-transparent  text-sm focus:ring-blue-500 focus:border-blue-500"
                                                    classNamePrefix="react-select"
                                                />

                                            </div>
                                            <div className=''>
                                                <label className="block text-sm  text-gray font-medium">Diamond Weight Ct</label>
                                                <Select
                                                    isMulti={diamond.component === "Accent Stone"}
                                                    options={colorOptions}
                                                    placeholder="Select Color Grade"
                                                    value={
                                                        diamond.component === "Accent Stone"
                                                            ? colorOptions.filter(opt => diamond.diamond_color_grade?.includes(opt.value))
                                                            : colorOptions.find(opt => opt.value === diamond.diamond_color_grade)
                                                    }
                                                    onChange={(selected) => {
                                                        const value = Array.isArray(selected)
                                                            ? selected.map((s) => s.value)
                                                            : selected?.value || "";
                                                        handleDropdownSelect("diamond_color_grade", value);
                                                    }}
                                                    className="mt-[10px] w-[100%]  h-[40px]  border border-[#C8C8C8] text-[#9CA3AF] rounded-[7px] bg-transparent  text-sm focus:ring-blue-500 focus:border-blue-500"
                                                    classNamePrefix="react-select"
                                                />

                                            </div>
                                            <div >
                                                <Dropdown
                                                    label="Fluorescence"
                                                    options={['None', 'Faint', 'Medium', 'Strong']}
                                                    value={diamond.diamond_fluorescence}
                                                    // onSelect={(selected) => setDiamond({ ...diamond, diamond_fluorescence: selected })}
                                                    onSelect={(val) => handleDropdownSelect("diamond_fluorescence", val)}
                                                    isOpen={openDropdown === 5}
                                                    onToggle={() => toggleDropdown(5)}
                                                    ref={(el) => (dropdownRefs.current[5] = el)}
                                                    searchable={true}
                                                    searchfield="Search Diamond fluorescence"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="">
                                        <div className="border-t-[1px] border-b-[1px] border-[#C8C8C8] py-2 mb-5 max-sm:gap-3 ">
                                            <h5 className="font-bold text-gray-400">Certification & Pricing</h5>
                                        </div>

                                        <div className="grid grid-cols-3 max-lg:grid-cols-2 gap-5 max-sm:grid-cols-1 max-sm:gap-3">
                                            <div >
                                                <Dropdown
                                                    label="Diamond Setting"
                                                    options={['Prong', 'Bezel', 'Channel', 'Pave']}
                                                    value={diamond.diamond_setting}
                                                    // onSelect={(selected) => setDiamond({ ...diamond, diamond_setting: selected })}
                                                    onSelect={(val) => handleDropdownSelect("diamond_setting", val)}
                                                    isOpen={openDropdown === 6}
                                                    onToggle={() => toggleDropdown(6)}
                                                    ref={(el) => (dropdownRefs.current[6] = el)}
                                                    searchable={true}
                                                    searchfield="Search Diamond setting
                                                    "
                                                />
                                            </div>
                                            <div>
                                                <Dropdown
                                                    label="Certification"
                                                    options={["IGI", "GIA", "SGL", "HRD", "None"]}
                                                    value={diamond.diamond_certification}
                                                    // onSelect={(selected) => setDiamond({ ...diamond, diamond_certification: selected })}
                                                    onSelect={(val) => handleDropdownSelect("diamond_certification", val)}
                                                    isOpen={openDropdown === 7}
                                                    onToggle={() => toggleDropdown(7)}
                                                    ref={(el) => (dropdownRefs.current[7] = el)}
                                                    searchable={true}
                                                    searchfield="Search Diamond certification"
                                                />
                                            </div>
                                            <div className=''>
                                                <label className="block text-sm  text-gray font-medium">Diamond Weight Ct</label>
                                                <input type="number"
                                                    placeholder="Diamond Weight" value={diamond.diamond_weight_ct} onChange={(e) => setDiamond({ ...diamond, diamond_weight_ct: e.target.value })} className="mt-[10px] w-[100%]  h-[40px] sm:px-[15px] px-[12px] border border-[#C8C8C8] text-[#9CA3AF] rounded-[7px] bg-transparent  text-sm focus:ring-blue-500 focus:border-blue-500" />
                                            </div>
                                            <div>
                                                <label className="block text-sm  text-gray font-medium">Total Diamond Price</label>
                                                <input type="number"
                                                    placeholder="Total diamond Price" value={diamond.total_diamond_price} onChange={(e) => setDiamond({ ...diamond, total_diamond_price: e.target.value })} className="mt-[10px] w-[100%] h-[40px] sm:px-[15px] px-[12px] border border-[#C8C8C8] text-[#9CA3AF] rounded-[7px] bg-transparent  text-sm focus:ring-blue-500 focus:border-blue-500" />

                                            </div>
                                        </div>
                                        <div className="pt-[30px]    flex flex-row-reverse gap-3 ">
                                            <button
                                                type="button"
                                                onClick={handleAddDiamonds}
                                                className="shadow-[0px_8px_20px_1px_#3DB0F733] text-white text-[14px] h-[50px] w-[208px] font-bold max-sm:h-[40px] max-sm:w-[180px] flex items-center justify-center gap-2 rounded-[12px] bg-primary border-[1px] hover:border-[rgba(34,117,252,1)] hover:bg-white hover:text-primary"
                                            >
                                                Add Diamonds
                                            </button>
                                            <Link to="/diamond" className="max-sm:hidden">
                                                <button
                                                    type="button"
                                                    onClick={closeModal}
                                                    className="shadow-[0px_8px_20px_1px_#3DB0F733] hover:text-white text-[14px] h-[50px] w-[208px] font-bold max-sm:h-[40px] max-sm:w-[180px] flex items-center justify-center gap-2 rounded-[12px] hover:bg-primary border-[1px] border-[rgba(34,117,252,1)] bg-white text-primary "
                                                >
                                                    Cancel
                                                </button>

                                            </Link>
                                        </div>

                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Add_Diamond;








// Sure! Here's a clean **table format** for your `Metal` model fields — useful for documentation, planning, or frontend/backend devs:

// ---

// ### 🧱 Metal Model - Table Format

// | Field Name       | Field Type           | Choices / Format                                         | Description                                |
// |------------------|----------------------|-----------------------------------------------------------|--------------------------------------------|
// | `metal_id`       | AutoField (PK)       | —                                                         | Primary key (auto-increment ID)            |
// | `metal_type`     | CharField (max=100)  | `Gold`, `Silver`, `Platinum`                              | Type of metal                              |
// | `metal_purity`   | CharField (max=50)   | `14K`, `18K`, `22K`, `24K`                                | Purity level of the metal                  |
// | `metal_weight_g` | DecimalField (6, 2)  | e.g., `12.50`                                             | Weight of the metal in grams               |
// | `metal_finish`   | CharField (max=50)   | `Glossy`, `Matte`, `Antique` (optional)                   | Surface finish of the metal                |
// | `metal_color`    | CharField (max=50)   | `Yellow`, `White`, `Rose` (optional)                      | Color of the metal                         |
// | `metal_price`    | DecimalField (10, 2) | e.g., `45000.00`                                          | Price of the metal                         |
// | `product`        | ForeignKey           | References `Product` model                                | Product this metal belongs to              |
// | `created_at`     | DateTimeField        | Auto generated on create                                  | Timestamp of record creation               |
// | `updated_at`     | DateTimeField        | Auto generated on update                                  | Timestamp of last update                   |

// ---

// Let me know if you want a **Django admin UI table layout**, a **frontend table (HTML/React)**, or want to show **multiple metals linked to a product**.






// Field Name	Field Type	Choices / Format	Description
// diamond_id	AutoField (PK)	—	Primary key (auto-increment ID)
// component	CharField (max=50)	'Main Stone', 'Accent Stone'	Defines the role of the diamond in the product

// 🔹 Diamond Specifications
// diamond_weight_ct	DecimalField (5, 3)	e.g., 0.250	Weight of the diamond in carats
// diamond_count	PositiveIntegerField	e.g., 5	Total number of diamonds
// diamond_shape	CharField (max=50)	'None', 'Round', 'Princess', 'Cushion', 'Emerald', 'Oval', 'Marquise', 'Pear', 'Heart', 'Radiant'	Shape of the diamond


// Diamond Quality & Grading
// diamond_clarity_grade	CharField (max=50)	'SI2', 'SI', 'VS', 'VVS', 'IF'	Clarity grading of the diamond
// diamond_color_grade	CharField (max=50)	'D', 'E', 'F', 'G', 'H', 'I', 'J'	Color grading of the diamond
// diamond_cut	CharField (max=50)	'Excellent', 'Very Good', 'Good', 'Fair'	Cut grade of the diamond


// diamond_fluorescence	CharField (max=50)	'None', 'Faint', 'Medium', 'Strong'	_
// diamond_setting	CharField (max=50)	'Prong', 'Bezel', 'Channel', 'Pave'	Setting type used to mount the diamond