import React from "react";
import image from '../assets/image.png'
import image4 from '../assets/image4.png'
import Ring from '../assets/Ring.png'
import microscope from '../assets/microscope.png'
import Ring2 from '../assets/Ring2.png'
import Rectangle from '../assets/Rectangle.png'
import Footer from "../Componenet/Footer";
import Navbar from "../Componenet/Navbar";
import Design from '../assets/deisgn.png'

export const AboutUs = () => {
    return (
        <>
            <Navbar />
            {/* section...1 */}
            <section className="py-[50px]">

                <div className="container ">

                    <div className="mb-[80px] max-sm:mb-[20px] overflow-hidden ">
                        <h2 className="text-[#D86A37] font-bold text-[40px] leading-[100%] text-center mb-[11px] max-sm:text-[28px]  ">
                           Customer Support</h2><div className="relative flex justify-center"><div className="relative  design">
                                <img alt="Design" className="mx-[50px] relative" src={Design} />
                            </div>
                        </div>
                    </div>

                    <h3 className="text-[19px] mb-5 font-[700]">USE OF INFORMATION COLLECTED</h3>
                    <p className="mb-5">Apricot Jewels owns all the information collected via the Website or applications installed on the website or native mobile applications. As applicable, the information collected by Apricot Jewels shall be used to:</p>
                    <ul className="ms-[30px] mb-5 list-disc">
                        <li>Contact you regarding the Website or native mobile applications and related news and services available on them;</li>
                        <li>Monitor and improve the Website or native mobile applications;</li>
                        <li>Calculate the number of visitors to the Website or native mobile applications and identify their geographical locations;</li>
                        <li>Update you on special offers available on the Website or native mobile applications and provide you with a better shopping experience. This includes sending emails about various offers on the website or native mobile applications. You may unsubscribe from such emails at any time.</li>
                    </ul>
                    <p className="mb-5">Some of your information may be shared with and used by third parties who require access to information, such as courier companies, credit card processing companies, vendors, etc., to enable them and Apricot Jewels to perform their duties and fulfill your order requirements. Apricot Jewels does not allow any unauthorized person or organization to use any information that Apricot Jewels may collect from you through the Website and native mobile applications. However, Apricot Jewels and our native mobile applications are not responsible for any information collected, shared, or used by any other third-party website or mobile applications due to your browser settings.</p>
                    <p className="mb-5">Apricot Jewels reserves the right to share any of your personal information to comply with subpoenas, court orders, or other legal processes. Your Personal Information may be disclosed per such subpoenas, court orders, or legal processes without prior notice to you.</p>
                    <p className="mb-5">Apricot Jewels may share collective information such as demographics and Website or mobile application usage statistics with our sponsors, advertisers, or other third parties (excluding Apricot Jewels' marketing partners and network providers). When this type of information is shared, such parties do not have access to your Personal Information. When you contact Apricot Jewels through any means, such as chat or email, Apricot Jewels reserves the right to include your email ID for marketing communications. You can unsubscribe from such communications at any time.</p>
                    <p className="mb-5">The Website and native mobile applications may contain links that lead you to other Websites or mobile applications. Please note that once you leave our Website or native mobile applications, you will be subject to the Privacy Policy of the other website or mobile application, and this Privacy Policy will no longer apply.</p>

                    <h3 className="text-[19px] mb-5 font-[700]">Customer Support</h3>
                    <p className="mb-5">Apricot Jewels is committed to providing excellent customer support. For assistance with orders, returns, product details, or any general inquiry, you can reach our support team through the following methods:</p>
                    <ul className="ms-[30px] mb-5 list-disc">
                        <li>Email us at <a href="mailto:apricotjewels0@gmail.com" className="text-blue-600 underline">apricotjewels0@gmail.com</a></li>
                        <li>Call our customer care line at <a href="tel:+916352743508" className="font-bold">+91 63527 43508</a> between 10:00 AM and 7:00 PM IST (Monday to Saturday)</li>
                        <li>Use the live chat option available on the website for instant support during working hours</li>
                    </ul>
                    <p className="mb-5">We strive to respond to all queries within 24-48 business hours. For faster service, please have your order ID or registered email ready when contacting support.</p>

                    <h3 className="text-[19px] mb-5 font-[700]">BY USING THE WEBSITE OR NATIVE MOBILE APPLICATIONS, YOU SIGNIFY YOUR AGREEMENT TO THE TERMS OF THIS PRIVACY POLICY. APRICOT JEWELS RESERVES THE RIGHT, IN OUR SOLE DISCRETION, TO CHANGE, MODIFY, ADD, OR DELETE PORTIONS OF THE TERMS OF THIS PRIVACY POLICY AT ANY TIME.</h3>


                </div>
            </section>





            <Footer />
        </>

    )
}

export default AboutUs