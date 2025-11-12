import React, { useState } from "react";
import image from '../assets/image.png'
import image4 from '../assets/image4.png'
import Ring from '../assets/Ring.png'
import microscope from '../assets/microscope.png'
import Ring2 from '../assets/Ring2.png'
import Rectangle from '../assets/Rectangle.png'
import Footer from "../Componenet/Footer";
import Navbar from "../Componenet/Navbar";
import Design from '../assets/deisgn.png'
const faqs = [
    {
        question: "What is your return policy?",
        answer: "No, the price is for creating a scraping script and running it once. We offer fully managed solutions at a price of 99/month per website. You can specify how often you want the data to be scrapped."
    },
    {
        question: "Is there any upfront cost?",
        answer: "Shipping typically takes 5–7 business days depending on your location."
    },
    {
        question: "What format the data will be delivered?",
        answer: "Yes, we ship internationally. Shipping charges and delivery times vary based on destination."
    },
    {
        question: "How can I contact support?",
        answer: "You can contact our support team via email at support@example.com."
    }
];
export const AboutUs = () => {

    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };
    return (
        <>
            <Navbar />
            {/* section...1 */}
            <section className="py-[50px]">

                <div className="container ">

                    <div className="mb-[80px] max-sm:mb-[20px] overflow-hidden ">
                        <h2 className="text-[#D86A37] font-bold text-[40px] leading-[100%] text-center mb-[11px] max-sm:text-[28px]  ">
                            FAQ</h2><div className="relative flex justify-center"><div className="relative  design">
                                <img alt="Design" className="mx-[50px] relative" src={Design} />
                            </div>
                        </div>
                    </div>
                    <div className="border border-[#FFE0D2] w-[85%] mx-auto rounded-xl divide-y divide-[#FFE0D2]">
                        {faqs.map((faq, index) => (
                            <div key={index} className="">
                                <button
                                    onClick={() => toggleFAQ(index)}
                                    className="w-full text-left px-4 py-[22px] flex justify-between items-center"
                                >
                                    <span className="font-medium text-[17.65px] leading-[21.18px] inter text-[#0A2E44]">
                                        <span className="me-[22px]">{index + 1}</span>
                                        {faq.question}
                                    </span>


                                    {openIndex === index ? (
                                        // Minus Icon
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="15"
                                            height="3"
                                            viewBox="0 0 15 3"
                                            fill="none"
                                        >
                                            <path
                                                d="M0.175781 1.5394C0.175781 1.28833 0.254242 1.08433 0.411164 0.927405C0.568086 0.770483 0.772085 0.692022 1.02316 0.692022H13.4514C13.7025 0.692022 13.9065 0.770483 14.0634 0.927405C14.2203 1.08433 14.2988 1.28833 14.2988 1.5394C14.2988 1.79048 14.2203 1.99447 14.0634 2.1514C13.9065 2.30832 13.7025 2.38678 13.4514 2.38678H1.02316C0.772085 2.38678 0.568086 2.30832 0.411164 2.1514C0.254242 1.99447 0.175781 1.79048 0.175781 1.5394Z"
                                                fill="black"
                                            />
                                        </svg>
                                    ) : (
                                        // Plus Icon
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="15"
                                            height="15"
                                            viewBox="0 0 15 15"
                                            fill="none"
                                        >
                                            <path
                                                d="M7.23727 0.123047C7.48835 0.123047 7.69235 0.201508 7.84927 0.35843C8.00619 0.515352 8.08465 0.719351 8.08465 0.970426V6.33716H13.4514C13.7025 6.33716 13.9065 6.41562 14.0634 6.57254C14.2203 6.72947 14.2988 6.93346 14.2988 7.18454C14.2988 7.43562 14.2203 7.63961 14.0634 7.79654C13.9065 7.95346 13.7025 8.03192 13.4514 8.03192H8.08465V13.3987C8.08465 13.6497 8.00619 13.8537 7.84927 14.0106C7.69235 14.1676 7.48835 14.246 7.23727 14.246C6.9862 14.246 6.7822 14.1676 6.62528 14.0106C6.46836 13.8537 6.38989 13.6497 6.38989 13.3987V8.03192H1.02316C0.772085 8.03192 0.568086 7.95346 0.411164 7.79654C0.254242 7.63961 0.175781 7.43562 0.175781 7.18454C0.175781 6.93346 0.254242 6.72947 0.411164 6.57254C0.568086 6.41562 0.772085 6.33716 1.02316 6.33716H6.38989V0.970426C6.38989 0.719351 6.46836 0.515352 6.62528 0.35843C6.7822 0.201508 6.9862 0.123047 7.23727 0.123047Z"
                                                fill="black"
                                            />
                                        </svg>
                                    )}
                                </button>

                                <div
                                    className={`transition-all duration-500 overflow-hidden px-4 ${openIndex === index ? 'max-h-[500px] py-4 border-t border-[#FFE0D2]' : 'max-h-0 py-0'
                                        }`}
                                >
                                    <p className="ms-[40px] me-[30px] text-[#425466] text-[17.65px] tracking-[0.59px]">
                                        {faq.answer}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </section>

         




            <Footer />
        </>

    )
}

export default AboutUs