import { Product } from "./product";

export interface cart{
    cartId: number;
    userId: number;
    isActive: boolean;
    items: cartItem[];
    totalAmount: number;
}

export interface cartItem{
    id: number;
    productId: number;
    productName: string;
    imgUrl:string;
    quantity: number;
    price: number;
    totalPrice: number;
    stock:number;
    // product?:Product;

}

export interface CartDto {
    userId: number;
    productId: number;
    quantity: number;
    product?:Product;
  }
  


export interface upCartDto {
    userId: number;
    productId: number;
    NewQuantity: number;
  }
  