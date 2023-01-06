import { api } from "../config/api";

export function listCategories() {
  return api.get("/categories");
}

export function productsByCategory(categoryId: string) {
  return api.get(`/categories/${categoryId}/products`);
}
