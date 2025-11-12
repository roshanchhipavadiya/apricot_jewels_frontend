import React, { useEffect, useState } from 'react'
import Navbar from '../Componenet/Navbar'
import apple_pay1 from '../assets/apple-pay1.png'
import pay_pal1 from '../assets/paypal1.png'
import Footer from '../Componenet/Footer';

import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAddAddressMutation, useAddCreateOrderMutation, useGetAddressQuery, useGetTocartQuery } from '../services/apiSlice';
import { toast, ToastContainer } from 'react-toastify';



const ringSizes = [
    'United States',
    'Canada',
    'United Kingdom',
    'Australia',
    'Germany',
    'France',
    'Japan',
    'Other'
];
const state = [
    'United States',
    'Canada',
    'United Kingdom',
    'Australia',
    'Germany',
    'France',
    'Japan',
    'Other'
];


const Cheackout = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedSize, setSelectedSize] = useState("Country/Region");
    const [isOpen1, setIsOpen1] = useState(false);
    const [selectedSize1, setSelectedSize1] = useState("State");
    const [checked, setChecked] = useState(false);
    const [checked1, setChecked1] = useState(false);
    const location = useLocation();
    const { is_cart } = location.state?.is_cart || {};
    const cart = location.state?.cart;

    const totalCartPrice = cart?.reduce((acc, item) => {
        return acc + parseInt(item.total_price);
    }, 0);



    const [address, setaddress] = useState({
        first_name: "",
        last_name: "",
        contact_no: "",
        email: "",
        address_line1: "",
        address_line_2: "",
        landmark: "",
        city: "",
        pin_code: "",
        state: "",
    });


    const [selected, setSelected] = useState('ship');
    const [selected1, setSelected1] = useState("ship");
    const options = [
        { id: 1, text: "Delivery by Wed, November 5", price: "Free" },
        { id: 2, text: "Delivery by Wed, November 5", price: "Free" },
    ];

    const [addaddress] = useAddAddressMutation()
    const navigate = useNavigate()



    const [selectedAddressId, setSelectedAddressId] = useState(null); // <-- Selected address ID

    const handleSelectAddress = (id) => {
        setSelectedAddressId(id); // store selected address ID
    };


    useEffect(() => {
        if (!cart) {
            navigate('/cart')
        }
    }, [cart])


    const { data: getaddress } = useGetAddressQuery()
    const viewaddress = getaddress?.data


    const oneadrres = viewaddress?.find((val) => selectedAddressId == val.address_id)


    const [addorder] = useAddCreateOrderMutation();

    const handlesubmit = async () => {
        try {
            // 1. Prepare formData
            const formData = new FormData();
            formData.append("address_id", selectedAddressId);
            formData.append("is_cart", true);

            // 2. Call backend to create Razorpay order
            const res = await addorder(formData).unwrap();
            const { razorpay_order_id, amount, currency } = res;

            // 3. Razorpay payment config
            const options = {
                key: "rzp_live_9vzpCSuUIX36wu",
                amount: amount * 100,
                name: "Apricot Jewels",
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
                    name: oneadrres?.name,
                    email: oneadrres?.email,
                    contact: oneadrres?.contact_no,
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

  

    return (
        <div>
            <Navbar />
            {/* <Footer/> */}
            <section className='container pb-[100px]  max-lg:pb-[50px] max-sm:pb-[40px] '>

                <div className='pt-[80px] max-sm:pt-[40px] max-lg:flex-wrap gap-[140px] max-2xl:gap-[40px] flex'>
                    <div className='w-[60%] max-lg:w-full max-xl:w-[50%] '>
                        <div className=' border-b border-[#D86A3780]'>


                            <div className='flex pb-[50px] max-lg:pb-[20px] '>
                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="27" viewBox="0 0 28 27" fill="none" className='cursor-pointer'  onClick={() => {
                                navigate('/cart')
                            }}>
                                    <path d="M17.0708 19.9246L10.2422 13.4373L17.0708 6.95013" stroke="#222222" strokeWidth="2.73146" />
                                </svg>
                                <span  onClick={() => {
                                navigate('/cart')
                            }} className="cursor-pointer text-[27.31px] font-normal leading-[100%] text-center underline decoration-solid decoration-[1px] underline-offset-2 max-lg:text-[22px]">
                                    Shopping Bag
                                </span>

                            </div>
                            <div >
                                <h2 className="font-bold text-[61.46px] leading-[100%] text-justify text-[#D86A37] max-lg:text-[50px] max-sm:text-[40px] mb-[38px]" >
                                    Checkout
                                </h2>
                            </div>
                        </div>

                        {/* <div className='py-[20px]'>
                            <h4 className='text-center text-[25px] text-black1'>Express Checkout</h4>
                            <div className='flex items-center max-sm:gap-[10px]  max-xl:gap-[30px] mt-[35px] justify-center gap-[60px]'>
                                <button className='border max-xl:w-[250px] rounded-[12px] border-[#22222280] flex justify-center items-center w-[300px] h-[55px]'>
                                    <img src={apple_pay1} alt="" />
                                </button>
                                <button className='border max-xl:w-[250px] rounded-[12px] border-[#22222280] flex justify-center items-center w-[300px] h-[55px]'>
                                    <img src={pay_pal1} alt="" />
                                </button>
                            </div>
                        </div> */}

                        {/* <div className='overflow-hidden my-[20px]'>
                            <span className='text-black1 text-[19px]  block  text-center or_line relative'>OR</span>
                        </div> */}


                        <div className=''>
                            {/* <h3 className='text-[25px] text-center text-black1'>Delivery Details</h3> */}
                            {/* <div className='flex max-sm:block items-center max-sm:space-y-[20px] mt-[35px] max-sm:gap-[10px] max-xl:gap-[30px] justify-center gap-[60px] '>
                                <button className={`border max-sm:w-full     rounded-[12px] max-xl:w-[250px]  text-[19px] gap-[25px]    flex justify-center items-center w-[300px] h-[55px]  ${selected === "ship" ? 'border-primary text-white font-[700]  bg-primary' : 'text-black1 bg-white border-[#22222280]'}   `} onClick={() => setSelected("ship")}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className={`w-[32px] h-[32px] max-sm:w-[25px] max-sm:h-[25px]  ${selected === "ship" ? 'fill-white storke-white' : 'fill-[#222222] storke-[#222222]'}`} viewBox="0 0 32 32" fill="none">
                                        <g clipPath="url(#clip0_113_4605)">
                                            <path d="M2.65625 4.12598V3.16775C2.12704 3.16775 1.69803 3.59676 1.69803 4.12598H2.65625ZM16.7102 4.12598H17.6684C17.6684 3.59676 17.2394 3.16775 16.7102 3.16775V4.12598ZM16.7102 11.7918V10.8335C16.4561 10.8335 16.2123 10.9345 16.0326 11.1142C15.8529 11.2939 15.752 11.5376 15.752 11.7918H16.7102ZM2.65625 5.0842H16.7102V3.16775H2.65625V5.0842ZM15.752 4.12598V24.5681H17.6684V4.12598H15.752ZM3.61447 22.0128V4.12598H1.69803V22.0128H3.61447ZM16.7102 12.75H23.0984V10.8335H16.7102V12.75ZM27.2507 16.9023V22.0128H29.1671V16.9023H27.2507ZM17.6684 24.5681L17.6684 11.7918L15.752 11.7918L15.752 24.5681H17.6684ZM24.2276 25.6974C23.604 26.321 22.5928 26.321 21.9691 25.6974L20.6139 27.0525C21.9861 28.4246 24.2107 28.4246 25.5828 27.0525L24.2276 25.6974ZM21.9691 23.4388C22.5928 22.8151 23.604 22.8151 24.2276 23.4388L25.5828 22.0837C24.2107 20.7116 21.9861 20.7116 20.6139 22.0837L21.9691 23.4388ZM8.89605 25.6974C8.27237 26.321 7.26118 26.321 6.6375 25.6974L5.28237 27.0525C6.65447 28.4246 8.87909 28.4246 10.2512 27.0525L8.89605 25.6974ZM6.6375 23.4388C7.26118 22.8151 8.27237 22.8151 8.89605 23.4388L10.2512 22.0837C8.87909 20.7116 6.65447 20.7116 5.28237 22.0837L6.6375 23.4388ZM24.2276 23.4388C24.5397 23.7508 24.6954 24.1579 24.6954 24.5681H26.6119C26.6119 23.6704 26.2686 22.7695 25.5828 22.0837L24.2276 23.4388ZM24.6954 24.5681C24.6954 24.9783 24.5397 25.3853 24.2276 25.6974L25.5828 27.0525C26.2686 26.3666 26.6119 25.4658 26.6119 24.5681H24.6954ZM20.5431 23.6099H16.7102V25.5263H20.5431V23.6099ZM21.9691 25.6974C21.6571 25.3853 21.5013 24.9783 21.5013 24.5681H19.5849C19.5849 25.4658 19.9281 26.3666 20.6139 27.0525L21.9691 25.6974ZM21.5013 24.5681C21.5013 24.1579 21.6571 23.7508 21.9691 23.4388L20.6139 22.0837C19.9281 22.7695 19.5849 23.6704 19.5849 24.5681H21.5013ZM6.6375 25.6974C6.32547 25.3853 6.16974 24.9783 6.16974 24.5681H4.25329C4.25329 25.4658 4.5965 26.3666 5.28237 27.0525L6.6375 25.6974ZM6.16974 24.5681C6.16974 24.1579 6.32547 23.7508 6.6375 23.4388L5.28237 22.0837C4.5965 22.7695 4.25329 23.6704 4.25329 24.5681H6.16974ZM16.7102 23.6099H10.322V25.5263H16.7102V23.6099ZM8.89605 23.4388C9.20808 23.7508 9.36382 24.1579 9.36382 24.5681H11.2803C11.2803 23.6704 10.9371 22.7695 10.2512 22.0837L8.89605 23.4388ZM9.36382 24.5681C9.36382 24.9783 9.20808 25.3853 8.89605 25.6974L10.2512 27.0525C10.9371 26.3666 11.2803 25.4658 11.2803 24.5681H9.36382ZM27.2507 22.0128C27.2507 22.8948 26.5356 23.6099 25.6536 23.6099V25.5263C27.5941 25.5263 29.1671 23.9533 29.1671 22.0128H27.2507ZM23.0984 12.75C25.3916 12.75 27.2507 14.609 27.2507 16.9023H29.1671C29.1671 13.5506 26.45 10.8335 23.0984 10.8335V12.75ZM1.69803 22.0128C1.69803 23.9533 3.27107 25.5263 5.21151 25.5263V23.6099C4.32949 23.6099 3.61447 22.8948 3.61447 22.0128H1.69803Z" fill={selected === "ship" ? "white" : "#222222"} />
                                            <path d="M2.65625 10.5141H6.48915" stroke={selected === "ship" ? "white" : "#222222"} strokeWidth="1.91645" strokeLinecap="round" stroke-linejoin="round" />
                                            <path d="M2.65625 15.6246H9.04441" stroke={selected === "ship" ? "white" : "#222222"} strokeWidth="1.91645" strokeLinecap="round" stroke-linejoin="round" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_113_4605">
                                                <rect width="30.6632" height="30.6632" fill="white" transform="translate(0.433594 0.624634)" />
                                            </clipPath>
                                        </defs>
                                    </svg>

                                    Ship
                                </button>
                                 <button className={`border max-sm:w-full      rounded-[12px] max-xl:w-[250px]  text-[19px] gap-[25px]    flex justify-center items-center w-[300px] h-[55px]  ${selected === "pickup" ? 'border-primary text-white font-[700]  bg-primary' : 'text-black1 bg-white border-[#22222280]'}`} onClick={() => setSelected("pickup")}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className='w-[32px] h-[32px] max-sm:w-[25px] max-sm:h-[25px]' viewBox="0 0 31 31" fill='none'>
                                        <path d="M3.50391 27.1233H6.05917M26.5013 27.1233H23.946M6.05917 27.1233H23.946M6.05917 27.1233V12.2112M23.946 27.1233V12.2112M6.05917 12.2112C6.01189 12.1839 5.96527 12.155 5.9194 12.1244L5.22902 11.6641C4.22361 10.9939 3.82515 9.71097 4.27392 8.58904L5.41666 5.73218C5.80472 4.76205 6.74431 4.12592 7.78917 4.12592H22.216C23.2609 4.12592 24.2005 4.76205 24.5885 5.73218L25.7313 8.58904C26.18 9.71097 25.7816 10.9939 24.7762 11.6641L24.0858 12.1244C24.0399 12.155 23.9933 12.1839 23.946 12.2112M6.05917 12.2112C6.8965 12.695 7.94177 12.666 8.75421 12.1244L11.1697 10.5141L13.5852 12.1244C14.4435 12.6966 15.5617 12.6966 16.42 12.1244L18.8355 10.5141L21.251 12.1244C22.0634 12.666 23.1087 12.695 23.946 12.2112" stroke={selected === "pickup" ? "white" : "#222222"} strokeWidth="1.27763" strokeLinecap="round" stroke-linejoin="round" />
                                        <path d="M17.5578 27.1233V20.7351C17.5578 19.3239 16.4138 18.1799 15.0025 18.1799V18.1799C13.5913 18.1799 12.4473 19.3239 12.4473 20.7351V27.1233" stroke={selected === "pickup" ? "white" : "#222222"} strokeWidth="1.27763" />
                                    </svg>

                                    Pickup at Store
                                </button> 
                            </div> */}



                            <div className="space-y-[25px] space-y-[15px]  pt-[50px]">
                                {viewaddress?.length > 0 ? (
                                    viewaddress.map((item, index) => (
                                        <div
                                            key={index}
                                            className={`border border-[#22222280] cursor-pointer rounded-[13px] px-[40px] py-[30px] max-sm:px-[20px] max-sm:py-[25px]
              ${selectedAddressId === item.address_id ? 'bg-[#E9F4F34D]' : 'bg-white'}`}
                                            onClick={() => handleSelectAddress(item.address_id)}
                                        >
                                            <div className="flex flex-wrap items-center justify-between">
                                                <div className="flex items-center">
                                                    <div
                                                        className={`me-[6px] relative border w-[21px] h-[21px] rounded-full transition-all flex items-center justify-center
                    ${selectedAddressId === item.address_id ? 'border-primary bg-primary' : 'border-[#22222280]'}`}
                                                    // <-- Set selected
                                                    >
                                                        {/* Optional: a small dot inside to show selection */}
                                                        {selectedAddressId === item.address_id && (
                                                            <div className="w-[10px] h-[10px] bg-white rounded-full"></div>
                                                        )}
                                                    </div>

                                                    <h2 className="text-[20px] font-bold ms-3">{item.name}</h2>
                                                </div>
                                            </div>

                                            <div className="ps-[27px] ms-3 max-sm:ps-[0]">
                                                <p>{item.contact_no}</p>
                                                <p>{item.address_line_1}, {item.city}, {item.state}</p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div>



                                        <button onClick={() => {
                                            navigate('/profile', {
                                                state: { address11: 'Address' }
                                            })
                                        }} className='h-[35px] bg-[#161616] transition-all duration-150 hover:bg-black rounded-[6px] mt-[10px] text-white text-[15px] px-[20px] font-[500]'> Add Address</button>
                                    </div>
                                )}




                            </div>

                            {/* <div className='flex items-center  mt-[25px] '>
                                <div
                                    className={`w-[25px] h-[25px] border rounded-[5px]  me-[25px] flex items-center justify-center cursor-pointer transition-all ${checked ? "bg-primary border-primary" : "bg-white border-[#222222]"
                                        }`}
                                    onClick={() => setChecked(!checked)}
                                >
                                    {checked && (
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
                                <p className='text-[#222222] text-[19px]'>Use this address for billing</p>
                            </div>
                            <div className='flex items-center mt-[10px] '>
                                <div
                                    className={`w-[25px] h-[25px] border rounded-[5px]  me-[25px] flex items-center justify-center cursor-pointer transition-all ${checked1 ? "bg-primary border-primary" : "bg-white border-[#222222]"
                                        }`}
                                    onClick={() => setChecked1(!checked1)}
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
                                <p className='text-[#222222] text-[19px]'>Send me updates on Email and Phone</p>
                            </div> */}


                            {/* {selected == 'ship' &&
                                <div className='pt-[70px]'>
                                    <h4 className='text-center text-[25px] text-black1'>Express Shipping</h4>


                                    <div className='flex max-sm:flex-wrap  max-xl:gap-[30px] items-center mt-[35px] justify-center gap-[60px]'>

                                        {options.map((option) => (
                                            <button
                                                key={option.id}
                                                className={`border rounded-[12px] border-[#22222280] flex flex-col justify-center items-center w-[300px] py-[17px] transition-all ${selected === option.id ? "bg-primary  text-white" : "bg-white"
                                                    }`}
                                                onClick={() => setSelected(option.id)}
                                            >
                                                <div
                                                    className={`border-[#222222] relative border mb-[15px] w-[21px] h-[21px] rounded-full transition-all flex items-center justify-center ${selected === option.id ? "bg-primary border-white actIIVE_btn" : "bg-transparent"
                                                        }`}
                                                >

                                                </div>
                                                <p
                                                    className={`font-[500] text-[19px] ${selected === option.id ? "text-white" : "text-black1"
                                                        }`}
                                                >
                                                    {option.text}
                                                </p>
                                                <span className={`font-[700] text-[19px] ${selected === option.id ? "text-white" : "text-black1"
                                                    }`}>- {option.price}</span>
                                            </button>
                                        ))}

                                    </div>
                                </div>

                            } */}

                            <button onClick={() => {
                                if (!selectedAddressId) {
                                    toast.error("Please select an address.", {
                                          position: "bottom-center",
                                        autoClose: 1500, // 1500 milliseconds = 1.5 seconds
                                    });

                                    return; // prevent navigation
                                }
                                handlesubmit()

                            }} className='h-[55px] w-full bg-primary rounded-[6px] mt-[60px] text-white text-[25px] font-[500]'>Proceed to Payment</button>


                        </div>
















                    </div>
                    <div className='w-[40%] max-lg:w-full max-xl:w-[50%] '>
                        <div className='px-[55px] max-sm:px-[30px] max-xl:px-[35px] max-xl:py-[30px] rounded-[12px] py-[50px] bg-[#E9F4F34D]'>

                            <h2 className='text-[38px] font-[700] text-center text-black1 mb-[38px]'>Order Summary</h2>

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
                                            {val.diamond_shape && (
                                                <span className="text-[15px] block my-[16px] text-[#222222CC]">
                                                    Diamond Shape : <span className="text-black1">{val.diamond_shape}</span>
                                                </span>

                                            )}
                                            {val.metal_color && (
                                                <span className="text-[15px] block my-[16px] text-[#222222CC]">
                                                    Metal Color : <span className="text-black1">{val.metal_color}</span>
                                                </span>

                                            )}
                                            <div className="flex justify-between">
                                                <span className="text-[15px] block text-[#222222CC]">
                                                    Qty <span className="text-black1">{val.quantity}</span>
                                                </span>
                                                <span className="text-[19.16px] font-[700]">₹{parseInt(val.total_price)}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='h-[1px] bg-[#D86A374D] w-full my-[35px]'></div>
                                </div>
                            ))}


                            {/* <div className='flex justify-center gap-[19px] items-center'>
                                <div className=''><svg xmlns="http://www.w3.org/2000/svg" width="31" height="30" viewBox="0 0 31 30" fill="none">
                                    <path d="M21.5753 8.74302H21.563M4.93572 16.5914L13.7146 25.3703C13.9421 25.598 14.2121 25.7786 14.5094 25.9019C14.8067 26.0251 15.1254 26.0885 15.4472 26.0885C15.769 26.0885 16.0876 26.0251 16.3849 25.9019C16.6822 25.7786 16.9523 25.598 17.1797 25.3703L27.6973 14.865V2.62103H15.4533L4.93572 13.1386C4.47963 13.5974 4.22363 14.2181 4.22363 14.865C4.22363 15.5119 4.47963 16.1326 4.93572 16.5914Z" stroke="#D86A37" strokeWidth="1.91645" strokeLinecap="round" stroke-linejoin="round" />
                                </svg></div>
                                <div className='text-[19px] font-[600]'>Enter a Gift Card or Promo Code</div>
                            </div> */}

                            {/* <div className=' flex mt-[18px] mb-[38px] justify-center items-center'>
                                <div className='relative'>

                                    <input type="text" className='border max-sm:w-[250px] max-2xl:w-[350px] ps-[20px] border-[#3d3d3d] pe-[150px] bg-white rounded-[12px] h-[48px] w-[380px]' />
                                    <button className='h-[48px] px-[25px] bg-primary absolute top-0 text-[19px] text-white right-0 rounded-[12px]'> Apply</button>
                                </div>
                            </div> */}
                            <div className='border-b-[1px] border-[#D86A3780]'>
                                <div className='flex justify-between text-[19.61px] font-[700] mb-[18.75px]'>
                                    <h5 >Subtotal</h5>
                                    <h5>₹{totalCartPrice}</h5>
                                </div>
                                <div className='flex leading-[100%] justify-between text-[19.61px] font-[400]  mb-[12.75px]'>
                                    <span >Shipping</span>
                                    <span>Complementary</span>
                                </div>
                                <div className='flex leading-[100%] justify-between text-[19.61px] font-[400]  mb-[12.75px]'>
                                    <span className='flex items-center'>Sales Tax <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                                        <circle cx="8.41543" cy="8.06039" r="5.49008" stroke="#222222" strokeWidth="0.784297" />
                                        <circle cx="8.41468" cy="11.9819" r="0.32679" fill="#222222" />
                                        <path d="M8.41582 10.6747V10.1147C8.41582 9.64793 8.64912 9.21202 9.03752 8.95308L9.42866 8.69232C10.0209 8.29752 10.3766 7.63288 10.3766 6.92115V6.75322C10.3766 5.67033 9.49871 4.79248 8.41582 4.79248V4.79248C7.33293 4.79248 6.45508 5.67033 6.45508 6.75322V6.75322" stroke="#222222" strokeWidth="0.784297" />
                                    </svg></span>
                                    <span>Calculated at Payment</span>
                                </div>
                                {/* <div className='flex justify-between text-[19.61px] leading-[100%] font-[400]  mb-[25px] '>
                                    <span className="text-[#D86A37] leading-[100%] border-b-[1px] border-[#D86A3780]">
                                        Promo Code
                                    </span>

                                    <span className='text-[#D86A37] leading-[100%]'>-₹300</span>
                                </div> */}
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
            </section >
            <Footer />
        </div >
    )
}

export default Cheackout
