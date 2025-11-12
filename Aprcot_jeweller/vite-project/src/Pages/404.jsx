import React from 'react'
import Footer from '../Componenet/Footer'
import Navbar from '../Componenet/Navbar'
import svg from '../assets/404svg.svg'

const Error404 = () => {
    return (
        <div>
            <Navbar />
            {/* <Footer/> */}
            <section className='container py-[100px]  max-lg:py-[50px] max-sm:py-[40px] '>

                <img src={svg} className='w-[70%] max-sm:w-full block mx-auto' alt="" />


        </section>
        <Footer/>
        </div>
    )
}

export default Error404
