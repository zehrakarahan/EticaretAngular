import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationRef, NotificationService } from '@progress/kendo-angular-notification';
import { ProductRequest } from 'src/app/model/productRequest';
import { CategoriesService } from 'src/app/service/categories.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit{

  public opened = false;
  @ViewChild("notification", { read: TemplateRef })
  public notificationTemplate: TemplateRef<any>;
  public notificationReference: NotificationRef;
  public categories: Array<{ name: string; id: number }>;
  bioSection = new FormGroup({
    productName: new FormControl<string>('', { nonNullable: true }),
    productDescription: new FormControl<string>('', { nonNullable: true }),
    productCategoryId: new FormControl<number>(0, { nonNullable: true }),
    productPrice: new FormControl<number>(0, { nonNullable: true }),
    productQuantity: new FormControl<number>(0, { nonNullable: true }),
  });  
  public gridData: unknown[] = null;
  constructor( private router: Router,private productService:ProductService,private notificationService: NotificationService,
    private categoriService:CategoriesService
  ) {
   
     this.categoriService.getAllCategoriesWithSelect().subscribe(
      data=>{
          this.categories=data;
          this.bioSection.controls.productCategoryId.setValue(this.categories[0].id);
      }
    );
  }
  getAllProduct(){
    this.productService.getAllProducts().subscribe(
      data => {
        this.gridData=data;
        console.log(this.gridData);
      }
    ); 
  }
  ngOnInit(): void {
      this.getAllProduct();
  }
    public close(status: string): void {
    if(status=="yes")
    {
      console.log(`Dialog result: ${status}`);
      this.bioSection=null;
      this.opened = false;
    }
     if(status=="cancel" || status=="no")
     {
      this.opened = false;
      console.log(`Dialog result: ${status}`);
    }
  

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
    saveProduct() {
    if (this.bioSection.valid) {
      let data = new ProductRequest();
      data = {...data, ...this.bioSection.value};
      console.log();
      this.productService.createProduct(data
      ).subscribe(
        data => {
          this.showNotifivation();
          this.opened = false;
          this.getAllProduct();
        },
        error => {
          console.error('Error:', error);
        }
      );
      
    } else {
      console.error('Form geçersiz, lütfen tüm alanları doldurun.');
    }
  }
  public open(): void {
    this.opened = true;
    console.log(`Dialog result: ${status}`);
  }

}
