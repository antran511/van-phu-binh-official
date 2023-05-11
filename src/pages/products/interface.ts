export interface Item {
  id: number;
  name: string;
  price: number;
  cost: number;
  category: string;
  type: "mould" | "material" | "product";
}
