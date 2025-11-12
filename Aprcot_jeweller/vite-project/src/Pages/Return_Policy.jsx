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
                            Return Policy
                        </h2>
                        <div className="relative flex justify-center">
                            <div className="relative design">
                                <img alt="Design" className="mx-[50px] relative" src={Design} />
                            </div>
                        </div>
                    </div>

                    <h3 className="text-[19px] mb-5 font-[700]">Eligibility for Returns</h3>
                    <p className="mb-5">
                        We offer returns on most jewellery items within <strong>7 days</strong> of delivery, provided they are unused, unworn, and returned in their original packaging with all tags and certificates intact. Custom or engraved pieces are not eligible for return.
                    </p>

                    <h3 className="text-[19px] mb-5 font-[700]">Return Process</h3>
                    <ul className="ms-[30px] mb-5 list-disc">
                        <li>To initiate a return, email us at <a href="mailto:apricotjewels0@gmail.com" className="text-blue-600 underline">apricotjewels0@gmail.com</a> within 7 days of receiving the product.</li>
                        <li>Include your order number, reason for return, and clear photos if there is any issue with the product.</li>
                        <li>Once approved, our team will schedule a pickup or guide you on the return shipping process.</li>
                    </ul>

                    <h3 className="text-[19px] mb-5 font-[700]">Refund Process</h3>
                    <p className="mb-5">
                        After we receive and inspect the returned item, we will notify you via email. If approved, the refund will be processed to your original payment method within <strong>7–10 business days</strong>.
                    </p>

                    <h3 className="text-[19px] mb-5 font-[700]">Conditions for Return</h3>
                    <ul className="ms-[30px] mb-5 list-disc">
                        <li>The item must be unused, with tags, and in original packaging.</li>
                        <li>All product certificates, invoices, and promotional items (if any) must be returned.</li>
                        <li>Items showing signs of wear, damage, or tampering will not be accepted.</li>
                    </ul>

                    <h3 className="text-[19px] mb-5 font-[700]">Exchange Policy</h3>
                    <p className="mb-5">
                        If you would like to exchange your product, the same steps apply as returns. Exchanges are subject to product availability and price difference, if any, will be communicated to you.
                    </p>

                    <h3 className="text-[19px] mb-5 font-[700]">Non-Returnable Items</h3>
                    <ul className="ms-[30px] mb-5 list-disc">
                        <li>Customized or engraved jewellery</li>
                        <li>Items purchased on final sale or marked as non-returnable</li>
                    </ul>

                    <h3 className="text-[19px] mb-5 font-[700]">Contact Support</h3>
                    <p className="mb-5">
                        For any queries or help with your return, contact us at <a href="mailto:apricotjewels0@gmail.com" className="text-blue-600 underline">apricotjewels0@gmail.com</a> or call us at <a href="tel:+916352743508" className="font-bold">+91 63527 43508</a>. We're here to assist you Monday to Saturday, 10 AM to 7 PM IST.
                    </p>



                </div>
            </section>





            <Footer />
        </>

    )
}

export default AboutUs