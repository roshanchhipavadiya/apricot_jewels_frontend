import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useGetDiamondQuery, useEditDiamondMutation, useGetProducts11Query, useDeleteDiamondMutation } from "../services/apiSlice"; // Your API hooks for fetching and editing data
import User_side_menu from '../Componenet/user_side_menu'
import EmployList from '../Componenet/EmployList'
import Dropdown from '../Componenet/dropdown'
import Searchdropdown from '../Componenet/searchdropdown'
import Service_side_menu from '../Componenet/service_side_menu'
import SubHeader from '../Componenet/sub_header'
import { Link } from "react-router-dom";
import svg_file from '../assets/file_not.svg'
import { UndoIcon } from "lucide-react";
const Edit_Diamond = () => {
    const [deleteDiamondId, setDeleteDiamondId] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenside, setIsOpenside] = useState(false);
    const { refetch } = useGetProducts11Query();
    const navigate = useNavigate();
    const location = useLocation();
    const [diamondId, setdiamondId] = useState(location.state?.diamondId)
    const [component, setcomponent] = useState(location.state?.component)

    console.log(diamondId);
    const [modal, setModal] = useState(null);

    const [diamond, setDiamond] = useState({
        diamond_id: "",
        diamond_weight_ct: '',
        diamond_count: '',
        diamond_shape: '',
        diamond_setting: '',
        diamond_clarity_grade: '',
        diamond_color_grade: '',
        diamond_cut: '',
        diamond_fluorescence: '',
        diamond_certification: '',
        diamond_origin: '',
        diamond_price_per_carat: '',
        total_diamond_price: '',
        component: '',
    });

    const [openDropdown, setOpenDropdown] = useState(null);
    const [nottrue, setnottrue] = useState(true);
    const dropdownRefs = useRef({});
    const { data: fetchedDiamond, isSuccess } = useGetDiamondQuery({ diamond_id: diamondId });
    const { data: VpoId, isLoading } = useGetDiamondQuery({ vpo: diamondId });

    const [editDiamond] = useEditDiamondMutation();
    console.log(fetchedDiamond);

    // Update the diamond state when fetched data is available
    useEffect(() => {
        if (fetchedDiamond?.data && fetchedDiamond.data.length > 0) {
            const data = fetchedDiamond.data[0]; // Access the first object in the array
            console.log(data?.diamond_id);

            setDiamond((prev) => ({
                ...prev,
                diamond_weight_ct: data.diamond_weight_ct || '',
                diamond_count: data.diamond_count || '',
                diamond_shape: data.diamond_shape || '',
                diamond_setting: data.diamond_setting || '',
                diamond_clarity_grade: data.diamond_clarity_grade || '',
                diamond_color_grade: data.diamond_color_grade || '',
                diamond_cut: data.diamond_cut || '',
                diamond_fluorescence: data.diamond_fluorescence || '',
                diamond_certification: data.diamond_certification || '',
                diamond_origin: data.diamond_origin || '',
                diamond_price_per_carat: data.diamond_price_per_carat || '',
                total_diamond_price: data.total_diamond_price || '',
                component: data.component || '',
                diamondId: diamondId || '',
                diamond_id: data.diamond_id || '',
            }));
        }
    }, [fetchedDiamond]);



    const handleDropdownSelect = (field, value) => {
        setDiamond((prev) => ({ ...prev, [field]: value }));
        setOpenDropdown(null);
    };

    const toggleDropdown = (index) => {
        setOpenDropdown((prev) => (prev === index ? null : index));
    };

    const handleEditDiamond = async () => {
        try {
            // === Validation ===
            // if (!diamond.diamond_weight_ct) return toast.error("Diamond weight is required");
            // if (!diamond.diamond_count) return toast.error("Diamond count is required");
            // if (!diamond.diamond_shape) return toast.error("Diamond shape is required");
            // if (!diamond.diamond_setting) return toast.error("Diamond setting is required");
            // if (!diamond.diamond_clarity_grade) return toast.error("Clarity grade is required");
            // if (!diamond.diamond_color_grade) return toast.error("Color grade is required");
            // if (!diamond.diamond_cut) return toast.error("Diamond cut is required");
            // if (!diamond.diamond_fluorescence) return toast.error("Fluorescence is required");
            // if (!diamond.diamond_certification) return toast.error("Certification is required");
            // if (!diamond.diamond_origin) return toast.error("Origin is required");
            // if (!diamond.total_diamond_price || isNaN(diamond.total_diamond_price)) return toast.error("Total diamond price must be a valid number");
            // if (!diamond.component) return toast.error("Component is required");

            // === Build Payload ===
            const formdata = new FormData();
            formdata.append('diamond_id', diamondId);
            formdata.append('diamond_weight_ct', diamond.diamond_weight_ct);
            formdata.append('diamond_count', diamond.diamond_count);
            formdata.append('diamond_shape', diamond.diamond_shape);
            formdata.append('diamond_setting', diamond.diamond_setting);
            formdata.append('diamond_clarity_grade', diamond.diamond_clarity_grade);
            formdata.append('diamond_color_grade', diamond.diamond_color_grade);
            formdata.append('diamond_cut', diamond.diamond_cut);
            formdata.append('diamond_fluorescence', diamond.diamond_fluorescence);
            formdata.append('diamond_certification', diamond.diamond_certification);
            formdata.append('diamond_origin', diamond.diamond_origin);
            formdata.append('total_diamond_price', String(parseInt(diamond.total_diamond_price)));
            formdata.append('component', diamond.component);


            // === API Call ===
            const res = await editDiamond(formdata).unwrap();


            toast.success(res?.message);
            setTimeout(() => {
                navigate('/diamond');
            }, 1500); // Delay to allow the toast to be visible
            console.log("response", res);
        } catch (error) {
            console.error(error?.message || error?.data?.message);
            toast.error("Something went wrong while updating.");
        }
    };

    if (!diamondId) {
        return <div className="p-10 text-red-500">No diamond selected for editing.</div>;
    }



    // ✅ Open & Close Modal
    const openModal = (modalId) => setModal(modalId);
    const closeModal = () => setModal(null);

    const [deleteDiamond] = useDeleteDiamondMutation();

    // ✅ Handle Edit Diamond
    const handleDeleteDiamond = async () => {
        try {
            await deleteDiamond(deleteDiamondId).unwrap();
            toast.success("Diamond deleted successfully!");
            closeModal();
        } catch (error) {
            toast.error(error?.data?.message || "Failed to delete diamond");
        }
    };


    useEffect(() => {
        const handlePopState = () => {
            navigate("/diamond", { replace: true });
        };

        window.addEventListener("popstate", handlePopState);

        return () => {
            window.removeEventListener("popstate", handlePopState);
        };
    }, [navigate]);
    console.log(diamond);

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

                    <div className="flex justify-between gap-[10px] mb-[27px] flex-wrap items-center max-sm:block" >
                        <div className="flex flex-wrap flex-wrap">

                            <h3 className="text-[24px] font-[700] "> Diamond </h3>

                        </div>
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
                                <li className="text-primary font-medium text-[12px]">Edit Daimond</li>
                            </ol>
                        </nav>
                    </div>

                    {/* <h3 className="text-[26px] text-gray font-semibold">Edit Diamond</h3> */}
                    {/* <div className="flex gap-[20px]">
                            <Link to="/add_diamond">
                                <button className="bg-primary text-white px-4 py-2 rounded shadow">
                                    + Add Diamond
                                </button>
                            </Link>
                        </div> */}

                    <div className="flex  gap-6 w-[100%]">
                        <form className="w-[100%]">

                            <div className=" mt-[20px] max-sm:mt-[10px]  max-sm:p-[15px]    border  bg-white border-[#EBE9F1] shadow-[0px_4px_24px_0px_#0000000F] rounded-[10px] p-[30px] ">
                                <div className="mb-8 flex flex-wrap justify-between items-center">
                                    <h5 className="text-[22px] font-[700] ">Edit Diamond</h5>
                                    {diamond?.vpo == null && nottrue && (


                                        <Link to="/add_diamond" state={{ diamond_id: diamond.diamond_id }}>
                                            <button id="" className="shadow-[0px_8px_20px_1px_#3DB0F733] hover:text-white text-[14px] h-[50px] w-[208px] font-bold max-lg:h-[40px] max-lg:w-[180px] max-md:w-[150px] max-md:text-[12px] flex items-center justify-center gap-2 rounded-[12px] hover:bg-primary border-[1px] border-[rgba(34,117,252,1)] bg-white text-primary ">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 11 11" fill="none">
                                                    <path d="M10.5938 5.33984H6.16406V0.910156C6.16406 0.683627 5.98044 0.5 5.75391 0.5C5.52738 0.5 5.34375 0.683627 5.34375 0.910156V5.33984H0.914062C0.687533 5.33984 0.503906 5.52347 0.503906 5.75C0.503906 5.97653 0.687533 6.16016 0.914062 6.16016H5.34375V10.5898C5.34375 10.8164 5.52738 11 5.75391 11C5.98044 11 6.16406 10.8164 6.16406 10.5898C6.16406 8.85994 6.16406 7.89006 6.16406 6.16016H10.5938C10.8203 6.16016 11.0039 5.97653 11.0039 5.75C11.0039 5.52347 10.8203 5.33984 10.5938 5.33984Z" fill="currentcolor" />
                                                </svg>   Add Accent Diamonds
                                            </button>
                                        </Link>
                                    )
                                    }
                                </div>
                                <div className="mb-[50px]">
                                    <div className="border-t border-b border-[#C8C8C8] py-2 mb-5">
                                        <h5 className="font-bold text-gray-400">General Information</h5>
                                    </div>
                                    <div className="grid grid-cols-3 gap-5 max-lg:grid-cols-2 max-sm:grid-cols-1 max-sm:gap-3">
                                        {nottrue && (


                                            <Dropdown
                                                label="Component"
                                                options={["Main Stone", "Accent Stone"]}
                                                value={diamond.component}
                                                onSelect={(val) => handleDropdownSelect("component", val)}
                                                isOpen={openDropdown === 1}
                                                onToggle={() => toggleDropdown(1)}
                                                ref={(el) => (dropdownRefs.current[1] = el)}
                                            />
                                        )
                                        }
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

                                        <div>
                                            <label className="block text-sm text-gray font-medium">Origin</label>
                                            {/* <input
                                                type="text"
                                                placeholder="Diamond origin"
                                                value={diamond.diamond_origin}
                                                onChange={(e) => setDiamond({ ...diamond, diamond_origin: e.target.value })}
                                                className="mt-[10px] w-full h-[40px] px-[15px] border border-[#C8C8C8] text-[#374151] rounded-[7px] bg-transparent text-sm"
                                            /> */}
                                            <input
                                                type="text"
                                                placeholder="Diamond origin"
                                                value={diamond.diamond_origin}
                                                onChange={(e) => {
                                                    // Filter out anything that's not a letter or space
                                                    const lettersOnly = e.target.value.replace(/[^a-zA-Z\s]/g, '');
                                                    setDiamond({ ...diamond, diamond_origin: lettersOnly });
                                                }}
                                                className="mt-[10px] w-full h-[40px] px-[15px] border border-[#C8C8C8] text-[#374151] rounded-[7px] bg-transparent text-sm"
                                            />

                                        </div>
                                        <div>
                                            <label className="block text-sm text-gray font-medium">Diamond Count</label>
                                            <input
                                                type="number"
                                                placeholder="Diamond count"
                                                value={diamond.diamond_count}
                                                onChange={(e) => setDiamond({ ...diamond, diamond_count: e.target.value })}
                                                className="mt-[10px] w-full h-[40px] px-[15px] border border-[#C8C8C8] text-[#374151] rounded-[7px] bg-transparent text-sm"
                                            />
                                        </div>
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

                                {/* Quality Details */}
                                <div className="mb-[50px]">
                                    <div className="border-t border-b border-[#C8C8C8] py-2 mb-5">
                                        <h5 className="font-bold text-gray-400">Quality Details</h5>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                                        <div>
                                            <Dropdown
                                                label="Diamond Clarity Grade"
                                                options={["SI2", "SI", "VS", "VVS", "IF"]}
                                                value={diamond.diamond_clarity_grade}
                                                // onSelect={(selected) => setDiamond({ ...diamond, diamond_clarity_grade: selected })}
                                                onSelect={(val) => handleDropdownSelect("diamond_clarity_grade", val)}
                                                isOpen={openDropdown === 3}
                                                onToggle={() => toggleDropdown(3)}
                                                ref={(el) => (dropdownRefs.current[3] = el)}
                                                searchable={true}
                                                searchfield="Search clarity grade"
                                            />
                                        </div>
                                        <div>
                                            <Dropdown
                                                label="Color Grade"
                                                options={["D", "E", "F", "G", "H", 'I', 'J']}
                                                value={diamond.diamond_color_grade}
                                                // onSelect={(selected) => setDiamond({ ...diamond, diamond_color_grade: selected })}
                                                onSelect={(val) => handleDropdownSelect("diamond_color_grade", val)}
                                                isOpen={openDropdown === 4}
                                                onToggle={() => toggleDropdown(4)}
                                                ref={(el) => (dropdownRefs.current[4] = el)}
                                                searchable={true}
                                                searchfield="Search Diamond color grade"
                                            />
                                        </div>
                                        <div>
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

                                {/* Certification & Pricing */}
                                <div className="">
                                    <div className="border-t border-b border-[#C8C8C8] py-2 mb-5">
                                        <h5 className="font-bold text-gray-400">Certification & Pricing</h5>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                                        <div >
                                            <Dropdown
                                                label="Diamond Setting"
                                                options={['Prong', 'Bezel', 'Channel', 'Pave']}
                                                value={diamond.diamond_setting}
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
                                                options={["GIA", "IGI", "HRD", "None"]}
                                                value={diamond.diamond_certification}

                                                onSelect={(val) => handleDropdownSelect("diamond_certification", val)}
                                                isOpen={openDropdown === 7}
                                                onToggle={() => toggleDropdown(7)}
                                                ref={(el) => (dropdownRefs.current[7] = el)}
                                                searchable={true}
                                                searchfield="Search Diamond certification"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm text-gray font-medium">Weight (ct)</label>
                                            <input
                                                type="number"
                                                placeholder="Diamond weight"
                                                value={diamond.diamond_weight_ct}
                                                onChange={(e) => setDiamond({ ...diamond, diamond_weight_ct: e.target.value })}
                                                className="mt-[10px] w-full h-[40px] px-[15px] border border-[#C8C8C8] text-[#374151] rounded-[7px] bg-transparent text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm text-gray font-medium">Total Price</label>
                                            <input
                                                type="number"
                                                placeholder="Total price"
                                                value={diamond.total_diamond_price}
                                                onChange={(e) => setDiamond({ ...diamond, total_diamond_price: e.target.value })}
                                                className="mt-[10px] w-full h-[40px] px-[15px] border border-[#C8C8C8] text-[#374151] rounded-[7px] bg-transparent text-sm"
                                            />
                                        </div>
                                    </div>
                                    <div className=" pt-[30px]  flex flex-row-reverse gap-3">
                                        <button
                                            type="button"
                                            onClick={handleEditDiamond}
                                            className="shadow-[0px_8px_20px_1px_#3DB0F733] text-white text-[14px] h-[50px] w-[208px] font-bold max-sm:h-[40px] max-sm:w-[180px] flex items-center justify-center gap-2 rounded-[12px] bg-primary border-[1px] hover:border-[rgba(34,117,252,1)] hover:bg-white hover:text-primary"
                                        >
                                            Edit
                                        </button>
                                        <Link to="/diamond" className="max-sm:hidden">
                                            <button
                                                type="button"
                                                className="shadow-[0px_8px_20px_1px_#3DB0F733] hover:text-white text-[14px] h-[50px] w-[208px] font-bold max-sm:h-[40px] max-sm:w-[180px] flex items-center justify-center gap-2 rounded-[12px] hover:bg-primary border-[1px] border-[rgba(34,117,252,1)] bg-white text-primary  "
                                            >
                                                Cancel
                                            </button>
                                        </Link>
                                    </div>
                                </div>

                                {/* Submit Buttons */}

                            </div>

                        </form>
                    </div>

                    {VpoId?.data?.length > 0 ? (
                        <div className="border mt-[30px] bg-white border-[#EBE9F1] shadow-[0px_4px_24px_0px_#0000000F]  rounded-[10px]">

                            <div className="min-h-[35vh] over_scroll">

                                <table className="w-full ">
                                    <thead className="">
                                        <tr className="table-flex items-center h-[40px] sm:h-[54px]  ">
                                            <th className="text-start px-[30px] text-[14px] font-[700]   max-md:px-[20px] max-md:text-[13px]">Name</th>
                                            {/* <th className=" text-sm font-semibold text-[#5E5873] uppercase text-center"> Diamond</th> */}
                                            <th className="text-[14px] font-[700] text-center max-md:px-[1px] max-md:text-[13px] max-sm:px-[5px]">Type</th>
                                            <th className="text-[14px] font-[700] text-center max-md:px-[1px] max-md:text-[13px] max-sm:px-[5px]">Weight</th>
                                            <th className="text-[14px] font-[700] text-center max-md:px-[1px] max-md:text-[13px] max-sm:px-[5px] max-lg:hidden">Origin </th>
                                            <th className="text-[14px] font-[700] text-center max-md:px-[1px] max-md:text-[13px] max-sm:px-[5px] max-lg:hidden">Cut</th>
                                            <th className="text-[14px] font-[700] text-center max-md:px-[1px] max-md:text-[13px] max-sm:px-[5px] max-sm:hidden">Price</th>
                                            <th className="text-[14px] font-[700] text-center max-md:px-[10px] max-md:text-[13px] max-sm:px-[5px] ">
                                                <span className="hidden max-sm:inline">Total</span>
                                                <span className="inline max-sm:hidden">Total Price</span>
                                            </th>
                                            <th className=" px-[30px] text-[14px] font-[700]  max-md:px-[10px] max-md:text-[13px] max-sm:px-[5px]">Action</th>

                                        </tr>
                                    </thead>
                                    <tbody className="last_tr">

                                        {VpoId?.data?.map((diamond, index) => (
                                            <tr
                                                key={index}
                                                className={`h-[44px] sm:h-[58px] transition-all duration-200 ${index % 2 === 0
                                                    ? 'bg-[#eef3f9cc] hover:bg-[rgba(35,119,252,.1)]'
                                                    : 'bg-white hover:bg-[#eef3f9cc]'
                                                    }`}
                                                onClick={() => {
                                                    setdiamondId(diamond?.diamond_id)
                                                    setcomponent(diamond?.component)
                                                    setnottrue(false)
                                                }}
                                            >

                                                <td className="text-sm text-[#5E5873] px-[30px] max-md:text-[12px] max-lg:px-[20px]">



                                                    {diamond?.diamond_shape?.charAt(0).toUpperCase() + diamond?.diamond_shape?.slice(1)}

                                                </td>

                                                <td className="text-sm text-[#5E5873] text-center px-[30px] max-md:text-[12px] max-lg:px-0">{diamond?.component}</td>
                                                <td className="text-sm text-[#5E5873] text-center px-[30px] max-md:text-[12px] max-lg:px-0">{diamond?.diamond_weight_ct}</td>
                                                <td className="text-sm text-[#5E5873] text-center max-md:text-[12px] max-lg:hidden">{diamond?.diamond_origin}</td>
                                                <td className="text-sm text-[#5E5873] text-center max-md:text-[12px]  max-lg:hidden">{diamond?.diamond_cut}</td>
                                                <td className="text-sm text-[#5E5873] text-center px-[30px] max-md:text-[12px] max-lg:px-0 max-sm:hidden">{diamond?.total_diamond_price}</td>
                                                <td className="text-sm text-[#5E5873] text-center max-md:text-[12px] max-lg:px-0">{diamond?.all_total_diamond_price}</td>
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
                                                                       <li onClick={(e) => e.stopPropagation()}>
                                                                           <Link
                                                                               to="/edit_diamond"
                                                                               state={{ diamondId: diamond?.diamond_id }}
                                                                               className="flex items-center justify-between w-[112px] p-[5px] text-sm transition-all hover:bg-[#D9F0FF] rounded-[4px]"
                                                                           >
           
                                                                               <button
                                                                                   className="flex items-center justify-between w-[112px] p-[5px] text-sm transition-all hover:bg-[#D9F0FF] rounded-[4px]">
                                                                                   <span className="text-primary">Edit</span><svg xmlns="http://www.w3.org/2000/svg" width="14" 
                                                                                   height="14" viewBox="0 0 14 14" fill="none">
                                                                                       <path d="M12.9215 8.74235C12.7289 8.74235 12.5728 8.89842 12.5728 9.09102V12.1869C12.5721 12.7643 12.1043 13.2323 11.5268 13.2329H1.74337C1.16586 13.2323 0.698043 12.7643 0.697346 12.1869V3.10079C0.698043 2.52342 1.16589 2.05547 1.74337 2.05477H4.83923C5.0318 2.05477 5.18791 1.89867 5.18791 1.70609C5.18791 1.51363 5.0318 1.35742 4.83923 1.35742H1.74337C0.780958 1.3585 0.00108089 2.13838 0 3.10079V12.187C0.00108089 13.1494 0.780958 13.9292 1.74337 13.9304H11.5268C12.4892 13.9292 13.2691 13.1494 13.2701 12.187V9.09102C13.2701 8.89842 13.114 8.74235 12.9215 8.74235Z" fill="#3DB0F7"></path>
                                                                                       <path d="M13.1322 0.459568C12.5195 -0.153189 11.526 -0.153189 10.9133 0.459568L4.69266 6.68014C4.65008 6.72271 4.61925 6.77559 4.60319 6.83362L3.78517 9.78689C3.76866 9.84635 3.76823 9.90913 3.78393 9.96881C3.79962 10.0285 3.83089 10.0829 3.87451 10.1266C3.91814 10.1702 3.97258 10.2015 4.03225 10.2172C4.09193 10.2329 4.15471 10.2325 4.21417 10.216L7.16743 9.39787C7.22547 9.38181 7.27835 9.35098 7.32092 9.3084L13.5413 3.08773C14.1531 2.47451 14.1531 1.48191 13.5413 0.868736L13.1322 0.459568ZM5.45238 6.90678L10.5435 1.81559L12.1854 3.45749L7.09418 8.54868L5.45238 6.90678ZM5.12442 7.5649L6.43613 8.87678L4.6217 9.3795L5.12442 7.5649ZM13.0483 2.59467L12.6785 2.9644L11.0365 1.32236L11.4064 0.952592C11.7468 0.612217 12.2987 0.612217 12.639 0.952592L13.0483 1.36172C13.3881 1.70252 13.3881 2.25401 13.0483 2.59467Z" fill="#3DB0F7"></path>
                                                                                   </svg>
                                                                               </button>
                                                                           </Link>
                                                                       </li>
                                                                       <li>
                                                                           <button className="flex items-center justify-between w-[112px] p-[5px] text-sm bg-white transition-all hover:bg-[#FFD6D6] rounded-[4px]" onClick={() => {
                                                                               openModal("modal3");
                                                                               setDeleteDiamondId(diamond?.diamond_id); // This sets the ID correctly
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
                                                    <div className="flex gap-2 max-lg:gap-0 justify-center">
                                                        <Link

                                                            onClick={() => {
                                                                setdiamondId(diamond?.diamond_id)
                                                                setcomponent(diamond?.component)
                                                                setnottrue(false)
                                                            }}
                                                            className="max-lg:hidden"
                                                        >
                                                            <button
                                                                className="p-2 hover:bg-[rgba(34,197,94,0.1)] rounded-full transition-all duration-200"

                                                            >

                                                                <i className="fa-regular fa-pen-to-square text-[#22c55e] text-lg"></i>
                                                            </button>
                                                        </Link>

                                                        <button
                                                            className="p-2 hover:bg-red-100 rounded-full transition-all duration-200"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                openModal("modal3");
                                                                setDeleteDiamondId(diamond?.diamond_id); // This sets the ID correctly
                                                            }}
                                                        >

                                                            <i className="fa-regular fa-trash-can text-[#e44b30] text-lg"></i>
                                                        </button>
                                                    </div>


                                                </td>

                                            </tr>
                                        ))
                                        }
                                    </tbody>
                                </table>

                            </div>





                        </div>
                    ) : (
                        ""
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
                                                <button type="button" onClick={handleDeleteDiamond} className="inline-flex h-[35px] sm:h-[40px]  w-[114px] shadow-[0px_8px_20px_1px_#F443364D] rounded-md bg-[#F44336] items-center   justify-center py-2 text-sm font-semibold text-white shadow-xs  sm:ml-3 ">Delete</button>
                                                <button type="button" className="mt-3 bg-[#F4F1FC] h-[35px] sm:h-[40px] w-[114px] closeModal   rounded-md border-0   inline-flex justify-center items-center  py-2 text-sm font-semibold  shadow-xs   sm:mt-0 " onClick={closeModal} >Cancel</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default Edit_Diamond;
