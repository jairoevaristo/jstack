import styled from "styled-components";

export const Container = styled.div<{ isFull: boolean }>`
  background-color: #fff;
  border-right: 1px solid rgba(204, 204, 204, 0.5);
  width: ${({ isFull }) => (isFull ? 260 : 75)}px;
  height: 100%;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  flex-direction: column;

  padding: 18px 12px;
`;

export const WrapperButtonArrow = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: flex-end;
`;

export const ButtonArrow = styled.div<{ isFull: boolean }>`
  display: flex;
  justify-content: flex-end;

  img {
    transform: ${({ isFull }) => (isFull ? "rotate(180deg)" : "rotate(0deg)")};
    transition: all 0.5s;
  }

  button {
    border-radius: 10px;
    padding: 14px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    border: 0;

    background-color: #d73035;
  }
`;

export const Divider = styled.div`
  width: 100%;
  border: 1px solid rgba(204, 204, 204, 0.2);
  height: 1px;
  margin: 26px 0px;
`;

export const WrapperButtonLink = styled.div<{ isFull: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: ${({ isFull }) => (isFull ? 10 : 6)}px;
  width: ${({ isFull }) => isFull && "100%"};
  max-height: 80%;
  overflow-y: auto;

  @media (max-width: 1220px) {
    max-height: 40%;
  }
`;

export const ButtonLink = styled.a<{ isFull: boolean }>`
  border-radius: 10px;
  padding: 14px;
  text-decoration: none;
  color: #000;
  display: flex;
  font-weight: 600;
  align-items: center;
  justify-content: center;
  border: 0;
  position: relative;
  background-color: ${({ isFull }) => (isFull ? "#fff" : "#d73035")};

  &::before {
    content: "";
    width: 100%;
    bottom: 0;
    display: ${({ isFull }) => (isFull ? "block" : "none")};
    position: absolute;
    border-bottom: 1px solid rgba(204, 204, 204, 0.5);
  }

  &:hover {
    background-color: #d73035;
    border-radius: ${({ isFull }) => isFull && "0px"};
    color: #fff;
  }

  img {
    display: ${({ isFull }) => (isFull ? "none" : "block")};
  }

  span {
    display: ${({ isFull }) => (!isFull ? "none" : "block")};
  }
`;

export const ButtonLogout = styled.div`
  display: flex;
  justify-content: flex-start;

  button {
    border-radius: 10px;
    padding: 14px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    border: 0;
    position: absolute;

    background-color: #d73035;
  }
`;
