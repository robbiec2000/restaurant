import { Cart, CartItem } from "@/types/types"
import { create } from "zustand"
import { persist } from "zustand/middleware"

export type ActionTypes = {
    add: (item: CartItem) => void;
    remove: (item: CartItem) => void;
}

export const useCartStore = create(persist<Cart & ActionTypes>((set, get) => ({
    products: [],
    totalItems: 0,
    totalPrice: 0,
    add(item) {
        const product = get().products;
        const existProduct = product.find(product => (product.id === item.id && product.optionTitle === item.optionTitle));
        if (existProduct) {
            const updatedProducts = product.map(product =>
                (product.id === existProduct.id &&
                    product.optionTitle === existProduct.optionTitle) ? {
                    ...product,
                    quantity: item.quantity + product.quantity,
                    price: item.price + product.price,
                } : product);
            set((state) => ({
                products: updatedProducts,
                totalItems: state.totalItems + item.quantity,
                totalPrice: state.totalPrice + item.price
            }));
        } else {
            set((state) => ({
                products: [...state.products, item],
                totalItems: state.totalItems + item.quantity,
                totalPrice: state.totalPrice + item.price,
            }));
        }
    },
    remove(item) {
        set((state) => ({
            products: state.products.filter((product) => (product.id !== item.id || product.optionTitle !== item.optionTitle)),
            totalItems: state.totalItems - item.quantity,
            totalPrice: state.totalPrice - item.price,
        }));
    },
}), { name: "cart" }));