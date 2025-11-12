import React, { useEffect, useState } from 'react';
import image from '../assets/image2.png';
import Navbar from '../Componenet/Navbar';
import Footer from '../Componenet/Footer';
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../services/apiSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { setToken } from '../store/authSlice'; // Optional if you're managing token in Redux

export const Login = () => {
  const navigate = useNavigate();

  const [loginUser, { isLoading }] = useLoginUserMutation(); // ✅ Destructure isLoading
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});

  const validateForm = () => {
    let errors = {};
    if (!email.trim()) {
      errors.email = "Please enter an email";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      errors.email = "Invalid email address";
    }

    if (!password.trim()) {
      errors.password = "Please enter a password";
    } else if (password.length < 8 || password.length > 16) {
      errors.password = "Password must be 8–16 characters";
    }

    return errors;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setError(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const formData = new FormData();
        formData.append("email", email);
        formData.append("password", password);

        const response = await loginUser(formData).unwrap();


        if (response?.access) {
          localStorage.setItem("aprifrontoken", response.access);
          toast.success(response?.message || "Login successful!", {
            position: "bottom-center",
            autoClose: 1500,
          });

          setTimeout(() => {
            navigate("/");
          }, 1500);
        } else {
          toast.error(response?.message || "Something went wrong!", {
            position: "bottom-center",
            autoClose: 1500,
          });
        }
      } catch (err) {
        toast.error(err?.data?.message || "Login failed", {
          position: "bottom-center",
          autoClose: 1500,
        });
      }
    }
  };
  useEffect(() => {
    localStorage.clear();
    sessionStorage.clear();

    // Clear cookies
    document.cookie.split(";").forEach((c) => {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });

    // Clear service worker cache
    if ("caches" in window) {
      caches.keys().then((names) => {
        names.forEach((name) => caches.delete(name));
      });
    }
  }, []);

  return (
    <>
      <Navbar />
      <section className="mt-[100px] max-lg:mt-[50px] max-sm:mt-[40px]">
        <div className="container">
          <div className="flex w-[73%] max-sm:w-[100%] mx-auto flex-wrap items-center">
            <div className="w-[50%] max-lg:w-[100%]">
              <div className="w-[80%] max-2xl:w-[90%] max-xl:w-[90%] max-lg:w-full">
                <h2 className="font-extrabold text-[#D86A37] text-center text-[30px] sm:text-[50px] md:text-[50px] lg:text-[50px] xl:text-[48px] 2xl:text-[48px] 3xl:text-[45px]">Customer Login</h2>
                <p className="text-[#556987] text-center mt-[5px]">Sign in to your Apricot account</p>

                <form onSubmit={handleLogin} className="pt-[57px]">
                  <div className='space-y-[35px] max-sm:space-y-[30px]'>

                    <div>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border rounded-[15px] w-full bg-[#F5F8FA] h-[55px] max-sm:h-[50px] px-[25px] py-[14px]"
                        placeholder="Enter your email..."
                      />
                      {error.email && <p className="text-red-500 text-sm mt-1">{error.email}</p>}
                    </div>

                    <div>
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border rounded-[15px] w-full bg-[#F5F8FA] h-[55px] max-sm:h-[50px] px-[25px] py-[14px]"
                        placeholder="Enter your password..."
                      />
                      {error.password && <p className="text-red-500 text-sm mt-1">{error.password}</p>}
                    </div>
                  </div>
                  <div className='flex justify-end'>

                    <p onClick={() => navigate('/forgot_password')} className="text-[#D86A37] text-right pt-[13px] cursor-pointer">Forgot your password?</p>
                  </div>

                  <button
                    type="submit"
                    className="NunitoSans w-[100%] max-sm:mt-[30px] mt-[35px] py-[11px] rounded-[6px] bg-[#D86A37] font-[700] max-sm:py-[10px] text-[#F0FDF4] text-[20px]  max-lg:text-[25px] max-sm:text-[20px] leading-[24px] border-solid  hover:border-[#D86A37] border-"
                  // disabled={isLoading}
                  >
                    {/* {isLoading ?  */}
                    {/* "Signing In..." : */}
                    Sign In
                    {/* } */}
                  </button>
                </form>


                <p className="text-center text-[12px] pt-[21px]">
                  Don’t have an account? <Link to="/signUp" className="text-[#D86A37]">Sign up</Link>
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
