import { useCallback, useState } from "react";
import { useCart } from "./useCart";

export const useTableOrder = () => {
  const [selectTable, setSelectTable] = useState("");

  const handleSaveTable = useCallback((table: string) => {
    setSelectTable(table);
  }, []);

  const handleResetOrder = useCallback(() => {
    setSelectTable("");
  }, []);

  return {
    handleResetOrder,
    handleSaveTable,
    selectTable,
  };
};
