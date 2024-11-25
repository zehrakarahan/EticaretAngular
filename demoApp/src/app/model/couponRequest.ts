export interface CouponRequest {
  couponname: string;
  couponcode: string;
  discountType: DisCountType;
  discountValue: string;
  startDateTime: Date;
  expiryDateTime: Date;
  productIdList: number[]; // Çoklu ürün ID'leri için dizi
  categoriesIdList: number[]; // Çoklu kategori ID'leri için dizi
}


  export enum  DisCountType{
    FixedAmount=1,
    PersantageRace=2
  }
  