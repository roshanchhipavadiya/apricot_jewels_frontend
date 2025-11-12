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
                            Shipping Policy
                        </h2>
                        <div className="relative flex justify-center">
                            <div className="relative design">
                                <img alt="Design" className="mx-[50px] relative" src={Design} />
                            </div>
                        </div>
                    </div>

                    <h3 className="text-[19px] mb-5 font-[700]">Order Processing</h3>
                    <p className="mb-5">
                        All orders are processed within <strong>1–3 business days</strong>. Orders placed on weekends or holidays will be processed the next business day. You will receive a confirmation once your order is shipped.
                    </p>

                    <h3 className="text-[19px] mb-5 font-[700]">Shipping Charges & Delivery</h3>
                    <ul className="ms-[30px] mb-5 list-disc">
                        <li><strong>Domestic (India):</strong> Free standard shipping on all orders.</li>
                        <li><strong>International:</strong> Charges calculated at checkout. Delivery time: 7–21 business days based on destination and customs.</li>
                    </ul>

                    <h3 className="text-[19px] mb-5 font-[700]">Tracking & Confirmation</h3>
                    <p className="mb-5">
                        Once your item ships, a tracking number will be sent to your email. Tracking details may take up to 24 hours to reflect.
                    </p>

                    <h3 className="text-[19px] mb-5 font-[700]">Delivery Timelines</h3>
                    <ul className="ms-[30px] mb-5 list-disc">
                        <li><strong>Metro Cities:</strong> 3–5 business days</li>
                        <li><strong>Other Areas:</strong> 5–10 business days</li>
                        <li><strong>Remote Locations:</strong> May take up to 12 business days</li>
                    </ul>

                    <h3 className="text-[19px] mb-5 font-[700]">Customs & Import Taxes</h3>
                    <p className="mb-5">
                        For international shipments, customers are responsible for any customs duties, taxes, or import fees applicable in their country.
                    </p>

                    <h3 className="text-[19px] mb-5 font-[700]">Packaging & Insurance</h3>
                    <p className="mb-5">
                        We ensure all items are securely packed in tamper-evident packaging. Jewellery is insured during transit and is protected until it reaches you.
                    </p>

                    <h3 className="text-[19px] mb-5 font-[700]">Delivery Issues</h3>
                    <p className="mb-5">
                        If your package is delayed, damaged, or lost, contact our support team at <a href="mailto:apricotjewels0@gmail.com" className="text-blue-600 underline">apricotjewels0@gmail.com</a>. Please provide your order ID for faster resolution.
                    </p>


                </div>
            </section>





            <Footer />
        </>

    )
}

export default AboutUs