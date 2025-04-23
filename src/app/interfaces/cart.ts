export interface cart{
    cartId: number;
    userId: number;
    isActive: boolean;
    items: cartItem[];
    totalAmount: number;
}

export interface cartItem{
    productId: number;
    productName: string;
    imgUrl:string;
    quantity: number;
    price: number;
    totalPrice: number;

}

export interface CartDto {
    userId: number;
    productId: number;
    quantity: number;
  }
  


export interface upCartDto {
    userId: number;
    productId: number;
    NewQuantity: number;
  }
  