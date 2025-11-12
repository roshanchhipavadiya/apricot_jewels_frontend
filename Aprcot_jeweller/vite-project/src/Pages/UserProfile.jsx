import React, { useEffect, useRef, useState } from 'react'
import Navbar from '../Componenet/Navbar'
import Footer from '../Componenet/Footer'
import File from '../assets/file.png'
import { useGetProfileQuery, useAddAddressMutation, useGetAddressQuery, useEditAddressMutation, useDeleteAddressMutation, useEditProfileMutation, useGetOrderQuery, useGetProductQuery } from '../services/apiSlice'
import Logo from '../assets/logo.png'
import { ToastContainer, toast } from "react-toastify";
import { useLocation, useNavigate } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import html2pdf from 'html2pdf.js';

const UserProfile = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // user Data
    const { data: profileData } = useGetProfileQuery();
    const profile = profileData?.data


    // Edit User Profile
    const [editProfile] = useEditProfileMutation();
    const [userData, setUserData] = useState({
        // profile_image: "",
        first_name: "",
        last_name: "",
        mobile_no: "",
        address: "",
        pincode: "",
        email: "",
    });

    useEffect(() => {
        if (profile) {
            setUserData({
                // profile_image: profile?.profile_image,
                first_name: profile?.first_name,
                last_name: profile?.last_name,
                mobile_no: profile?.mobile_no,
                address: profile?.address,
                pincode: profile?.pincode,
                email: profile?.email,
            })
        }
    }, [profile])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("first_name", userData.first_name);
            formData.append("last_name", userData.last_name);
            formData.append("mobile_no", userData.mobile_no);
            formData.append("address", userData.address);
            formData.append("pincode", userData.pincode);
            formData.append("email", userData.email);
            // if (selectedImage?.file) {
            //     formData.append("profile_image", selectedImage.file); // Blob image
            // }
            const response = await editProfile(formData).unwrap();
            toast.success(response?.message, {
                position: "bottom-center",
                autoClose: 1500,
            });
        } catch (err) {
            const errorMessage =
                err?.data?.message ||       // RTK Query response
                err?.message ||             // JS Error object
                err?.error ||               // RTK Query baseQuery error
                "Something went wrong";

            toast.error(errorMessage, {
                position: "bottom-center",
                autoClose: 1500,
            });
        }
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const [addAddress] = useAddAddressMutation();
    const [deleteAddress] = useDeleteAddressMutation();

    const [name, setName] = useState("")
    const [contactNo, setcontactNo] = useState("")
    const [email, setemail] = useState("")
    const [address_line_1, setaddress_line_1] = useState("")
    const [address_line_2, setaddress_line_2] = useState("")
    const [landmark, setlandmark] = useState("")
    const [city, setcity] = useState("")
    const [pin_code, setpin_code] = useState("")
    const [state, setstate] = useState("")

    const handleSubmitAddress = async (e) => {
        e.preventDefault();

        // Check if all fields are filled
        if (
            !name ||
            !contactNo ||
            !email ||
            !address_line_1 ||
            !address_line_2 ||
            !landmark ||
            !city ||
            !pin_code ||
            !state
        ) {
            toast.error("Please fill in all required fields.", {
                position: "bottom-center",
                autoClose: 1500,
            });
            return;
        }

        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("contact_no", contactNo);
            formData.append("email", email);
            formData.append("address_line_1", address_line_1);
            formData.append("address_line_2", address_line_2);
            formData.append("landmark", landmark);
            formData.append("city", city);
            formData.append("pin_code", pin_code);
            formData.append("state", state);


            const response = await addAddress(formData).unwrap();


            if (response.message) {
                toast.success(response.message || "Address added successfully!", {
                    position: "bottom-center",
                    autoClose: 1500,
                });
                setIsModalOpen(false);
            }
        } catch (err) {
            toast.error(err?.message || "Address failed", {
                position: "bottom-center",
                autoClose: 1500,
            });
        }
    };


    // View address
    const { data: getAddress } = useGetAddressQuery();
    const AddresssData = getAddress?.data


    // edit data


    const [activeDropdown, setActiveDropdown] = useState(null); // Track which dropdown is open
    const [selectedAddress, setSelectedAddress] = useState(null);

    const [editAddress] = useEditAddressMutation();

    const toggleDropdown = (index) => {
        setActiveDropdown(prev => (prev === index ? null : index));
    };



    const handleEdit = (addressId) => {
        const address = AddresssData?.find((item) => item.address_id === addressId);
        if (address) {
            setSelectedAddress(address);
            setName(address.name);
            setemail(address.email);
            setcontactNo(address.contact_no);
            setaddress_line_1(address.address_line_1);
            setaddress_line_2(address.address_line_2);
            setlandmark(address.landmark);
            setcity(address.city);
            setpin_code(address.pin_code);
            setstate(address.state);
            setIsEditModalOpen(true);
        }
    };

    const handleEditAddress = async (e) => {
        e.preventDefault();

        // Required field validation
        if (
            !selectedAddress?.address_id ||
            !name ||
            !contactNo ||
            !email ||
            !address_line_1 ||
            !address_line_2 ||
            !landmark ||
            !city ||
            !pin_code ||
            !state
        ) {
            toast.error("Please fill in all required fields.", {
                position: "bottom-center",
                autoClose: 1500,
            });
            return;
        }

        try {
            const formData = new FormData();
            formData.append("address_id", selectedAddress.address_id);
            formData.append("name", name);
            formData.append("contact_no", contactNo);
            formData.append("email", email);
            formData.append("address_line_1", address_line_1);
            formData.append("address_line_2", address_line_2);
            formData.append("landmark", landmark);
            formData.append("city", city);
            formData.append("pin_code", pin_code);
            formData.append("state", state);

            const response = await editAddress(formData).unwrap();

            if (response.message) {
                toast.success(response.message || "Address edited successfully!", {
                    position: "bottom-center",
                    autoClose: 1500,
                });
                setIsEditModalOpen(false);
            }
        } catch (err) {
            toast.error(err?.message || "Address update failed", {
                position: "bottom-center",
                autoClose: 1500,
            });
        }
    };

    // delete Address
    const handleDelete = async (addressId) => {
        try {

            const formData = new FormData();
            formData.append("address_id", addressId);
            await deleteAddress(formData).unwrap();

            toast.success("Address deleted successfully!", {
                position: "bottom-center",
                autoClose: 1500,
            });
        } catch (err) {
            toast.error(err?.message || "Address delete failed", {
                position: "bottom-center",
                autoClose: 1500,
            });
        }
    };

    const location = useLocation()
    const address11 = location?.state?.address11

    const [activeTab, setActiveTab] = useState(address11 || "profile");
    const [activeTab1, setActiveTab1] = useState("orders");
    const tabs = [
        {
            key: 'profile',
            label: 'Profile',
            icon: (
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" className="style_active__QGM86  " height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" className='me-[10px]'><path d="M858.5 763.6a374 374 0 0 0-80.6-119.5 375.63 375.63 0 0 0-119.5-80.6c-.4-.2-.8-.3-1.2-.5C719.5 518 760 444.7 760 362c0-137-111-248-248-248S264 225 264 362c0 82.7 40.5 156 102.8 201.1-.4.2-.8.3-1.2.5-44.8 18.9-85 46-119.5 80.6a375.63 375.63 0 0 0-80.6 119.5A371.7 371.7 0 0 0 136 901.8a8 8 0 0 0 8 8.2h60c4.4 0 7.9-3.5 8-7.8 2-77.2 33-149.5 87.8-204.3 56.7-56.7 132-87.9 212.2-87.9s155.5 31.2 212.2 87.9C779 752.7 810 825 812 902.2c.1 4.4 3.6 7.8 8 7.8h60a8 8 0 0 0 8-8.2c-1-47.8-10.9-94.3-29.5-138.2zM512 534c-45.9 0-89.1-17.9-121.6-50.4S340 407.9 340 362c0-45.9 17.9-89.1 50.4-121.6S466.1 190 512 190s89.1 17.9 121.6 50.4S684 316.1 684 362c0 45.9-17.9 89.1-50.4 121.6S557.9 534 512 534z" ></path></svg>
            ),
        },
        {
            key: 'orders',
            label: 'Orders',
            icon: (
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" className="style_accountingIcon___dmb0" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" className='me-[10px]'><path fill="none" d="M0 0h24v24H0z"></path><path d="M19 5v14H5V5h14m1.1-2H3.9c-.5 0-.9.4-.9.9v16.2c0 .4.4.9.9.9h16.2c.4 0 .9-.5.9-.9V3.9c0-.5-.5-.9-.9-.9zM11 7h6v2h-6V7zm0 4h6v2h-6v-2zm0 4h6v2h-6zM7 7h2v2H7zm0 4h2v2H7zm0 4h2v2H7z"></path></svg>
            ),
        },

        {
            key: 'Address',
            label: 'Address',
            icon: (
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" className="style_accountingIcon___dmb0" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" className='me-[10px]'><path d="M12 13.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"></path><path d="M19.071 3.429h.001c3.905 3.905 3.905 10.237 0 14.142l-5.403 5.403a2.36 2.36 0 0 1-3.336 0l-5.375-5.375-.028-.028c-3.905-3.905-3.905-10.237 0-14.142 3.904-3.905 10.236-3.905 14.141 0ZM5.99 4.489v.001a8.5 8.5 0 0 0 0 12.02l.023.024.002.002 5.378 5.378a.859.859 0 0 0 1.214 0l5.403-5.404a8.5 8.5 0 0 0-.043-11.977A8.5 8.5 0 0 0 5.99 4.489Z"></path></svg>
            ),
        },
        {
            key: 'logout',
            label: 'Logout',
            icon: (
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" className='me-[10px]' height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 13v-2H7V8l-5 4 5 4v-3h9z"></path>
                    <path d="M20 3H10a1 1 0 0 0 0 2h10v14H10a1 1 0 0 0 0 2h10a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z"></path>
                </svg>
            ),
        }

    ]

    const navigate = useNavigate();

    const { data: order } = useGetOrderQuery(profile?.username)
    const { data: product } = useGetProductQuery()


    const data = order?.data || [];
    const [searchTerm, setSearchTerm] = useState("");
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const filteredData = data

    const displayedData = filteredData?.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const [orderitem, setorderitem] = useState('')

    const addressdata1 = AddresssData?.find((val) => {
        return val.address_id == orderitem?.address
    })


    function formatDate(isoString) {
        const date = new Date(isoString);
        const options = { day: '2-digit', month: 'short', year: 'numeric' };
        return date.toLocaleDateString('en-GB', options); // Example: "16 May 2025"
    }

    const subTotal = orderitem?.order_items?.reduce((acc, item) => acc + Number(item.total_price), 0) || 0;
    // should log the sum of all product total_price values

    const [modal, setmodal] = useState("");
    const openModal = (modalId) => {
        setmodal(modalId);
    };

    const closeModal = () => {
        setmodal(null);
    };
    const printRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => printRef.current,
        documentTitle: 'Invoice',
        copyStyles: true,
    });


    const handleDownloadPDF = () => {
        const element = printRef.current;
        const opt = {
            margin: 0.5,
            filename: 'Apricot-Invoice.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true },
            jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
        };
        html2pdf().set(opt).from(element).save();
    };


    const fileInputRef = useRef(null);
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith("image/")) {
            setSelectedImage({
                file,
                preview: URL.createObjectURL(file),
            });
        }
    };

    const logout = () => {
        localStorage.removeItem('aprifrontoken');
        toast.success('Logout successfully', {
            position: "bottom-center",
            autoClose: 1000,
        });


        setTimeout(() => {
            navigate('/');
        }, 1000);

        closeModal();
    };

    useEffect(() => {
        if (activeTab === 'logout') {
            openModal('modal3');
            setActiveTab('profile')
        }
    }, [activeTab]);



    return (
        <div>

            <Navbar />
            <section className='container'>
                <div className='flex gap-[50px] max-md:mt-[50px]  mt-[100px]   my-[auto] max-lg:gap-[20px] max-lg:block'>

                    <div className="w-full lg:w-[20%] max-lg:w-full max-lg:mb-[50px]">
                        {/* Dropdown on small to medium screens */}
                        <div className="block lg:hidden mb-4">
                            <button
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="w-full border px-4 py-2 rounded-[10px] bg-[#F5F5F5] text-left"
                            >
                                {tabs.find((tab) => tab.key === activeTab)?.label}

                            </button>

                            {isDropdownOpen && (
                                <ul className="border mt-2 rounded-[10px] bg-white shadow-md">
                                    {tabs.map((tab) => (
                                        <li
                                            key={tab.key}
                                            className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${activeTab === tab.key ? 'text-[#D86A37] font-semibold' : ''}`}
                                            onClick={() => {

                                                setmodal(tab.key);
                                                setActiveTab(tab.key);
                                                setIsDropdownOpen(false);
                                            }}

                                        >
                                            <div className="flex items-center">
                                                {tab.icon}
                                                {tab.label}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        {/* Sidebar on large screens */}
                        <div className="hidden lg:block  mt-[20px] overflow-y-auto ">
                            <ul>
                                {tabs.map((tab) => (
                                    <li
                                        key={tab.key}
                                        className={`flex items-center pb-4 mb-4 border-b border-[#e6e6e6] cursor-pointer ${activeTab === tab.key ? 'text-[#D86A37] font-semibold' : ''}`}
                                        onClick={() => setActiveTab(tab.key)}
                                    >
                                        {tab.icon}
                                        {tab.label}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className=' w-[100%] items-center'>
                        {activeTab === 'profile' && (
                            <form className='border-[1px] border-[#CBD6E2] rounded-[15px] px-[30px] py-[20px]' onSubmit={handleSubmit}>
                                <div className='space-y-[30px] justify-center '>
{/* 
                                    <div
                                        className={`w-[140px] h-[140px] flex items-center justify-center relative rounded-full bg-white cursor-pointer ${!selectedImage && profile?.profile_picture == '/media/default.jpg' ? 'border-4 border-[#D86A37]' : ''
                                            }`}
                                        onClick={() => fileInputRef.current.click()} // entire div clickable
                                    >
                                        {selectedImage || profile?.profile_picture != '/media/default.jpg' ? (
                                            <img
                                                src={
                                                    selectedImage?.preview ||
                                                    `https://srv733641.hstgr.cloud:10443/${profile?.profile_picture}`
                                                }
                                                alt="Profile"
                                                className="w-[140px] h-[140px] object-cover rounded-full shadow"
                                            />
                                        ) : (
                                            <>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 24 24"
                                                    fill="#D86A37"
                                                    className="w-[100px] h-[100px]"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M12 2a5 5 0 100 10 5 5 0 000-10zm-7 18a7 7 0 0114 0H5z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                                <button
                                                    type="button"
                                                    className="absolute bottom-0 right-0 bg-[#D86A37] text-white rounded-full p-1 text-xs pointer-events-none"
                                                >
                                                    ✎
                                                </button>
                                            </>
                                        )}

                                        <input
                                            type="file"
                                            accept="image/*"
                                            ref={fileInputRef}
                                            onChange={handleImageChange}
                                            className="hidden"
                                        />
                                    </div> */}


                                    <div className="flex justify-center max-sm:flex-col gap-[25px] max-sm:gap-[35px] max-lg:flex-col max-lg:w-[100%]">
                                        <div className="w-[100%]">
                                            <label className="block mb-2 text-[16px] text-[#4D4C4C] font-medium">
                                                First Name
                                            </label>
                                            <input
                                                className="border-[1px] border-[#CBD6E2] rounded-[15px] w-full bg-[#F5F8FA] h-[55px] max-sm:h-[50px] placeholder:text-[15px] max-lg:placeholder:text-[16px] max-xl:placeholder:text-[17px] placeholder:text-[#4D4C4C] ps-[25px] py-[14px]"
                                                placeholder="First Name..."
                                                type="text"
                                                name="first_name"
                                                value={userData.first_name || ""}
                                                onChange={handleInputChange}
                                            />

                                        </div>

                                        <div className="w-[100%]">
                                            <label className="block mb-2 text-[16px] text-[#4D4C4C] font-medium">
                                                Last Name
                                            </label>
                                            <input
                                                className="border-[1px] border-[#CBD6E2] rounded-[15px] w-full bg-[#F5F8FA] h-[55px] max-sm:h-[50px] placeholder:text-[15px] max-lg:placeholder:text-[16px] max-xl:placeholder:text-[17px] placeholder:text-[#4D4C4C] px-[25px] py-[14px]"
                                                placeholder="Last Name..."
                                                type="text"
                                                name="last_name"
                                                value={userData?.last_name || ""}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex justify-center max-sm:flex-col gap-[25px] max-sm:gap-[35px] max-lg:flex-col max-lg:w-[100%]">

                                        <div className="w-[100%]">
                                            <label className="block mb-2 text-[16px] text-[#4D4C4C] font-medium">
                                                Email
                                            </label>
                                            <input className='border-[1px] border-[#CBD6E2] rounded-[15px] w-[100%] max-sm:w-[100%]  bg-[#F5F8FA] max-sm:h-[50px] h-[55px] placeholder:text-[15px] max-lg:placeholder:text-[16px] max-xl:placeholder:text-[17px] placeholder:text-[#4D4C4C] px-[25px] py-[14px]' placeholder='Enter your email...' type="email"
                                                value={userData?.email || ""}
                                                name="email"
                                                onChange={handleInputChange}
                                            /><br />
                                        </div>
                                        <div className="w-[100%]">
                                            <label className="block mb-2 text-[16px] text-[#4D4C4C] font-medium">
                                                Phone Number
                                            </label>
                                            <input
                                                type="text"
                                                name="mobile_no"
                                                value={userData?.mobile_no || ""}
                                                onChange={(e) => {
                                                    const input = e.target.value;
                                                    // Allow only digits and max 10 characters
                                                    if (/^\d{0,10}$/.test(input)) {
                                                        handleInputChange(e);
                                                    }
                                                }}
                                                className="border-[1px] border-[#CBD6E2] rounded-[15px] w-full max-sm:h-[50px] h-[55px] bg-[#F5F8FA] placeholder:text-[15px] max-lg:placeholder:text-[16px] max-xl:placeholder:text-[17px] placeholder:text-[#4D4C4C] px-[25px] py-[14px]"
                                                placeholder="Phone Number"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex justify-center max-sm:flex-col gap-[25px] max-sm:gap-[35px] max-lg:flex-col max-lg:w-[100%]">

                                        <div className="w-[100%]">
                                            <label className="block mb-2 text-[16px] text-[#4D4C4C] font-medium">
                                                Pincode
                                            </label>
                                            <input className='border-[1px] border-[#CBD6E2] rounded-[15px] w-[100%] max-sm:w-[100%]  bg-[#F5F8FA] max-sm:h-[50px] h-[55px] placeholder:text-[15px] max-lg:placeholder:text-[16px] max-xl:placeholder:text-[17px] placeholder:text-[#4D4C4C] px-[25px] py-[14px]' placeholder='Enter your pincode' type="number"
                                                value={userData?.pincode || ""}
                                                name="pincode"
                                                onChange={handleInputChange}
                                            /><br />
                                        </div>
                                        <div className="w-[100%]">
                                            <label className="block mb-2 text-[16px] text-[#4D4C4C] font-medium">
                                                address
                                            </label>
                                            <input className='border-[1px] border-[#CBD6E2] rounded-[15px] w-[100%] max-sm:w-[100%]  bg-[#F5F8FA] max-sm:h-[50px] h-[55px] placeholder:text-[15px] max-lg:placeholder:text-[16px] max-xl:placeholder:text-[17px] placeholder:text-[#4D4C4C] px-[25px] py-[14px]' placeholder='Enter your address...' type="text"
                                                value={userData?.address || ""}
                                                name="address"
                                                onChange={handleInputChange}
                                            /><br />
                                        </div>
                                    </div>


                                    <div className='flex justify-end mt-6'>
                                        <button
                                            type='submit'
                                            className='w-32 bg-[#D86A37] text-white text-[17px] font-medium px-4 py-2 rounded-md shadow-md hover:bg-[#c55b2f] transition duration-200'
                                        >
                                            Edit
                                        </button>
                                    </div>


                                </div>

                            </form>
                        )}

                        {activeTab === 'orders' && (
                            < div >
                                {displayedData.length == 0 && (



                                    <div className='flex justify-center'>
                                        <div>
                                           <img
                                            src={File}
                                            alt="Empty Address"
                                            className="mx-auto mb-4 h-[150px]"
                                        />
                                          <h6 className="tx-sub-title mb-1 text-center text-[20px]">You haven't placed any order yet!</h6>
                                            <p className='text-center my-[15px]'>Order section is empty. After placing order, You can track them from here!</p>
                                            <div className='flex justify-center' onClick={() => {
                                                navigate('/product')
                                            }}>
                                                <button className='px-[46px] py-[10px] rounded-[13px] bg-[#D86A37] text-white text-[18px]'>Continue Shopping</button>

                                            </div>
                                        </div>
                                    </div>

                                )}
                                {activeTab1 == 'orders' && Array.isArray(displayedData) && displayedData.length > 0 && (


                                    <div className='border-[1px] border-[#CBD6E2] rounded-[15px] '>
                                        <div className='overflow-x-scroll none__apee_scrol'>

                                            <table className="w-full ">
                                                <thead className="">
                                                    <tr className="table-flex items-center h-[40px] sm:h-[54px]     ">
                                                        <th className="text-start ps-[30px]  px-[30px] text-xs font-semibold text-[#5E5873] uppercase">Id</th>
                                                        <th className=" text-xs font-semibold text-[#5E5873] uppercase text-center">Total Amount</th>
                                                        <th className=" text-xs font-semibold text-[#5E5873] uppercase text-center">Address</th>
                                                        <th className=" text-xs font-semibold text-[#5E5873] uppercase text-center">Payment Status</th>
                                                        <th className=" text-xs font-semibold text-[#5E5873] uppercase text-center">Status</th>
                                                        <th className=" text-xs font-semibold text-[#5E5873] uppercase text-center">Action </th>

                                                    </tr>
                                                </thead>
                                                <tbody className="last_tr">



                                                    {displayedData.map((user, index) => (
                                                        <tr onClick={() => {

                                                        }}
                                                            key={user.username || index}
                                                            className={`h-[44px] sm:h-[58px] transition-all duration-200 ${index % 2 === 0 ? 'bg-[#eef3f9cc] hover:bg-[#fc73231a]' : 'bg-transparent hover:bg-[#fc73231a]'}`}
                                                        >
                                                            <td className="  ps-[30px] max-md:ps-[10px] max-sm:w-[200px]">

                                                                #{user.order_id}


                                                            </td>

                                                            <td className="text-sm text-[#5E5873] px-[30px] text-center">{user.total_amount}</td>
                                                            <td className="text-sm text-[#5E5873] text-center whitespace-nowrap overflow-hidden text-ellipsis max-w-xs">
                                                                {
                                                                    (() => {
                                                                        const matchedAddress = getAddress?.data?.find(item => item.address_id === user.address);
                                                                        if (!matchedAddress) return "N/A";

                                                                        const addressText = `
        
                                                                    ${matchedAddress.address_line_1} ${matchedAddress.landmark},
                                                                    ${matchedAddress.city}, ${matchedAddress.pin_code}, ${matchedAddress.state}
                                                                  `.replace(/\s+/g, ' ').trim(); // Remove extra spaces

                                                                        const words = addressText.split(' ');
                                                                        const shortText = words.slice(0, 30).join(' ') + (words.length > 30 ? '...' : '');

                                                                        return shortText;
                                                                    })()
                                                                }
                                                            </td>

                                                            <td className="text-sm text-[#5E5873] text-center">
                                                                <button
                                                                    className={`w-[120px] mx-4 py-1 rounded-[400px] text-sm font-medium
    ${user?.payment_status === "Success"
                                                                            ? "bg-[rgba(69%,82%,96%,0.1)] shadow-[0_0_5px_rgba(247,106,61,0.5)_inset] text-primary"
                                                                            : user?.payment_status === "Pending"
                                                                                ? "bg-yellow-100 text-yellow-700 shadow-[0_0_5px_rgba(255,193,7,0.5)_inset]"
                                                                                : user?.payment_status === "Failed"
                                                                                    ? "bg-red-100 text-red-600 shadow-[0_0_5px_rgba(255,0,0,0.4)_inset]"
                                                                                    : "bg-gray-100 text-gray-600"
                                                                        }`}
                                                                >
                                                                    {user?.payment_status ?? "Unknown"}
                                                                </button>

                                                            </td>
                                                            <td className="text-sm text-[#5E5873] text-center">
                                                                <button
                                                                    className={`w-[120px] mx-4 py-1 rounded-[400px] text-sm font-semibold
    ${user?.status === "Pending"
                                                                            ? "bg-yellow-100 text-yellow-800 shadow-[0_0_5px_rgba(255,193,7,0.5)_inset]"
                                                                            : user?.status === "Processing"
                                                                                ? "bg-blue-100 text-blue-800 shadow-[0_0_5px_rgba(0,123,255,0.4)_inset]"
                                                                                : user?.status === "Shipped"
                                                                                    ? "bg-indigo-100 text-indigo-800 shadow-[0_0_5px_rgba(102,126,234,0.4)_inset]"
                                                                                    : user?.status === "Delivered"
                                                                                        ? "bg-green-100 text-green-800 shadow-[0_0_5px_rgba(40,167,69,0.4)_inset]"
                                                                                        : user?.status === "Cancelled"
                                                                                            ? "bg-red-100 text-red-700 shadow-[0_0_5px_rgba(220,53,69,0.5)_inset]"
                                                                                            : user?.status === "Returned"
                                                                                                ? "bg-pink-100 text-pink-700 shadow-[0_0_5px_rgba(255,99,132,0.5)_inset]"
                                                                                                : "bg-gray-100 text-gray-600"
                                                                        }`}
                                                                >
                                                                    {user?.status ?? "Unknown"}
                                                                </button>

                                                            </td>
                                                            <td className="text-sm px-[50px] dropdown-container">
                                                                <div className="flex items-center gap-2 justify-center">
                                                                    <button onClick={() => {
                                                                        openModal('details')
                                                                        setActiveTab1('details')
                                                                        setorderitem(user)
                                                                    }}
                                                                        className="p-2 hover:bg-[#e8e8e8] rounded-full transition-all duration-200"
                                                                        aria-label="Edit user"
                                                                        title="Edit"
                                                                    >
                                                                        <i className="fa-solid fa-eye text-[#6d6d6d] text-lg"></i>
                                                                    </button>
                                                                    {user?.payment_status == "Success" ? (


                                                                        < div >

                                                                            <button onClick={() => {
                                                                                openModal('invoice')
                                                                                setorderitem(user)
                                                                            }}
                                                                                className="p-1 px-4 text-white bg-primary rounded-md transition-all duration-200"
                                                                                aria-label="Edit user"
                                                                                title="Edit"
                                                                            >
                                                                                Invoice
                                                                            </button>
                                                                        </div>
                                                                    ) : (
                                                                        <div className='w-[75px]'></div>
                                                                    )}

                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))}

                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                )}
                                {activeTab1 == 'details' && (
                                    <div>
                                        <h2 className='inline-flex items-center cursor-pointer gap-3 text-primary mb-5 ' onClick={() => {
                                            setActiveTab1('orders')
                                        }}><svg xmlns="http://www.w3.org/2000/svg" width="11" height="12" viewBox="0 0 11 16" fill="none">
                                                <path d="M9.55677 14.5647L2.55273 7.9109L9.55677 1.25706" stroke="#d86a37" strokeWidth="2.80161" />
                                            </svg>Back</h2>

                                        <div className='flex gap-6 w-full'>
                                            <div className='border-[1px] w-[70%] border-[#CBD6E2] rounded-[15px] p-[20px]'>
                                                <div className="text-[15px] font-bold mb-[15px] max-sm:mb-[10px] "><h5>Order Item</h5></div>
                                                <div className='divide-y divide-[#d4cdf0]'>
                                                    {Array.isArray(orderitem?.order_items) && orderitem?.order_items?.map((val, index) => {
                                                        const matchedProduct = product?.data?.find(val1 => val1.product_id === val.product);


                                                        return (
                                                            <div
                                                                key={index}
                                                                className="flex border-t justify-between items-center py-3  max-md:gap-1"
                                                            >

                                                                <div className="flex items-center gap-4 max-sm:gap-1">
                                                                    <img
                                                                        src={`https://srv963148.hstgr.cloud:10443/` + matchedProduct?.product_img}
                                                                        alt={matchedProduct?.product_img}
                                                                        className="h-[50px] w-[50px] rounded-[8px] object-cover max-md:h-[40px] max-md:w-[40px]"
                                                                    />
                                                                    <div>
                                                                        <span className="text-[12px] text-[#595858] max-md:text-[9px] ">Product Name</span>
                                                                        <h4 className="text-[14px] font-[600] max-md:text-[11px]">{matchedProduct?.name}</h4>
                                                                    </div>
                                                                </div>


                                                                <div className="">
                                                                    <span className="text-[12px] text-[#595858] max-md:text-[9px] ">Quantity</span>
                                                                    <h4 className="text-[14px] text-center font-[600] max-md:text-[11px]">{val.quantity}</h4>
                                                                </div>


                                                                <div className="">
                                                                    <span className="text-[12px] text-[#595858] max-md:text-[9px] ">Price</span>
                                                                    <h4 className="text-[14px] font-[600] max-md:text-[11px]">₹{parseInt(val.total_price)}</h4>
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                            <div className='w-[30%] flex flex-col gap-6'>
                                                <div className='border-[1px]  border-[#CBD6E2] rounded-[15px] p-[20px]'>
                                                    <div className="text-[15px] font-bold mb-[5px]  ">
                                                        <h5>Summary</h5>
                                                    </div>
                                                    <div className=" ">
                                                        <div className="text-[15px] font-bold max-sm:mb-[10px] pt-1  flex  ">
                                                            <span className="w-[150px] font-[400] text-[#575864]">Order ID</span>
                                                            <span className=" font-[600] ">#{orderitem?.order_id}</span>
                                                        </div>
                                                        <div className="text-[15px] font-bold max-sm:mb-[10px] pt-3 flex  ">
                                                            <span className="w-[150px] font-[400] text-[#575864]">Date</span>
                                                            <span className=" font-[600] ">{formatDate(orderitem?.created_at)}</span>
                                                        </div>
                                                        <div className="text-[15px] font-bold max-sm:mb-[10px] pt-3 flex  ">
                                                            <span className="w-[150px] font-[400] text-[#575864]">Total </span>
                                                            <span className=" font-[600] text-[#ff5200] ">₹{parseInt(orderitem?.total_amount)}</span>
                                                        </div>

                                                    </div>
                                                </div>
                                                <div className='border-[1px]  border-[#CBD6E2] rounded-[15px] p-[20px]'>
                                                    <div className="text-[15px] font-bold mb-[5px]  ">
                                                        <h5>Shipping Address</h5>
                                                    </div>
                                                    <div className=" ">
                                                        <div className="text-[14px] font-bold max-sm:mb-[10px] ">
                                                            <span className=" font-[400] text-[#575864]"> {
                                                                (() => {
                                                                    const matchedAddress = getAddress?.data?.find(item => item.address_id === orderitem?.address);
                                                                    if (!matchedAddress) return "N/A";

                                                                    const addressText = `
        
        ${matchedAddress.address_line_1} ${matchedAddress.landmark},
        ${matchedAddress.city}, ${matchedAddress.pin_code}, ${matchedAddress.state}
      `.replace(/\s+/g, ' ').trim(); // Remove extra spaces

                                                                    const words = addressText.split(' ');
                                                                    const shortText = words.slice(0, 30).join(' ') + (words.length > 30 ? '...' : '');

                                                                    return shortText;
                                                                })()
                                                            }</span>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>


                        )}


                        {activeTab === 'Address' && (

                            <div className='flex justify-center'>
                                {!AddresssData ? (
                                    <div>
                                        <img
                                            src={File}
                                            alt="Empty Address"
                                            className="mx-auto mb-4 h-[150px]"
                                        />
                                        <h6 className="tx-sub-title mb-1 text-center text-[20px]">No Address Yet!</h6>
                                        <p className='text-center my-[15px]'>
                                            Address book is empty. Add an address to start saving delivery info!
                                        </p>

                                        <div className='flex justify-center'>
                                            <button
                                                onClick={() => setIsModalOpen(true)}
                                                className='px-[46px] py-[10px] rounded-[13px] bg-[#D86A37] text-white text-[18px]'
                                            >
                                                Add Address
                                            </button>
                                        </div>

                                    </div>
                                ) : (
                                    <div className='w-[100%]'>
                                        {AddresssData?.length < 2 && (
                                            <div className='flex justify-end pb-5'>
                                                <button
                                                    onClick={() => setIsModalOpen(true)}
                                                    className='flex items-center gap-2 text-[#D86A37] border border-[#D86A37] px-4 py-2 rounded-md hover:bg-[#D86A37] hover:text-white transition duration-200'
                                                >
                                                    <svg
                                                        className='text-[#D86A37] group-hover:text-white transition duration-200'
                                                        fill='none'
                                                        stroke='currentColor'
                                                        strokeWidth='32'
                                                        viewBox='0 0 512 512'
                                                        height='1.2em'
                                                        width='1.2em'
                                                        xmlns='http://www.w3.org/2000/svg'
                                                    >
                                                        <path strokeLinecap='square' strokeLinejoin='round' d='M256 112v288m144-144H112' />
                                                    </svg>
                                                    Add Address
                                                </button>
                                            </div>
                                        )}

                                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                            {Array.isArray(AddresssData) && AddresssData?.map((item, index) => (
                                                <div
                                                    key={index}
                                                    className='border border-gray-300 rounded-xl p-5 shadow-md bg-white transition hover:shadow-lg relative'
                                                >
                                                    <div className='flex justify-between items-start'>
                                                        <h2 className='text-lg font-semibold text-gray-800 mb-1'>{item.name}</h2>
                                                        <div className='relative'>
                                                            <button onClick={() => toggleDropdown(index)} className='p-1 text-gray-600 hover:text-black'>
                                                                <svg
                                                                    stroke='currentColor'
                                                                    fill='none'
                                                                    strokeWidth='2'
                                                                    viewBox='0 0 24 24'
                                                                    strokeLinecap='round'
                                                                    strokeLinejoin='round'
                                                                    height='1.2em'
                                                                    width='1.2em'
                                                                    xmlns='http://www.w3.org/2000/svg'
                                                                >
                                                                    <circle cx='12' cy='12' r='1'></circle>
                                                                    <circle cx='12' cy='5' r='1'></circle>
                                                                    <circle cx='12' cy='19' r='1'></circle>
                                                                </svg>
                                                            </button>

                                                            {activeDropdown === index && (
                                                                <div className='absolute right-0 mt-2 w-32 bg-white border rounded-md shadow-md z-10'>
                                                                    <button
                                                                        onClick={() => {
                                                                            setIsEditModalOpen(null);
                                                                            handleEdit(item?.address_id);
                                                                        }}
                                                                        className='block w-full text-left px-4 py-2 text-sm hover:bg-gray-100'
                                                                    >
                                                                        Edit
                                                                    </button>
                                                                    <button
                                                                        onClick={() => {
                                                                            setActiveDropdown(null);
                                                                            handleDelete(item?.address_id);
                                                                        }}
                                                                        className='block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-600'
                                                                    >
                                                                        Delete
                                                                    </button>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>

                                                    <h3 className='text-sm text-gray-600 mb-2'>{item.email}</h3>
                                                    <p className='text-sm text-gray-700 leading-relaxed'>
                                                        {item.address_line_1}, {item.city}, {item.state}, {item.pin_code}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                        )}

                        {/* Address Form Modal */}
                        {isModalOpen && (
                            <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-100'>
                                <div className='bg-white w-[90%] max-w-[500px] p-8 rounded-[15px] shadow-lg relative'>
                                    <button
                                        onClick={() => setIsModalOpen(false)}
                                        className='absolute top-3 right-3 text-gray-600 hover:text-black text-[22px]'
                                    >
                                        &times;
                                    </button>

                                    <h2 className='text-[22px] font-semibold mb-4 text-[#333]'>Enter Address Details</h2>

                                    <form className='space-y-2' onSubmit={handleSubmitAddress}>
                                        <div>
                                            <label className='block mb-1 text-[15px] font-medium'>Name</label>
                                            <input
                                                type='text'
                                                placeholder='Enter Name'
                                                className='w-full border border-gray-300 rounded px-4 py-2'

                                                onChange={(e) => setName(e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <label className='block mb-1 text-[15px] font-medium'>Email</label>
                                            <input
                                                type='email'
                                                placeholder='Enter Email'
                                                className='w-full border border-gray-300 rounded px-4 py-2'

                                                onChange={(e) => setemail(e.target.value)}
                                            />
                                        </div>

                                        <div>
                                            <label className='block mb-1 text-[15px] font-medium'>Phone Number</label>
                                            <input
                                                type="text"
                                                inputMode="numeric" // Helps mobile keyboards show number pad
                                                pattern="\d*"
                                                maxLength={10}
                                                placeholder="Enter Mobile Number"
                                                className="w-full border border-gray-300 rounded px-4 py-2 placeholder:text-gray-500"
                                                value={contactNo}
                                                onChange={(e) => {
                                                    const value = e.target.value;
                                                    if (/^\d{0,10}$/.test(value)) {
                                                        setcontactNo(value);
                                                    }
                                                }}
                                            />

                                        </div>

                                        <div>
                                            <label className='block mb-1 text-[15px] font-medium'>Address 1</label>
                                            <input
                                                type='text'
                                                placeholder='Enter Address 1'
                                                className='w-full border border-gray-300 rounded px-4 py-2'

                                                onChange={(e) => setaddress_line_1(e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <label className='block mb-1 text-[15px] font-medium'>Address 2</label>
                                            <input
                                                type='text'
                                                placeholder='Enter Address 2'
                                                className='w-full border border-gray-300 rounded px-4 py-2'

                                                onChange={(e) => setaddress_line_2(e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <label className='block mb-1 text-[15px] font-medium'>city</label>
                                            <input
                                                type='text'
                                                placeholder='Enter city'
                                                className='w-full border border-gray-300 rounded px-4 py-2'

                                                onChange={(e) => setcity(e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <label className='block mb-1 text-[15px] font-medium'>Landmark</label>
                                            <input
                                                type='text'
                                                placeholder='Enter Landmark'
                                                className='w-full border border-gray-300 rounded px-4 py-2'

                                                onChange={(e) => setlandmark(e.target.value)}
                                            />
                                        </div>

                                        <div>
                                            <label className='block mb-1 text-[15px] font-medium'>Postal Code</label>
                                            <input
                                                type='text'
                                                placeholder='Enter Postal Code'
                                                className='w-full border border-gray-300 rounded px-4 py-2'

                                                onChange={(e) => setpin_code(e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <label className='block mb-1 text-[15px] font-medium'>State</label>
                                            <input
                                                type='text'
                                                placeholder='Enter State'
                                                className='w-full border border-gray-300 rounded px-4 py-2'

                                                onChange={(e) => setstate(e.target.value)}
                                            />
                                        </div>

                                        <div className='flex justify-end gap-4'>
                                            <button
                                                type='button'
                                                onClick={() => setIsModalOpen(false)}
                                                className='border border-gray-300 text-black px-6 py-2 rounded-[10px] hover:bg-gray-100'
                                            >
                                                Cancel
                                            </button>


                                            <button
                                                type='submit'
                                                className='bg-[#D86A37] text-white px-6 py-2 rounded-[10px] hover:bg-[#c65d2d]'
                                            >
                                                Save Address
                                            </button>
                                        </div>

                                    </form>
                                </div>
                            </div>
                        )}

                        {isEditModalOpen && (
                            <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-100'>
                                <div className='bg-white w-[90%] max-w-[500px] p-8 rounded-[15px] shadow-lg relative'>
                                    <button
                                        onClick={() => setIsEditModalOpen(false)}
                                        className='absolute top-3 right-3 text-gray-600 hover:text-black text-[22px]'
                                    >
                                        &times;
                                    </button>

                                    <h2 className='text-[22px] font-semibold mb-4 text-[#333]'>Enter Address Details</h2>

                                    <form className='space-y-2' onSubmit={handleEditAddress}>
                                        <div>
                                            <label className='block mb-1 text-[15px] font-medium'>Name</label>
                                            <input
                                                type='text'
                                                placeholder='Enter name'
                                                className='w-full border border-gray-300 rounded px-4 py-2'
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <label className='block mb-1 text-[15px] font-medium'>Email</label>
                                            <input
                                                type='email'
                                                placeholder='Enter Email'
                                                className='w-full border border-gray-300 rounded px-4 py-2'
                                                value={email}
                                                onChange={(e) => setemail(e.target.value)}
                                            />
                                        </div>

                                        <div>
                                            <label className='block mb-1 text-[15px] font-medium'>Phone Number</label>
                                            <input
                                                type='tel' // shows number pad on mobile devices
                                                placeholder='Enter Phone number'
                                                className='w-full border border-gray-300 rounded px-4 py-2'
                                                value={contactNo}
                                                onChange={(e) => {
                                                    const input = e.target.value;
                                                    // Allow only digits, max 10 characters
                                                    if (/^\d{0,10}$/.test(input)) {
                                                        setcontactNo(input);
                                                    }
                                                }}
                                            />

                                        </div>

                                        <div>
                                            <label className='block mb-1 text-[15px] font-medium'>Address 1</label>
                                            <input
                                                type='text'
                                                placeholder='Enter Address 1'
                                                className='w-full border border-gray-300 rounded px-4 py-2'
                                                value={address_line_1}
                                                onChange={(e) => setaddress_line_1(e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <label className='block mb-1 text-[15px] font-medium'>Address 2</label>
                                            <input
                                                type='text'
                                                placeholder='Enter Address 2'
                                                className='w-full border border-gray-300 rounded px-4 py-2'
                                                value={address_line_2}
                                                onChange={(e) => setaddress_line_2(e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <label className='block mb-1 text-[15px] font-medium'>city</label>
                                            <input
                                                type='text'
                                                placeholder='Enter City'
                                                className='w-full border border-gray-300 rounded px-4 py-2'
                                                value={city}
                                                onChange={(e) => setcity(e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <label className='block mb-1 text-[15px] font-medium'>Landmark</label>
                                            <input
                                                type='text'
                                                placeholder='Enter Landmark'
                                                className='w-full border border-gray-300 rounded px-4 py-2'
                                                value={landmark}
                                                onChange={(e) => setlandmark(e.target.value)}
                                            />
                                        </div>

                                        <div>
                                            <label className='block mb-1 text-[15px] font-medium'>Postal Code</label>
                                            <input
                                                type='text'
                                                placeholder='Enter Postal Code'
                                                className='w-full border border-gray-300 rounded px-4 py-2'
                                                value={pin_code}
                                                onChange={(e) => setpin_code(e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <label className='block mb-1 text-[15px] font-medium'>State</label>
                                            <input
                                                type='text'
                                                placeholder='Enter State'
                                                className='w-full border border-gray-300 rounded px-4 py-2'
                                                value={state}
                                                onChange={(e) => setstate(e.target.value)}
                                            />
                                        </div>

                                        <div className='flex justify-end gap-4'>
                                            <button
                                                type='button'
                                                onClick={() => setIsEditModalOpen(false)}
                                                className='border border-gray-300 text-black px-6 py-2 rounded-[10px] hover:bg-gray-100'
                                            >
                                                Cancel
                                            </button>


                                            <button
                                                type='submit'
                                                className='bg-[#D86A37] text-white px-6 py-2 rounded-[10px] hover:bg-[#c65d2d]'
                                            >
                                                Save Address
                                            </button>
                                        </div>

                                    </form>
                                </div>
                            </div>
                        )}
                        {
                            modal === 'invoice' && (
                                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[9999]">

                                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                                        <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
                                            <div className="relative transform overflow-hidden p-[30px]  rounded-[6px] bg-white text-left shadow-xl transition-all sm:my-8 sm:w-[80%] z-40">
                                                <div className="flex items-center justify-between">
                                                    <h3 className="text-xl font-medium text-gray">Invoice</h3>
                                                    <div onClick={closeModal}>
                                                        <svg className="closeModal cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="16" height="15" viewBox="0 0 16 15" fill="none">
                                                            <path fillRule="evenodd" clipRule="evenodd" d="M1.15128 0.751862C1.61991 0.283233 2.3797 0.283233 2.84833 0.751862L7.9998 5.90333L13.1513 0.751862C13.6199 0.283233 14.3797 0.283233 14.8483 0.751862C15.317 1.22049 15.317 1.98029 14.8483 2.44892L9.69686 7.60039L14.8483 12.7519C15.317 13.2205 15.317 13.9803 14.8483 14.4489C14.3797 14.9175 13.6199 14.9175 13.1513 14.4489L7.9998 9.29745L2.84833 14.4489C2.3797 14.9175 1.61991 14.9175 1.15128 14.4489C0.682647 13.9803 0.682647 13.2205 1.15128 12.7519L6.30275 7.60039L1.15128 2.44892C0.682647 1.98029 0.682647 1.22049 1.15128 0.751862Z" fill="#495567" />
                                                        </svg>
                                                    </div>
                                                </div>
                                                <div className='mt-8' ref={printRef}>
                                                    <div className='flex relative flex-wrap p-[24px] m-[-12px] rounded-[0.75rem] bg-[#dcf4f3] justify-between'>
                                                        <div className=''>


                                                            <h2 className='text-[18px] text-[#313b5e] font-[600]'>Apricot Jwellary</h2>
                                                            {addressdata1 && (
                                                                <p className="mt-[1.5rem] text-[14px] text-[#5d7186] font-[400]">
                                                                    {addressdata1.address_line_1},<br />
                                                                    {addressdata1.city}, {addressdata1.state}, {addressdata1.pin_code}, {addressdata1.landmark}
                                                                    <br />addressdata1
                                                                    Phone: {addressdata1.contact_no}
                                                                </p>
                                                            )}

                                                        </div>
                                                        <div>
                                                            <img src={Logo} className='h-[54px]' alt="" />
                                                        </div>
                                                        <div>
                                                            <table>

                                                                <tbody>
                                                                    <tr>
                                                                        <th className='text-[#313b5e] py-[6px] text-start ps-0 text-[14px] pr-[70px]'>Invoice :</th>
                                                                        <th className='text-[#313b5e] py-[6px] px-0 text-[14px] text-end'>#{orderitem?.order_id}</th>
                                                                    </tr>
                                                                    <tr>
                                                                        <td className='text-[14px] py-[6px] text-[#5d7186] pr-[70px]'>Issue Date:</td>
                                                                        <td className='text-[14px] text-[#313b5e] py-[6px] text-end'>{formatDate(orderitem?.created_at)}</td>
                                                                    </tr>
                                                                    {/* <tr>
                                                <td className='text-[14px] py-[6px] text-[#5d7186] pr-[70px]'>Due Date :</td>
                                                <td className='text-[14px] text-[#313b5e] py-[6px] text-end'>26 April 2024</td>
                                            </tr> */}
                                                                    <tr>
                                                                        <td className='text-[14px] py-[6px] text-[#5d7186] pr-[70px]'>Amount :</td>
                                                                        <td className='text-[14px] text-[#313b5e] py-[6px] text-end'>{orderitem?.total_amount}</td>
                                                                    </tr>
                                                                    {/* <tr>
                                                                        <td className='text-[14px] py-[6px] text-[#5d7186] pr-[70px]'>Status :</td>
                                                                        <td className="text-[14px] text-[#313b5e] py-[6px]">
                                                                            <div className="flex items-center gap-2">
                                                                              
                                                                                <span
                                                                                    className="text-[13px] bg-[#22c55e] font-semibold text-white px-[12px] py-[6px] rounded-[4px] inline-block"
                                                                                    style={{
                                                                                        lineHeight: "1.4",
                                                                                        minHeight: "30px",
                                                                                        verticalAlign: "",
                                                                                    }}
                                                                                >
                                                                                    {orderitem?.status}
                                                                                </span>
                                                                            </div>
                                                                        </td>

                                                                    </tr> */}
                                                                </tbody>


                                                            </table>
                                                        </div>
                                                        <img src="https://techzaa.in/larkon/admin/assets/images/check-2.png" className='absolute max-sm:w-[60px] w-[80px] left-0 right-0 mx-auto bottom-[-40px]' alt="" />
                                                    </div>

                                                    {/* <div className='mt-[36px] flex justify-between flex-wrap'>
                                <div>

                                    <h2 className='font-[600] text-[#313b5e]'>Issue From :</h2>
                                    <h3 className='mt-[20px] mb-[10px] text-[18px] font-[600] text-[#313b5e]'>Larkon Admin.INC</h3>
                                    <p className='text-[14px] text-[#5d7186] mb-[10px]'>2437 Romano Street Cambridge, MA 02141</p>
                                    <p className='text-[14px] text-[#5d7186] mb-[10px]'><span className='underline'>Phone :</span> +(31)781-417-2004</p>
                                    <p className='text-[14px] text-[#5d7186] mb-[10px]'><span className='underline'>Email :</span> JulianeKuhn@jourrapide.com</p>
                                </div>
                                <div>

                                    <h2 className='font-[600] text-[#313b5e]'>Issue For :</h2>
                                    <h3 className='mt-[20px] mb-[10px] text-[18px] font-[600] text-[#313b5e]'>Gaston Lapierre</h3>
                                    <p className='text-[14px] text-[#5d7186] mb-[10px]'>1344 Hershell Hollow Road WA 98168 , USA</p>
                                    <p className='text-[14px] text-[#5d7186] mb-[10px]'><span className='underline'>Phone :</span> +(31)781-417-2004</p>
                                    <p className='text-[14px] text-[#5d7186] mb-[10px]'><span className='underline'>Email :</span> JulianeKuhn@jourrapide.com</p>
                                </div>
                            </div> */}

                                                    <div className='overflow-x-scroll over__scroll pt-[84px]'>
                                                        <table className='w-full  rounded-[0.85rem] '>
                                                            <thead className='bg-[#eef2f780] '>
                                                                <tr>
                                                                    <th className='text-[#5d7186] p-[0.75rem] text-sm text-start'>Product Name</th>
                                                                    <th className='text-[#5d7186] p-[0.75rem] text-sm text-center'>Quantity</th>
                                                                    <th className='text-[#5d7186] p-[0.75rem] text-sm '>Price</th>
                                                                    <th className='text-[#5d7186] p-[0.75rem] text-sm '>Tax</th>
                                                                    <th className='text-[#5d7186] p-[0.75rem] text-sm text-center'>Total</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {orderitem?.order_items?.map((item, index) => (
                                                                    <tr
                                                                        key={item.id}
                                                                        className="h-[44px] sm:h-[58px] transition-all duration-200 bg-white border-b border-[#ddd]"

                                                                    >
                                                                        <td className="text-sm text-[#5E5873] flex  px-[30px] max-xl:px-[10px] max-sm:px-[5px] max-sm:min-w-[120px]   items-center gap-2 my-[15px] max-md:gap-1 max-md:text-[12px]">

                                                                            <div className="h-[56px] min-w-[56px] max-md:min-w-[40px] max-md:max-h-[40px] bg-   [#eef2f7] rounded-[12px] flex items-center justify-center overflow-hidden">
                                                                                {/* <img src={item.order_items.file} alt="category_img" className="object-cover h-[56px] w-[56px] max-md:w-[40px] max-md:h-[40px]" /> */}
                                                                                <img src={`https://srv963148.hstgr.cloud:10443` + product?.data?.find((val) => val.product_id == item?.product)?.product_img} alt="category_img" className="object-cover h-[56px] w-[56px] max-md:w-[40px] max-md:h-[40px]" />
                                                                            </div>
                                                                            <div className="">
                                                                                <h1 className="text-[#313b5e]">{product?.data?.find((val) => val.product_id == item?.product)?.name}</h1></div>
                                                                        </td>
                                                                        <td className="text-sm text-[#5E5873] text-center px-[30px]  max-xl:px-[10px] max-sm:px-[5px]  max-md:text-[12px]"> {item.quantity}</td>

                                                                        <td className="text-sm text-[#5E5873] text-center px-[30px]  max-xl:px-[10px] max-sm:px-[5px]   max-md:text-[12px]"> {product?.data?.find((val) => val.product_id == item?.product)?.total_price}</td>
                                                                        <td className="text-sm text-[#5E5873] text-center px-[30px]  max-xl:px-[10px] max-sm:px-[5px] max-md:text-[12px]">{item.product.total_gst || 0}%</td>
                                                                        {/* <td className="text-sm text-[#5E5873] text-center px-[30px]  max-xl:px-[10px] max-sm:px-[5px] max-md:hidden max-md:text-[12px]">   {item.product.total_gst || 0}%</td> */}


                                                                        <td className="text-sm text-[#5E5873] text-center    max-sm:px-[5px]   max-md:text-[12px]">
                                                                            {item.total_price}
                                                                        </td>

                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                    <div className='flex justify-end mt-[24px] flex-wrap'>
                                                        <table>
                                                            <tbody>



                                                                <tr className="">
                                                                    <td className="text-[14px] p-[0.75rem] text-[#5d7186] pr-[70px] text-end">Sub Total :</td>
                                                                    <td className="text-[14px] text-[#313b5e] p-[0.75rem] text-end ">₹{subTotal.toFixed(2)}</td>
                                                                </tr>
                                                                {/* <tr className="">
                                                                    <td className="text-[14px] p-[0.75rem] text-[#5d7186] pr-[70px] text-end">Discount :</td>
                                                                    <td className="text-[14px] text-[#313b5e] p-[0.75rem] text-end ">-$60.00</td>
                                                                </tr>
                                                                <tr className="">
                                                                    <td className="text-[14px] p-[0.75rem] text-[#5d7186] pr-[70px] text-end">Estimated Tax (15.5%) :</td>
                                                                    <td className="text-[14px] text-[#313b5e] p-[0.75rem] text-end ">$4</td>
                                                                </tr> */}
                                                                <tr className="border-t border-[#eaedf1]">
                                                                    <td className="text-[14px] p-[0.75rem] text-[#5d7186] font-[600] pr-[70px] text-end">Grand Amount :</td>
                                                                    <td className="text-[14px] text-[#313b5e] font-[600] p-[0.75rem] text-end ">₹{orderitem?.total_amount}</td>
                                                                </tr>



                                                            </tbody>
                                                        </table>

                                                    </div>

                                                    <div className='mt-[24px] flex items-center gap-[12px] p-[12px] mb-[20px] bg-[#fcdfdf] rounded-[0.75rem]'>
                                                        <div>
                                                            <div className='bg-[#ef5f5f] w-[36px] h-[36px] rounded-[0.75rem] flex items-center justify-center'>
                                                                <i className="fa-solid fa-circle-info text-white"></i>
                                                            </div>

                                                        </div>
                                                        <p className='text-[14px] text-[#602626]'>All accounts are to be paid within 7 days from receipt of invoice. To be paid by cheque or credit card or direct payment online. If account is not paid within 7 days the credits details supplied as confirmation of work undertaken will be charged the agreed quoted fee noted above.</p>
                                                    </div>

                                                </div>

                                                <div className="  pt-[30px] flex flex-row-reverse gap-3 ">
                                                    <button type="button" onClick={handleDownloadPDF} className="inline-flex h-[35px] sm:h-[40px]  w-[114px] shadow-[0px_8px_20px_1px_#F443364D] rounded-md bg-primary items-center    justify-center py-2 text-sm font-semibold text-white shadow-xs  sm:ml-3 ">Download</button>
                                                    <button type="button" className=" bg-[#F4F1FC] h-[35px] sm:h-[40px] w-[114px] closeModal   rounded-md border-0   inline-flex justify-center items-center  py-2 text-sm font-semibold  shadow-xs   sm:mt-0 " onClick={closeModal} >Cancel</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </section >
            <Footer />

            {
                modal === 'modal3' && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[9999]">

                        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                            <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
                                <div className="relative transform overflow-hidden p-[30px] border-t-[8px] border-[#F44336] rounded-[6px] bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-xl z-40">
                                    <div className="bg-white ">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-xl font-medium text-gray">Logout</h3>
                                            <div onClick={closeModal}>
                                                <svg className="closeModal cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="16" height="15" viewBox="0 0 16 15" fill="none">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M1.15128 0.751862C1.61991 0.283233 2.3797 0.283233 2.84833 0.751862L7.9998 5.90333L13.1513 0.751862C13.6199 0.283233 14.3797 0.283233 14.8483 0.751862C15.317 1.22049 15.317 1.98029 14.8483 2.44892L9.69686 7.60039L14.8483 12.7519C15.317 13.2205 15.317 13.9803 14.8483 14.4489C14.3797 14.9175 13.6199 14.9175 13.1513 14.4489L7.9998 9.29745L2.84833 14.4489C2.3797 14.9175 1.61991 14.9175 1.15128 14.4489C0.682647 13.9803 0.682647 13.2205 1.15128 12.7519L6.30275 7.60039L1.15128 2.44892C0.682647 1.98029 0.682647 1.22049 1.15128 0.751862Z" fill="#495567" />
                                                </svg>
                                            </div>
                                        </div>
                                        <p className="pt-[14px] text-[#8492A6]">Are you sure you want to Logout ?</p>


                                    </div>
                                    <div className="  pt-[30px] flex flex-row-reverse gap-3 ">
                                        <button type="button" onClick={logout} className="inline-flex h-[35px] sm:h-[40px]  w-[114px] shadow-[0px_8px_20px_1px_#F443364D] rounded-md bg-[#F44336] items-center   justify-center py-2 text-sm font-semibold text-white shadow-xs  sm:ml-3 ">Logout</button>
                                        <button type="button" className="mt-3 bg-[#F4F1FC] h-[35px] sm:h-[40px] w-[114px] closeModal   rounded-md border-0   inline-flex justify-center items-center  py-2 text-sm font-semibold  shadow-xs   sm:mt-0 " onClick={closeModal} >Cancel</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }

        </div >
    )
}

export default UserProfile
