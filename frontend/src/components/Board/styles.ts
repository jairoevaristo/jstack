import styled from "styled-components";

export const Board = styled.div`
  max-height: 60vh;
  overflow-y: auto;
  padding: 16px;
  border: solid 1px rgba(204, 204, 204, 0.4);
  border-radius: 16px;
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;

  @media (max-width: 1280px) {
    max-height: 40vh;
  }

  > header {
    padding: 8px;
    font-size: 14px;
    display: flex;
    align-items: center;
    gap: 8px;
  }
`;

export const OrdersContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  button {
    background-color: #fff;
    border: solid 1px rgba(204, 204, 204, 0.4);
    height: 128px;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;

    & + button {
      margin-top: 24px;
    }
  }

  strong {
    font-weight: 500;
  }

  span {
    color: #666;
    font-size: 14px;
  }
`;
