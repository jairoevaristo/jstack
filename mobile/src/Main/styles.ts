import styled from "styled-components/native";

import { currentStatusBarHeight, isAndroid } from "../helpers";

export const Container = styled.SafeAreaView`
  flex: 1;
  margin-top: ${isAndroid ? currentStatusBarHeight : 0}px;
  background-color: #fafafa;
`;

export const CategoriesContainer = styled.View`
  height: 73px;
  margin-top: 34px;
`;

export const MenuContainer = styled.View`
  flex: 1;
`;

export const CenteredContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
