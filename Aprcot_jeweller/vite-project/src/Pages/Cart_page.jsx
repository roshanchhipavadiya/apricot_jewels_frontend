import React, { useEffect, useState } from 'react'
import Navbar from '../Componenet/Navbar'
import Footer from '../Componenet/Footer'
import Wishlist_product from '../assets/wishlist_product.png'
import { Delete, Section } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDeleteCartMutation, useEditCartMutation, useGetTocartQuery } from '../services/apiSlice'
import { toast, ToastContainer } from 'react-toastify'

const Cart = () => {
    const [selectedSize, setSelectedSize] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [modal, setModal] = useState("");
    const openmodal = (modalid) => {
        setModal(modalid);
    };
    const closeModal = () => {
        setModal('');
    };
    const [dropdownOpenMap, setDropdownOpenMap] = useState({});
    const [selectedSizes, setSelectedSizes] = useState({});

    const [quantity, setQuantity] = useState(1);
    const toggleDropdown = (cartId) => {
        setDropdownOpenMap((prev) => ({
            ...prev,
            [cartId]: !prev[cartId],
        }));
    };

    const handleSizeSelect = (cartId, size) => {
        setSelectedSizes((prev) => ({
            ...prev,
            [cartId]: size,
        }));
        setDropdownOpenMap((prev) => ({
            ...prev,
            [cartId]: false,
        }));
    };




    const [openIndex, setOpenIndex] = useState(1);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex == index ? null : index);
    };

    const { data: Cart } = useGetTocartQuery(undefined, {
        skip: !localStorage.getItem('aprifrontoken'),
    });
    const cart = Cart?.data || [];
    const [cart_id, setCart_id] = useState('');
    let total = 0;


    // Increment quantity for a specific cart item
    const increment = async (quantity1, id) => {
        try {
            const formData = new FormData();
            formData.append("cart_id", id);
            formData.append("quantity", quantity1 + 1);

            await editCart(formData).unwrap();


        } catch (error) {
            toast.error(error?.message || 'Failed to add quantity', {
                  position: "bottom-center",
                autoClose: 1500,
            });
        }
    };
    const decrement = async (quantity1, id) => {
        try {

            if (quantity1 <= 1) {
                return
            }
            const formData = new FormData();
            formData.append("cart_id", id);
            formData.append("quantity", quantity1 - 1);

            await editCart(formData).unwrap();


        } catch (error) {
            toast.error(error?.message || 'Failed to change quantity', {
                  position: "bottom-center",
                autoClose: 1500,
            });
        }
    };

    // Decrement quantity for a specific cart item (min 1)



    cart?.forEach((val) => {
        total += parseInt(val.total_price || 0); // parseFloat for decimal support
    });


    // ✅ CALL the hook (add parentheses)
    const [deleteCart] = useDeleteCartMutation();

    const removecart = async () => {
        try {
            const formData = new FormData();
            formData.append("cart_id", cart_id);

            await deleteCart(formData).unwrap();

            toast.success("Cart Removed Successfully", {
                  position: "bottom-center",
                autoClose: 1500,
            });

            closeModal();

        } catch (error) {
            toast.error("Failed to remove cart", {
                  position: "bottom-center",
                autoClose: 1500,
            });
        }
    };

    const [editCart] = useEditCartMutation();


    const navigate = useNavigate()

    const handleCheckout = () => {
        if (!cart || cart.length === 0) {
            toast.warning("Please add items to the cart.");
            return;
        }

        navigate("/checkout", {
            state: { is_cart: true, cart: cart }
        });
    };


    return (
        <div>
            <Navbar />
            <section className='container mb-[100px]  max-lg:mb-[50px] max-sm:mb-[40px] flex gap-[65.36px] max-lg:block h-[100%]'>

                <div className='pt-[80px] flex w-[59%]  max-lg:w-[100%]'>
                    <div className='w-[100%]'>
                        <div onClick={() => {
                            navigate('/product')
                        }} className='inline-flex pb-[50px] cursor-pointer  max-lg:pb-[20px]'><svg xmlns="http://www.w3.org/2000/svg" width="28" height="27" viewBox="0 0 28 27" fill="none">
                                <path d="M17.0708 19.9246L10.2422 13.4373L17.0708 6.95013" stroke="#222222" strokeWidth="2.73146" />
                            </svg>
                            <span className=" text-[27.31px] font-normal leading-[100%] text-center underline decoration-solid decoration-[1px] underline-offset-2 max-lg:text-[22px]">
                                Continue Shopping
                            </span>

                        </div>
                        <div >
                            <h2 className="font-bold text-[61.46px] leading-[100%] text-justify text-[#D86A37] max-lg:text-[50px] max-sm:text-[40px] mb-[38px] " >
                                Shopping Bag
                            </h2>
                        </div>

                        <div style={{ borderTop: '1.31px solid #D86A3780', }}>
                            <div style={{ borderBottom: '1.31px solid #D86A3780', }}>
                                {cart.length > 0 ?
                                    (cart.map((item, index) => (
                                        <div key={index} className='py-[39px] px-[52px] flex items-center gap-[39px] max-2xl:py-[20px] max-2xl:px-[0px] max-2xl:gap-[20px] max-sm:flex-wrap'>
                                            <div className='cursor-pointer max-sm:flex max-sm:justify-center' onClick={() => navigate(`/product/${item?.product_slug}`, {
                                                state: { productid: item.product_id }
                                            })}>
                                                <img src={`https://srv963148.hstgr.cloud:10443${item.product_img}`} alt="Shopping bag img" className='max-h-[262px] max-w-[262px] rounded-[30px] max-2xl:max-w-[200px] max-2xl:max-w-[200px] max-sm:w-[150px] max-sm:h-[150px]' />
                                            </div>
                                            <div className=' w-[100%] '>
                                                <div className="flex justify-between w-[100%] mb-[30px] max-md:mb-[20px] max-sm:mb-[10px]">
                                                    <div className='max-w-[326px] '>
                                                        <span className="cursor-pointer  font-normal text-[19.61px] leading-[100%] tracking-[0%] text-justify  text-wrap max-sm:text-[15px]" onClick={() => navigate(`/product/${item?.product_slug}`, {
                                                            state: { productid: item.product_id }
                                                        })}>
                                                            {item.product_name}
                                                        </span>

                                                    </div>
                                                    <div>
                                                        <svg onClick={() => {
                                                            setCart_id(item.cart_id)
                                                            openmodal('modal1')
                                                        }} className='cursor-pointer' xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                            <path d="M0.84375 1.35373L14.7083 15.2183" stroke="#D86A37" strokeWidth="1.30716" strokeLinecap="round" />
                                                            <path d="M1.03711 15.3292L14.9016 1.46465" stroke="#D86A37" strokeWidth="1.30716" strokeLinecap="round" />
                                                        </svg>
                                                    </div>
                                                </div>
                                                <div className='flex justify-between mb-[0px] max-sm:block max-md:mb-[25px] flex-wrap items-center max-sm:mb-[15px]'>
                                                    <div>
                                                        {item?.ring_size && (



                                                            <div className="relative flex items-center gap-2">
                                                                <span className=" font-normal text-[15.69px] leading-[100%] tracking-[0%] text-center align-middle text-[#D86A37CC]     ">
                                                                    Size:
                                                                </span><br />

                                                                {/* Display selected size */}


                                                                {/* Dropdown Button */}
                                                                <button
                                                                    className=" font-semibold text-[18.53px] leading-[100%] tracking-[0%] text-center align-middle flex items-center gap-[13px]  max-2xl:text-[20px] max-md:text-[18px] max-md:gap-[10px] max-sm:text-[15px]"

                                                                >
                                                                    {item?.ring_size || 'Select Size'}{' '}

                                                                </button>



                                                            </div>
                                                        )
                                                        }
                                                        <div className="relative flex items-center gap-2">
                                                            <span className=" font-normal text-[15.69px] leading-[100%] tracking-[0%] text-center align-middle text-[#D86A37CC]     ">
                                                                Diamond Shape :
                                                            </span><br />

                                                            {/* Display selected size */}


                                                            {/* Dropdown Button */}
                                                            <button
                                                                className=" font-semibold text-[18.53px] leading-[100%] tracking-[0%] text-center align-middle flex items-center gap-[13px]  max-2xl:text-[20px] max-md:text-[18px] max-md:gap-[10px] max-sm:text-[15px]"

                                                            >
                                                                {item?.diamond_shape}

                                                            </button>



                                                        </div>
                                                        <div className="relative flex items-center gap-2">
                                                            <span className=" font-normal text-[15.69px] leading-[100%] tracking-[0%] text-center align-middle text-[#D86A37CC]     ">
                                                                Metal Color :
                                                            </span><br />

                                                            {/* Display selected size */}


                                                            {/* Dropdown Button */}
                                                            <button
                                                                className=" font-semibold text-[18.53px] leading-[100%] tracking-[0%] text-center align-middle flex items-center gap-[13px]  max-2xl:text-[20px] max-md:text-[18px] max-md:gap-[10px] max-sm:text-[15px]"

                                                            >
                                                                {item?.metal_color}

                                                            </button>



                                                        </div>
                                                        <div className="relative flex items-center gap-2">
                                                            <span className=" font-normal text-[15.69px] leading-[100%] tracking-[0%] text-center align-middle text-[#D86A37CC]     ">
                                                                Total Carat Weight :
                                                            </span><br />

                                                            {/* Display selected size */}


                                                            {/* Dropdown Button */}
                                                            <button
                                                                className=" font-semibold text-[18.53px] leading-[100%] tracking-[0%] text-center align-middle flex items-center gap-[13px]  max-2xl:text-[20px] max-md:text-[18px] max-md:gap-[10px] max-sm:text-[15px]"

                                                            >
                                                                {item?.total_carat_weight}

                                                            </button>



                                                        </div>
                                                    </div>
                                                    <div className=''>
                                                        <span className="fon    t-nunito font-normal text-[15.69px] leading-[100%] tracking-[0%] text-center align-middle text-[#D86A37CC] mb-[7px]">
                                                            Qty
                                                        </span><br />
                                                        <div className="flex items-center gap-[23px] border-b border-black pb-2 max-2xl:gap-[10px]">
                                                            {/* Decrement Button (-) */}
                                                            <button onClick={() => decrement(item.quantity, item.cart_id)} className="p-2">
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    width="12"
                                                                    height="3"
                                                                    viewBox="0 0 12 3"
                                                                    fill="none"
                                                                >
                                                                    <path d="M0.966724 2.35482V0.872498H11.79V2.35482H0.966724Z" fill="#D86A37" />
                                                                </svg>
                                                            </button>

                                                            {/* Display Current Quantity */}
                                                            <div className=" font-semibold text-[23.53px] leading-[100%] tracking-[0%] text-center align-middle  max-2xl:text-[20px]">
                                                                {item.quantity}
                                                            </div>

                                                            {/* Increment Button (+) */}
                                                            <button onClick={() => increment(item.quantity, item.cart_id)} className="p-2">
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    width="12"
                                                                    height="12"
                                                                    viewBox="0 0 12 12"
                                                                    fill="none"
                                                                >
                                                                    <path
                                                                        d="M5.09958 11.6436V6.70255H0.252621V4.96141H5.09958V0.161517H6.88777V4.96141H11.7347V6.70255H6.88777V11.6436H5.09958Z"
                                                                        fill="#D86A37"
                                                                    />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="font-semibold text-[26.14px] leading-[100%] tracking-[0%] text-justify max-2xl:text-[23px] max-md:text-[20px] max-sm:mt-[20px]">
                                                        <h5>{parseInt(item.total_price)}</h5>
                                                    </div>


                                                </div>




                                            </div>
                                        </div>
                                    ))
                                    ) : (
                                        <h2>No Cart Items</h2>
                                    )

                                }


                            </div>
                            {/* <div style={{ borderBottom: '1.31px solid #D86A3780', }}>
                                <div className='py-[39px] px-[52px] flex  gap-[39px] max-2xl:block max-2xl:px-[0px]'>
                                    <div >
                                        <label className="flex items-center gap-[19px] cursor-pointer">
                                            <input type="checkbox" className="w-[26px] h-[26px] rounded-[5px] accent-[#D86A3780] " />
                                            <span className=" font-normal text-[19.61px] leading-[100%] tracking-[0%]  text-[#333] max-sm:text-[17px]">
                                                Include Gift Wrapping for this order
                                            </span>
                                        </label>
                                    </div>
                                    <div className='max-2xl:mt-[20px]'>
                                        <div className='flex gap-[6.54px] pb-[12px]'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                                                <path d="M15.7212 8.81661V16.9864H2.64958V8.81661M9.18538 16.9864V4.73173M9.18538 4.73173H5.50899C4.9673 4.73173 4.4478 4.51655 4.06477 4.13351C3.68174 3.75048 3.46655 3.23098 3.46655 2.68929C3.46655 2.1476 3.68174 1.6281 4.06477 1.24507C4.4478 0.862036 4.9673 0.646851 5.50899 0.646851C8.36841 0.646851 9.18538 4.73173 9.18538 4.73173ZM9.18538 4.73173H12.8618C13.4035 4.73173 13.923 4.51655 14.306 4.13351C14.689 3.75048 14.9042 3.23098 14.9042 2.68929C14.9042 2.1476 14.689 1.6281 14.306 1.24507C13.923 0.862036 13.4035 0.646851 12.8618 0.646851C10.0024 0.646851 9.18538 4.73173 9.18538 4.73173ZM1.01562 4.73173H17.3551V8.81661H1.01562V4.73173Z" stroke="#D86A37" strokeWidth="1.30716" strokeLinecap="round" stroke-linejoin="round" />
                                            </svg>
                                            <span className='font-normal text-[19.61px] leading-[100%] tracking-[0%] text-center text-[#333] max-sm:text-[17px]'>Add Gift Note:</span>

                                        </div>
                                        <textarea
                                            className="w-full min-h-[104px] h-auto border border-[#333] border-[0.65px] rounded-[6.54px] font-normal text-[15.69px] leading-[100%] tracking-[0%] p-3 outline-none focus:ring-2 focus:ring-[#D86A37] sm:max-w-md md:max-w-lg lg:max-w-xl"
                                            placeholder="Customize your gift with a special note to convey your sentiments..."
                                        ></textarea>


                                    </div>

                                </div>
                            </div> */}


                        </div>
                    </div>

                </div>
                <div className='w-[41%] pt-[50px] max-lg:w-[100%]'>
                    <div>
                        <div className='px-[55px] py-[50px] mb-[39.21px] max-xl:px-[35px] max-xl:mb-[20px] max-sm:mb-0 max-sm:px-0 bg-[#E9F4F34D]'>
                            <h3 className="font-bold text-[39.21px] leading-[100%] tracking-[0%] pb-[39.81px] text-center max-2xl:text-[35px] max-sm:text-[28px]">
                                Order Summary
                            </h3>
                            <div>
                                <div className='border-b-[1px] border-[#D86A37]'>
                                    <div className='flex justify-between text-[19.61px] font-[700] mb-[18.75px] max-sm:text-[17px]'>
                                        <h5 >Subtotal</h5>
                                        <h5>₹{total}</h5>
                                    </div>
                                    <div className='flex justify-between text-[19.61px] font-[400]  mb-[18.75px]  max-sm:text-[17px]'>
                                        <span >Shipping</span>
                                        <span>Complementary</span>
                                    </div>
                                    <div className='flex justify-between text-[19.61px] font-[400]  mb-[18.75px] max-sm:text-[17px]'>
                                        <span className='flex items-center'>Sales Tax
                                            {/* <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                                                <circle cx="8.41543" cy="8.06039" r="5.49008" stroke="#222222" strokeWidth="0.784297" />
                                                <circle cx="8.41468" cy="11.9819" r="0.32679" fill="#222222" />
                                                <path d="M8.41582 10.6747V10.1147C8.41582 9.64793 8.64912 9.21202 9.03752 8.95308L9.42866 8.69232C10.0209 8.29752 10.3766 7.63288 10.3766 6.92115V6.75322C10.3766 5.67033 9.49871 4.79248 8.41582 4.79248V4.79248C7.33293 4.79248 6.45508 5.67033 6.45508 6.75322V6.75322" stroke="#222222" strokeWidth="0.784297" />
                                            </svg> */}
                                        </span>
                                        <span className=''>Calculated at Payment</span>
                                    </div>
                                    {/* <div className='flex justify-between text-[19.61px] font-[400]  mb-[25px] max-sm:text-[17px] '>
                                        <span className="text-[#D86A37] border-b-[1px] border-[#D86A37]">
                                            Promo Code
                                        </span>

                                        <span className='text-[#D86A37]'>-₹300</span>
                                    </div> */}
                                </div>
                                <div className='mb-[38.82px]'>
                                    <div className='flex justify-between text-[19.61px] font-[700] mb-[5.68px] mt-[26.14px] max-sm:text-[17px]'>
                                        <h5 >Total</h5>
                                        <h5>₹{total}</h5>
                                    </div>
                                    {/* <div className='flex justify-between text-[19.61px]  mb-[18.75px] max-sm:text-[17px]'>
                                        <p className="font-normal text-[14.38px] leading-[100%] tracking-[0%] max-sm:text-[13px]">
                                            As low as <span className='font-[600]'>₹256/mo </span>with Apricot Finance
                                        </p>

                                        <p className="font-normal text-[14.38px] leading-[100%] tracking-[0%] border-b-[1px] border-black  max-xl:w-[80px] max-sm:text-[13px]">Learn more</p>
                                    </div> */}
                                </div>

                                <button onClick={handleCheckout}
                                    className="bg-[#D86A37] hover:bg-white border border-white hover:border-[#22222280] rounded-[13px] w-full py-[15px] text-[26.14px] font-medium text-white text-center transition-all duration-300 ease-in-out hover:text-[#D86A37] max-lg:py-[5px]  max-xl:text-[17px] mb-[13.07px] max-2xl:py-[5px] max-2xl:text-[23px] "
                                >
                                    Proceed to Checkout
                                </button>


                                {/* <p className=" font-normal text-[15.69px] leading-[100%] tracking-[0%] text-center max-sm:text-[14px]">
                                    *A complimentary Lillian shopping bag is included with every item.
                                </p> */}


                            </div>

                        </div>
                        {/* <div className=''>
                            <div className='flex justify-center mb-[18.9px]'><svg xmlns="http://www.w3.org/2000/svg" width="31" height="31" viewBox="0 0 31 31" fill="none" className='me-[19.61px]'>
                                <path d="M21.3478 9.59905H21.3353M4.3237 17.6288L13.3055 26.6107C13.5382 26.8436 13.8145 27.0284 14.1187 27.1545C14.4228 27.2806 14.7489 27.3455 15.0781 27.3455C15.4073 27.3455 15.7334 27.2806 16.0375 27.1545C16.3417 27.0284 16.618 26.8436 16.8507 26.6107L27.6113 15.8625V3.33557H15.0844L4.3237 14.0962C3.85707 14.5657 3.59515 15.2006 3.59515 15.8625C3.59515 16.5244 3.85707 17.1594 4.3237 17.6288Z" stroke="#D86A37" strokeWidth="1.96074" strokeLinecap="round" stroke-linejoin="round" />
                                <circle cx="20.9673" cy="9.9802" r="1.30716" fill="#D86A37" />
                            </svg>
                                <span className=" font-semibold text-[26.14px] leading-[100%] tracking-[0%] text-justify underline decoration-solid decoration-0 max-2xl:text-[23px] max-sm:text-[20px]">
                                    Enter a Gift Card or Promo Code
                                </span>
                            </div>
                            <div className='flex justify-center mb-[39.21px]'>
                                <div className="flex items-center  border rounded-[13.07px]">
                                    <input className=" p-[10px] ps-[36.6px] max-sm:ps-[20px]" type="text" placeholder="Enter promo code" />
                                    <button className="bg-[#D86A37] text-white   font-semibold text-[26.14px] leading-[100%] tracking-[0%] pt-[14px] pb-[14px] pl-[29px] pr-[29px] rounded-[13.07px]  max-xl:text-[17px]  max-sm:pr-[20px] max-sm:pl-[20px]">
                                        Apply
                                    </button>
                                </div>
                            </div>
                            <div>
                                <div className=' border-b-[1px] border-[#D86A37]'>
                                    <h5 className=" font-normal text-[39.21px] leading-[100%] tracking-[0%] ms-[44.44px] mb-[26.75px] max-2xl:text-[30px] max-sm:text-[25px] max-sm:ms-0 max-sm:mb-[15px]">
                                        The Apricot Experience
                                    </h5>
                                </div>

                                <div className="space-y-4 border-t  border-t-primary  ">

                                    <div
                                        className="ps-[44px] pt-[25px] w-[95%] mx-auto   cursor-pointer max-sm:ps-0 max-ms:w-[100%]"
                                        onClick={() => toggleFAQ(1)}
                                    >
                                        <div className="flex justify-between items-center">
                                            <span className="font-[700] text-[28px] text-[#D86A37] max-2xl:text-[23px]">Product Details</span>


                                            <svg className={`transition-transform duration-300 ${openIndex === 1 ? "rotate-180" : "rotate-0"
                                                }`} xmlns="http://www.w3.org/2000/svg" width="25" height="18" viewBox="0 0 31 19" fill="none">
                                                <path d="M1.92578 17.2815L15.9338 2.573L29.9419 17.2815" stroke="#222222" strokeWidth="2.80161" />
                                            </svg>

                                        </div>
                                        <div
                                            className={`overflow-hidden transition-all px-[14px] max-sm:px-0 duration-400 ${openIndex === 1 ? "max-h-screen mt-2 opacity-100" : "max-h-0 opacity-0"
                                                }`}
                                        >
                                            <div className='mt-[20px] border-b-[1.31px] border-[#008FAB80] h-[100%] mb-[20px]'>
                                                <div className='pb-[20px] '>
                                                    <span className="font-semibold text-[19.61px] leading-[100%] tracking-[0%]  decoration-solid decoration-0 border-b-[1px] border-black mb-[10px] max-xl:text-[17px]">
                                                        Shop Locally, Pick Up Conveniently!
                                                    </span>

                                                </div>

                                                <p className='text-[19.61px] leading-[140%] mb-[20px] max-xl:text-[17px] max-xl:mb-[10px]'>
                                                    We’re excited to offer a boutique pickup option for our customers. Enjoy the convenience of shopping online and picking up your jewelry at our store.
                                                </p>

                                                <p className="font-nunito font-[500] text-[19.61px] leading-[140%] tracking-[0%] text-underline decoration-solid decoration-0 mb-[20px] max-xl:text-[17px] max-xl:mb-[10px]">
                                                    How It Works:
                                                </p>

                                                <p className="font-nunito font-normal text-[19.61px] leading-[140%] tracking-[0%] text-justify mb-[10px] max-xl:text-[17px] max-xl:mb-[5px]">
                                                    <span className="font-[500]">1. Place Your Order:</span> Browse our collection and select the items you wish to purchase. During checkout, choose the "Pickup at Store" option.
                                                </p>

                                                <p className="font-nunito font-normal text-[19.61px] leading-[140%] tracking-[0%] text-justify  mb-[10px] max-xl:text-[17px] max-xl:mb-[5px]">
                                                    <span className="font-[500]">2. Receive Confirmation:</span> After your order is processed, you’ll receive a confirmation email letting you know when your items are ready for pickup.
                                                </p>

                                                <p className="font-nunito font-normal text-[19.61px] leading-[140%] tracking-[0%] text-justify  mb-[30px] max-xl:text-[17px] max-xl:mb-[5px]">
                                                    <span className="font-[500]">3. Visit Our Boutique:</span> Come to our store at your preferred location during our business hours to collect your order. Please bring your confirmation email and a valid ID.
                                                </p>

                                                <p className="font-nunito font-normal text-[19.61px] leading-[140%] tracking-[0%] text-justify  mb-[12px] max-xl:text-[17px] max-xl:mb-[5px]">
                                                    If you need assistance or have questions about your order, feel free to call us at <del>
                                                        +1 (226) 152-4722
                                                    </del>
                                                </p>

                                            </div>


                                        </div>
                                    </div>

                                </div>


                            </div>

                        </div> */}
                    </div>
                </div>
            </section>

            <Footer />

            {
                modal === 'modal1' && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[9999]">

                        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                            <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
                                <div className="relative transform overflow-hidden p-[30px] border-t-[8px] border-[#F44336] rounded-[6px] bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-xl z-40">
                                    <div className="bg-white ">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-xl font-medium text-gray">Remove Cart</h3>
                                            <div onClick={closeModal}>
                                                <svg className="closeModal cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="16" height="15" viewBox="0 0 16 15" fill="none">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M1.15128 0.751862C1.61991 0.283233 2.3797 0.283233 2.84833 0.751862L7.9998 5.90333L13.1513 0.751862C13.6199 0.283233 14.3797 0.283233 14.8483 0.751862C15.317 1.22049 15.317 1.98029 14.8483 2.44892L9.69686 7.60039L14.8483 12.7519C15.317 13.2205 15.317 13.9803 14.8483 14.4489C14.3797 14.9175 13.6199 14.9175 13.1513 14.4489L7.9998 9.29745L2.84833 14.4489C2.3797 14.9175 1.61991 14.9175 1.15128 14.4489C0.682647 13.9803 0.682647 13.2205 1.15128 12.7519L6.30275 7.60039L1.15128 2.44892C0.682647 1.98029 0.682647 1.22049 1.15128 0.751862Z" fill="#495567" />
                                                </svg>
                                            </div>
                                        </div>
                                        <p className="pt-[14px] text-[#8492A6]">Are you sure you want to remove  this item?</p>


                                    </div>
                                    <div className="  pt-[30px] flex flex-row-reverse gap-3 ">
                                        <button type="button" onClick={removecart} className="inline-flex h-[35px] sm:h-[40px]  w-[114px] shadow-[0px_8px_20px_1px_#F443364D] rounded-md bg-[#F44336] items-center   justify-center py-2 text-sm font-semibold text-white shadow-xs  sm:ml-3 ">Remove</button>
                                        <button type="button" className="mt-3 bg-[#F4F1FC] h-[35px] sm:h-[40px] w-[114px] closeModal   rounded-md border-0   inline-flex justify-center items-center  py-2 text-sm font-semibold  shadow-xs   sm:mt-0 " onClick={closeModal} >Cancel</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }

        </div>
    )
}

export default Cart
