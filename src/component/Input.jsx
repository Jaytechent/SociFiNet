// Third party imports
import { useState, forwardRef } from "react";
import styled from "styled-components";


// User imports
import { FlexCol } from "../Elements/Flex";

const PasswordIcon = styled.svg.attrs({
  className:
    "absolute right-[1%] top-[37%] -translate-x-1/2 -translate-y-1/2 text-2xl text-gray-600 peer-placeholder-shown:top-[50%] peer-valid:top-[50%]",
})``;

const Input = forwardRef(
  ({ type = "text", placeholder, required = true, label, error_message, children, ...options }, ref) => {
    const id = label.toLowerCase();
    console.log(options);
    return (
      <FlexCol className="gap-1">
        <label htmlFor={id} className="text-md self-start  text-[#555555] transition-all md:text-base">
          {label}
          {required && <span className="text-red-400 font-semibold  text-base"> *</span>}
        </label>
        <div className="relative">
          <input
            className={`peer mb-1  w-full rounded-xl border-[1.5px] px-2 sm:px-5 py-1 sm:py-2 transition-all placeholder:text-[#aaaaaa] placeholder-shown:border-gray-300  invalid:border-red-400 placeholder-shown:invalid:border-gray-300 focus:outline-none focus:valid:border-blue-600 focus:valid:shadow-[0_0_10px_1px_rgba(51,78,255,0.4)] focus:invalid:border-red-400  focus:invalid:shadow-[0_0_10px_1px_rgba(255,0,0,.3)] md:mb-0 md:py-[.4rem] ${type === "password" && "tracking-widest"}`}
            type={type}
            placeholder={placeholder}
            ref={ref}
            required={required}
            id={id}
            {...options}
          />
          {children}
          <p className="text-sm transition-all peer-placeholder-shown:hidden peer-valid:hidden peer-invalid:text-red-500">
            {error_message}
          </p>
        </div>
      </FlexCol>
    );
  }
);

const InputPassword = forwardRef((options, ref) => {
  const [type, setType] = useState("password");
  const typeToggleHandler = () => setType((type) => (type === "password" ? "text" : "password"));

  return (
    <Input ref={ref} type={type} {...options}>

    </Input>
  );
});

export default Input;

export { InputPassword };
