import React, { useState } from "react";
import { toast } from "react-toastify";
import userAxios from "../../baseURL";
const normalStyle =
  "w-full  h-[45px] sm:h-[56px] pl-[20px] py-[7px] font-normal text-sm text-[#515151] focus:outline-none ";
const errorStyle =
  "w-full  h-[56px] pl-[20px] py-[7px] font-normal text-sm text-red-400 focus:outline-none ";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate, useParams } from "react-router-dom";
import logo from "./logo.png";

function ResetPassword() {
  const navigate = useNavigate();
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmconfirmPasswordError, setConfirmPasswordError] =
    useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const resetPassword = async (e) => {
    e.preventDefault();
    console.log(password, confirmPassword);
    if (!password || !confirmPassword) {
      toast.error("Please fill all the fields", {
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

    if (password !== confirmPassword) {
      toast.error("Password and Confirm Password does not match", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setConfirmPasswordError(true);
      return;
    }
    setConfirmPasswordError(false);
    console.log(token);
    try {
      const response = await userAxios.put(`api/users/resetPassword/${token}`, {
        password,
      });
      if (response.status === 200) {
        toast.success("Password reset successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        navigate("/login");
      }
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
        <form className="flex flex-col mt-[15px]">
          <div className="w-full relative">
            <label
              htmlFor="password"
              className={`font-semibold ${"text-[#383838]"}`}
            >
              Password
            </label>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              className={normalStyle}
              style={{
                borderRadius: "7.979px",
                border: "1px solid #747474",
                background: "#FFF",
              }}
              placeholder="Enter your password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <VisibilityIcon
              className="absolute top-[40px] right-4"
              fontSize="medium"
              color="disabled"
              onClick={() => {
                console.log("as");
                setShowPassword((pre) => !pre);
              }}
            />
          </div>
          <div className="w-full relative">
            <label
              htmlFor="password"
              className={`font-semibold ${
                confirmconfirmPasswordError ? "text-red-500" : "text-[#383838]"
              }`}
            >
              Confirm Password
            </label>
            <input
              id="password"
              type={showConfirmPassword ? "text" : "password"}
              className={confirmconfirmPasswordError ? errorStyle : normalStyle}
              style={{
                borderRadius: "7.979px",
                border: confirmconfirmPasswordError
                  ? "1px solid #FF0000"
                  : "1px solid #747474",
                background: "#FFF",
              }}
              placeholder="Re-enter your password"
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />
            <VisibilityIcon
              className="absolute top-[40px] right-4"
              fontSize="medium"
              color={confirmconfirmPasswordError ? "error" : "disabled"}
              onClick={() => {
                setShowConfirmPassword((pre) => !pre);
              }}
            />
          </div>

          <button
            className="w-full text-white bg-main_blue sm:h-[60px] h-[45px] text-[15px] rounded-lg sm:text-[20px] font-medium mt-[15px]"
            onClick={(e) => {
              resetPassword(e);
            }}
          >
            Reset password
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
