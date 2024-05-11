import React, { useState } from "react";
import { useRef } from "react";
// import { Button, Input } from "antd";
import validator from "validator";
import axios from "axios";
import { message } from "antd";
import { useNavigate, Link } from "react-router-dom";
import { FlexCol, Flex } from "../Elements/Flex";
import Header from "./Header";
import Button from "../Elements/Button";
import Input, { InputPassword } from "./Input";
const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const navigate = useNavigate();
  const  BASE_URL =   import.meta.env.VITE_BASE_URL
  const handleUserInput = (e) => {
    const { name, value } = e.target;
    setFormData((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));

    // Check if the password is alphanumeric with symbols
    if (name === "password") {
      const isValid = validator.isStrongPassword(value, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      });

      setIsPasswordValid(isValid);
    }
  };

  const handleSubmit = async () => {
    if (
      validator.isEmpty(formData.name) ||
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
      const response = await axios.post(
        `${BASE_URL}/api/v1/auth/register`,
        formData
      );
      // console.log(response);

      navigate("/login");
      // window.alert("YOU HAVE SUCCESSFULLY REGISTERED");
    } catch (error) {
      messageApi.open({
        type: "error",
        content: error.response.data.message || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  const nameRef = useRef();
  const emailRef = useRef();
  const alternateEmailRef = useRef();
  const passwordRef = useRef();

  return (
  <>
      <div className=" flex flex-shrink  aspect-auto mt-2 sm:mt-3 md:mt-5 lg:mt-7 h-1/2 max-h-80 bg-white  rounded-3xl shadow-md w-auto md:flex-row md:w-fit  ">
  <section className="grid place-items-center w-full md:w-1/2 bg-white  shadow-md  ">

      <FlexCol className=" transition-all py-5 md:py-6 w-3/5 h-full  ">

      <FlexCol as="form"  onSubmit={handleSubmit}>
        <FlexCol className="mb-8 gap-2 transition-all md:mb-4 m-0 p-2 ">
        <Input  onChange={handleUserInput} placeholder="Enter your name" label="Name" error_message="Please provide the name." />
          <Input
           onChange={handleUserInput}
            type="email"
            placeholder="Email@gmail.com"
            label="Email"
            error_message="Please provide a valid email address."
          />
  
          <InputPassword
              onChange={handleUserInput}
            placeholder="••••••••"
            minLength={8}
            label="Password"
            error_message="Password must be atleast 8 char long"
          />
         
          {/* <Flex className="mb-4 gap-4"> */}
          <div className= "-mt-1  text-base self-start ">
          Already have an account? 
          </div>
         
          <Link to="/login" className="-mt-1 self-start text-sm text-blue-600 ">
          Login
        </Link>
          {/* <input type="checkbox" id="terms" required className="w-4" />
          <label htmlFor="terms">
            I agree to the{" "}
            <Link to="/terms" className="text-blue-600 underline">
              terms & conditions
            </Link>
          </label> */}
        {/* </Flex> */}
        <Button onClick={handleSubmit} className=" mt-2 text-base m-0 p-0">Sign Up</Button>
          
     
        </FlexCol>
      </FlexCol>
      
    </FlexCol>
    </section>

<div className="flex-1 relative overflow-hidden bg-white shadow-md ">
<video className="w-full h-full object-cover" src="/gmcads-login-vdo.mp4" autoPlay loop muted playsInline></video>
</div>





</div>


  /////////////////////////////////////////
 {/* <div className="flex flex-col md:flex-row gap-4 p-8">
  <section className="grid place-items-center w-full md:w-1/2 bg-white rounded-md shadow-md">

    <h2>Register</h2>
      {contextHolder}
      <form className="max-w-xl w-full space-y-4">
        <Input onChange={handleUserInput} name="name" placeholder="Name" allowClear />
        <Input onChange={handleUserInput} name="email" placeholder="Email" allowClear />
        <Input.Password
          onChange={handleUserInput}
          name="password"
          placeholder="Password" allowClear
        />
        {!isPasswordValid && (
          <p style={{ color: "red" }}>
            Password must be alphanumeric, symbols and not less than 8 char
          </p>
        )}

        <p>
          Already have an account? <Link to="/login">Login</Link>{" "}
        </p>
        <Button block type="primary" onClick={handleSubmit} loading={loading}>
          Register user
        </Button>
      </form>
    </section>



<div className="flex-1 relative overflow-hidden bg-white rounded-md shadow-md">
  <video className="w-full h-full object-cover" src="/gmcads-reg-vdo.mp4" autoPlay loop muted playsInline></video>
</div>






  </div>
  
  
   */}
  </>


  );
};

export default Register;
