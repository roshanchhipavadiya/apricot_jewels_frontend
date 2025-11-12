
import React, { useEffect, useState } from 'react'
import Logo from '../assets/logo.png'
import { useGetDiamondQuery, useGetMetalQuery } from '../services/apiSlice';
const FilterdData = ({ length__of_pro, onSelectMetal = () => { }, setfiltertype = () => { }, onorder }) => {

    const [isOpen, setIsOpen] = useState(false); // Main Dropdown
    const [isAvailabilityOpen, setIsAvailabilityOpen] = useState(true); // Availability Default Open
    const [isMetalOpen, setIsMetalOpen] = useState(true); // Metal Default Closed
    const [isStonesOpen, setIsStonesOpen] = useState(true); // Metal Default Closed
    const [isPriceOpen, setIsPriceOpen] = useState(true) // Metal Default Closed
    const [checkedItems, setCheckedItems] = useState({
        inStock: false,
        outOfStock: false,
    });
    const [checkedMetals, setCheckedMetals] = useState({
        sterlingSilver: false,
        whiteGold_14KT: false,
        yellowGold_14KT: false,
        whiteGold_18KT: false,
        yellowGold_18KT: false,
        roseGold_18KT: false,
        white_roseGold_14KT: false,
    });
    const [checkedStones, setCheckedStones] = useState({
        pearl: false,
        diamon: false,
        diamond: false,
    });

    const { data: metal } = useGetMetalQuery()

    let metals = []
    if (metal?.data) {
        metals = metal?.data?.map((val) => ({
            id: val.metal_id,  // keep using category_id here
            label: val.metal_purity + ' ' + val.metal_type + ' ' + val.metal_color,
            comalabel: val.metal_purity + ',' + val.metal_type + ',' + val.metal_color,
        }));
    }

    const { data: diamind } = useGetDiamondQuery()

    // const stones = [
    //     { key: "pearl", label: "Pearl" },
    //     { key: "diamon", label: "Diamon" },
    //     { key: "diamond", label: "Diamond" },
    // ];
    let stones = [];

    if (diamind?.data) {
        const uniqueShapes = new Set();

        stones = diamind.data.filter(val => {
            if (!uniqueShapes.has(val.diamond_shape)) {
                uniqueShapes.add(val.diamond_shape);
                return true;
            }
            return false;
        }).map(val => ({
            id: val.diamond_id,
            label: val.diamond_shape,
        }));
    }


    const toggleDropdown = () => setIsOpen(!isOpen);
    const closeDropdown = () => setIsOpen(false);
    const toggleAvailability = () => setIsAvailabilityOpen(!isAvailabilityOpen);
    const toggleMetal = () => setIsMetalOpen(!isMetalOpen);
    const toggleStones = () => setIsStonesOpen(!isStonesOpen);

    const togglePrice = () => setIsPriceOpen(!isPriceOpen);

    const handleCheckboxChange = (key) => {
        setCheckedItems((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };



    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [menuTitle, setMenuTitle] = useState("Featured"); // Default title

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);


    // feture
    const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);

    const toggleSortDropdown = () => {
        setIsSortDropdownOpen(!isSortDropdownOpen);
    };
    const [selectedMetalId, setSelectedMetalId] = useState(null);
    const [selectedStoneKey, setselectedStoneKey] = useState(null);
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const handleMetalChange = (value) => {
        const newSelectedId = selectedMetalId === value ? null : value;

        setSelectedMetalId(newSelectedId); // local UI state
        setselectedStoneKey(null);         // reset diamond
        setMinPrice('');
        setMaxPrice('');

        // Tell parent what filter is selected
        if (typeof setfiltertype === 'function') {

            setfiltertype('metal');
        }

        if (typeof onSelectMetal === 'function') {
            onSelectMetal({ type: 'metal', value: newSelectedId });
        }
    };

    const handleStoneChange = (key) => {
        const newSelected = selectedStoneKey === key ? null : key;
        setselectedStoneKey(newSelected);
        setSelectedMetalId(null);

        if (typeof setfiltertype === 'function') {

            setfiltertype('diamond');
        }

        if (typeof onSelectMetal === 'function') {
            onSelectMetal({ type: 'diamond', value: newSelected }); // ✅ passes value to parent
        }
    };


    useEffect(() => {
        if (minPrice && maxPrice) {
            const value = `${minPrice},${maxPrice}`;
            setfiltertype('price');
            setSelectedMetalId(null); // clear others if needed
            setselectedStoneKey(null);
            onSelectMetal({ type: 'price', value });
        }
    }, [minPrice, maxPrice]);

    return (
        <div>

            <div className="border-[#838383] border-b-[1.33px] z-100">
                <div className=" flex justify-between pt-[60px]   items-center container ">
                    <div className=" flex items-center py-[20px]  max-sm:py-0 max-lg:py-2 max-sm:pl-0 max-sm:mb-[10px] ">
                        <div className="relative">
                            {/* Filter Button */}
                            <div onClick={toggleDropdown} className="flex items-center cursor-pointer max-md:hidden">
                                <p className=" text-[26.67px] text-black font-[400] max-lg:pl-0 max-lg:text-[20px] max-md:text-[17px] max-sm:text-[15px]">
                                    Filter
                                </p>
                                <div className="pl-[27px] max-lg:pl-[10px]">
                                    <svg className="w-[36px] h-[25px] max-lg:w-[30px] max-lg:h-[20px] max-sm:w-[25px] max-sm:h-[15px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 25" fill="none">
                                        <line y1="6.23324" x2="24" y2="6.23324" stroke="#D86A37" strokeWidth="1.33333" />
                                        <circle cx="28.7999" cy="6.89988" r="5.73333" fill="#D86A37" stroke="#D86A37" strokeWidth="1.33333" />
                                        <line x1="11.1997" y1="17.4333" x2="35.1997" y2="17.4333" stroke="#D86A37" strokeWidth="1.33333" />
                                        <circle cx="6.4" cy="18.0998" r="5.73333" fill="#D86A37" stroke="#D86A37" strokeWidth="1.33333" />
                                    </svg>
                                </div>
                            </div>
                            {/* <div>
                                        <button
                                onClick={toggleDropdown}
                                className="re  bg-[#D86A37] text-white px-4 py-2 rounded-md "
                            >
                                ☰ Menu
                            </button>
                                </div> */}
                            <div onClick={toggleDropdown} className="max-md:flex items-center cursor-pointer md:hidden">
                                <p className="text-[26.67px] bg-[#D86A37] text-white font-[400] px-4 py-2 rounded-md 
         max-lg:text-[20px] max-md:text-[17px] max-sm:text-[15px]">
                                    ☰ Menu
                                </p>
                            </div>

                            {/* Overlay */}
                            {isOpen && <div className="fixed inset-0 bg-black bg-opacity-30 z-40 max-:md:hidden" onClick={closeDropdown}></div>}
                            {isMenuOpen && <div className={`fixed inset-0 bg-black bg-opacity-30 z-40  ${isMenuOpen ? 'block' : 'hidden'}`} onClick={closeDropdown}></div>}

                            {/* Dropdown Menu */}
                            <div
                                className={`absolute left-0 top-[100px] mt-2 bg-white shadow-lg rounded-md p-[15px] transition-all duration-300 z-100 w-[401px] 
    max-lg:top-[60px] 
    max-md:fixed max-md:top-0 max-md:mt-0 max-md:rounded-none max-md:h-full max-md:w-[80%] max-md:max-w-[350px] max-md:overflow-y-auto max-md:max-h-screen
    ${isOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-2 pointer-events-none"}`}
                            >
                                <div className="max-md:flex justify-between mb-[30px] hidden p-2 ">
                                    <img src={Logo} alt="logo img" className='max-sm:h-[40px]' />
                                    <button
                                        onClick={closeDropdown}
                                        className="text-gray-600 text-lg md:hidden"
                                    >
                                        ✖
                                    </button>
                                </div>



                                <ul className="" id="menu">

                                    {/* <li className={`border-b-[1.33px] border-[#D86A37]  px-[25px] max-sm:px-[10px] ${isAvailabilityOpen ? "pb-[20px]" : "pb-[10px]"}`} >
                                       
                                        <div className="flex justify-between items-center cursor-pointer" onClick={toggleAvailability} >
                                            <h5 className=" font-bold text-[20px] leading-[137%] tracking-[0%] text-left">
                                                Availability
                                            </h5>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="22"
                                                height="12"
                                                viewBox="0 0 22 12"
                                                fill="none"
                                                className={`transition-transform duration-300 ${isAvailabilityOpen ? "rotate-180" : ""}`}
                                            >
                                                <path d="M1 11.25L11 0.75L21 11.25" stroke="#222222" />
                                            </svg>
                                        </div>

                                      
                                        <ul
                                            className={` space-y-2 transition-all duration-300 overflow-hidden ${isAvailabilityOpen ? " opacity-100 mt-2 " : "max-h-0 opacity-0"
                                                }`}
                                            style={{ transition: "max-height 0.3s ease-in-out, opacity 0.3s ease-in-out" }}
                                        >
                                           
                                            <li className="flex items-center space-x-2 ">
                                                <div
                                                    className={`w-[20px] h-[20px] border rounded-[4px] flex items-center justify-center cursor-pointer transition-all ${checkedItems.inStock ? "bg-[#D86A37] border-[#D86A37]" : "bg-white border-[#D86A37]"
                                                        }`}
                                                    onClick={() => handleCheckboxChange("inStock")}
                                                >
                                                    {checkedItems.inStock && (
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="19"
                                                            height="19"
                                                            viewBox="0 0 19 19"
                                                            fill="none"
                                                        >
                                                            <path
                                                                d="M15.741 5.28516L7.54283 13.4833L3.81641 9.75687"
                                                                stroke="white"
                                                                strokeWidth="1.91645"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                            />
                                                        </svg>
                                                    )}
                                                </div>

                                                <span className="font-normal text-[20px] leading-[137%] tracking-[0%] text-left max-sm:text-[16px]">
                                                    In Stock
                                                </span>
                                            </li>

                                            
                                            <li className="flex items-center space-x-2  ">
                                                <div
                                                    className={`w-[20px] h-[20px] border rounded-[4px] flex items-center justify-center cursor-pointer transition-all ${checkedItems.outOfStock ? "bg-[#D86A37] border-[#D86A37]" : "bg-white border-[#D86A37]"
                                                        }`}
                                                    onClick={() => handleCheckboxChange("outOfStock")}
                                                >
                                                    {checkedItems.outOfStock && (
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="19"
                                                            height="19"
                                                            viewBox="0 0 19 19"
                                                            fill="none"
                                                        >
                                                            <path
                                                                d="M15.741 5.28516L7.54283 13.4833L3.81641 9.75687"
                                                                stroke="white"
                                                                strokeWidth="1.91645"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                            />
                                                        </svg>
                                                    )}
                                                </div>

                                                <span className="font-normal text-[20px] leading-[137%] tracking-[0%] text-left max-sm:text-[16px]">
                                                    Out of Stock
                                                </span>
                                            </li>
                                        </ul>
                                    </li> */}
                                    {/* metal */}
                                    <li className={` border-b-[1.33px] border-[#D86A37] px-[25px] py-[12px] max-sm:px-[10px] ${isMetalOpen ? "pb-[20px]" : "pb-[10px]"}`}>

                                        <div className="flex justify-between items-center cursor-pointer" onClick={toggleMetal}>
                                            <h5 className=" font-bold text-[20px] leading-[137%] tracking-[0%] text-left">
                                                Metal
                                            </h5>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="22"
                                                height="12"
                                                viewBox="0 0 22 12"
                                                fill="none"
                                                className={`transition-transform duration-300 ${isMetalOpen ? "rotate-180" : ""}`}
                                            >
                                                <path d="M1 11.25L11 0.75L21 11.25" stroke="#222222" />
                                            </svg>
                                        </div>

                                        <ul
                                            className={`   transition-all duration-300 overflow-hidden ${isMetalOpen ? "space-y-2 opacity-100 mt-2 " : "max-h-0 opacity-0 space-y-0  "
                                                }`} style={{ transition: "max-height 0.3s ease-in-out, opacity 0.3s ease-in-out" }}
                                        >
                                            {(() => {
                                                const shownLabels = new Set();

                                                return metals.map((metal, index) => {
                                                    if (shownLabels.has(metal.label)) {
                                                        return null; // Skip duplicate
                                                    }

                                                    shownLabels.add(metal.label);

                                                    return (
                                                        <li key={index} className="flex items-center space-x-2">
                                                            <div
                                                                className={`w-[20px] h-[20px] border rounded-[4px] flex items-center justify-center cursor-pointer transition-all ${selectedMetalId == metal.comalabel
                                                                    ? "bg-[#D86A37] border-[#D86A37]"
                                                                    : "bg-white border-[#D86A37]"
                                                                    }`}
                                                                onClick={() => handleMetalChange(metal?.comalabel)}
                                                            >
                                                                {selectedMetalId === metal.comalabel && (
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        width="19"
                                                                        height="19"
                                                                        viewBox="0 0 19 19"
                                                                        fill="none"
                                                                    >
                                                                        <path
                                                                            d="M15.741 5.28516L7.54283 13.4833L3.81641 9.75687"
                                                                            stroke="white"
                                                                            strokeWidth="1.91645"
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                        />
                                                                    </svg>
                                                                )}
                                                            </div>

                                                            <span className="font-normal text-[20px] leading-[137%] tracking-[0%] text-left max-sm:text-[16px]">
                                                                {metal.label}
                                                            </span>
                                                        </li>
                                                    );
                                                });
                                            })()}


                                        </ul>


                                    </li>

                                    {/* Stone */}
                                    <li className={` border-b-[1.33px] border-[#D86A37] px-[25px] py-[12px] max-sm:px-[10px] ${isStonesOpen ? "pb-[20px]" : "pb-[10px]"}`}>

                                        <div className="flex justify-between items-center cursor-pointer" onClick={toggleStones}>
                                            <h5 className=" font-bold text-[20px] leading-[137%] tracking-[0%] text-left">
                                                Stones
                                            </h5>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="22"
                                                height="12"
                                                viewBox="0 0 22 12"
                                                fill="none"
                                                className={`transition-transform duration-300 ${isStonesOpen ? "rotate-180" : ""}`}
                                            >
                                                <path d="M1 11.25L11 0.75L21 11.25" stroke="#222222" />
                                            </svg>
                                        </div>

                                        <ul
                                            className={` space-y-2 transition-all duration-300 overflow-hidden ${isStonesOpen ? " opacity-100 mt-2 " : "max-h-0 opacity-0"
                                                }`}
                                        >
                                            {(() => {
                                                const shownStoneLabels = new Set();

                                                return stones.map((stone, inde) => {
                                                    if (shownStoneLabels.has(stone.label)) {
                                                        return null; // Skip duplicates
                                                    }

                                                    shownStoneLabels.add(stone.label);

                                                    return (
                                                        <li key={inde} className="flex items-center space-x-2">
                                                            <div
                                                                className={`w-[20px] h-[20px] border rounded-[4px] flex items-center justify-center cursor-pointer transition-all ${selectedStoneKey === stone.label
                                                                        ? "bg-[#D86A37] border-[#D86A37]"
                                                                        : "bg-white border-[#D86A37]"
                                                                    }`}
                                                                onClick={() => handleStoneChange(stone.label)}
                                                            >
                                                                {selectedStoneKey === stone.label && (
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        width="19"
                                                                        height="19"
                                                                        viewBox="0 0 19 19"
                                                                        fill="none"
                                                                    >
                                                                        <path
                                                                            d="M15.741 5.28516L7.54283 13.4833L3.81641 9.75687"
                                                                            stroke="white"
                                                                            strokeWidth="1.91645"
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                        />
                                                                    </svg>
                                                                )}
                                                            </div>

                                                            <span className="font-normal text-[20px] leading-[137%] tracking-[0%] text-left max-sm:text-[16px]">
                                                                {stone.label}
                                                            </span>
                                                        </li>
                                                    );
                                                });
                                            })()}

                                        </ul>
                                    </li>
                                    {/* Price */}
                                    <li className={`border-b-[1.33px] border-[#D86A37] px-[25px] py-[12px] max-sm:px-[10px] ${isPriceOpen ? "pb-[20px]" : "pb-[10px]"}`}>

                                        <div className="flex justify-between items-center cursor-pointer" onClick={togglePrice}>
                                            <h5 className="font-bold text-[20px] leading-[137%] tracking-[0%] text-left">
                                                Price Range
                                            </h5>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="22"
                                                height="12"
                                                viewBox="0 0 22 12"
                                                fill="none"
                                                className={`transition-transform duration-300 ${isPriceOpen ? "rotate-180" : ""}`}
                                            >
                                                <path d="M1 11.25L11 0.75L21 11.25" stroke="#222222" />
                                            </svg>
                                        </div>

                                        <div className={`flex items-center space-x-3 transition-all duration-300 overflow-hidden max-md:block ${isPriceOpen ? "opacity-100 pt-[15px] max-h-40" : "opacity-0 max-h-0"} max-md:space-x-0`}>
                                            {/* Min Input */}
                                            <div className="border-[0.5px] border-black/50 px-3 py-2 flex items-center space-x-1 rounded-md">
                                                <span className="font-medium text-[20px] text-[#4D4C4CCC]">₹</span>
                                                <span className="font-medium text-[12px] text-[#4D4C4CCC]">Min</span>
                                                <input
                                                    type="number"
                                                    className="font-semibold text-[20px] text-[#D86A37] ps-[17px] w-[70px] outline-none appearance-none"
                                                    placeholder="0"
                                                    value={minPrice}
                                                    onChange={(e) => setMinPrice(e.target.value)}
                                                />

                                            </div>

                                            {/* "to" Separator */}<div className="max-md:flex justify-center">
                                                <span className="font-normal text-[15px] text-[#4D4C4CCC] ">to</span>

                                            </div>

                                            {/* Max Input */}
                                            <div className="border-[0.5px] border-black/50 px-3 py-2 flex items-center space-x-1 rounded-md ">
                                                <span className="font-medium text-[20px] text-[#4D4C4CCC]">₹</span>
                                                <span className="font-medium text-[12px] text-[#4D4C4CCC]">Max</span>
                                                <input
                                                    type="number"
                                                    className=" font-semibold text-[20px] ps-[17px] text-[#D86A37] w-17 outline-none"
                                                    placeholder="1000"
                                                    value={maxPrice}
                                                    onChange={(e) => setMaxPrice(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                                <button className="py-[10px] bg-[#D86A37] w-full mt-[15px] rounded-[5px] text-white font-normal text-[15px] leading-[100%] text-center">
                                    View {length__of_pro} Products
                                </button>

                            </div>

                        </div>
                        {/* offcanvas */}
                        {/* <button
                                onClick={toggleDropdown}
                                className="fixed bottom-5 left-5 bg-[#D86A37] text-white px-4 py-2 rounded-md md:hidden"
                            >
                                ☰ Menu
                            </button> */}



                        <div className="border-r-2 border-[#4D4C4C] h-[84px]  max-sm:h-[35px] max-lg:h-[30px]  pl-[52px] max-lg:pl-[20px] max-xl:pl-[20px] max-md:hidden"></div>
                        {/* <div className="max-md:hidden" >
                            <div className="pl-[53px] max-lg:px-[15px]">
                                <svg className="w-[39px] h-[40px] max-lg:w-[25px] max-lg:l-[26px] max-sm:w-[20px] max-sm:h-[21]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 39 40" fill="none">
                                    <rect x="0.333496" y="0.833252" width="17.3333" height="17.3333" rx="4" fill="#D86A37" />
                                    <rect x="0.333496" y="22.1666" width="17.3333" height="17.3333" rx="4" fill="#D86A37" />
                                    <rect x="21.667" y="0.833252" width="17.3333" height="17.3333" rx="4" fill="#D86A37" />
                                    <rect x="21.667" y="22.1666" width="17.3333" height="17.3333" rx="4" fill="#D86A37" />
                                </svg>
                            </div>

                        </div> */}
                    </div>

                    <div className="flex  py-[20px]  max-sm:py-0 max-lg:py-2 items-center ">
                        <div>
                            <p className="text-[#D86A37] text-[26.67px] font-[400] max-lg:text-[20px] max-md:text-[17px]  max-sm:text-[15px] max-md:hidden">{length__of_pro} products</p>
                        </div>

                        <div className="border-r-2 border-[#4D4C4C] h-[84px]   max-sm:h-[35px] max-lg:h-[30px]  mx-[53px] max-lg:mx-[15px] max-md:mx-[10px] max-2xl:mx-[30px] max-md:hidden"></div>

                        <div className="flex items-center relative">
                            <div className="relative">
                                {/* Sort By Section (Click to Open Dropdown) */}
                                <div
                                    className="flex items-center cursor-pointer"
                                    onClick={toggleSortDropdown}
                                >
                                    <p className="text-[#000000] font-[400] text-[26.67px] max-lg:text-[20px] max-md:text-[17px] max-sm:text-[17px]">
                                        Sort by:
                                    </p>

                                    <p className="text-[#000000] font-[400] text-[26.67px] max-lg:text-[20px] max-md:text-[17px] max-sm:text-[15px] pl-[17px] max-sm:pl-[5px]">
                                        {menuTitle}
                                    </p>

                                    <div className="pl-[6.5px] pr-[100px] max-lg:pr-[30px] max-xl:pr-[20px] max-sm:pr-[5px]">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="17"
                                            height="15"
                                            viewBox="0 0 17 15"
                                            fill="none"
                                            className={`transition-transform duration-300 ${isSortDropdownOpen ? "rotate-180" : ""
                                                }`}
                                        >
                                            <path
                                                d="M7.17879 13.4999C7.69199 14.3888 8.975 14.3888 9.4882 13.4999L15.839 2.49988C16.3522 1.61099 15.7107 0.499876 14.6843 0.499876L1.98264 0.499876C0.956243 0.499876 0.314742 1.61099 0.827942 2.49988L7.17879 13.4999Z"
                                                fill="#D86A37"
                                            />
                                        </svg>
                                    </div>
                                </div>

                                {/* Background Overlay */}
                                {isSortDropdownOpen && (
                                    <div
                                        className="fixed inset-0 bg-black bg-opacity-40 z-50"
                                        onClick={toggleSortDropdown} // Clicking on the overlay closes the dropdown
                                    />
                                )}

                                {/* Dropdown Menu */}
                                {isSortDropdownOpen && (
                                    <div className="absolute right-0 top-[50px] bg-white shadow-[0px_1px_4px_1px_rgba(0,0,0,0.25)] px-[20px] py-[20px] border-[0.1px] border-[#838383] rounded-md p-3 w-[240px] transition-all duration-300 z-[200] max-sm:w-[190px]">
                                        <ul className="space-y-2 text-[#838383] text-[20px] max-sm:text-[17px] leading-[137%] tracking-[0%] text-justify align-middle font-[400] font-['Nunito_Sans']">

                                            <li className="cursor-pointer text-[#838383] py-1 max-sm:py-0 " onClick={() => {
                                                onorder('asc')
                                                setMenuTitle('Price Low to High')
                                                setIsSortDropdownOpen(false)
                                            }}>Price Low to High</li>
                                            <li className="cursor-pointer text-[#838383] py-1 max-sm:py-0 " onClick={() => {
                                                onorder('desc')
                                                setMenuTitle('Price High to Low')
                                                setIsSortDropdownOpen(false)
                                            }}>Price High to Low</li>
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>
                </div>
            </div>




        </div>
    )
}

export default FilterdData
