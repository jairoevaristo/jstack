import * as S from "./styles";
import logo from "../../assets/images/logo.svg";

export function Header() {
  return (
    <S.Container>
      <S.Content>
        <div className="page-details">
          <h1>Pedidos</h1>
          <h2>Acompanhe os pedidos dos clientes</h2>
        </div>

        <div className="image">
          <img src={logo} alt="WAITERAPP" />
        </div>
      </S.Content>
    </S.Container>
  );
}
