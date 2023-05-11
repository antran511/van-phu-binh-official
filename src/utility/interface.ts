export interface Partner {
  id: number;
  name: string;
  address?: string;
  phone?: string;
  country?: string;
  is_customer?: boolean;
  is_supplier?: boolean;
}

export interface SaleOrder {
  id: number;
  customer: {
    id: number;
    name: string;
  };
  partners: Partner
  sale_order_items: SaleOrderItem[];
}

export interface Item {
  id: number;
  name: string;
  price: number;
  cost: number;
  category: string;
  type: "mould" | "material" | "product";
}

export interface SaleOrderItem {
  sale_order: {
    id: number;
    customer: {
      name: string;
    }
    date_created: string;
  };
  product: Item;
  quantity: number;
  unit_price: number;
}