import { useState, useMemo, useCallback } from "react";
import { FlatList, TouchableOpacity } from "react-native";

import { Text } from "../Text";
import { Button } from "../Button";
import { MinusCircle } from "../Icons/MinusCircle";
import { PlusCircle } from "../Icons/PlusCircle";
import { OrderConfirmerdModal } from "../OrderConfirmerdModal";

import { confirmOrder } from "../../services/order";

import { CartItem } from "../../types/CartItem";
import { ProductData } from "../../types/ProductData";
import { formatCurrency } from "../../utils/formatCurrency";

import {
  Actions,
  Image,
  Item,
  Product,
  ProductDetails,
  QuatityContainer,
  Summary,
  TotalContainer,
} from "./styles";

type CartProps = {
  cartItems: CartItem[];
  onAdd: (product: ProductData) => void;
  onDecrement: (product: ProductData) => void;
  onConfirmOrder: () => void;
  selectedTable: string;
};

export const Cart = ({
  cartItems,
  onAdd,
  onDecrement,
  onConfirmOrder,
  selectedTable,
}: CartProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const total = useMemo(() => {
    return cartItems.reduce(
      (arr, item) => (arr += item.product.price * item.quantity),
      0
    );
  }, [cartItems]);

  const handleConfirmedOrder = useCallback(async () => {
    setIsLoading(true);

    await confirmOrder({
      table: selectedTable,
      products: cartItems.map((cartItem) => ({
        product: cartItem.product._id,
        quantity: cartItem.quantity,
      })),
    });

    setIsLoading(false);
    setIsModalVisible(true);
  }, [cartItems]);

  const handleOK = useCallback(() => {
    onConfirmOrder();
    setIsModalVisible(false);
  }, []);

  return (
    <>
      <OrderConfirmerdModal visible={isModalVisible} onOkButton={handleOK} />
      {cartItems.length > 0 && (
        <FlatList
          data={cartItems}
          keyExtractor={(cartItem) => String(cartItem.product._id)}
          showsVerticalScrollIndicator={false}
          style={{ marginBottom: 20, maxHeight: 150 }}
          renderItem={({ item: cartItem }) => (
            <Item>
              <Product>
                <Image
                  source={{
                    uri: "data:image/jpeg;base64,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",
                  }}
                />
                <QuatityContainer>
                  <Text size={14} color="#666">
                    {cartItem.quantity}x
                  </Text>
                </QuatityContainer>
                <ProductDetails>
                  <Text size={14} weight="600">
                    {cartItem.product.name}
                  </Text>
                  <Text size={14} color="#6666" style={{ marginTop: 4 }}>
                    {formatCurrency(cartItem.product.price)}
                  </Text>
                </ProductDetails>
              </Product>
              <Actions>
                <TouchableOpacity
                  style={{ marginRight: 24 }}
                  onPress={() => onAdd(cartItem.product)}
                >
                  <PlusCircle />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => onDecrement(cartItem.product)}>
                  <MinusCircle />
                </TouchableOpacity>
              </Actions>
            </Item>
          )}
        />
      )}
      <Summary>
        <TotalContainer>
          {cartItems.length > 0 ? (
            <>
              <Text color="#666">Total</Text>
              <Text size={20} weight="600">
                {formatCurrency(total)}
              </Text>
            </>
          ) : (
            <Text color="#666">Seu carrinho está vazio</Text>
          )}
        </TotalContainer>

        <Button
          disabled={cartItems.length === 0}
          onPress={handleConfirmedOrder}
          loading={isLoading}
        >
          Confirmar Pedido
        </Button>
      </Summary>
    </>
  );
};
