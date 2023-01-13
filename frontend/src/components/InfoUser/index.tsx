import * as S from "./styles";
import logout from "../../assets/images/logout.svg";

type InfoUser = {
  name: string | undefined;
  onLogout: () => void;
};

export const InfoUser = ({ name, onLogout }: InfoUser) => {
  return (
    <S.Container>
      <div>
        <span>Olá {name}</span>
        <button onClick={onLogout}>
          <img src={logout} alt="logout" />
        </button>{" "}
      </div>
    </S.Container>
  );
};
