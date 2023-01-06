import { useCallback, useState } from "react";
import { CartItem } from "../types/CartItem";
import { ProductData } from "../types/ProductData";

export const useCart = (selectTable: string) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isTableModalVisible, setIsTableModalVisible] = useState(false);

  const handleAddToCart = (product: ProductData) => {
    if (!selectTable) {
      setIsTableModalVisible(true);
    }

    setCartItems((prevState) => {
      const itemIndex = prevState.findIndex(
        (cartItem) => cartItem.product._id === product._id
      );

      if (itemIndex < 0) {
        return [...prevState, { quantity: 1, product }];
      }

      const newCartItem = [...prevState];
      newCartItem[itemIndex].quantity += 1;
      return newCartItem;
    });
  };

  const handleDecrementCartItem = useCallback((product: ProductData) => {
    setCartItems((prevState) => {
      const itemIndex = prevState.findIndex(
        (cartItem) => cartItem.product._id === product._id
      );

      const item = prevState[itemIndex];
      const newCartItem = [...prevState];

      if (item.quantity === 1) {
        newCartItem.splice(itemIndex, 1);
        return newCartItem;
      }

      newCartItem[itemIndex].quantity -= 1;
      return newCartItem;
    });
  }, []);

  return {
    cartItems,
    handleAddToCart,
    handleDecrementCartItem,
    setCartItems,
    isTableModalVisible,
    setIsTableModalVisible,
  };
};
