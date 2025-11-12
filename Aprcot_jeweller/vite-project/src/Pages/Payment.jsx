import React, { useState, } from 'react'
import Navbar from '../Componenet/Navbar'
import Visa from '../assets/visa.png'
import Card from '../assets/card.png'
import Express from '../assets/american-express.png'
import Card_1 from '../assets/card1.png'
import PayPal from '../assets/paypal.png'
import Google_pay from '../assets/google_pay.png'
import Amazon_pay from '../assets/amazon_pay.png'
import Footer from '../Componenet/Footer'
import { Link, useLocation } from 'react-router-dom'
import { useAddCreateOrderMutation, useGetAddressQuery } from '../services/apiSlice'
import { toast, ToastContainer } from 'react-toastify'



const Payment = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [checked1, setChecked1] = useState(false);
    const [selected, setSelected] = useState('card');

    const location = useLocation();
    const { addressid } = location.state || {};
    const { is_cart } = location.state || {};
    const  cart  = location.state.cart || {};
  const totalCartPrice = cart.reduce((acc, item) => {
        return acc + parseInt(item.total_price);
    }, 0);

    const { data: getaddress } = useGetAddressQuery()
    const viewaddress = getaddress?.data

    const single_address = viewaddress?.find((item) => item.address_id === addressid);
 
    const [addorder] = useAddCreateOrderMutation();



    const handlesubmit = async () => {
        try {
            // 1. Prepare formData
            const formData = new FormData();
            formData.append("address_id", addressid);
            formData.append("is_cart", is_cart);

            // 2. Call backend to create Razorpay order
            const res = await addorder(formData).unwrap();
            const { razorpay_order_id, amount, currency } = res;

            // 3. Razorpay payment config
            const options = {
                key: "rzp_test_AkJXCxFhiCKNCE",
                amount: amount * 100,
                name: "Your Store Name",
                description: "Order Payment",
                order_id: razorpay_order_id,
                handler: async function (res) {
                    await verifyPayment(
                        res.razorpay_order_id,
                        res.razorpay_payment_id,
                        res.razorpay_signature
                    );
                },
                prefill: {
                    name: "John Doe",
                    email: "john@example.com",
                    contact: "9876543210",
                },
                method: {
                    netbanking: true,
                    card: true,
                    upi: true,
                    wallet: true,
                    emi: true,
                    paylater: true,
                },
                theme: {
                    color: "#3399cc",
                },
            };


            const razorpay = new window.Razorpay(options);
            razorpay.open();

        } catch (error) {
            toast.error("Failed to start payment",{
                  position: "bottom-center",
                 autoClose: 1500,
            });
        }
    };



    //     document.getElementById(buttonId).addEventListener("click", function () {
    //         let accesstoken = localStorage.getItem('auth_token');

    //         const priceElement = document.querySelector(`#${buttonId}`).closest('.border-20-bottom').querySelector('.price12');
    //         const priceInINR = parseFloat(priceElement ? priceElement.getAttribute('data-price') : 500); // use INR now

    //         fetch(`${BASE_URL}/create-order/`, {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify({
    //                 amount: priceInINR, // Send in INR
    //                 // currency: "INR"     // Make sure backend creates INR order too!
    //             }),
    //         })
    //         .then((response) => response.json())
    //         .then((data) => {
    //             if (data.order_id) {
    //                 var options = {
    //                     key: "rzp_test_eUXG2ym61e4K9T",
    //                     amount: priceInINR * 100, // paise
    //                     currency: "INR",
    //                     name: "Service Squad",
    //                     description: "Payment For Subscription",
    //                     order_id: data.order_id,
    //                     handler: function (response) {
    //                         fetch(`${BASE_URL}/verify-payment/`, {
    //                             method: "POST",
    //                             headers: {
    //                                 "Content-Type": "application/json",
    //                             },
    //                             body: JSON.stringify({
    //                                 razorpay_order_id: response.razorpay_order_id,
    //                                 razorpay_payment_id: response.razorpay_payment_id,
    //                                 razorpay_signature: response.razorpay_signature,
    //                             }),
    //                         })
    //                         .then((res) => res.json())
    //                         .then((verifyData) => {
    //                             if (verifyData.status) {
    //                                 showToast("success", "Payment Successful!");
    //                             } else {
    //                                 showToast("error", "Payment verification failed.");
    //                             }
    //                         })
    //                         .catch((err) => {
    //                             showToast("error", "Error verifying payment.");
    //                             console.error(err);
    //                         });
    //                     },
    //                     prefill: {
    //                         name: "John Doe",
    //                         email: "john.doe@example.com",
    //                         contact: "9999999999",
    //                     },
    //                     theme: {
    //                         color: "#528ff0",
    //                     },
    //                     method: {
    //                         netbanking: true,
    //                         card: true,
    //                         upi: true,
    //                         wallet: true,
    //                         emi: true,
    //                         paylater: true
    //                     },
    //                 };

    //                 var rzp1 = new Razorpay(options);
    //                 rzp1.open();
    //             }
    //         })
    //         .catch((err) => {
    //             console.error(err);
    //         });
    //     });
    // }


    return (
        <div>
            <Navbar />

            <section className='container pb-[100px]  max-lg:pb-[50px] max-sm:pb-[40px] '>

                <div className='pt-[80px] max-sm:pt-[40px] max-lg:flex-wrap gap-[140px] max-2xl:gap-[40px] flex'>
                    <div className='w-[60%] max-lg:w-full max-xl:w-[50%] '>
                        <div className=' border-b border-[#D86A3780]'>


                            <div className='flex pb-[50px] max-lg:pb-[20px]'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="27" viewBox="0 0 28 27" fill="none">
                                    <path d="M17.0708 19.9246L10.2422 13.4373L17.0708 6.95013" stroke="#222222" strokeWidth="2.73146" />
                                </svg>
                                <span className=" text-[27.31px] font-normal leading-[100%] text-center underline decoration-solid decoration-[1px] underline-offset-2 max-lg:text-[22px]">
                                    Shopping Bag
                                </span>

                            </div>
                            <div >
                                <h2 className="font-bold text-[61.46px] leading-[100%] text-justify text-[#D86A37] max-lg:text-[50px] max-sm:text-[40px] mb-[38px]" >
                                    Payment
                                </h2>
                            </div>
                        </div>

                        <div className='py-[20px] mb-[40px] border-b border-[#D86A3780]'>
                            <div className='w-[80%] max-2xl:w-[100%] mx-auto'>
                                <div className='flex mb-[25px] items-center justify-between w-full'>
                                    <h4 className='text-[26px]'>Shipping Information</h4>
                                    <a href="" className='underline text-[19.5px]'>Edit</a>
                                </div>

                                <div className='mb-[25px]'>
                                    <h6 className='text-[19.5px] font-[700]'>Email</h6>
                                    <p className='text-[19px]'>{single_address?.email}</p>
                                </div>
                                <div className='mb-[25px]'>
                                    <h6 className='text-[19.5px] font-[700]'>Shipping & Billing Address</h6>
                                    <p className='text-[19px] w-[260px]'>{single_address?.address_line_1} , {single_address?.city} , {single_address?.state} ({single_address?.pin_code})</p>
                                    {/* <p className='text-[19px] w-[260px]'>
                                        United States
                                    </p> */}
                                    <p className='text-[19px] w-[260px]'>
                                        {single_address?.contact_no}</p>

                                </div>
                                <div className=''>
                                    <h6 className='text-[19.5px] font-[700]'>Express Shipping</h6>
                                    <p className='text-[19px] w-[260px]'>2-day : Delivery by 02/11/24</p>


                                </div>

                            </div>
                        </div>




                        <div className='w-[80%] max-2xl:w-[100%] mx-auto'>

                            <div className=''>
                                <div className='flex items-center justify-between' onClick={() => setIsOpen(!isOpen)}>

                                    <h3 className='text-[26px]'>Gift Card (optional)</h3>
                                    <svg className={`w-[26px] h-[26px] transition-transform duration-300 ${isOpen ? "rotate-180" : ""
                                        }`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 27" fill="none">
                                        <path d="M18.9316 10.4591L12.756 16.9598L6.58031 10.4591" stroke="#222222" stroke-opacity="0.7" strokeWidth="2.60028" />
                                    </svg>

                                </div>
                                {!isOpen && (
                                    <div className='flex items-center max-sm:block space-y-[20px] gap-[20px] px-3 mt-[20px]'>
                                        <div>
                                            <input placeholder='Gift Card Number' type="" className='h-[60px] max-sm:h-[50px] max-sm:w-full text-[19px] max-xl:w-full max-2xl:w-[250px] text-[#222222B2] w-[300px] rounded-[13px]  border bordr-[#22222280] px-[20px]' />
                                        </div>
                                        <div>
                                            <input placeholder='Pin' type="number" className='h-[60px] max-sm:h-[50px] max-sm:w-full text-[19px] max-xl:w-[100px] max-lg:w-[200px] text-[#222222B2] w-[190px] rounded-[13px]  border bordr-[#22222280] px-[20px]' />
                                        </div>
                                        <button className="bg-[#D86A37] text-white   font-semibold text-[26.14px] leading-[100%] tracking-[0%] pt-[14px] pb-[14px] pl-[29px] pr-[29px] rounded-[13.07px]  max-xl:text-[17px]  max-sm:pr-[20px] max-sm:pl-[20px]">
                                            Apply
                                        </button>
                                    </div>
                                )}
                                <a href="" className='text-[19.5px] block text-[19.5px] underline mt-[19px]'>Check Balance</a>
                            </div>

                            <div className='mt-[70px] max-sm:mt-[40px]'>
                                <h3 className='text-[26px] mb-[38px]'>Payment Options</h3>

                                <div className='space-y-[26px]'>

                                    <div className={`border border-[#22222280] rounded-[13px] px-[40px] py-[30px] max-sm:px-[20px] max-sm:py-[25px]  ${selected == 'card' ? 'bg-[#E9F4F34D] ' : 'bg-white'}`} >
                                        <div className='flex flex-wrap items-center justify-between '>
                                            <div className='flex items-center'>
                                                <div
                                                    className={` me-[6px] relative border   w-[21px] h-[21px] rounded-full transition-all flex items-center justify-center 
                                                        ${selected == 'card' ? 'actIIVE_btn1 border-primary' : 'border-[#22222280]'}
                                                        " 
                                                    `}
                                                    onClick={() => setSelected('card')}
                                                >
                                                </div>
                                                <h4 className='text-[19px] font-[600]'>Credit Card</h4></div>

                                            <div className='flex gap-[14px] items-center'>
                                                <img src={Visa} className='w-[38px]  object-content' alt="" />
                                                <img src={Card} className='w-[26px]  object-content' alt="" />
                                                <img src={Express} className='w-[48px]  object-content' alt="" />
                                                <img src={Card_1} className='w-[28px]  object-content' alt="" />
                                            </div>
                                        </div>
                                        <div className="ps-[27px] max-sm:ps-[0]">
                                            <p className="text-[19px] mt-[20px] mb-[18px]">Card Details</p>

                                            {/* Card Number Input */}
                                            <div className="space-y-[26px]">
                                                <div className="relative">
                                                    <input
                                                        type="number"
                                                        placeholder="Card Number"
                                                        className="h-[60px] max-sm:h-[50px] px-[18px] border border-[#22222280] w-full rounded-[13px]"
                                                    />
                                                </div>


                                                {/* Expiration Date & CVV Inputs */}
                                                <div className="grid grid-cols-3 max-sm:grid-cols-1 gap-[26px]">
                                                    <div>

                                                        <input
                                                            type="text"
                                                            placeholder="MM"
                                                            maxLength={2}
                                                            className="h-[60px] max-sm:h-[50px] w-full px-[18px] border border-[#22222280] rounded-[13px] "
                                                        />
                                                    </div>
                                                    <div>

                                                        <input
                                                            type="text"
                                                            placeholder="YY"
                                                            maxLength={2}
                                                            className="h-[60px] max-sm:h-[50px] w-full px-[18px] border border-[#22222280] rounded-[13px] "
                                                        />
                                                    </div>
                                                    <div className='relative'>

                                                        <input
                                                            type="text"
                                                            placeholder="CVV"
                                                            maxLength={3}
                                                            className="h-[60px] max-sm:h-[50px] w-full px-[18px] border border-[#22222280] rounded-[13px] "
                                                        />
                                                        <svg xmlns="http://www.w3.org/2000/svg" className='absolute top-[15px] right-[18px]' width="27" height="27" viewBox="0 0 27 27" fill="none">
                                                            <circle cx="13.2647" cy="13.5708" r="9.10098" stroke="#222222" stroke-opacity="0.7" strokeWidth="1.30014" />
                                                            <circle cx="13.2663" cy="20.0715" r="0.541726" fill="#222222" fill-opacity="0.7" />
                                                            <path d="M13.266 17.9046V16.9763C13.266 16.2025 13.6527 15.4799 14.2966 15.0507L14.945 14.6184C15.9267 13.9639 16.5163 12.8621 16.5163 11.6823V11.4039C16.5163 9.6088 15.0611 8.15356 13.266 8.15356V8.15356C11.4709 8.15356 10.0156 9.6088 10.0156 11.4039V11.4039" stroke="#222222" stroke-opacity="0.7" strokeWidth="1.30014" />
                                                        </svg>
                                                    </div>
                                                </div>

                                                {/* Cardholder Name Input */}
                                                <div className="">
                                                    <input
                                                        type="text"
                                                        placeholder="Name on the Card"
                                                        className="h-[60px] max-sm:h-[50px] px-[18px] border border-[#22222280] w-full rounded-[13px]"
                                                    />
                                                </div>
                                            </div>

                                            {/* Checkbox for Shipping Address */}
                                            <div className='flex items-center mt-[25px] '>
                                                <div
                                                    className={`w-[25px] max-sm:w-[33px] h-[25px] border rounded-[5px]  me-[25px] flex items-center justify-center cursor-pointer transition-all ${checked1 ? "bg-primary border-primary" : "bg-white border-[#222222]"
                                                        }`}
                                                    onClick={() => setChecked1('check')}
                                                >
                                                    {checked1 && (
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
                                                <p className='text-[#222222] text-[19px]'>Use shipping address as billing address</p>
                                            </div>

                                        </div>

                                    </div>

                                    <div className={`border border-[#22222280] rounded-[13px] px-[40px] py-[30px] max-sm:px-[20px] max-sm:py-[25px]  ${selected == 'paypal' ? 'bg-[#E9F4F34D] ' : 'bg-white'}`} >
                                        <div className='flex flex-wrap items-center justify-between '>
                                            <div className='flex items-center'>
                                                <div
                                                    className={` me-[6px] relative border   w-[21px] h-[21px] rounded-full transition-all flex items-center justify-center 
                                                        ${selected == 'paypal' ? 'actIIVE_btn1 border-primary' : 'border-[#22222280]'}
                                                        " 
                                                    `}
                                                    onClick={() => setSelected('paypal')}
                                                >
                                                </div>
                                                <h4 className='text-[19px] font-[600]'><img src={PayPal} alt="" /></h4></div>


                                        </div>
                                        <div className="ps-[27px] max-sm:ps-[0]">
                                            <p className="text-[19px] mt-[20px] mb-[18px]">You will be redirected to PayPal to complete your purchase securely.</p>
                                        </div>
                                    </div>

                                    <div className={`border border-[#22222280] rounded-[13px] px-[40px] py-[30px] max-sm:px-[20px] max-sm:py-[25px]  ${selected == 'google' ? 'bg-[#E9F4F34D] ' : 'bg-white'}`} >
                                        <div className='flex flex-wrap items-center justify-between '>
                                            <div className='flex items-center'>
                                                <div
                                                    className={` me-[6px] relative border   w-[21px] h-[21px] rounded-full transition-all flex items-center justify-center 
                                                        ${selected == 'google' ? 'actIIVE_btn1 border-primary' : 'border-[#22222280]'}
                                                        " 
                                                    `}
                                                    onClick={() => setSelected('google')}
                                                >
                                                </div>
                                                <h4 className='text-[19px] font-[600]'><img src={Google_pay} alt="" /></h4></div>
                                        </div>
                                        <div className="ps-[27px] max-sm:ps-[0]">
                                            <div className='flex gap-[25px] max-sm:flex-wrap'>
                                                <input type="text" placeholder='Enter G-Pay ID' className='h-[60px] max-sm:h-[50px] px-[20px] text-[19px]   rounded-[13px] border border-[#22222280] w-full' />
                                                <button className='border border-primary h-[60px] max-sm:h-[50px] bg-primary px-[20px] text-[19px] rounded-[13px] text-white'>Proceed</button>

                                            </div>
                                        </div>
                                    </div>
                                    <div className={`border border-[#22222280] rounded-[13px] px-[40px] py-[30px] max-sm:px-[20px] max-sm:py-[25px]  ${selected == 'amazon' ? 'bg-[#E9F4F34D] ' : 'bg-white'}`} >
                                        <div className='flex flex-wrap items-center justify-between '>
                                            <div className='flex items-center'>
                                                <div
                                                    className={` me-[6px] relative border   w-[21px] h-[21px] rounded-full transition-all flex items-center justify-center 
                                                        ${selected == 'amazon' ? 'actIIVE_btn1 border-primary' : 'border-[#22222280]'}
                                                        " 
                                                    `}
                                                    onClick={() => setSelected('amazon')}
                                                >
                                                </div>
                                                <h4 className='text-[19px] font-[600]'><img src={Amazon_pay} alt="" /></h4></div>


                                        </div>
                                        <div className="ps-[27px] max-sm:ps-[0]">
                                            <p className="text-[19px] mt-[20px] mb-[18px]">You will be redirected to Amazon Pay to complete your purchase securely.</p>





                                        </div>

                                    </div>
                                    {/*
                                    <div className={`border border-[#22222280] rounded-[13px] px-[40px] py-[30px] max-sm:px-[20px] max-sm:py-[25px]  ${selected == 'Llian'?'bg-[#E9F4F34D] ' :'bg-white'}`} >
                                        <div className='flex flex-wrap items-center justify-between '>
                                            <div className='flex items-center'>
                                                 <div
                                                    className={` me-[6px] relative border   w-[21px] h-[21px] rounded-full transition-all flex items-center justify-center 
                                                        ${selected == 'Llian'?'actIIVE_btn1 border-primary' :'border-[#22222280]'}
                                                        " 
                                                    `}
                                                    onClick={() => setSelected('Llian')}
                                                >
                                                </div>
                                                <h4 className='text-[19px] font-[600]'><img src={Llian} alt="" /></h4></div>


                                        </div>
                                        <div className="ps-[27px] max-sm:ps-[0]">
                                            <p className="text-[19px] mt-[20px] mb-[18px]">Click below to select a financing plan and complete your purchase securely.</p>

                                                    <button className='border border-[#22222280] rounded-[13px] h-[50px] w-full'>View Plans</button>



                                        </div>

                                    </div> */}
                                </div>




                                <div className='flex mt-[50px] mb-[18px]'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 27 27" fill="none">
                                        <path d="M7.60333 12.6261V8.29225C7.60333 6.85551 8.17408 5.47761 9.19001 4.46168C10.2059 3.44574 11.5838 2.875 13.0206 2.875C14.4573 2.875 15.8352 3.44574 16.8512 4.46168C17.8671 5.47761 18.4378 6.85551 18.4378 8.29225V12.6261M5.43643 12.6261H20.6047C21.8015 12.6261 22.7716 13.5962 22.7716 14.793V22.3771C22.7716 23.5739 21.8015 24.544 20.6047 24.544H5.43643C4.23969 24.544 3.26953 23.5739 3.26953 22.3771V14.793C3.26953 13.5962 4.23969 12.6261 5.43643 12.6261Z" stroke="#222222" strokeWidth="1.30014" strokeLinecap="round" stroke-linejoin="round" />
                                    </svg>
                                    <h4 className='text-[19.5px]'>Secure and Encrypted.</h4>
                                </div>


                                <button onClick={handlesubmit}
                                    className="bg-[#D86A37] hover:bg-white border border-white hover:border-[#22222280] rounded-[13px] w-full py-[15px] text-[26.14px] font-medium text-white text-center transition-all duration-300 ease-in-out hover:text-[#D86A37] max-lg:py-[5px]  max-xl:text-[17px] mb-[13.07px] max-2xl:py-[5px] max-2xl:text-[23px] "
                                >
                                    Proceed to Payment
                                </button>




                                <p className='text-center text-[19.5px] max-sm:w-[100%] w-[80%] mt-[18px] mx-auto text-black1'>By placing your order you agree to our <span className='font-[600] underline'>Terms and Conditions, Privacy Policy</span> and <span className='font-[600] underline'>Returns Policy</span>.</p>
                            </div>

                        </div>

                    </div>
                    <div className='w-[40%] max-lg:w-full max-xl:w-[50%] '>
                        <div className='px-[55px] max-sm:px-[30px] max-xl:px-[35px] max-xl:py-[30px] rounded-[12px] py-[50px] bg-[#E9F4F34D]'>


                            <h3 className="font-bold text-[39.21px] leading-[100%] tracking-[0%] pb-[39.81px] text-center max-2xl:text-[35px] max-sm:text-[28px]">
                                Order Summary
                            </h3>
                            {cart?.map((val) => (


                                <div>

                                    <div className="flex justify-between items-center max-sm:block">
                                        {/* Image Container with Fixed Minimum Width */}
                                        <div className="pe-[25px] max-sm:mb-[15px]  flex-shrink-0">
                                            <img
                                                src={`https://srv963148.hstgr.cloud:10443` + val.product_img}
                                                className="w-[170px] h-[170px]  rounded-[12px] object-cover"
                                                alt=""
                                            />
                                        </div>

                                        {/* Text Content (Expands to fit available space) */}
                                        <div className="flex-1">
                                            <h3 className="text-[19px] text-black1">
                                                {val.product_name}
                                            </h3>
                                            <span className="text-[15px] block my-[16px] text-[#222222CC]">
                                                Size <span className="text-black1">{val.ring_size}</span>
                                            </span>
                                            <div className="flex justify-between">
                                                <span className="text-[15px] block text-[#222222CC]">
                                                    Qty <span className="text-black1">{val.quantity}</span>
                                                </span>
                                                <span className="text-[19.16px] font-[700]">₹{val.total_price}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='h-[1px] bg-[#D86A374D] w-full my-[35px]'></div>
                                </div>
                            ))}

                            <div className='flex justify-center gap-[19px] items-center'>
                                <div className=''><svg xmlns="http://www.w3.org/2000/svg" width="31" height="30" viewBox="0 0 31 30" fill="none">
                                    <path d="M21.5753 8.74302H21.563M4.93572 16.5914L13.7146 25.3703C13.9421 25.598 14.2121 25.7786 14.5094 25.9019C14.8067 26.0251 15.1254 26.0885 15.4472 26.0885C15.769 26.0885 16.0876 26.0251 16.3849 25.9019C16.6822 25.7786 16.9523 25.598 17.1797 25.3703L27.6973 14.865V2.62103H15.4533L4.93572 13.1386C4.47963 13.5974 4.22363 14.2181 4.22363 14.865C4.22363 15.5119 4.47963 16.1326 4.93572 16.5914Z" stroke="#D86A37" strokeWidth="1.91645" strokeLinecap="round" stroke-linejoin="round" />
                                </svg></div>
                                <div className='text-[19px] font-[600]'>Enter a Gift Card or Promo Code</div>
                            </div>

                            <div className=' flex mt-[18px] mb-[38px] justify-center items-center'>
                                <div className='flex justify-center mb-[39.21px]'>
                                    <div className="flex items-center  border rounded-[13.07px]">
                                        <input className=" p-[10px] ps-[36.6px] max-sm:ps-[20px]" type="text" placeholder="Enter promo code" />
                                        <button className="bg-[#D86A37] text-white   font-semibold text-[26.14px] leading-[100%] tracking-[0%] pt-[14px] pb-[14px] pl-[29px] pr-[29px] rounded-[13.07px]  max-xl:text-[17px]  max-sm:pr-[20px] max-sm:pl-[20px]">
                                            Apply
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className='border-b-[1px] border-[#D86A3780]'>
                                <div className='flex justify-between text-[19.61px] font-[700] mb-[18.75px] max-sm:text-[17px]'>
                                    <h5 >Subtotal</h5>
                                    <h5>₹{totalCartPrice}</h5>
                                </div>
                                <div className='flex justify-between text-[19.61px] font-[400]  mb-[18.75px]  max-sm:text-[17px]'>
                                    <span >Shipping</span>
                                    <span>₹40</span>
                                </div>
                                <div className='flex justify-between text-[19.61px] font-[400]  mb-[18.75px] max-sm:text-[17px]'>
                                    <span className='flex items-center'>Sales Tax <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                                        <circle cx="8.41543" cy="8.06039" r="5.49008" stroke="#222222" strokeWidth="0.784297" />
                                        <circle cx="8.41468" cy="11.9819" r="0.32679" fill="#222222" />
                                        <path d="M8.41582 10.6747V10.1147C8.41582 9.64793 8.64912 9.21202 9.03752 8.95308L9.42866 8.69232C10.0209 8.29752 10.3766 7.63288 10.3766 6.92115V6.75322C10.3766 5.67033 9.49871 4.79248 8.41582 4.79248V4.79248C7.33293 4.79248 6.45508 5.67033 6.45508 6.75322V6.75322" stroke="#222222" strokeWidth="0.784297" />
                                    </svg></span>
                                    <span>₹40</span>
                                </div>
                                <div className='flex justify-between text-[19.61px] font-[400]  mb-[25px] max-sm:text-[17px] '>
                                    <span className="text-[#D86A37] leading-[100%] border-b-[1px] border-[#D86A3780]">
                                        Promo Code
                                    </span>

                                    <span className='text-[#D86A37] leading-[100%]'>-₹300</span>
                                </div>
                            </div>
                            <div className=''>
                                <div className='flex justify-between text-[19.61px] font-[700] mb-[5.68px] mt-[26.14px]'>
                                    <h5 className='text-[25px] text-black1'>Total</h5>
                                    <h5 className='text-[25px] text-black1'>₹{totalCartPrice}</h5>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default Payment
