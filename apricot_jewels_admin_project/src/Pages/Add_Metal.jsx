import React, { useState, useRef } from "react";
import { useAddMetalMutation, useGetProducts11Query, } from "../services/apiSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

// Layout Components (✅ make sure these are correctly imported)
import User_side_menu from '../Componenet/user_side_menu'
import EmployList from '../Componenet/EmployList'
import Service_side_menu from '../Componenet/service_side_menu'
import SubHeader from '../Componenet/sub_header'
import { useNavigate } from "react-router-dom";
import Dropdown from "../Componenet/dropdown";

const Add_Metal = () => {

const { refetch } = useGetProducts11Query();
    const navigate = useNavigate();
    const [metal, setMetal] = useState({
        product_id: localStorage.getItem("product_id"),
        metal_type: "",
        metal_purity: "",
        metal_weight_g: "",
        metal_finish: "",
        metal_color: "",
        metal_price: "",
    });

    const [isOpen, setIsOpen] = useState(false);
    const [isOpenside, setIsOpenside] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const [addMetal] = useAddMetalMutation();
    const handleAddMetal = async () => {
        try {
            // Update required fields for metal
            const requiredFields = [
                "metal_type",
                "metal_purity",
                "metal_weight_g",
                "metal_finish",
                "metal_color",
                "metal_price",
                "product_id",
            ];

            for (const field of requiredFields) {
                if (!metal[field]) {
                    toast.error(`Please fill in ${field.replace(/_/g, " ")}`);
                    return;
                }
            }

            const numericFields = ["metal_weight_g", "metal_price"];
            for (const field of numericFields) {
                if (isNaN(metal[field])) {
                    toast.error(`${field.replace(/_/g, " ")} must be a number`);
                    return;
                }
            }

            const formData = new FormData();
            Object.keys(metal).forEach((key) => {
                formData.append(key, metal[key]);
            });

            await addMetal(formData).unwrap();
            toast.success("Metal added successfully!");
            setTimeout(() => {
                navigate("/metal"); // ✅ Update path if needed
            }, 1500);
        } catch (error) {
            
            toast.error(error?.data?.message || "Failed to add metal");
        }
    };




    const [openDropdown, setOpenDropdown] = useState(null);
    const dropdownRefs = useRef({});
    const handleDropdownSelect = (field, value) => {
        setMetal((prev) => ({ ...prev, [field]: value }));
        setOpenDropdown(null);
    };

    const toggleDropdown = (index) => {
        setOpenDropdown((prev) => (prev === index ? null : index));
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
                    <SubHeader setIsOpenside={setIsOpenside} pageName={"Metal"} />
                    <div className="flex justify-between gap-[10px] mb-[27px] flex-wrap items-center max-sm:block"  >
                        <h3 className="text-[24px] font-[700]"> Metal </h3>
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
                                <li className="text-primary font-medium text-[12px]">Add Metal</li>
                            </ol>
                        </nav>

                    </div>


                    <form>
                        <div className=" mt-[20px] max-sm:mt-[10px]  max-sm:p-[15px]    border  bg-white border-[#EBE9F1] shadow-[0px_4px_24px_0px_#0000000F] rounded-[10px] p-[30px] space-y-[15px]">

                            <div className="mb-6 max-sm:mb-5">
                                <h5 className="text-[22px] font-[700] ">Add Metal</h5>
                            </div>

                            {/* Metal Type & Purity */}
                            <div className="mb-[50px]">
                                <div className="border-t border-b border-[#C8C8C8] py-2 mb-5">
                                    <h5 className="font-bold text-gray-400">Metal Information</h5>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-[50px]">
                                    <div>
                                        <Dropdown
                                            label="Metal Type"
                                            options={['Gold', 'Silver', 'Platinum']}
                                            value={metal.metal_type}
                                            // onSelect={(selected) => setMetal({ ...metal, metal_type: selected })}
                                            onSelect={(val) => handleDropdownSelect("metal_type", val)}
                                            isOpen={openDropdown === 0}
                                            onToggle={() => toggleDropdown(0)}
                                            ref={(el) => (dropdownRefs.current[0] = el)}
                                            searchable={true}
                                                    searchfield="Search metal Type"
                                        />
                                    </div>
                                    <div>
                                        <Dropdown
                                            label="Metal Purity"
                                            options={['14K', '18K', '22K', '24K']}
                                            value={metal.metal_purity}
                                            // onSelect={(selected) => setMetal({ ...metal, metal_purity: selected })}
                                            onSelect={(val) => handleDropdownSelect("metal_purity", val)}
                                            isOpen={openDropdown === 1}
                                            onToggle={() => toggleDropdown(1)}
                                            ref={(el) => (dropdownRefs.current[1] = el)}
                                            searchable={true}
                                                    searchfield="Search metal purity"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Metal Specs */}
                            <div className="mb-[50px]">
                                <div className="border-t border-b border-[#C8C8C8] py-2 mb-5">
                                    <h5 className="font-bold text-gray-400">Metal Specifications</h5>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-[50px]">
                                <div>
                                        <Dropdown
                                            label="Metal Color"
                                            options={['Yellow', 'White', 'Rose']}
                                            value={metal.metal_color}
                                            // onSelect={(selected) => setMetal({ ...metal, metal_color: selected })}
                                            onSelect={(val) => handleDropdownSelect("metal_color", val)}
                                            isOpen={openDropdown === 3}
                                            onToggle={() => toggleDropdown(3)}
                                            ref={(el) => (dropdownRefs.current[3] = el)}
                                            searchable={true}
                                                    searchfield="Search metal color"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray font-medium">Metal Weight (g)</label>
                                        <input
                                            type="number"
                                            placeholder="Weight in grams"
                                            value={metal.metal_weight_g}
                                            onChange={(e) => setMetal({ ...metal, metal_weight_g: e.target.value })}
                                            className="mt-[10px] w-full h-[40px] px-[15px] border border-[#C8C8C8] text-[#374151] rounded-[7px] bg-transparent text-sm"
                                        />
                                    </div>

                               


                                    <div>
                                        <Dropdown
                                            label="Metal Finish"
                                            options={['Glossy', 'Matte', 'Antique']}
                                            value={metal.metal_finish}
                                            // onSelect={(selected) => setMetal({ ...metal, metal_finish: selected })}
                                            onSelect={(val) => handleDropdownSelect("metal_finish", val)}
                                            isOpen={openDropdown === 2}
                                            onToggle={() => toggleDropdown(2)}
                                            ref={(el) => (dropdownRefs.current[2] = el)}
                                            searchable={true}
                                                    searchfield="Search metal finish"
                                        />
                                    </div>

                                </div>





                            </div>



                            <div className="my-[50px]">
                                <div className="border-t border-b border-[#C8C8C8] py-2 mb-5">
                                    <h5 className="font-bold text-gray-400">Pricing</h5>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 ">
                                    <div>
                                        <label className="block text-sm text-gray font-medium">Metal Price</label>
                                        <input
                                            type="numb"
                                            placeholder="Price"
                                            value={metal.metal_price}
                                            onChange={(e) => setMetal({ ...metal, metal_price: e.target.value })}
                                            className="mt-[10px] w-full h-[40px] px-[15px] border border-[#C8C8C8] text-[#374151] rounded-[7px] bg-transparent text-sm"
                                        />
                                    </div>
                                </div>
                            </div>







                            {/* Action Buttons */}
                            <div className="pt-[30px] flex flex-row-reverse gap-3">
                                <button
                                    type="button"
                                    onClick={handleAddMetal}
                                    className="shadow-[0px_8px_20px_1px_#3DB0F733] text-white text-[14px] h-[50px] w-[208px] font-bold max-sm:h-[40px] max-sm:w-[180px] flex items-center justify-center gap-2 rounded-[12px] bg-primary border-[1px] hover:border-[rgba(34,117,252,1)] hover:bg-white hover:text-primary"                                >
                                    Add Metal
                                </button>
                                <button
                                    type="button"
                                    onClick={() => navigate('/metal')}
                                    className="shadow-[0px_8px_20px_1px_#3DB0F733] hover:text-white text-[14px] h-[50px] w-[208px] font-bold max-sm:h-[40px] max-sm:w-[180px] flex items-center justify-center gap-2 rounded-[12px] hover:bg-primary border-[1px] border-[rgba(34,117,252,1)] bg-white text-primary  max-sm:hidden"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </form>



                </div>
            </div>
        </div>
    )
}

export default Add_Metal
