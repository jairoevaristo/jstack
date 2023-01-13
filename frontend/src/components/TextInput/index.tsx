import { forwardRef, HtmlHTMLAttributes } from "react";
import * as S from "./styles";

export type TextInputProps = HtmlHTMLAttributes<HTMLInputElement> & {
  name: string;
  label?: string;
  value: string;
  error?: string;
};

export const TextInput = forwardRef(
  ({ name, value, label, error, ...rest }: TextInputProps, ref) => {
    return (
      <S.Container>
        {!!label && <label>{label}</label>}
        <S.Input name={name} value={value} isError={!!error} {...rest} />
        <span>{error}</span>
      </S.Container>
    );
  }
);
