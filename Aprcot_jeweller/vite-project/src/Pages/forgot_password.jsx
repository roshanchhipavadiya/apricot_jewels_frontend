import React, { useState } from 'react';
import image from '../assets/image2.png';
import Navbar from '../Componenet/Navbar';
import Footer from '../Componenet/Footer';
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useForgotpasswordMutation, useLoginUserMutation } from "../services/apiSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { setToken } from '../store/authSlice'; // Optional if you're managing token in Redux

const Forgot = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState({ email: "", password: "", confirmPassword: "" });

  const [forgotpass] = useForgotpasswordMutation()

  const handleLogin = async (e) => {
    e.preventDefault();
    try {


      const errors = {};

      // ✅ Email validation
      if (!email.trim()) {
        errors.email = "Please enter an email";
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
        errors.email = "Invalid email address";
      }

      // ✅ Password validation
      if (!password.trim()) {
        errors.password = "Please enter a password";
      } else if (password.length < 8 || password.length > 16) {
        errors.password = "Password must be 8–16 characters";
      }

      // ✅ Confirm Password
      if (!confirmPassword.trim()) {
        errors.confirmPassword = "Please confirm your password";
      } else if (password !== confirmPassword) {
        errors.confirmPassword = "Passwords do not match";
      }

      // ✅ Show errors if any
      if (Object.keys(errors).length > 0) {
        setError(errors);
        return;
      }

      const formdata = new FormData()

      formdata.append('user_email_id', email)
      formdata.append('new_password', password)
      formdata.append('con_password', confirmPassword)


      await forgotpass(formdata).unwrap()

      toast.success('Your password successfully changed', {
          position: "bottom-center",
        autoClose: 1500,
      })

      setTimeout(() => {
        navigate("/");
      }, 1500);

    } catch (error) {
      toast.error(error?.data?.message || error?.message || "Something went wrong", {
          position: "bottom-center",
        autoClose: 1500,
      })
    }


  };


  return (
    <>
      <Navbar />
      <section className="mt-[100px] max-lg:mt-[50px] max-sm:mt-[40px]">
        <div className="container">
          <div className="flex w-[73%] max-sm:w-[100%] mx-auto flex-wrap items-center">
            <div className="w-[50%] max-lg:w-[100%]">
              <div className="w-[80%] max-2xl:w-[90%] max-xl:w-[90%]">
                <h2 className="font-[800] text-[58px] text-[#D86A37] text-center">Forgot Password</h2>
                <p className="text-[#556987] text-center mt-[5px]">Chnage your Password</p>

                <form onSubmit={handleLogin} className="pt-[57px]">
                  <div className='space-y-[35px] '>

                    <div>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border rounded-[15px] w-full bg-[#F5F8FA] h-[55px] px-[25px] py-[14px]"
                        placeholder="Enter your email..."
                      />
                      {error.email && <p className="text-red-500 text-sm mt-1">{error.email}</p>}
                    </div>

                    <div>
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border rounded-[15px] w-full bg-[#F5F8FA] h-[55px] px-[25px] py-[14px]"
                        placeholder="Enter your password..."
                      />
                      {error.password && <p className="text-red-500 text-sm mt-1">{error.password}</p>}
                    </div>
                    <div>
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="border rounded-[15px] w-full bg-[#F5F8FA] h-[55px] px-[25px] py-[14px]"
                        placeholder="Enter your confirm password..."
                      />
                      {error.confirmPassword && (
                        <p className="text-red-500 text-sm mt-1">{error.confirmPassword}</p>
                      )}
                    </div>
                  </div>


                  <button
                    type="submit"
                    className="w-full mt-[35px] py-[11px] rounded-[6px] bg-[#D86A37] text-[#F0FDF4] text-[20px] font-[700]"
                  // disabled={isLoading}
                  >
                    {/* {isLoading ?  */}
                    {/* "Signing In..." : */}
                    Submit
                    {/* } */}
                  </button>
                </form>


                <p className="text-center text-[12px] pt-[21px]">
                 If you have remember Password? <Link to="/signin" className="text-[#D86A37]">Sign In</Link>
                </p>
              </div>
            </div>

            <div className="w-[50%]">
              <img src={image} className="imagesize object-cover w-full max-lg:hidden" />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};
export default Forgot