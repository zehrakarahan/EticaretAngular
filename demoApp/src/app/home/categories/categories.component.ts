import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationRef, NotificationService } from '@progress/kendo-angular-notification';
import { CategoriesRequest } from 'src/app/model/categoriesRequest';
import { CategoriesService } from 'src/app/service/categories.service';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']  // Burada styleUrls kullanmalısınız.
})

export class CategoriesComponent implements OnInit{
  public opened = false;
  @ViewChild("notification", { read: TemplateRef })
  public notificationTemplate: TemplateRef<any>;
  public notificationReference: NotificationRef;
  bioSection = new FormGroup({
    categoriName: new FormControl<string>(''),
    categoriesDescription: new FormControl<string>('')
  });
  
  public gridData: unknown[] = null;
  constructor( private router: Router,private categoriesService:CategoriesService,private notificationService: NotificationService) {

  }
  ngOnInit(): void {
    this.getAllCategories();
  }
  getAllCategories(){
    this.categoriesService.getAllCategories().subscribe(
      data => {
        this.gridData=data;
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
      console.log(`Dialog result: ${status}`);
      this.categoriesService.createCategories({
        categoryName: this.bioSection?.value.categoriName,
        categoryDescription: this.bioSection?.value.categoriesDescription
      }).subscribe(
        data => {
          this.getAllCategories();
          this.bioSection=null;
          this.opened = false;
          if(data!=null)
          {
              this.showNotifivation();
          
          }
        },
        error => {
          console.error('Request failed', error);
        }
      );
  
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
}
