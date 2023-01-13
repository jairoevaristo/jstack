import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  max-width: 1220px;
  margin: 20px auto;
  padding-inline: 12px;

  div {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 12px;

    span {
      font-weight: 300;
      font-size: 16px;
    }

    button {
      padding: 8px;
      border-radius: 10px;
      border: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #6666;
    }
  }
`;
