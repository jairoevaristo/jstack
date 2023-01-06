import styled from "styled-components/native";

export const Item = styled.View`
  padding: 8px 0px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Product = styled.View`
  flex-direction: row;
`;

export const Image = styled.Image`
  width: 48px;
  height: 48px;
  border-radius: 6px;
`;

export const QuatityContainer = styled.View`
  min-width: 20px;
  margin-left: 12px;
`;

export const ProductDetails = styled.View``;

export const Actions = styled.View`
  flex-direction: row;
`;

export const Summary = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const TotalContainer = styled.View`
  flex: 1;
  margin-right: 32px;
`;
