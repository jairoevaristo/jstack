import { useEffect } from "react";

import * as S from "./styles";

import { Order } from "../../types/Order";
import { formatCurrency } from "../../utils/formatCurrency";
import closeIcon from "../../assets/images/close-icon.svg";

type OrderModalProps = {
  visible: boolean;
  order: Order | null;
  onCloseModal: () => void;
  onCancelOrder: () => Promise<void>;
  onOrderStatusChange: () => Promise<void>;
  isLoading: boolean;
};

export function OrderModal(props: OrderModalProps) {
  const {
    visible,
    order,
    onCloseModal,
    onCancelOrder,
    isLoading,
    onOrderStatusChange,
  } = props;

  if (!visible || !order) {
    return null;
  }

  const statusOrder = {
    DONE: {
      icon: "✅",
      text: "Pronto!",
      lable: "",
    },
    IN_PRODUCTION: {
      icon: "👩‍🍳",
      text: "Em Preparação",
      label: "Concluir Pedido",
    },
    WAITING: {
      icon: "⏱",
      text: "Fila de Espera",
      label: "Iniciar produção",
    },
  };

  const total = order.products.reduce((acc, { product, quantity }) => {
    return (acc += product.price * quantity);
  }, 0);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      onCloseModal();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <S.Overlay>
      <S.ModalBody>
        <header>
          <strong>Mesa {order.table}</strong>

          <button type="button" onClick={onCloseModal}>
            <img src={closeIcon} alt="icon_close" />
          </button>
        </header>

        <div className="status-container">
          <small>Status do Pedido</small>
          <div>
            <span>{statusOrder[order.status].icon}</span>
            <strong>{statusOrder[order.status].text}</strong>
          </div>
        </div>

        <S.OrderDetails>
          <strong>Itens</strong>

          <div className="order-items">
            {order.products.map(({ _id, product, quantity }) => {
              return (
                <div className="item" key={_id}>
                  <img
                    // src={`http://localhost:3001/uploads/${product.imagePath}`}
                    src="data:image/png;base64,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"
                    alt={product.imagePath}
                    width="48"
                    height="28.51"
                  />

                  <span className="quantity">{quantity}x</span>

                  <div className="product-details">
                    <strong>{product.name}</strong>
                    <span>{formatCurrency(product.price)}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="total">
            <span>Total</span>
            <strong>{formatCurrency(total)}</strong>
          </div>

          <S.Actions>
            {order.status !== "DONE" && (
              <button
                onClick={onOrderStatusChange}
                type="button"
                className="primary"
                disabled={isLoading}
              >
                <span>{statusOrder[order.status].icon}</span>
                <strong>{statusOrder[order.status].label}</strong>
              </button>
            )}

            <button
              type="button"
              className="secondary"
              disabled={isLoading}
              onClick={onCancelOrder}
            >
              <strong>Cancelar pedido</strong>
            </button>
          </S.Actions>
        </S.OrderDetails>
      </S.ModalBody>
    </S.Overlay>
  );
}
