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
                            Privacy policy</h2><div className="relative flex justify-center"><div className="relative  design">
                                <img alt="Design" className="mx-[50px] relative" src={Design} />
                            </div>
                        </div>
                    </div>

                    <h3 className="text-[19px] mb-5 font-[700]">PRIVACY STATEMENT</h3>
                    <p className="mb-5">Welcome to Apricot Jewels. This section pertains to the Privacy Policy of the website and native mobile applications. We would like to inform you that our privacy policy is subject to change without intimation and you shall be required to review the same regularly.</p>
                    <p className="mb-5">The protection and security of your personal information is one of Apricot Jewels' top priorities. This Privacy Policy discloses Apricot Jewels' practice concerning the information collected from the users of the Website or native mobile applications. Apricot Jewels is authorized to use the website and native mobile applications for commercial purposes by virtue of a Platform License Agreement. By using the Website or native mobile applications, you agree to accept the terms of this Privacy Policy as well as the Website and native mobile applications’ Terms of Use. By accessing or using the Website and native mobile applications, you expressly consent to our use and disclosure of your personal information in any manner described in this Privacy Policy. This Privacy Policy extends to both users who visit the Website or native mobile applications but do not transact business on them, as well as users who are registered. "Personal Information" refers to any information that identifies or can be used to identify, contact, or locate the person to whom such information pertains, including but not limited to name, address, phone number, fax number, email address, financial profiles, identification number, credit card information, etc.</p>
                    <h3 className="text-[19px] mb-5 font-[700]">PLEASE READ THE FOLLOWING TERMS OF OUR PRIVACY POLICY</h3>
                    <h3 className="text-[19px] mb-5 font-[700]">PERSONAL INFORMATION COLLECTED</h3>
                    <p className="mb-5">By accepting this privacy policy, you authorize Apricot Jewels to collect, store, and use any information that you provide on our Website or native mobile applications. The information collected by us includes:</p>

                    <ul className="ms-[30px] mb-5 list-disc">
                        <li >All information entered by you on our website and native mobile applications, such as your name, address, contact number, email ID, chat history, and any other details sent by you via emails to our support email ID.</li>
                        <li >Information collected through cookies that are installed on your hard drive, such as the IP Address of your computer, the server from which you are accessing our website and native mobile applications, details of web browser and operating system used to access our website or native mobile applications, date, time, and location of accessing our website and native mobile applications, etc.</li>
                    </ul>
                    <h3 className="text-[19px] mb-5 font-[700]">COOKIES</h3>
                    <p className="mb-5">Cookies are small pieces of information saved by your browser onto your computer. Cookies are used to record various aspects of your visit and assist Apricot Jewels in providing you with uninterrupted service. Apricot Jewels does not use cookies to save Personal Information for outside uses.</p>
                    <p className="mb-5">We have implemented Google Analytics features based on Display Advertising (Google Display Network Impression Reporting, the DoubleClick Campaign Manager Integration, and Google Analytics Demographics and Interest Reporting). Visitors can opt-out of Google Analytics for Display Advertising and customize Google Display Network ads using the Ads Settings. We, along with third-party vendors, including Google, use first-party cookies (such as the Google Analytics cookies) and third-party cookies (such as the DoubleClick cookie) together to report how our ad impressions, other uses of ad services, and interactions with these ad impressions and ad services are related to visits to our site.</p>
                    <p className="mb-5">No use or services available on the Website and native mobile applications are directed toward children. Apricot Jewels does not knowingly collect Personal Information from children or sell its products to children.</p>
                    <h3 className="text-[19px] mb-5 font-[700]">USE OF INFORMATION COLLECTED</h3>

                    <p className="mb-5">Apricot Jewels owns all the information collected via the Website or applications installed on the website or native mobile applications. As applicable, the information collected by Apricot Jewels shall be used to:</p>
                    <ul className="ms-[30px] mb-5 list-disc">
                        <li >Contact you regarding the Website or native mobile applications and related news and services available on them;</li>
                        <li >Monitor and improve the Website or native mobile applications;</li>
                        <li >Calculate the number of visitors to the Website or native mobile applications and identify their geographical locations;</li>
                        <li >Update you on special offers available on the Website or native mobile applications and provide you with a better shopping experience. This includes sending emails about various offers on the website or native mobile applications. You may unsubscribe from such emails at any time.</li>
                    </ul>

                    <p className="mb-5">Some of your information may be shared with and used by third parties who require access to information, such as courier companies, credit card processing companies, vendors, etc., to enable them and Apricot Jewels to perform their duties and fulfill your order requirements. Apricot Jewels does not allow any unauthorized person or organization to use any information that Apricot Jewels may collect from you through the Website and native mobile applications. However, Apricot Jewels and our native mobile applications are not responsible for any information collected, shared, or used by any other third-party website or mobile applications due to your browser settings.</p>

                    <p className="mb-5">Apricot Jewels reserves the right to share any of your personal information to comply with subpoenas, court orders, or other legal processes. Your Personal Information may be disclosed per such subpoenas, court orders, or legal processes without prior notice to you.</p>
                    <p className="mb-5">Apricot Jewels may share collective information such as demographics and Website or mobile application usage statistics with our sponsors, advertisers, or other third parties (excluding Apricot Jewels' marketing partners and network providers). When this type of information is shared, such parties do not have access to your Personal Information. When you contact Apricot Jewels through any means, such as chat or email, Apricot Jewels reserves the right to include your email ID for marketing communications. You can unsubscribe from such communications at any time.</p>

                    <p className="mb-5">The Website and native mobile applications may contain links that lead you to other Websites or mobile applications. Please note that once you leave our Website or native mobile applications, you will be subject to the Privacy Policy of the other website or mobile application, and this Privacy Policy will no longer apply.</p>
                    <h3 className="text-[19px] mb-5 font-[700]">BY USING THE WEBSITE OR NATIVE MOBILE APPLICATIONS, YOU SIGNIFY YOUR AGREEMENT TO THE TERMS OF THIS PRIVACY POLICY. APRICOT JEWELS RESERVES THE RIGHT, IN OUR SOLE DISCRETION, TO CHANGE, MODIFY, ADD, OR DELETE PORTIONS OF THE TERMS OF THIS PRIVACY POLICY AT ANY TIME.</h3>

                    <p className="mb-5">If you have any questions about this Privacy Policy, please feel free to contact us through our Website or native mobile applications or write to us at apricotjewels0@gmail.com.</p>



                </div>
            </section>





            <Footer />
        </>

    )
}

export default AboutUs