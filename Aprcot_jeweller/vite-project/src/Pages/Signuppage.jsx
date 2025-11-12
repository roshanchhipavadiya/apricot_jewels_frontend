import React, { useState } from "react";
import image2 from '../assets/image3.png'
import Footer from '../Componenet/Footer'
import Navbar from '../Componenet/Navbar'
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useSignUpUserMutation } from "../services/apiSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const SignupPage = () => {

  const navigate = useNavigate();

  const [signupUser] = useSignUpUserMutation();
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let errors = {};

    // First Name Validation
    if (!fname.trim()) {
      errors.fname = "First name is required";
    }

    // Last Name Validation
    if (!lname.trim()) {
      errors.lname = "Last name is required";
    }

    // Email Validation
    if (!email.trim()) {
      errors.email = "Please enter an email";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      errors.email = "Invalid email address";
    }
    // Mobile Number Validation
    if (!mobile.trim()) {
      errors.mobile = "Mobile number is required";
    } else if (!/^\d{10}$/.test(mobile)) {
      errors.mobile = "Mobile number must be 10 digits";
    }

    // Password Validation
    if (!password.trim()) {
      errors.password = "Please enter a password";
    } else if (password.length < 8 || password.length > 16) {
      errors.password = "Password must be 8–16 characters";
    }

    // Confirm Password Validation
    if (!confirmPassword.trim()) {
      errors.confirmPassword = "Please confirm your password";
    } else if (confirmPassword !== password) {
      errors.confirmPassword = "Passwords do not match";
    }
    return errors; // Returns true if no errors
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const formData = new FormData();
        formData.append("first_name", fname);
        formData.append("last_name", lname);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("confirm_password", confirmPassword);
        formData.append("mobile_number", mobile);

        const response = await signupUser(formData).unwrap();
       

        if (response) {
          toast.success(response.message,{
              position: "bottom-center",
             autoClose: 1500,
          });

          // Navigate after showing message
          setTimeout(() => {
            navigate("/signin");
          }, 1500);
        } else {
          toast.error("Signup failed! Please try again.",{
              position: "bottom-center",
             autoClose: 1500,
          });
        }
      } catch (err) {
        toast.error(err?.data?.message || "Signup failed",{
          
            position: "bottom-center",
           autoClose: 1500,
        });
      }
    }
  };
  return (
    <>

      <Navbar />
      <section className=' mt-[100px] max-lg:mt-[50px] max-sm:mt-[40px]'>
        <div className='container'>
          <div className='flex w-[80%]  max-2xl:w-[90%] max-sm:w-[100%] mx-auto flex-wrap items-center'>
            <div className='w-[50%] max-xl:w-[55%] max-lg:w-[100%]'>
              <div className='w-[90%] width__70 justify-center max-2xl:w-[90%] max-xl:w-[90%]'>
                <div className="justify-center">
                  <h2 className="font-extrabold text-[#D86A37] text-center text-[30px] sm:text-[50px] md:text-[50px] lg:text-[50px] xl:text-[48px] 2xl:text-[48px] 3xl:text-[45px]">
                    Create an Account
                  </h2>

                  <p className='NunitoSans font-[400] text-[18px] text-[#556987] w-[65%] mx-auto text-center max-sm:w-[100%]  max-sm:text-[15px] max-sm:leading-[20px] '>Create an account to enjoy personalized shopping experience</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-[35px] max-sm:space-y-[30px]">
                  <div className='space-y-[35px] max-sm:space-y-[30px] justify-center pt-[57px] max-lg:pt-[35px]'>
                    <div className='flex justify-center max-sm:flex-col gap-[25px] max-sm:gap-[35px] max-lg:flex-col max-lg:w-[100%]'>
                      <div className="w-[100%]">
                        <input className='border-[1px] border-[#CBD6E2] rounded-[15px] w-[100%]  max-sm:w-[100%] max-lg:w-[100%] bg-[#F5F8FA] max-sm:h-[50px] h-[55px] placeholder:text-[15px] max-lg:placeholder:text-[16px] max-xl:placeholder:text-[17px]  ps-[25px] py-[14px]' placeholder='First Name...' type="text"
                          value={fname}
                          onChange={(e) => setFname(e.target.value)} /><br />
                        {errors.fname && <p className="text-red-500 text-sm mt-1">{errors.fname}</p>}
                      </div>
                      <div className="w-[100%]">
                        <input className='border-[1px] border-[#CBD6E2] rounded-[15px] w-[100%] max-sm:w-[100%] max-lg:w-[100%] bg-[#F5F8FA] max-sm:h-[50px] h-[55px] placeholder:text-[15px] max-lg:placeholder:text-[16px] max-xl:placeholder:text-[17px]  px-[25px] py-[14px]' placeholder='Last Name...' type="text"
                          value={lname}
                          onChange={(e) => setLname(e.target.value)} /><br />
                        {errors.lname && <p className="text-red-500 text-sm mt-1">{errors.lname}</p>}
                      </div>
                    </div>
                    <div>

                      <div className='flex justify-center '>
                        <input className='border-[1px] border-[#CBD6E2] rounded-[15px] w-[100%] max-sm:w-[100%]  bg-[#F5F8FA] max-sm:h-[50px] h-[55px] placeholder:text-[15px] max-lg:placeholder:text-[16px] max-xl:placeholder:text-[17px]  px-[25px] py-[14px]' placeholder='Enter your email...' type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)} /><br />
                      </div>
                      {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>
                    <div>
                      <div className='flex justify-center '>
                        <input className='border-[1px] border-[#CBD6E2] rounded-[15px] w-[100%] max-sm:w-[100%]  bg-[#F5F8FA] max-sm:h-[50px] h-[55px] placeholder:text-[15px] max-lg:placeholder:text-[16px] max-xl:placeholder:text-[17px]  px-[25px] py-[14px]' placeholder='Phone Number' type="number"
                          value={mobile}
                          onChange={(e) => setMobile(e.target.value)} maxLength={10} minLength={10} /><br />
                      </div>
                      {errors.mobile && <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>}

                    </div>
                    <div>
                      <div className='flex justify-center '>
                        <input className='border-[1px] border-[#CBD6E2] rounded-[15px] w-[100%] max-lg:w-[100%] bg-[#F5F8FA] h-[55px] max-sm:h-[50px] placeholder:text-[15px] max-lg:placeholder:text-[16px] max-xl:placeholder:text-[17px]  px-[25px] py-[14px]' placeholder='Enter your password...' type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)} /><br />
                      </div>
                      {errors.password && <p className="text-red-500 text-sm ">{errors.password}</p>}

                    </div>
                    <div>
                      <div className='flex justify-center '>
                        <input className='border-[1px] border-[#CBD6E2] rounded-[15px] w-[100%] max-lg:w-[100%] bg-[#F5F8FA] h-[55px] max-sm:h-[50px] placeholder:text-[15px] max-lg:placeholder:text-[16px] max-xl:placeholder:text-[17px]  px-[25px] py-[14px]' placeholder='Confirm your password...' type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)} /><br />
                      </div>
                      {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}

                    </div>
                  </div>


                  <div className=' flex justify-center'>
                    <button className='NunitoSans w-[100%] py-[11px] rounded-[6px] bg-[#D86A37] font-[700] max-sm:py-[10px] text-[#F0FDF4] text-[20px]  max-lg:text-[25px] max-sm:text-[20px] leading-[24px] border-solid  hover:border-[#D86A37] border-'>Create Account</button>
                  </div>
                </form>
                <div>
                  <Link to="/signin">
                    <p className='NunitoSans font-[600] text-[12px] leading-[18px] text-[#333F51]  pt-[21px] text-center max-lg:text-[15px] max-xl:text-[15px]'>Already have an account? <span className='text-[#D86A37]'> Sign in </span></p>
                  </Link>
                </div>
              </div>
            </div>
            <div className='w-[50%] max-xl:w-[45%]'>
              <img src={image2} className='imagesize object-cover W-[100%] max-lg:hidden' />
            </div>

          </div>
        </div>
      </section>

      {/* Footer.. */}
      <Footer />
    </>

  )
}

export default SignupPage