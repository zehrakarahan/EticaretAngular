// src/app/home/statistics/statistics.component.ts
import { Component, OnInit } from '@angular/core';
import { GetDailySales } from 'src/app/model/get-daily-sales';
import { GetLowStockProducts } from 'src/app/model/get-low-stock-product';
import { TopPreferCategories } from 'src/app/model/top-prefer-categories';
import { TopSalesProducts } from 'src/app/model/top-sales-product';
import { SalesService } from 'src/app/service/sales.service';


@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit  {
  topSellingProducts: TopSalesProducts[] = [];
  topCategories: TopPreferCategories[] = [];
  dailySales: GetDailySales[] = [];
  lowStockProducts: GetLowStockProducts[] = [];
  allSalesList: any[] = []; // For Sales Status Distribution

  // Data for charts
  topSellingProductNames: string[] = [];
  topSellingProductSales: number[] = [];

  topCategorySales: any[] = []; // For pie chart

  dailySalesDates: string[] = [];
  dailySalesTotals: number[] = [];

  salesStatusCounts: any[] = []; // For Sales Status Distribution

  cumulativeSales: number[] = []; // For Cumulative Sales
  cumulativeSalesDates: string[] = [];

  constructor(private salesService: SalesService) { }

  ngOnInit(): void {
    this.loadTopSellingProducts();
    this.loadTopCategories();
    this.loadDailySales();
    this.loadLowStockProducts();
    this.loadAllSalesList(); // For Sales Status Distribution
  }

  private loadTopSellingProducts(): void {
    this.salesService.getTopSellingProducts().subscribe(
      data => {
        this.topSellingProducts = data;
        this.topSellingProductNames = data.map(item => item.productName);
        this.topSellingProductSales = data.map(item => item.totalSales);
      },
      error => {
        console.error('Error fetching top selling products', error);
      }
    );
  }

  private loadTopCategories(): void {
    this.salesService.getTopCategories().subscribe(
      data => {
        this.topCategories = data;
        // Prepare data for pie chart
        this.topCategorySales = data.map(item => ({
          categoryName: item.categoryName,
          totalSales: item.totalSales
        }));
      },
      error => {
        console.error('Error fetching top categories', error);
      }
    );
  }

  private loadDailySales(): void {
    this.salesService.getDailySales().subscribe(
      data => {
        this.dailySales = data;
        // Format dates for display
        this.dailySalesDates = data.map(item => new Date(item.date).toLocaleDateString());
        this.dailySalesTotals = data.map(item => item.totalSales);

        // Calculate Cumulative Sales
        this.calculateCumulativeSales();
      },
      error => {
        console.error('Error fetching daily sales', error);
      }
    );
  }

  private loadLowStockProducts(): void {
    this.salesService.getLowStockProducts().subscribe(
      data => {
        this.lowStockProducts = data;
      },
      error => {
        console.error('Error fetching low stock products', error);
      }
    );
  }

  private loadAllSalesList(): void {
    this.salesService.getAllSalesList().subscribe(
      data => {
        this.allSalesList = data;
        this.processSalesStatusDistribution();
      },
      error => {
        console.error('Error fetching all sales list', error);
      }
    );
  }

  private processSalesStatusDistribution(): void {
    const statusCounts: { [key: string]: number } = {};

    this.allSalesList.forEach(sale => {
      const status = sale.saleStatus;
      if (statusCounts[status]) {
        statusCounts[status]++;
      } else {
        statusCounts[status] = 1;
      }
    });

    this.salesStatusCounts = Object.keys(statusCounts).map(status => ({
      status,
      count: statusCounts[status]
    }));
  }

  private calculateCumulativeSales(): void {
    this.cumulativeSales = [];
    this.cumulativeSalesDates = [];
    let cumulativeTotal = 0;

    this.dailySales.forEach(sale => {
      cumulativeTotal += sale.totalSales;
      this.cumulativeSales.push(cumulativeTotal);
      this.cumulativeSalesDates.push(new Date(sale.date).toLocaleDateString());
    });
  }
}
