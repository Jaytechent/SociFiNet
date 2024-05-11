import React, { useState } from "react";
import { useRef } from "react";

// import { Button, Input } from "antd";
import validator from "validator";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { message } from "antd";
import { useDispatch } from "react-redux";
import { signInUser } from "../store/userSlice";
import { FlexCol } from "../Elements/Flex";
import Header from "./Header";
import Button from "../Elements/Button";

import Input, { InputPassword } from "./Input";
const Login = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const  BASE_URL =   import.meta.env.VITE_BASE_URL

  const handleUserInput = (e) => {
    const { name, value } = e.target;
    setFormData((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (
      !validator.isEmail(formData.email) ||
      !validator.isStrongPassword(formData.password)
    ) {
      messageApi.open({
        type: "error",
        content: "Please check your input values",
        style: {
          color: "red",
        },
      });
      return;
    }

    try {
      setLoading(true);

      const loginResponse = await axios.post(
        `${BASE_URL}/api/v1/auth/login`,
        formData
      );
      // console.log(loginResponse);

      // Dispatch the email to the Redux store
      dispatch(signInUser(loginResponse.data ));
      // Navigate to the homepage after successful login
      navigate("/");
    } catch (error) {
      console.error("Error during login:", error);

      messageApi.open({
        type: "error",
        content: error.response?.data?.message || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };


  return (
   

    <>

    <div className=" flex flex-shrink  aspect-auto mt-2 sm:mt-3 md:mt-5 lg:mt-7 h-1/2 max-h-80  overflow-hidden bg-white  rounded-3xl shadow-md w-auto md:flex-row md:w-fit  ">
  <section className="grid place-items-center w-full md:w-1/2 bg-white  shadow-md  ">
      <FlexCol className=" transition-all py-5 md:py-6 w-3/5 h-full  ">

      <FlexCol as="form" onSubmit={handleSubmit}>
        <FlexCol className="mb-8 gap-6 transition-all md:mb-4 m-0 ">
          <Input
            type="email"
            placeholder="Email@gmail.com"
            onChange={handleUserInput} 
            label="Email"
            error_message="Please provide a valid email address."
          />
          <InputPassword
            placeholder="••••••••"
            minLength={8}
            onChange={handleUserInput}
            label="Password"
            error_message="Password must be atleast 8 char long"
          />
         
         <FlexCol>
          <div className= "  text-base self-start ">
          Don't have an account?
          </div>
         
          <Link to="/register" className=" self-start text-sm text-blue-600 ">
            Register
        </Link>

          </FlexCol>
          
     
        </FlexCol>
        <Link to="/forgot-password" className=" self-start text-sm text-blue-600 ">
          Forgot Password ?
        </Link>
        <Button className=" mt-2 text-base m-0 p-0">Login</Button>
      </FlexCol>
      
    </FlexCol>
    </section>

<div className="flex-1 relative overflow-hidden bg-white shadow-md ">
<video className="w-full h-full object-cover" src="/gmcads-login-vdo.mp4" autoPlay loop muted playsInline></video>
</div>





</div>



    ////////////////////////
    
   
    {/* <div className="flex flex-col md:flex-row gap-8 p-8">
  <section className="grid place-items-center w-full md:w-1/2 bg-white rounded-md shadow-md">
    {contextHolder}
    <form className="max-w-xl w-full space-y-4">
        <Input onChange={handleUserInput} name="email" placeholder="Email" />
        <Input
          onChange={handleUserInput}
          name="password"
          placeholder="Password"
        />
        <p>
          Don't have an account? <Link to="/register">Register</Link>{" "}
        </p>
        <Button block type="primary" onClick={handleSubmit} loading={loading}>
          LOG IN
        </Button>
<p className="pt-2 text-center align-middle">   <Link to="/forgot-password">Forgot Password?</Link></p>
      
      </form>
    </section>

    <div className="flex-1 relative overflow-hidden bg-white rounded-md shadow-md">
  <video className="w-full h-full object-cover" src="/gmcads-login-vdo.mp4" autoPlay loop muted playsInline></video>
</div>





    </div> */}
    </>
  );
};

export default Login;
