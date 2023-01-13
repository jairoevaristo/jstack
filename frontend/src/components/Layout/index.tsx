import { ReactElement } from "react";
import * as S from "./styles";

import { Header } from "../Header";
import { Sidebar } from "../Sidebar";
import { useAuthentication } from "../../hooks/useAuthentication";
import { isLoggedAndAdmin } from "../../helpers";
import { InfoUser } from "../InfoUser";

type LayoutProps = {
  children: ReactElement;
};

export const Layout = ({ children }: LayoutProps) => {
  const { user, handleLogout } = useAuthentication();

  return (
    <>
      <Header />
      <S.Container>
        {isLoggedAndAdmin(user) && <Sidebar />}
        <S.Content>
          {isLoggedAndAdmin(user) && (
            <InfoUser name={user?.name} onLogout={handleLogout} />
          )}
          {children}
        </S.Content>
      </S.Container>
    </>
  );
};
