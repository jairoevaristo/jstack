import { TouchableOpacity } from "react-native";
import { Text } from "../Text";
import { Container, Content, OrderHeader, Table } from "./styles";

type HeaderProps = {
  selectTable: string;
  onCancelOrder: () => void;
};

export const Header = ({ selectTable, onCancelOrder }: HeaderProps) => {
  return (
    <Container>
      {!selectTable && (
        <>
          <Text size={14} opacity={0.9}>
            Bem vindo(a) ao
          </Text>
          <Text size={24} weight="700">
            WAITER
            <Text size={24}>APP</Text>
          </Text>
        </>
      )}

      {selectTable && (
        <Content>
          <OrderHeader>
            <Text size={24} weight="600">
              Pedido
            </Text>
            <TouchableOpacity onPress={onCancelOrder}>
              <Text color="#D73035" weight="600" size={14}>
                Cancelar pedido
              </Text>
            </TouchableOpacity>
          </OrderHeader>

          <Table>
            <Text color="#6666">Mesa {selectTable}</Text>
          </Table>
        </Content>
      )}
    </Container>
  );
};
