import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import * as S from "./styles";

import { TextInput } from "../../components/TextInput";
import { loginSchema } from "../../validations/validateLogin";
import { api } from "../../config/api";
import { login } from "../../config/endpoints";
import { useAuthentication } from "../../hooks/useAuthentication";
import { Layout } from "../../components/Layout";
import { Loading } from "../../components/Loading";
import { useState } from "react";

interface IFormILogin {
  email: string;
  password: string;
}

export const Login = () => {
  const { handleLogin } = useAuthentication();
  const [isLoading, setIsLoading] = useState(false);

  const { control, handleSubmit } = useForm<IFormILogin>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data: IFormILogin) => {
    setIsLoading(true);
    try {
      const response = await api.post(login(), {
        email: data.email,
        password: data.password,
      });

      handleLogin(response.data);
    } catch (error) {
      console.log({ error });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <S.Container>
        <S.Content>
          <h1>Login</h1>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <Controller
                defaultValue=""
                control={control}
                name="email"
                render={({ field, fieldState: { error } }) => {
                  return (
                    <TextInput
                      label="E-mail"
                      {...field}
                      error={error?.message}
                    />
                  );
                }}
              />
            </div>

            <Controller
              control={control}
              defaultValue=""
              name="password"
              render={({ field, fieldState: { error } }) => {
                return (
                  <TextInput label="Senha" {...field} error={error?.message} />
                );
              }}
            />

            <button type="submit" disabled={isLoading}>
              {isLoading ? <Loading /> : <span>Entrar</span>}
            </button>
          </form>
        </S.Content>
      </S.Container>
    </Layout>
  );
};
