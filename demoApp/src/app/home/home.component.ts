import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChartData, ChartOptions, ChartType } from 'chart.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  constructor(private router: Router) { }
 
  ngOnInit(): void {
   
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }



}
