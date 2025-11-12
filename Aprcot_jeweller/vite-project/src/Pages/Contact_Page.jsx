import React, { useState } from "react";
import Navbar from '../Componenet/Navbar'
import Rectangle from '../assets/Rectangle.png'
import Design from '../assets/Design.png'
import Footer from '../Componenet/Footer'
import { useAddAppoinmnetMutation } from "../services/apiSlice";
import { toast, ToastContainer } from "react-toastify";

export const Contactpage = () => {

    const [data, setdata] = useState({
        first_name: "",
        last_name: "",
        email: "",
        mobile: "",
        message: "",
    })

    const [contact_us] = useAddAppoinmnetMutation()

    const handlesubmit = async () => {
        try {
            const formdata = new FormData();

            formdata.append('first_name', data?.first_name)
            formdata.append('last_name', data?.last_name)
            formdata.append('email', data?.email)
            formdata.append('mobile', data?.mobile)
            formdata.append('message', data?.message)

            await contact_us(formdata).unwrap()

            toast.success("Your message has been sent successfully. We'll get back to you soon.", {
                  position: "bottom-center",
                autoClose: 1500,
            })

        } catch (error) {
            toast.error(error?.data?.message || 'Something went Wrong ',{
                  position: "bottom-center",
                 autoClose: 1500,
            })
        }
    }




    return (

        <>
        
            <Navbar />
            <section className="container pt-[100px] max-lg:pt-[50px] max-sm:pt-[40px] overflow-hidden">
                <div>
                    <h4 className=" NunitoSans font-[400] text-[#D86A37] text-[38.75px] leading-[100%] text-center max-lg:text-[30px]">Contact Us</h4>
                    {/* <img src={Group18} className="mx-auto" /> */}

                    <div className='pb-[61px] max-lg:pb-[20px]' >
                        <div className='mb-[40px] overflow-hidden  max-sm:mb-[20px]'>
                            <div className='relative flex justify-center'>
                                <div className="relative  design">
                                    <img src={Design} alt="Design" className='mx-[50px] relative' />
                                </div>
                            </div>
                        </div>
                        {/* <div>
            <div className="grid grid-cols-6 gap-[33px] max-xl:gap-[15px] max-2xl:grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-lg:grid-cols-4 max-sm:grid-cols-2  h-[auto]">
              <Category image={Jewerlly_cat_6} title="Festivals of Diamonds" />
              <Category image={Jewerlly_cat_7} title="Tales of Mystique" />
              <Category image={Jewerlly_cat_8} title="Joy of Dressing" />
              <Category image={Jewerlly_cat_9} title="Pretty in Pink" />
              <Category image={Jewerlly_cat_10} title="Ankle Wear" />
              <Category image={Jewerlly_cat_5} title="Chains" />
            </div> 
         <div className="flex items-center justify-center relative mt-[50px] max-lg:mt-[30px] max-sm:mt-[30px]">
              <button className="view-more ">View More</button>
            </div>
          </div> */}
                    </div>

                </div>
                <div className="grid grid-cols-2 max-lg:grid-cols-1 gap-y-[28px] gap-x-[25px] max-lg:gap-[15px] max-xl:gap-[20px]">
                    <div>
                        <p className=" font-[500] text-[ 19.38px] max-lg:text-[15px] leading-[100%] text-[#58637C] pb-[17px] max-lg:pb-[5px] NunitoSans">First Name <span className="text-[]">  *</span></p>
                        <input onChange={(e) => setdata({ ...data, first_name: e.target.value })} className='NunitoSans border-[0.65px] border-[#1A1A1A4D] w-[100%] max-lg:w-[100%]  h-[58px] max-sm:h-[40px] max-xl:h-[50px] placeholder:text-[18px] max-lg:placeholder:text-[13px] max-xl:placeholder:text-[17px] placeholder:text-[#555555] pl-[19px] max-lg:pl-[10px]' placeholder='Enter Your First Name' />
                    </div>
                    <div>
                        <p className="font-[500] text-[ 19.38px] max-lg:text-[15px] leading-[100%] text-[#58637C]  pb-[17px] max-lg:pb-[5px] NunitoSans">Last Name *</p>
                        <input onChange={(e) => setdata({ ...data, last_name: e.target.value })} className='Nunitosans border-[0.65px]  border-[#1A1A1A4D] w-[100%] max-lg:w-[100%]  h-[58px] max-sm:h-[40px] placeholder:text-[18px] max-lg:placeholder:text-[13px] max-xl:placeholder:text-[17px] placeholder:text-[#555555] pl-[19px] max-lg:pl-[10px] ' placeholder='Enter Your Last Name' />
                    </div>
                    <div>
                        <p className="font-[500] text-[ 19.38px] max-lg:text-[15px] leading-[ 100%] text-[#58637C]  pb-[17px] max-lg:pb-[5px] NunitoSans">Mobile Number</p>
                        <input onChange={(e) => setdata({ ...data, mobile: e.target.value })} className=' NunitoSans border-[0.65px]  border-[#1A1A1A4D] w-[100%] max-lg:w-[100%]  h-[58px] max-sm:h-[40px] max-xl:h-[50px]  placeholder:text-[18px] max-lg:placeholder:text-[13px] max-xl:placeholder:text-[17px] placeholder:text-[#555555] pl-[19px] max-lg:pl-[10px]' placeholder='Enter Your Mobile Number' />
                    </div>
                    <div>
                        <p className="font-[500] text-[ 19.38px] max-lg:text-[15px] leading-[ 100%] text-[#58637C]  pb-[17px] max-lg:pb-[5px] NunitoSans">Email Address</p>
                        <input onChange={(e) => setdata({ ...data, email: e.target.value })} className=' NunitoSans border-[0.65px]  border-[#1A1A1A4D] w-[100%] max-lg:w-[100%]  h-[58px] max-sm:h-[40px] max-xl:h-[50px] placeholder:text-[18px] max-lg:placeholder:text-[13px] max-xl:placeholder:text-[17px] placeholder:text-[#555555] pl-[19px] max-lg:pl-[10px]' placeholder='Enter Your Email Address' />
                    </div>
                </div>
                <div className="pt-[28px] max-lg:pt-[15px] max-xl:pt-[20px]">
                    <p className="font-[500] text-[ 19.38px] leading-[ 100%] text-[#58637C] pb-[17px]  max-lg:pb-[5px] NunitoSans capitalize">your Message</p>
                    {/* Textarea Field */}
                    <textarea onChange={(e) => setdata({ ...data, message: e.target.value })}
                        className='border-[1px] capitalize  border-[#1A1A1A4D] border-solid w-[100%] max-lg:w-[100%] 
                   placeholder:text-[#555555] h-[116.25px] max-sm:h-[100px] 
                   placeholder:text-[18.08px] max-lg:placeholder:text-[13px] max-xl:placeholder:text-[17px] 
                   pl-[18px] max-lg:pl-3 p-2'
                        placeholder='Enter your valuable comment'
                    ></textarea>

                    {/* <input className='border-[1px] capitalize  border-[#1A1A1A4D] border-solid w-[90%] max-lg:w-[100%] placeholder:text-[#555555] h-[116.25px] max-sm:h-[50px] placeholder:text-[18.08px] max-lg:placeholder:text-[16px] max-xl:placeholder:text-[17px]' placeholder='Enter your valuable comment' />    */}
                </div>
                <div className='pt-[35px] flex justify-center max-lg:pt-[25px]'>
                    <button onClick={() => handlesubmit()} className='NunitoSans  bg-[#D86A37] font-[700] px-[41px] py-[15px] rounded-[6.5px] max-lg:w-[100%] max-sm:py-[10px] text-[#F0FDF4] text-[20px]  max-lg:text-[20px] max-sm:text-[18px] leading-[24px] border-solid  hover:border-[#D86A37] border-'>Requiest Guidence</button>
                </div>

            </section>

            {/* section 3 */}
            <div className="container pt-[64px] max-sm:pt-[45px]">
                <div className=" bg-center bg-[#FDEEE6]">

                    <div className="flex justify-center">
                        {/* <div className="absolute mx-auto">
                        <img src={Rectangle3120} alt="" /> 
                    </div> */}
                    </div>
                    <div className="relative">
                        <h3 className="text-[#171D2A] font-[400] text-[38.75px] leading-[100%] text-center pt-[37px]">Reach Us</h3>

                    </div>
                    <div className="mx-auto pt-[13px]">
                        {/* <div className="border-2 w-[9%] max-sm:w-[30%]  border-b-[#171D2A] relative"></div> */}
                        <img src={Rectangle} alt="" className="mx-auto w-[9%] max-lg:w-[28%] max-lg:w-[28%] max-sm:w-[47%] max-xl:w-[20%]" />
                    </div>
                    <div className="flex justify-center relative pt-[51px] bg-cover max-sm:bg-cover pb-[55px] max-sm:flex-col ">
                        <div>
                            <div className="flex justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="33" height="26" viewBox="0 0 33 26" fill="none">
                                    <path d="M30.1215 0.513916H3.5061C1.94311 0.513916 0.667969 1.78767 0.667969 3.35205V22.2729C0.667969 23.832 1.93743 25.1111 3.5061 25.1111H30.1215C31.6806 25.1111 32.9596 23.8416 32.9596 22.2729V3.35205C32.9596 1.79297 31.6902 0.513916 30.1215 0.513916ZM29.7296 2.40601L16.874 15.2617L3.90716 2.40601H29.7296ZM2.56006 21.8812V3.73482L11.6723 12.7689L2.56006 21.8812ZM3.89796 23.219L13.0159 14.101L16.2109 17.2685C16.5807 17.6352 17.1775 17.634 17.5459 17.2656L20.6611 14.1504L29.7296 23.219H3.89796ZM31.0675 21.8811L21.9989 12.8125L31.0675 3.74384V21.8811Z" fill="#58637C" />
                                </svg>
                            </div>
                            <div>
                                <p className="SlateGray py-[11px]">Email us at</p>
                                <a href="mailto:apricotjewels0@gmail.com" className="SlateGray">
                                    apricotjewels0@gmail.com
                                </a>

                            </div>
                        </div>

                        <div className="border-r-2 border-[#58637C] mx-[57px]"></div>

                        <div className="max-sm:pt-[30px]">
                            <div className="flex justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 27 27" fill="none">
                                    <path d="M21.3118 16.5446C20.7829 15.9939 20.145 15.6995 19.4689 15.6995C18.7982 15.6995 18.1549 15.9885 17.6042 16.5391L15.8813 18.2566C15.7395 18.1803 15.5977 18.1094 15.4614 18.0385C15.2651 17.9404 15.0798 17.8477 14.9217 17.7495C13.3078 16.7245 11.8411 15.3887 10.4344 13.6603C9.75287 12.7989 9.29488 12.0737 8.96229 11.3376C9.40938 10.9287 9.82375 10.5034 10.2272 10.0945C10.3799 9.94185 10.5325 9.78373 10.6852 9.63107C11.8302 8.48608 11.8302 7.00306 10.6852 5.85807L9.19674 4.3696C9.02771 4.20057 8.85324 4.0261 8.68967 3.85163C8.36253 3.51358 8.01904 3.16464 7.66464 2.8375C7.13577 2.31408 6.5033 2.03601 5.83812 2.03601C5.17294 2.03601 4.52957 2.31408 3.98433 2.8375C3.97888 2.84295 3.97888 2.84295 3.97343 2.8484L2.11965 4.71854C1.42175 5.41644 1.02373 6.267 0.936498 7.25386C0.805643 8.84594 1.27454 10.329 1.63439 11.2995C2.51767 13.6821 3.83712 15.8903 5.8054 18.2566C8.19351 21.1082 11.0669 23.36 14.3492 24.9466C15.6032 25.5409 17.277 26.2442 19.1472 26.3642C19.2617 26.3696 19.3816 26.3751 19.4907 26.3751C20.7502 26.3751 21.8079 25.9225 22.6367 25.0229C22.6421 25.012 22.653 25.0066 22.6585 24.9957C22.942 24.6522 23.2691 24.3414 23.6126 24.0088C23.8471 23.7852 24.087 23.5508 24.3214 23.3054C24.8612 22.7439 25.1447 22.0896 25.1447 21.4189C25.1447 20.7429 24.8557 20.094 24.3051 19.5488L21.3118 16.5446ZM23.2637 22.2859C23.2582 22.2859 23.2582 22.2913 23.2637 22.2859C23.051 22.5149 22.8329 22.722 22.5985 22.951C22.2441 23.2891 21.8842 23.6435 21.5462 24.0415C20.9955 24.6304 20.3467 24.9084 19.4961 24.9084C19.4144 24.9084 19.3271 24.9084 19.2453 24.903C17.626 24.7994 16.1212 24.1669 14.9925 23.6271C11.9065 22.1332 9.19674 20.0122 6.94493 17.3243C5.0857 15.0834 3.84258 13.0115 3.01928 10.787C2.51221 9.42933 2.32684 8.37159 2.40862 7.37381C2.46314 6.7359 2.7085 6.20702 3.16104 5.75448L5.02027 3.89525C5.28744 3.64444 5.57095 3.50813 5.84902 3.50813C6.19252 3.50813 6.47058 3.71532 6.64506 3.88979C6.65051 3.89525 6.65596 3.9007 6.66142 3.90615C6.99401 4.21693 7.31024 4.53862 7.64283 4.88211C7.81185 5.05659 7.98632 5.23106 8.1608 5.41099L9.64928 6.89946C10.2272 7.47741 10.2272 8.01173 9.64928 8.58968C9.49116 8.74779 9.3385 8.90591 9.18038 9.05857C8.72238 9.52747 8.2862 9.96366 7.81185 10.3889C7.80095 10.3998 7.79004 10.4053 7.78459 10.4162C7.31569 10.8851 7.40293 11.3431 7.50107 11.6539C7.50652 11.6702 7.51197 11.6866 7.51743 11.7029C7.90454 12.6407 8.44977 13.524 9.27852 14.5763L9.28397 14.5818C10.7888 16.4355 12.3754 17.8804 14.1256 18.9872C14.3492 19.129 14.5782 19.2435 14.7962 19.3525C14.9925 19.4507 15.1779 19.5434 15.336 19.6415C15.3578 19.6524 15.3796 19.6688 15.4015 19.6797C15.5868 19.7723 15.7613 19.816 15.9412 19.816C16.3938 19.816 16.6773 19.5324 16.77 19.4398L18.6347 17.5751C18.82 17.3897 19.1145 17.1661 19.458 17.1661C19.796 17.1661 20.0741 17.3788 20.2431 17.5642C20.2486 17.5696 20.2486 17.5696 20.254 17.5751L23.2582 20.5793C23.8198 21.1354 23.8198 21.7079 23.2637 22.2859Z" fill="#58637C" />
                                    <path d="M14.8559 6.68697C16.2844 6.92687 17.582 7.60296 18.6179 8.6389C19.6539 9.67483 20.3245 10.9725 20.5699 12.401C20.6298 12.7608 20.9406 13.0116 21.295 13.0116C21.3386 13.0116 21.3768 13.0062 21.4204 13.0007C21.8239 12.9353 22.091 12.5537 22.0256 12.1502C21.7312 10.4218 20.9133 8.84608 19.6648 7.59751C18.4162 6.34893 16.8405 5.53109 15.1121 5.23666C14.7087 5.17123 14.3325 5.4384 14.2616 5.83641C14.1907 6.23443 14.4524 6.62155 14.8559 6.68697Z" fill="#58637C" />
                                    <path d="M26.7003 11.9375C26.215 9.0914 24.8738 6.50155 22.8128 4.44058C20.7518 2.37961 18.162 1.03835 15.3159 0.553092C14.9179 0.482212 14.5417 0.754827 14.4708 1.15284C14.4054 1.55632 14.6725 1.93252 15.076 2.0034C17.6168 2.43414 19.934 3.63909 21.7769 5.47652C23.6197 7.3194 24.8193 9.63663 25.25 12.1774C25.31 12.5373 25.6207 12.7881 25.9751 12.7881C26.0188 12.7881 26.0569 12.7826 26.1005 12.7772C26.4986 12.7172 26.7712 12.3355 26.7003 11.9375Z" fill="#58637C" />
                                </svg>
                            </div>
                            <div>
                                <p className="SlateGray py-[11px]">Call us at</p>
                                <a href="tel:+916352743508" className="SlateGray">
                                    +91 63527 43508
                                </a>

                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <Footer />
        </>

    )
}

export default Contactpage