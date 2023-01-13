import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  max-width: 1216px;
  margin: 60px auto;
  display: flex;
  justify-content: center;

  @media (max-width: 1280px) {
    margin: 40px auto;
  }
`;

export const Content = styled.div`
  height: 537px;
  width: 568px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 13px 11px 17px -8px rgba(204, 204, 204, 0.5);

  @media (max-width: 1280px) {
    max-height: 430px;
    overflow-y: auto;

    h1 {
      margin-top: 0px;
    }

    div {
      margin: 15px 0 !important;
    }
  }

  h1 {
    font-weight: 300;
    text-align: center;
    margin-top: 40px;
  }

  form {
    padding: 0px 70px;
  }

  div {
    margin: 30px 0;
  }

  button {
    width: 100%;
    background-color: #333333;
    font-weight: 600;
    border: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 44px;
    color: #fff;
    border-radius: 48px;

    &:hover {
      opacity: 0.9;
    }
  }
`;
