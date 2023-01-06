import { useCallback, useState } from "react";
import { toast } from "react-toastify";

import { cancelOrder, changeOrderStatus } from "../../services/order";

import { Order } from "../../types/Order";
import { OrderModal } from "../OrderModal";
import * as S from "./styles";

type BoardProps = {
  icon: string;
  title: string;
  orders: Order[];
  onCancelOrder: (orderId: string | undefined) => void;
  onChangeOrderStatus: (
    orderId: string | undefined,
    status: Order["status"]
  ) => void;
};

export function Board(props: BoardProps) {
  const { icon, title, orders, onCancelOrder, onChangeOrderStatus } = props;

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleOpenModal = useCallback((order: Order) => {
    setSelectedOrder(order);
    setIsModalVisible(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalVisible(false);
    setSelectedOrder(null);
  }, []);

  const handleChangeOrderStatus = useCallback(async () => {
    setIsLoading(true);
    const newStatus =
      selectedOrder?.status === "WAITING" ? "IN_PRODUCTION" : "DONE";

    await changeOrderStatus(selectedOrder?._id, newStatus);
    onChangeOrderStatus(selectedOrder?._id, newStatus);
    toast.success(
      `O pedido da mesa ${selectedOrder?.table} teve seu status alterado`
    );

    setIsModalVisible(false);
    setIsLoading(false);
  }, [selectedOrder]);

  const handleCancelOrder = useCallback(async () => {
    setIsLoading(true);

    await cancelOrder(selectedOrder?._id);
    toast.success(`O pedido da mesa ${selectedOrder?.table} foi cancelado`);
    onCancelOrder(selectedOrder?._id);

    setIsModalVisible(false);
    setIsLoading(false);
  }, [selectedOrder]);

  return (
    <S.Board>
      <OrderModal
        visible={isModalVisible}
        order={selectedOrder}
        onCloseModal={handleCloseModal}
        onCancelOrder={handleCancelOrder}
        onOrderStatusChange={handleChangeOrderStatus}
        isLoading={isLoading}
      />

      <header>
        <span>{icon}</span>
        <strong>{title}</strong>
        <span>({orders.length})</span>
      </header>

      {orders.length > 0 && (
        <S.OrdersContainer>
          {orders.map((order) => {
            return (
              <button
                onClick={() => {
                  handleOpenModal(order);
                }}
                type="button"
                key={order._id}
              >
                <strong>Mesa {order.table}</strong>
                <span>{order.products.length} itens</span>
              </button>
            );
          })}
        </S.OrdersContainer>
      )}
    </S.Board>
  );
}
