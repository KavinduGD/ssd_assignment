import React, { useState } from "react";
import { toast } from "react-toastify";
import userAxios from "../../baseURL";
const normalStyle =
  "w-full  h-[45px] sm:h-[56px] pl-[20px] py-[7px] font-normal text-sm text-[#515151] focus:outline-none ";
const errorStyle =
  "w-full  h-[56px] pl-[20px] py-[7px] font-normal text-sm text-red-400 focus:outline-none ";


  import logo from './logo.png';
function ResetPasswordEmailPage() {
  const [emailError, setEmailError] = useState(false);
  const [email, setEmail] = useState("");

  const sendResetEmail = async (e) => {
    e.preventDefault();
    if (!email) {
      setEmailError(true);
      toast.error("Empty Email", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }

    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (!emailRegex.test(email)) {
      setEmailError(true);
      toast.error("Invalid Email Address", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }
    setEmailError(false);
    try {
      const res = await userAxios.post("/api/users/forgotPassword", {
        email,
      });

      setEmail("");

      toast.success(res.data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } catch (error) {
      toast.error(error.response.data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="px-[15px] sm:px-[30px] py-[20px] rounded-lg md:bg-gray-100  border-gray-300  md:border-[1px]">
        <div className="flex justify-center items-center flex-col sm:flex-row">
          <img
            src={logo}
            alt="logo"
            className="w-[150px] sm:w-[210px]"
          />
          <div className="">
            <p className="sm:text-[40px] text-[30px] font-roboto_slab font-bold sm:block hidden leading-[92%]">
            International
            </p>
            <p className="sm:text-[40px] text-[30px] font-roboto_slab font-bold sm:block hidden leading-[92%]">
            Academic Institution
            </p>
            <p className="text-[30px] font-roboto_slab font-bold sm:text-left text-center leading-[82%]">
            Transport Management System
            </p>
          </div>
        </div>
        <h1 className="font-roboto text-2xl font-semibold sm:mt-0 mt-[10px] text-center sm:text-left">
          Reset Password
        </h1>
        <p className=" text-center sm:text-left sm:block hidden">
          Enter your email address below and we'll send you a link to reset your
          password.
        </p>
        <form className="flex flex-col mt-[10px]">
          <div className="w-full flex flex-col items-center sm:items-start">
            <label
              htmlFor="email"
              className={` text-[17px] font-bold font-roboto ${
                emailError ? "text-red-500" : "text-[#383838]"
              }`}
            >
              University Email Address
            </label>
            <input
              id="email"
              type="email"
              className={emailError ? errorStyle : normalStyle}
              style={{
                borderRadius: "7.979px",
                border: emailError ? "1px solid #FF0000" : "1px solid #747474",
                background: "#FFF",
              }}
              placeholder="Enter your email address"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
            />
          </div>
          <button
            className="w-full text-white bg-main_blue sm:h-[60px] h-[45px] text-[15px] rounded-lg sm:text-[20px] font-medium mt-[15px]"
            onClick={(e) => {
              sendResetEmail(e);
            }}
          >
            Send Email
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPasswordEmailPage;
