import React, { useState } from "react";
import validator from "validator";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { message } from "antd";
import { useDispatch } from "react-redux";
import { signInUser } from "../store/userSlice";
import { FlexCol } from "../Elements/Flex";
import Button from "../Elements/Button";
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
  const inputclass = "block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

  return (
   

    <>
<h2>Login</h2>
    <div className=" flex flex-shrink  aspect-auto mt-2 sm:mt-3 md:mt-5 lg:mt-7 h-1/2 max-h-80  overflow-hidden bg-white  rounded-3xl shadow-md w-auto md:flex-row md:w-fit  ">
  <section className="grid place-items-center w-full md:w-1/2 bg-white  shadow-md  ">
      <FlexCol className=" transition-all py-5 md:py-6 w-3/5 h-full  ">

      <FlexCol as="form" onSubmit={handleSubmit}>
        <FlexCol className="mb-8 gap-6 transition-all md:mb-4 mt-3 ">
        
        <div>
    <label name="email" placeholder="Email"  className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Email</label>
    <input onChange={handleUserInput}  name="email" placeholder="Email" type="email"className={inputclass} />
</div>
        <div>
    <label name="password" placeholder="Password" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Password</label>
    <input onChange={handleUserInput}    name="password"  placeholder="Password" type="password" className={inputclass} />
</div>

         
         <FlexCol>
          <div className= "  text-base self-start ">
          Don't have an account?
          </div>
         
          <Link to="/register" className=" self-start text-sm text-blue-600 ">
            Register
        </Link>

          </FlexCol>
          
     
        </FlexCol>
        <Link to="/forgot-password" className="-mt-7 md:-mt-3 self-start text-sm text-blue-600 ">
          Forgot Password ?
        </Link>
        <Button onClick = {handleSubmit} loading={loading} className=" mt-2 text-base m-0 p-0">Login</Button>
      </FlexCol>
      
    </FlexCol>
    </section>

<div className="flex-1 relative overflow-hidden bg-white shadow-md ">
<video className="w-full h-full object-cover" src="/gmcads-login-vdo.mp4" autoPlay loop muted playsInline></video>
</div>





</div>



  
    </>
  );
};

export default Login;
