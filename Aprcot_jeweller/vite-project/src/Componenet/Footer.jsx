import React from 'react'
import Visa from '../assets/visa.png'
import Card from '../assets/card.png'
import Express from '../assets/american-express.png'
import Card_1 from '../assets/card1.png'
import PayPal from '../assets/paypal.png'
import Apple_pay from '../assets/apple_pay.png'
import Google_pay from '../assets/google_pay.png'
import Amazon_pay from '../assets/amazon_pay.png'
import Pinterest from '../assets/pinterest.png'
import Twitter from '../assets/twitter.png'
import Youtube from '../assets/youtube.png'
import Insta from '../assets/insta.png'
import Facebook from '../assets/facebook.png'
import { Link } from 'react-router-dom'


const Footer = () => {
    return (
        <footer className='mt-[100px] max-lg:mt-[50px] relative'>
            <div className='h-[13px] bg-[#D86A37] w-[100%] mb-[66px] max-md:mb-[30px]'>

            </div>
            <div className='container '>
                <div>
                    <div className='flex mb-[45px] max-xl:flex-wrap max-md:gap-[15px] max-sm:gap-0 max-md:mb-[50px]'>
                        <div className='w-[20%] max-xl:w-[25%] max-lg:w-[30.33%]  max-sm:w-[50%] max-sm:mt-[40px] '>
                            <h3 className=" font-semibold text-[20px] leading-[100%] tracking-[0]  mb-[42px] max-xl:mb-[30px] max-lg:text-[22px] max-sm:text-[20px] max-sm:mb-[15px]">
                                Company
                            </h3>
                            <div>
                                <ul className='space-y-[25px]  max-lg:space-y-[25px] max-md:space-y-[20px]  '>
                                    {/* <li className="font-normal text-[16px] leading-[100%] tracking-[0] max-md:text-[17px] max-sm:text-[16px]">Blog</li> */}
                                    <li className='font-normal text-[16px] leading-[100%] tracking-[0] max-md:text-[17px]  max-sm:text-[16px]'><Link title='about_us' to={'/about_us'}>About Us</Link></li>
                                    {/* <li className='font-normal text-[16px] leading-[100%] tracking-[0] max-md:text-[17px] max-sm:text-[16px]'>Our Story</li> */}
                                    <li className='font-normal text-[16px] leading-[100%] tracking-[0] max-md:text-[17px] max-sm:text-[16px]'><Link title='product' to={'/product'}>Our Stores</Link></li>
                                    <li className='font-normal text-[16px] leading-[100%] tracking-[0] max-md:text-[17px] max-sm:text-[16px]'><Link title='contact' to={'/contact'}>Contact Us</Link></li>
                                    {/* <li className='font-normal text-[16px] leading-[100%] tracking-[0] max-md:text-[17px] max-sm:text-[16px]'>Franchise Enquiry</li>  */}
                                </ul>
                            </div>
                        </div>
                        <div className='w-[20%] max-xl:w-[25%] max-lg:w-[30.33%]  max-lg:space-y-[25px]  max-sm:w-[50%] max-sm:mt-[40px] '>
                            <h3 className=" font-semibold text-[20px] leading-[100%] tracking-[0]  mb-[42px] max-xl:mb-[30px] max-lg:text-[22px] max-sm:text-[20px] max-sm:mb-[15px]">
                                Quick Links
                            </h3>
                            <div>
                                <ul className='space-y-[25px]   max-lg:space-y-[25px] max-md:space-y-[20px] max-md:space-y-[15px]'>
                                    <li className='font-normal text-[16px] leading-[100%] tracking-[0] max-md:text-[17px]  max-sm:text-[16px]'>
                                        <Link title='jewelry-collections' to="/jewelry-collections" onClick={() => {
                                            sessionStorage.removeItem("gifted_page")
                                            sessionStorage.removeItem("categoryId")
                                            sessionStorage.removeItem("subcategory_id")
                                        }}>
                                            Jewelry
                                        </Link>
                                    </li>
                                    {/* <li className="font-normal text-[16px] leading-[100%] tracking-[0] max-md:text-[17px]  max-sm:text-[16px]">
                                        <Link title='diamonds' to="/diamonds" onClick={() => {
                                            sessionStorage.removeItem("gifted_page")
                                            sessionStorage.removeItem("categoryId")
                                            sessionStorage.removeItem("subcategory_id")
                                        }}>
                                            Diamond
                                        </Link>
                                    </li> */}

                                    <li className='font-normal text-[16px] leading-[100%] tracking-[0] max-md:text-[17px]  max-sm:text-[16px]'>
                                        <Link title='engagement-diamond-rings' to="/engagement-diamond-rings" onClick={() => {
                                            sessionStorage.removeItem("gifted_page")
                                            sessionStorage.removeItem("categoryId")
                                            sessionStorage.removeItem("subcategory_id")
                                        }}>
                                            Engagement
                                        </Link>

                                    </li>
                                    <li className='font-normal text-[16px] leading-[100%] tracking-[0] max-md:text-[17px]  max-sm:text-[16px]'>
                                        <Link title='wedding-bands-jewelry' to="/wedding-bands-jewelry" onClick={() => {
                                            sessionStorage.removeItem("gifted_page")
                                            sessionStorage.removeItem("categoryId")
                                            sessionStorage.removeItem("subcategory_id")
                                        }}>
                                            Wedding
                                        </Link>
                                    </li>
                                    <li className='font-normal text-[16px] leading-[100%] tracking-[0] max-md:text-[17px]  max-sm:text-[16px]'>
                                        <Link title='luxury-high-jewelry' to="/luxury-high-jewelry" onClick={() => {
                                            sessionStorage.removeItem("gifted_page")
                                            sessionStorage.removeItem("categoryId")
                                            sessionStorage.removeItem("subcategory_id")
                                        }}>
                                            High Jewelry
                                        </Link>
                                    </li>
                                    <li className='font-normal text-[16px] leading-[100%] tracking-[0] max-md:text-[17px]  max-sm:text-[16px]'>
                                        <Link title='exclusive-jewelry-collections' to="/exclusive-jewelry-collections" onClick={() => {
                                            sessionStorage.removeItem("gifted_page")
                                            sessionStorage.removeItem("categoryId")
                                            sessionStorage.removeItem("subcategory_id")
                                        }}>
                                            Collections
                                        </Link>
                                    </li>
                                    <li className='font-normal text-[16px] leading-[100%] tracking-[0] max-md:text-[17px]  max-sm:text-[16px]'>
                                        <Link title='luxury-gifts-jewelry' to="/luxury-gifts-jewelry" onClick={() => {
                                            sessionStorage.removeItem("gifted_page")
                                            sessionStorage.removeItem("categoryId")
                                            sessionStorage.removeItem("subcategory_id")
                                        }}>
                                            Gifts
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className='w-[20%] max-xl:w-[25%] max-lg:w-[30.33%]  max-lg:space-y-[25px]  max-sm:w-[50%] max-sm:mt-[40px]'>
                            <h3 className=" font-semibold text-[20px] leading-[100%] tracking-[0]  mb-[42px] max-xl:mb-[30px] max-lg:text-[22px] max-sm:text-[20px] max-sm:mb-[15px]">
                                Legal
                            </h3>
                            <div>
                                <ul className='space-y-[25px]   max-lg:space-y-[25px] max-md:space-y-[20px] max-md:space-y-[15px]'>
                                    <li className="font-normal text-[16px] leading-[100%] tracking-[0] max-md:text-[17px]  max-sm:text-[16px]"><Link title='terms_&_condition' to={'/terms_&_condition'}>Terms & Conditions</Link></li>
                                    <li className='font-normal text-[16px] leading-[100%] tracking-[0] max-md:text-[17px]  max-sm:text-[16px]'><Link title='privacy_policy' to={'/privacy_policy'}>Privacy Policy</Link></li>
                                    <li className='font-normal text-[16px] leading-[100%] tracking-[0] max-md:text-[17px]  max-sm:text-[16px]'><Link title='faq' to={'/faq'}>FAQs</Link></li>
                                    <li className='font-normal text-[16px] leading-[100%] tracking-[0] max-md:text-[17px]  max-sm:text-[16px]'><Link title='customer_support' to={'/customer_support'}>Customer Support</Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className='w-[20%] max-xl:w-[25%] max-lg:w-[40%] max-lg:mt-[70px]  max-lg:space-y-[25px]  max-sm:w-[50%] max-sm:mt-[40px]'>
                            <h3 className=" font-semibold text-[20px] leading-[100%] tracking-[0]  mb-[42px] max-xl:mb-[30px] max-lg:text-[22px] max-sm:text-[20px] max-sm:mb-[15px]">
                                Order
                            </h3>
                            <div>
                                <ul className='space-y-[25px] max-lg:space-y-[25px] max-md:space-y-[20px] max-md:space-y-[15px]'>
                                    <li className="font-normal text-[16px] leading-[100%] tracking-[0] max-md:text-[17px]  max-sm:text-[16px]"><Link title='shipping_policy' to={'/shipping_policy'}>Shipping Policy</Link></li>
                                    <li className='font-normal text-[16px] leading-[100%] tracking-[0] max-md:text-[17px]  max-sm:text-[16px]'><Link title='return_policy' to={'/return_policy'}>Return Policy</Link></li>
                                    <li className='font-normal text-[16px] leading-[100%] tracking-[0] max-md:text-[17px]  max-sm:text-[16px]'><Link title='cancellation_policy' to={'/cancellation_policy'}>Cancellation Policy</Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className='w-[20%] max-xl:w-[100%] max-xl:mt-[70px] max-lg:w-[50%]  max-sm:w-[100%] max-sm:mt-[40px]'>
                            <h3 className=" font-semibold text-[20px] leading-[100%] tracking-[0]  mb-[42px] max-xl:mb-[30px] max-lg:text-[22px] max-sm:text-[20px] max-sm:mb-[15px]">
                                Contact
                            </h3>
                            <div>
                                <div className='mb-[25px] max-md:mb-[20px]'>
                                    <h4 className="font-semibold text-[20px] leading-normal tracking-[0] mb-[1px] max-2xl:text-[16px]">
                                        Apricot jewels.
                                    </h4>

                                    <p className=" font-normal text-[16px] leading-normal    tracking-[0] max-md:text-[17px]  max-sm:text-[16px]">
                                        1st Floor, 31, Gayatri Nagar Society - 5, Near . Hari Om  Bungalows, Katargam, Surat-395004.
                                    </p>

                                </div>

                                <a href="tel:+916352743508" title='mobile' className="block font-normal text-[16px] leading-[100%] tracking-[0] max-md:text-[17px] max-sm:text-[16px] mb-[25px] max-md:mb-[20px]">
                                    +91 63527 43508
                                </a>

                                <a href="tel:+917069596756" title='mobile' className="block font-normal text-[16px] leading-[100%] tracking-[0] max-md:text-[17px] max-sm:text-[16px] mb-[25px] max-md:mb-[20px]">
                                    +91 70695 96756
                                </a>

                                <a href="mailto:apricotjewels0@gmail.com" title='email' className="block font-normal text-[16px] leading-[100%] tracking-[0] max-md:text-[17px] max-sm:text-[16px]">
                                    apricotjewels0@gmail.com
                                </a>

                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap  max-3xl:justify-end mb-[66px] justify-between gap-[20px]  max-2xl:gap-[50px] max-lg:block">


                        <div className=' max-xl:w-[100%] max-3xl:w-[46%]  '>
                            <p className="font-[Nunito_Sans] font-normal text-[20px] leading-[100%] tracking-[0] text-center underline decoration-solid decoration-[0] mb-[17px]  max-2xl:text-[24px] max-md:text-[22px] max-sm:text-[19px]">
                                We accept the following payment options
                            </p>

                            <div className='flex justify-between items-center gap-[20px] max-lg:justify-center max-w-[474px]'>
                                <div >

                                    <img src={Visa} alt="visa" title='visa' className='h-[35px]' />
                                </div>
                                <div>
                                    <img src={Card} className='h-[35px]' alt="Card" title='Card' />
                                </div>
                                {/* <div>
                                    <img src={Express} className='h-[35px]' alt="Express" title='Express' />
                                </div>
                                <div>
                                    <img src={Card_1} className='h-[35px]' alt="Card_1" title='Card_1' />
                                </div>
                                <div>
                                    <img src={PayPal} className='h-[35px]' alt="PayPal" title='PayPal'/>
                                </div>
                                <div>

                                    <img src={Apple_pay} className='h-[35px]' alt="Apple_pay" title='Apple_pay' />
                                </div> */}
                                <div>
                                    <img src={Google_pay} className='h-[35px]' alt="Google_pay" title='Google_pay' />

                                </div>
                                <div>
                                    <img src={Amazon_pay} className='h-[45px]' alt="Amazon_pay" title='Amazon_pay' />

                                </div>


                            </div>
                        </div>
                        <div className='mt-[29px]  max-3xl:mt-0 flex justify-end gap-x-[36px]  items-center  max-lg:justify-center max-sm:mt-[10px] max-md:gap-x-[40px]'>
                            {/* <div>
                                <img src={Facebook} className='h-[20px] w-[20px]' alt="Facebook" title='Facebook' />
                            </div> */}
                            <a href="https://www.instagram.com/apricot.jewels" target="_blank" rel="noopener noreferrer">
                                <img
                                    src={Insta}
                                    className="h-[20px] w-[20px]"
                                    alt="Instagram - Apricot Jewels"
                                    title="Follow us on Instagram"
                                />
                            </a>
                            {/* <div>
                                <img src={Twitter} className='h-[20px] w-[20px]' alt="Twitter" title='Twitter'/>
                            </div>
                            <div>
                                <img src={Pinterest} className='h-[20px] w-[20px]' alt="Pinterest" title='Pinterest' />
                            </div>
                            <div><img src={Youtube} className='h-[20px] w-[20px]' alt="Youtube" title='Youtube' />

                            </div> */}

                        </div>



                    </div>
                </div>
            </div>
            <div className='h-[13px] bg-[#D86A37] w-[100%]'>

            </div>

        </footer>
    )
}

export default Footer
