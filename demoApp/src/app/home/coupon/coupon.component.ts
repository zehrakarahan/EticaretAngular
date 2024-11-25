import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from '@progress/kendo-angular-notification';
import { Category } from 'src/app/model/category';
import { CouponRequest, DisCountType } from 'src/app/model/couponRequest';
import { CategoriesService } from 'src/app/service/categories.service';
import { CouponService } from 'src/app/service/coupon.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.css'] 
})
export class CouponComponent implements OnInit{
  discountType = DisCountType;
  public opened = false;
  public gridData: unknown[] = null;
  categoriesList: { id: number; name: string }[] = [];
  productList: { id: number; name: string }[] = [];
  bioSection = new FormGroup({
    couponName: new FormControl(''),
    couponCode: new FormControl(''),
    discountType: new FormControl(null),
    discountValue: new FormControl(''),
    startDateTime: new FormControl(null),
    expiryDateTime: new FormControl(null),
    productIdList: new FormControl([]),  // Çoklu ürün ID'leri
    categoriesIdList: new FormControl([])  // Çoklu kategori ID'leri
  });
  public selectedProducts: number[] = [];
  public selectedCategories: number[] = [];
  public categories: Array<{ text: string; value: number }>;
  public products: Array<{ text: string; value: number }>;
  constructor( private router: Router,private notificationService: NotificationService,private categoriesService:CategoriesService,
    private productService:ProductService,private couponService:CouponService
  ) {
     this.getAllCouponList();
    this.categoriesService.getAllCategoriesWithSelect().subscribe(
      (categories) => {
        
        this.categoriesList = categories;
        this.categories = categories.map((category: { id: number; name: string }) => ({
          text: category.name,
          value: category.id
        }));
      },
      (error) => {
        console.error('Kategoriler alınırken hata oluştu:', error);
      }
    );
    
  }
  getAllCouponList(){
    this.couponService.getAllCoupon().subscribe(
      data=>{
        console.log(data);
        this.gridData=data;
      }
    )
  }
  ngOnInit(): void {
    this.productService.getAllCategoriesWithSelect().subscribe(
      (products) => {
        
        this.productList = products;
        this.products = products.map((category: { id: number; name: string }) => ({
          text: category.name,
          value: category.id
        }));
      },
      (error) => {
        console.error('Kategoriler alınırken hata oluştu:', error);
      }
    );
  }
  showNotifivation():void{
    this.notificationService.show({
      content: "Process  completed successly",
      hideAfter: 900,
      position: { horizontal: "right", vertical: "top" },
      animation: { type: "fade", duration: 400 },
      type: { style: "success", icon: true },
    });
  }
  public close(status: string): void {
    if(status=="yes")
    {
          this.opened = false;
              this.showNotifivation();
     }
     if(status=="cancel" || status=="no")
     {
      this.opened = false;
      console.log(`Dialog result: ${status}`);
    }
}
  public open(): void {
    this.opened = true;
    console.log(`Dialog result: ${status}`);
  }
  onProductChange(selectedProductIds: number[]) {
    const productArray = this.bioSection.get('productIdList') as FormArray;

    while (productArray.length) {
      productArray.removeAt(0);
    }
    selectedProductIds.forEach(id => {
      productArray.push(new FormControl(id));
    });
  }
  onCategorySelectionChange(event: any) {
    this.selectedCategories = event;  
    console.log("Seçilen Kategoriler: ", this.selectedCategories);

  }
  onProductSelectionChange(event: any) {
    this.selectedProducts = event; 
    console.log("Seçilen Ürünler: ", this.selectedProducts);

  }
  saveCoupon() {
    if (this.bioSection.valid) {
      const couponData: CouponRequest = {
        couponname: this.bioSection.value.couponName,
        couponcode: this.bioSection.value.couponCode,
        discountType: this.bioSection.value.discountType!,
        discountValue: this.bioSection.value.discountValue,
        startDateTime: this.bioSection.value.startDateTime!,
        expiryDateTime: this.bioSection.value.expiryDateTime!,
        productIdList: this.selectedProducts.map((elem: any) => elem.value),  
        categoriesIdList: this.selectedCategories.map((elem: any) => elem.value)
      };
     
      this.couponService.createCoupon(couponData).subscribe(
        data=>{
        
          this.bioSection=null;
          this.opened = false;
          this.showNotifivation();
          this.getAllCouponList();
        }
      );
    }
  }
  
  
  
 
}
