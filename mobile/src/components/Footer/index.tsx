import { ReactNode } from "react";
import { FooterContent, FooterContainer } from "./styles";

type FooterProps = {
  children: ReactNode;
};

export const Footer = ({ children }: FooterProps) => {
  return (
    <FooterContent>
      <FooterContainer>{children}</FooterContainer>
    </FooterContent>
  );
};
