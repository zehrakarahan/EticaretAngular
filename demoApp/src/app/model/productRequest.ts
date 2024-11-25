export class ProductRequest {
    productName: string;
    productDescription:string;
    ProductCategoryId:number;
    productPrice:number;
    productQuantity:number;
    constructor(init?: Partial<ProductRequest>) {
      Object.assign(this, init);
    }
  }