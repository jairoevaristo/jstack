import { useCallback, useState } from "react";
import {
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { isIos } from "../../helpers";
import { Button } from "../Button";
import { Close } from "../Icons/Close";
import { Text } from "../Text";
import { Form, ModalBody, Overlay, Header, Input } from "./styles";

type TableModaProps = {
  visible: boolean;
  onClose: () => void;
  onSave: (table: string) => void;
};

export const TableModal = ({ visible, onClose, onSave }: TableModaProps) => {
  const [table, setTable] = useState("");

  const handleSave = useCallback(() => {
    setTable("");
    onSave(table);
    onClose();
  }, [table]);

  return (
    <Modal transparent visible={visible} animationType="fade">
      <TouchableWithoutFeedback onPress={onClose}>
        <Overlay behavior={isIos ? "padding" : "height"}>
          <ModalBody>
            <Header>
              <Text weight="600">Informe a mesa</Text>
              <TouchableOpacity onPress={onClose}>
                <Close color="#6666" />
              </TouchableOpacity>
            </Header>

            <Form>
              <Input
                onChangeText={setTable}
                keyboardType="number-pad"
                placeholder="Número da mesa"
                placeholderTextColor="#6666"
              />
              <Button disabled={!table} onPress={handleSave}>
                Salvar
              </Button>
            </Form>
          </ModalBody>
        </Overlay>
      </TouchableWithoutFeedback>
    </Modal>
  );
};
