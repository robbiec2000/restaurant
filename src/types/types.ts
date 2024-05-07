export type Menu = {
  id: number;
  slug: string;
  title: string;
  desc?: string;
  img?: string;
  color: string;
};

export type Product = {
  id: string;
  title: string;
  desc?: string;
  img?: string;
  price: number;
  options?: { title: string; additionalPrice: number }[];
};

export type Order = {
  id: string;
  userEmail: string;
  price: number;
  products: CartItem[];
  status: string;
  createdAt: Date;
  intent_id?: string;
};

export type CartItem = {
  id: string;
  title: string;
  img?: string;
  price: number;
  optionTitle?:string;
  quantity: number;
}