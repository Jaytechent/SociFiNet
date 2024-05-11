import styled from "styled-components";

const Button = styled.button.attrs({
  className: `text-white text-base bg-blue-600 text-center py-1 px-2 rounded-2xl shadow-[0_8px_10px_1px_rgba(51,78,255,0.4)] duration-300 hover:translate-y-0.5 transition-all hover:shadow-[0_8px_10px_1px_rgba(51,78,255,0.6)]`,
  type: "submit",
})``;

export default Button;