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

                    <div className="mb-[80px] max-sm:mb-[20px] overflow-hidden">
                        <h2 className="text-[#D86A37] font-bold text-[40px] leading-[100%] text-center mb-[11px] max-sm:text-[28px]">
                            Cancellation Policy
                        </h2>
                        <div className="relative flex justify-center">
                            <div className="relative design">
                                <img alt="Design" className="mx-[50px] relative" src={Design} />
                            </div>
                        </div>
                    </div>

                    <h3 className="text-[19px] mb-5 font-[700]">Order Cancellation by Customer</h3>
                    <p className="mb-5">
                        You can cancel your order within <strong>24 hours</strong> of placing it, provided it has not already been processed or shipped. Once shipped, the order cannot be canceled and must follow the return process.
                    </p>
                    <ul className="ms-[30px] mb-5 list-disc">
                        <li>To cancel, contact our support team at <a href="mailto:apricotjewels0@gmail.com" className="text-blue-600 underline">apricotjewels0@gmail.com</a> or call us at <strong>+91-XXXXXXXXXX</strong>.</li>
                        <li>Please mention your order number and reason for cancellation.</li>
                        <li>Orders for customized or engraved items cannot be canceled once placed.</li>
                    </ul>

                    <h3 className="text-[19px] mb-5 font-[700]">Order Cancellation by Apricot Jewels</h3>
                    <p className="mb-5">
                        We reserve the right to cancel any order due to unforeseen circumstances including:
                    </p>
                    <ul className="ms-[30px] mb-5 list-disc">
                        <li>Product unavailability</li>
                        <li>Payment issues or non-receipt</li>
                        <li>Pricing or description errors</li>
                        <li>Fraudulent or suspicious activity</li>
                    </ul>
                    <p className="mb-5">
                        In such cases, we will notify you via email or phone and a full refund will be processed to your original payment method.
                    </p>

                    <h3 className="text-[19px] mb-5 font-[700]">Refund Timeline</h3>
                    <p className="mb-5">
                        If your cancellation request is accepted, your refund will be processed within <strong>7–10 business days</strong> depending on your payment method and bank processing time.
                    </p>

                    <h3 className="text-[19px] mb-5 font-[700]">Need Help?</h3>
                    <p className="mb-5">
                        For any queries regarding cancellations, contact us at <a href="mailto:apricotjewels0@gmail.com" className="text-blue-600 underline">apricotjewels0@gmail.com</a> or call <strong>+91-XXXXXXXXXX</strong>. We are available Monday to Saturday, 10 AM to 7 PM IST.
                    </p>




                </div>
            </section>





            <Footer />
        </>

    )
}

export default AboutUs