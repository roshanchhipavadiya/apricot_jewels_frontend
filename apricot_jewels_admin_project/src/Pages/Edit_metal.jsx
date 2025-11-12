import React, { useEffect, useState, useRef } from "react";
import { useEditMetalMutation, useGetMetalQuery, useGetProducts11Query } from "../services/apiSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useLocation, useNavigate } from "react-router-dom";

// Layout Components
import User_side_menu from '../Componenet/user_side_menu';
import EmployList from '../Componenet/EmployList';
import Service_side_menu from '../Componenet/service_side_menu';
import SubHeader from '../Componenet/sub_header';
import Dropdown from "../Componenet/dropdown";




const Edit_metal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenside, setIsOpenside] = useState(false);
    const { refetch } = useGetProducts11Query();
    const location = useLocation();
    const metalId = location.state?.metalId;
    const navigate = useNavigate()

    const [metal, setMetal] = useState({
        metal_id: metalId,
        metal_type: "",
        metal_purity: "",
        metal_weight_g: "",
        metal_finish: "",
        metal_color: "",
        metal_price: "",
    });

    const [editMetal] = useEditMetalMutation();
    const { data: fetchedMetal, isSuccess } = useGetMetalQuery({ metal_id: metalId });
    console.log(fetchedMetal?.data);

    const metalData = fetchedMetal?.data
    console.log(metalData);


    const [openDropdown, setOpenDropdown] = useState(null);
    const dropdownRefs = useRef({});


    useEffect(() => {
        if (isSuccess && fetchedMetal?.data) {
            const metalData = fetchedMetal.data;
            console.log(metalData);


            setMetal((prev) => ({
                ...prev,
                metal_id: metalData.metal_id || prev.metal_id,
                metal_type: metalData.metal_type || "",
                metal_purity: metalData.metal_purity || "",
                metal_weight_g: metalData.metal_weight_g || "",
                metal_finish: metalData.metal_finish || "",
                metal_color: metalData.metal_color || "",
                metal_price: metalData.metal_price || "",
            }));
        }
    }, [isSuccess, fetchedMetal]);


    const handleDropdownSelect = (field, value) => {
        setMetal((prev) => ({ ...prev, [field]: value }));
        setOpenDropdown(null);
    };

    const toggleDropdown = (index) => {
        setOpenDropdown((prev) => (prev === index ? null : index));
    };



    const handleEditMetal = async () => {
        try {
            // === Validation ===
            if (!metal.metal_type) return toast.error("Metal type is required");
            if (!metal.metal_purity) return toast.error("Metal purity is required");
            if (!metal.metal_weight_g || isNaN(metal.metal_weight_g)) return toast.error("Weight (g) must be a valid number");
            if (!metal.metal_finish) return toast.error("Metal finish is required");
            if (!metal.metal_color) return toast.error("Metal color is required");
            if (!metal.metal_price || isNaN(metal.metal_price)) return toast.error("Metal price must be a valid number");

            // === Build FormData ===
            const formData = new FormData();
            formData.append("metal_id", metal.metal_id);
            formData.append("metal_type", metal.metal_type);
            formData.append("metal_purity", metal.metal_purity);
            formData.append("metal_weight_g", parseFloat(metal.metal_weight_g).toFixed(2));  // Stringify decimal
            formData.append("metal_finish", metal.metal_finish);
            formData.append("metal_color", metal.metal_color);
            formData.append("metal_price", parseFloat(metal.metal_price).toFixed(2));  // Stringify decimal

            const res = await editMetal(formData);
        
            if (res?.data) {
                toast.success("Metal updated successfully!");
                setTimeout(() => {
                    navigate('/metal');
                }, 1500);
            }

        } catch (error) {
            console.error(error);
            toast.error("Something went wrong while updating.");
        }
    };



    if (!metalId) {
        return <div className="p-10 text-red-500">No Metal selected for editing.</div>;
    }


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
                    <SubHeader setIsOpenside={setIsOpenside} pageName={"Edit Diamond"} />
                    {/* <div className="flex justify-between gap-[10px] mb-[50px] flex-wrap">
                        <h3 className="text-[26px] text-gray font-semibold">Edit Diamond</h3>
                        <div className="flex gap-[20px]">
                            <Link to="/add_diamond">
                                <button className="bg-primary text-white px-4 py-2 rounded shadow">
                                    + Add Diamond
                                </button>
                            </Link>
                        </div>
                    </div> */}
                    <div className="flex justify-between gap-[10px] mb-[27px] flex-wrap items-center max-sm:block" >
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
                                <li className="text-primary font-medium text-[12px]">Edit Metal</li>
                            </ol>
                        </nav>
                    </div>

                    {/* <form>
                        <div className="border mt-[30px] bg-white border-[#EBE9F1] shadow rounded-[10px] p-[30px] space-y-[15px]">

                            {[
                                ["Metal Type", "metal_type", "text"],
                                ["Metal Purity", "metal_purity", "text"],
                                ["Metal Weight (g)", "metal_weight_g", "number"],
                                ["Metal Finish", "metal_finish", "text"],
                                ["Metal Color", "metal_color", "text"],
                                ["Metal Price", "metal_price", "number"],

                            ].map(([label, key, type]) => (
                                <div key={key} className="my-[15px]">
                                    <label className="block text-sm text-gray font-medium">{label}</label>
                                    <input
                                        type={type}
                                        placeholder={label}
                                        value={metal[key] || ""}
                                        onChange={(e) =>
                                            setMetal({ ...metal, [key]: e.target.value })
                                        }
                                        className="mt-[10px] w-full h-[40px] px-[15px] border border-[#C8C8C8] text-[#374151] rounded-[7px] bg-transparent text-sm focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                            ))}

                            <div className="pt-[30px] flex flex-row-reverse gap-3">
                                <button
                                    type="button"
                                    onClick={handleEditMetal}
                                    className="inline-flex items-center justify-center h-[40px] w-[154px] py-2 text-sm font-semibold text-white rounded-md bg-primary shadow"
                                >
                                    Save Changes
                                </button>
                                <Link to="/all_diamonds">
                                    <button
                                        type="button"
                                        className="text-primary inline-flex items-center justify-center h-[40px] w-[114px] py-2 text-sm font-semibold bg-white rounded-md ring-1 ring-gray-300 hover:bg-gray-50"
                                    >
                                        Cancel
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </form> */}
                    <form>
                        <div className="border mt-[30px] bg-white border-[#EBE9F1] shadow-[0px_4px_24px_0px_#0000000F] rounded-[10px] p-[30px]  max-sm:p-[15px]">

                            <div className="mb-6">
                                <h5 className="text-[22px] font-[700] ">Edit Metal</h5>
                            </div>

                            {/* Metal Type & Purity */}
                            <div className="mb-[50px]">
                                <div className="border-t border-b border-[#C8C8C8] py-2 mb-5">
                                    <h5 className="font-bold text-gray-400">Metal Information</h5>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
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

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
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

                            <div className="mb-[50px]">
                                <div className="border-t border-b border-[#C8C8C8] py-2 mb-5">
                                    <h5 className="font-bold text-gray-400">Pricing</h5>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                                    <div>
                                        <label className="block text-sm text-gray font-medium">Metal Price</label>
                                        <input
                                            type="number"
                                            placeholder="Price"
                                            value={metal.metal_price}
                                            onChange={(e) => setMetal({ ...metal, metal_price: e.target.value })}
                                            className="mt-[10px] w-full h-[40px] px-[15px] border border-[#C8C8C8] text-[#374151] rounded-[7px] bg-transparent text-sm"
                                        />
                                    </div>
                                </div>
                            </div>


                            {/* Action Buttons */}
                            <div className="pt-[30px] flex flex-row-reverse gap-3 max-md:pt-0">
                                <button
                                    type="button"
                                    onClick={handleEditMetal}
                                    className="shadow-[0px_8px_20px_1px_#3DB0F733] text-white text-[14px] h-[50px] w-[208px] font-bold max-sm:h-[40px] max-sm:w-[180px] flex items-center justify-center gap-2 rounded-[12px] bg-primary border-[1px] hover:border-[rgba(34,117,252,1)] hover:bg-white hover:text-primary"
                                >
                                    Edit
                                </button>
                                <button
                                    type="button"
                                    onClick={() => navigate('/metal')}
                                    className="shadow-[0px_8px_20px_1px_#3DB0F733] max-sm:hidden hover:text-white text-[14px] h-[50px] w-[208px] font-bold max-sm:h-[40px] max-sm:w-[180px] flex items-center justify-center gap-2 rounded-[12px] hover:bg-primary border-[1px] border-[rgba(34,117,252,1)] bg-white text-primary "
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

export default Edit_metal
