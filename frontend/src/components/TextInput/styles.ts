import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  label {
    color: #000;
    font-weight: 600;
  }

  span {
    text-align: center;
    font-size: 14px;
    font-weight: 500;
    color: #d73035;
    margin-top: 6px;
  }
`;

export const Input = styled.input<{ isError: boolean }>`
  margin-top: 6px;
  height: 56px;
  border-radius: 8px;
  border: 1px solid
    ${({ isError }) => (isError ? "#d73035" : "rgba(204, 204, 204, 0.5)")};
  font-size: 16px;
  padding: 16px;
  outline: none;

  &:focus {
    border: ${({ isError }) => !isError && "3px solid rgba(12, 140, 233, 0.2)"};
  }
`;
