import styled from "styled-components";

export const Center = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CenterCol = styled(Center)`
  flex-direction: column;
`;

export const CenterAbsolute = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
