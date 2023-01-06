export type ProductData = {
  _id: string;
  name: string;
  description: string;
  imagePath: string;
  price: number;
  ingredients: Ingredients[];
};

type Ingredients = {
  _id: string;
  name: string;
  icon: string;
};
