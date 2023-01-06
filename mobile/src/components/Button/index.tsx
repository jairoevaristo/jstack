import { ReactNode } from "react";
import { ActivityIndicator, TouchableOpacityProps } from "react-native";

import { Text } from "../Text";
import { Container } from "./styles";

type ButtonProps = TouchableOpacityProps & {
  children: ReactNode;
  loading?: boolean;
};

export const Button = ({
  children,
  disabled,
  loading,
  ...rest
}: ButtonProps) => {
  return (
    <Container {...rest} disabled={disabled || loading}>
      {loading ? (
        <ActivityIndicator size="small" color="#fff" />
      ) : (
        <Text weight="600" color="#fff">
          {children}
        </Text>
      )}
    </Container>
  );
};
