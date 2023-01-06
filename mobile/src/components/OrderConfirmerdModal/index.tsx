import { Modal } from "react-native";
import { CheckCircle } from "../Icons/CheckCircle";
import { Text } from "../Text";
import { Container, OkButton } from "./styles";

type OrderConfirmerdModalProps = {
  visible: boolean;
  onOkButton: () => void;
};

export const OrderConfirmerdModal = ({
  visible,
  onOkButton,
}: OrderConfirmerdModalProps) => {
  return (
    <Modal visible={visible} animationType="fade">
      <Container>
        <CheckCircle />
        <Text weight="600" size={20} color="#fff" style={{ marginTop: 12 }}>
          Pedido confirmado
        </Text>
        <Text color="#fff" opacity={0.9} style={{ marginTop: 4 }}>
          O pedido já entrou na fila de produção!
        </Text>

        <OkButton onPress={onOkButton}>
          <Text color="#d73035" weight="600">
            OK
          </Text>
        </OkButton>
      </Container>
    </Modal>
  );
};
