import { useCallback, useEffect, useState } from "react";
import socketIo from "socket.io-client";

import * as S from "./styles";

import { Board } from "../../components/Board";

import { filterStatusOrder } from "../../utils/filterStatusOrder";

import { listOrders } from "../../services/order";

import { Order } from "../../types/Order";
import { Sidebar } from "../../components/Sidebar";
import { InfoUser } from "../../components/InfoUser";
import { Layout } from "../../components/Layout";

export function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const io = socketIo("http://localhost:3001", {
      transports: ["websocket"],
    });

    io.on("new-order", (order) => {
      setOrders((prevState) => [...prevState, order]);
    });
  }, []);

  useEffect(() => {
    listOrders().then((response) => {
      setOrders(response.data);
    });
  }, []);

  const waiting = filterStatusOrder("WAITING", orders);
  const inProduction = filterStatusOrder("IN_PRODUCTION", orders);
  const done = filterStatusOrder("DONE", orders);

  const handleCancelOrder = useCallback((orderId: string | undefined) => {
    setOrders((prevState) =>
      prevState.filter((order) => order._id !== orderId)
    );
  }, []);

  const handleOrderStatusChange = useCallback(
    (orderId: string | undefined, status: Order["status"]) => {
      setOrders((prevState) =>
        prevState.map((order) =>
          order._id === orderId ? { ...order, status: status } : order
        )
      );
    },
    [orders]
  );

  return (
    <Layout>
      <S.Wrapper>
        <S.Container>
          <Board
            icon="⏱"
            title="Fila de espera"
            orders={waiting}
            onCancelOrder={handleCancelOrder}
            onChangeOrderStatus={handleOrderStatusChange}
          />
          <Board
            icon="👩‍🍳"
            title="Em produção"
            orders={inProduction}
            onCancelOrder={handleCancelOrder}
            onChangeOrderStatus={handleOrderStatusChange}
          />
          <Board
            icon="✅"
            title="Pronto!"
            orders={done}
            onCancelOrder={handleCancelOrder}
            onChangeOrderStatus={handleOrderStatusChange}
          />
        </S.Container>
      </S.Wrapper>
    </Layout>
  );
}
