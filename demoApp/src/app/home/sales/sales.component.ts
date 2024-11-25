import { Component } from '@angular/core';
import { SalesService } from 'src/app/service/sales.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent {
  public gridData: unknown[] = null;
  constructor(private salesService: SalesService
  ) {
   
    this.salesService.getAllSalesList().subscribe(
      data => {
        this.gridData=data;
      }
    );
  }
}
