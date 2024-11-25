import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DateInputsModule } from "@progress/kendo-angular-dateinputs";
import { LabelModule } from "@progress/kendo-angular-label";
import { InputsModule } from "@progress/kendo-angular-inputs";
import { LayoutModule } from "@progress/kendo-angular-layout";
import { ButtonsModule } from "@progress/kendo-angular-buttons";
import { AppComponent } from "./app.component";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule ,provideHttpClient, withInterceptorsFromDi,HTTP_INTERCEPTORS} from "@angular/common/http";

import { HomeComponent } from "./home/home.component";
import { AppRoutingModule } from "./app-routing.module";
import { LoginComponent } from "./login/login.component";
import { CategoriesComponent } from "./home/categories/categories.component";
import { ProductComponent } from "./home/product/product.component";
import { SalesComponent } from "./home/sales/sales.component";
import { CouponComponent } from "./home/coupon/coupon.component";
import { DialogsModule } from "@progress/kendo-angular-dialog";
import { GridModule } from "@progress/kendo-angular-grid";
import { HttpRequestInterceptor } from "./http-request.interceptor";
import { HttpClient, HttpBackend } from '@angular/common/http';
import { NotificationModule } from "@progress/kendo-angular-notification";
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { StatisticsComponent } from './home/statistics/statistics.component';
import { ChartsModule } from "@progress/kendo-angular-charts";


@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent,
    HomeComponent,
    LoginComponent,
    CategoriesComponent,
    ProductComponent,
    SalesComponent,
    CouponComponent,
    StatisticsComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    DateInputsModule,
    InputsModule,
    LayoutModule,
    LabelModule,
    ButtonsModule,
    ChartsModule, 
    HttpClientModule,
    AppRoutingModule,
    DialogsModule,
    GridModule,
    ButtonsModule,
    InputsModule,
    NotificationModule,
    DropDownsModule 
  ],
  providers: [
    // İlk yapı: HTTP Interceptor'ı uygulamanın DI (Dependency Injection) container'ından ekleyin
    provideHttpClient(withInterceptorsFromDi()),

    // İkinci yapı: Geleneksel HTTP_INTERCEPTORS kullanımı
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestInterceptor,
      multi: true
    }
  ],

})
export class AppModule {}
