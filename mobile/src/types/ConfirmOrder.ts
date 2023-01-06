export type ConfirmOrder = {
  table: string;
  products: {
    product: string;
    quantity: number;
  }[];
};
