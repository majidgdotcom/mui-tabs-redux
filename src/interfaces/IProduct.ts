export interface ProductData {
  id: number;
  name: string;
  price: number;
  categoryId: number;
}

export const ProductCategory = [
  { id: 1, title: "Electronics" },
  { id: 2, title: "Furniture" },
  { id: 3, title: "Appliances" }
];