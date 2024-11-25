import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { CategoriesComponent } from './home/categories/categories.component';
import { ProductComponent } from './home/product/product.component';
import { CouponComponent } from './home/coupon/coupon.component';
import { SalesComponent } from './home/sales/sales.component';
import { StatisticsComponent } from './home/statistics/statistics.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    component: HomeComponent,
    children: [
      { path: 'category', component: CategoriesComponent },
      { path: 'product', component: ProductComponent },
      { path: 'coupon', component: CouponComponent },
      { path: 'sales', component: SalesComponent },
      { path: 'statistic', component: StatisticsComponent },
    ]
  },
  {
    path: '**',
    redirectTo: '/login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
